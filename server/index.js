'use strict';

const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const engine = require('./engine');

// ---- Static content & data ---------------------------------------------------
const DATA_DIR = path.join(__dirname, 'data');
const SAVE_DIR = path.join(__dirname, '..', 'data', 'save');
const SAVE_FILE = path.join(SAVE_DIR, 'game.json');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const DOMAINS = require(path.join(DATA_DIR, 'domains.json'));
const TEAMS_META = require(path.join(DATA_DIR, 'teams.json'));
const DOMESTIC_CARDS = require(path.join(DATA_DIR, 'cards_domestic.json'));
const INTL_ACTIONS = require(path.join(DATA_DIR, 'actions_international.json'));
const GLOBAL_EVENTS = require(path.join(DATA_DIR, 'events_global.json'));

const DOMESTIC_BY_ID = Object.fromEntries(DOMESTIC_CARDS.map((c) => [c.id, c]));
const ACTION_BY_ID = Object.fromEntries(INTL_ACTIONS.map((a) => [a.id, a]));
const GLOBAL_BY_ID = Object.fromEntries(GLOBAL_EVENTS.map((g) => [g.id, g]));

const ADMIN_PIN = process.env.ADMIN_PIN || 'STEM_Selene_Admin';
const PORT = process.env.PORT || 3000;
const DEFAULT_MAX_ROUNDS = parseInt(process.env.MAX_ROUNDS || '10', 10);

const PHASES = ['domestic', 'international', 'global', 'summary'];

// ---- Game state --------------------------------------------------------------
let game = null;

function newGame() {
  const g = {
    status: 'lobby',          // lobby | running | paused | ended
    round: 0,
    maxRounds: DEFAULT_MAX_ROUNDS,
    phase: 'lobby',           // lobby | domain | <PHASES> | debrief
    teams: {},
    trust: {},
    proposals: [],
    globalEvent: null,
    timer: null,              // { phase, endsAt, duration } | null
    log: [],
    adminNotes: [],
    public: { spotlight: { kind: 'none' }, globalRevealed: false },
    scoreSnapshots: [],       // [{round, scores}]
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  for (const id of Object.keys(TEAMS_META)) {
    const meta = TEAMS_META[id];
    g.teams[id] = {
      id,
      name: meta.name,
      country: meta.country,
      identity: meta.identity,
      color: meta.color,
      domain: null,
      stats: engine.makeInitialStats(meta.startMods),
      record: { cooperation: 0, coercion: 0, covertSuccess: 0, covertCaught: 0, treaties: 0, sent: 0, received: 0 },
      domesticToday: null,
      history: [],
      eliminated: false
    };
  }
  // Initialize trust at 50 both directions.
  const ids = Object.keys(g.teams);
  for (const a of ids) for (const b of ids) if (a !== b) engine.setTrust(g, a, b, 50);
  return g;
}

// ---- Persistence -------------------------------------------------------------
let saveTimer = null;
function persist() {
  game.updatedAt = Date.now();
  if (saveTimer) return;
  saveTimer = setTimeout(() => {
    saveTimer = null;
    try {
      fs.mkdirSync(SAVE_DIR, { recursive: true });
      fs.writeFileSync(SAVE_FILE, JSON.stringify(game, null, 2));
    } catch (e) {
      console.error('Persist failed:', e.message);
    }
  }, 150);
}

function loadGame() {
  try {
    if (fs.existsSync(SAVE_FILE)) {
      game = JSON.parse(fs.readFileSync(SAVE_FILE, 'utf8'));
      // Defensive: ensure new fields exist after upgrades.
      if (!game.public) game.public = { spotlight: { kind: 'none' }, globalRevealed: false };
      if (!game.scoreSnapshots) game.scoreSnapshots = [];
      if (game.timer === undefined) game.timer = null;
      console.log('Loaded saved game from', SAVE_FILE);
      return;
    }
  } catch (e) {
    console.error('Load failed, starting fresh:', e.message);
  }
  game = newGame();
}

// ---- Logging -----------------------------------------------------------------
function pushLog(type, message, data = {}) {
  game.log.push({
    ts: Date.now(), round: game.round, phase: game.phase, type, message, ...data
  });
}

// ---- Effects helpers ---------------------------------------------------------
function applyAndLog(team, effects, label, type = 'effect') {
  const diff = engine.applyEffects(team.stats, effects);
  if (Object.keys(diff).length || effects) {
    pushLog(type, `${team.name}: ${label}`, { teamId: team.id, effects: diff });
  }
  return diff;
}

// ---- Card dealing ------------------------------------------------------------
function eligibleDomestic(team) {
  const used = new Set(team.history.filter((h) => h.cardId).map((h) => h.cardId));
  let pool = DOMESTIC_CARDS.filter((c) => {
    if (c.teams && !c.teams.includes(team.id)) return false;
    if (!(c.domains.includes('all') || c.domains.includes(team.domain))) return false;
    return !used.has(c.id);
  });
  if (!pool.length) {
    // Exhausted: allow reuse rather than crash.
    pool = DOMESTIC_CARDS.filter((c) =>
      (!c.teams || c.teams.includes(team.id)) &&
      (c.domains.includes('all') || c.domains.includes(team.domain)));
  }
  return pool;
}

function dealDomestic(team) {
  const pool = eligibleDomestic(team);
  if (!pool.length) { team.domesticToday = null; return; }
  const teamSpecific = pool.filter((c) => c.teams);
  let card;
  if (teamSpecific.length && Math.random() < 0.45) {
    card = teamSpecific[Math.floor(Math.random() * teamSpecific.length)];
  } else {
    card = pool[Math.floor(Math.random() * pool.length)];
  }
  team.domesticToday = { cardId: card.id, decided: false, choice: null, rationale: '' };
}

// ---- Game flow ---------------------------------------------------------------
function startGame() {
  if (game.status === 'running') return { error: 'Game already running.' };
  // Require all teams to have a domain.
  const missing = Object.values(game.teams).filter((t) => !t.domain);
  if (missing.length) return { error: `Teams without a domain: ${missing.map((t) => t.name).join(', ')}` };
  game.status = 'running';
  game.round = 1;
  game.phase = 'domestic';
  game.globalEvent = null;
  game.timer = null;
  game.public = { spotlight: { kind: 'none' }, globalRevealed: false };
  for (const t of Object.values(game.teams)) dealDomestic(t);
  pushLog('flow', `Game started. Round 1 — domestic phase.`);
  return { ok: true };
}

function enterDomainSelection() {
  game.status = 'lobby';
  game.phase = 'domain';
  pushLog('flow', 'Domain selection opened.');
  return { ok: true };
}

function advancePhase() {
  if (game.status !== 'running') return { error: 'Game is not running.' };
  const idx = PHASES.indexOf(game.phase);
  if (idx === -1) return { error: 'Not in a round phase.' };
  if (game.phase === 'summary') return { error: 'Round complete — use "Next Round".' };
  const next = PHASES[idx + 1];
  game.phase = next;
  game.timer = null;
  // NOTE: do not reset globalRevealed here. The global event is cleared at the
  // start of each round (startGame/nextRound); if the host triggered it early,
  // it must remain visible rather than being hidden when entering this phase.
  if (next === 'summary') {
    const notes = engine.processRoundEnd(game);
    notes.forEach((n) => pushLog('roundend', n));
    const scores = engine.computeScores(game);
    game.scoreSnapshots.push({ round: game.round, scores, ts: Date.now() });
  }
  pushLog('flow', `Advanced to ${next} phase (round ${game.round}).`);
  return { ok: true };
}

function nextRound() {
  if (game.status !== 'running') return { error: 'Game is not running.' };
  if (game.phase !== 'summary') return { error: 'Finish the round (reach summary) first.' };
  if (game.round >= game.maxRounds) {
    game.phase = 'debrief';
    game.status = 'ended';
    pushLog('flow', 'Final round complete — debrief.');
    return { ok: true };
  }
  game.round += 1;
  game.phase = 'domestic';
  game.globalEvent = null;
  game.timer = null;
  game.public = { spotlight: { kind: 'none' }, globalRevealed: false };
  for (const t of Object.values(game.teams)) dealDomestic(t);
  pushLog('flow', `Round ${game.round} begins — domestic phase.`);
  return { ok: true };
}

function endGame() {
  game.phase = 'debrief';
  game.status = 'ended';
  game.timer = null;
  const scores = engine.computeScores(game);
  game.scoreSnapshots.push({ round: game.round, scores, ts: Date.now(), final: true });
  pushLog('flow', `Game ended by facilitator at round ${game.round}. Debrief.`);
  return { ok: true };
}

function startTimer(seconds) {
  const s = Math.max(10, Math.min(3600, parseInt(seconds, 10) || 0));
  if (!s) return { error: 'Invalid duration.' };
  game.timer = { phase: game.phase, round: game.round, endsAt: Date.now() + s * 1000, duration: s };
  pushLog('flow', `Timer started: ${s}s for ${game.phase}.`);
  return { ok: true };
}

function clearTimer() { game.timer = null; return { ok: true }; }

function triggerGlobal(eventId) {
  if (game.status !== 'running') return { error: 'Game is not running.' };
  let event = eventId ? GLOBAL_BY_ID[eventId] : null;
  if (!event) {
    // Random pick, avoid immediate repeat.
    const usedIds = (game.scoreSnapshots, game.log.filter((l) => l.type === 'global').map((l) => l.globalId));
    let pool = GLOBAL_EVENTS.filter((g) => !usedIds.includes(g.id));
    if (!pool.length) pool = GLOBAL_EVENTS;
    event = pool[Math.floor(Math.random() * pool.length)];
  }
  const log = engine.applyGlobalEvent(game, event);
  game.globalEvent = { id: event.id, title: event.title, narrative: event.narrative,
    severity: event.severity, discussionPrompt: event.discussionPrompt,
    educationalNote: event.educationalNote, log };
  game.public.globalRevealed = true;
  pushLog('global', `Global event: ${event.title}`, { globalId: event.id, data: log });
  return { ok: true };
}

// ---- Domestic decisions ------------------------------------------------------
function decideDomestic(teamId, choice, rationale) {
  const team = game.teams[teamId];
  if (!team) return { error: 'Unknown team.' };
  if (game.phase !== 'domestic') return { error: 'Not in the domestic phase.' };
  if (!team.domesticToday) return { error: 'No card to decide.' };
  if (team.domesticToday.decided) return { error: 'Already decided this round.' };
  const card = DOMESTIC_BY_ID[team.domesticToday.cardId];
  if (!card) return { error: 'Card missing.' };
  const opt = choice === 'A' ? card.optionA : choice === 'B' ? card.optionB : null;
  if (!opt) return { error: 'Invalid choice.' };
  const diff = engine.applyEffects(team.stats, opt.effects);
  team.domesticToday.decided = true;
  team.domesticToday.choice = choice;
  team.domesticToday.rationale = rationale || '';
  team.history.push({
    round: game.round, kind: 'domestic', cardId: card.id, title: card.title,
    choice, optionLabel: opt.label, rationale: rationale || '', effects: diff, ts: Date.now()
  });
  pushLog('domestic', `${team.name} chose "${opt.label}" on "${card.title}".`,
    { teamId, cardId: card.id, choice, effects: diff, rationale: rationale || '' });
  return { ok: true };
}

// ---- International proposals --------------------------------------------------
function makeProposalId() { return 'p' + Math.random().toString(36).slice(2, 9); }

function submitProposal(fromId, actionId, toId, note) {
  const from = game.teams[fromId];
  const action = ACTION_BY_ID[actionId];
  if (!from) return { error: 'Unknown team.' };
  if (!action) return { error: 'Unknown action.' };
  if (game.phase !== 'international') return { error: 'Proposals only in the international phase.' };
  const already = game.proposals.find((p) => p.fromTeam === fromId && p.round === game.round);
  if (already) return { error: 'You have already used your international action this round.' };

  from.record.sent += 1;

  if (action.multilateral) {
    const targets = Object.keys(game.teams).filter((id) => id !== fromId && !game.teams[id].eliminated);
    const groupId = makeProposalId();
    for (const t of targets) {
      game.proposals.push(makeProposal(action, fromId, t, note, { groupId }));
      game.teams[t].record.received += 1;
    }
    pushLog('intl', `${from.name} proposed multilateral "${action.label}".`, { fromTeam: fromId, actionId });
    return { ok: true };
  }

  if (!toId || !game.teams[toId]) return { error: 'Choose a valid target team.' };
  const to = game.teams[toId];

  if (action.covert) {
    return resolveCovert(from, to, action, note);
  }

  const prop = makeProposal(action, fromId, toId, note);
  game.proposals.push(prop);
  to.record.received += 1;

  if (!action.requiresConsent) {
    // Unilateral: effects land immediately; target may retaliate.
    const e = action.effects.unilateral || {};
    if (e.initiator) applyAndLog(from, e.initiator, `${action.label} (initiated)`, 'intl');
    if (e.target) applyAndLog(to, e.target, `hit by ${action.label} from ${from.name}`, 'intl');
    if (typeof e.trust === 'number') engine.adjustTrust(game, fromId, toId, e.trust);
    if (action.category === 'coercion') from.record.coercion += 1;
    prop.status = 'delivered';
    prop.resolvedAt = Date.now();
    pushLog('intl', `${from.name} used "${action.label}" against ${to.name}.`, { fromTeam: fromId, toTeam: toId, actionId });
  } else {
    prop.status = 'pending';
    pushLog('intl', `${from.name} proposed "${action.label}" to ${to.name}.`, { fromTeam: fromId, toTeam: toId, actionId });
  }
  return { ok: true };
}

function makeProposal(action, fromId, toId, note, extra = {}) {
  return {
    id: makeProposalId(),
    round: game.round,
    actionId: action.id,
    actionLabel: action.label,
    category: action.category,
    requiresConsent: !!action.requiresConsent,
    covert: !!action.covert,
    fromTeam: fromId,
    toTeam: toId,
    note: note || '',
    status: 'pending',
    response: null,
    responseRationale: '',
    createdAt: Date.now(),
    ...extra
  };
}

function resolveCovert(from, to, action, note) {
  const success = Math.random() < (action.successChance ?? 0.5);
  const discovered = Math.random() < (action.discoveryChance ?? 0.5);
  const prop = makeProposal(action, from.id, to.id, note);
  prop.covert = true;
  prop.status = 'resolved';
  prop.success = success;
  prop.discovered = discovered;
  prop.resolvedAt = Date.now();

  if (success) {
    const e = action.effects.covertSuccess || {};
    if (e.initiator) applyAndLog(from, e.initiator, `${action.label} succeeded (covert)`, 'covert');
    if (e.target) engine.applyEffects(to.stats, e.target);
    if (typeof e.trust === 'number') engine.adjustTrust(game, from.id, to.id, e.trust);
    from.record.covertSuccess += 1;
  }
  if (discovered) {
    const e = action.effects.covertCaught || {};
    if (e.initiator) applyAndLog(from, e.initiator, `${action.label} EXPOSED!`, 'covert');
    if (e.target) applyAndLog(to, e.target, `caught ${from.name} attempting ${action.label}`, 'covert');
    if (typeof e.trust === 'number') engine.adjustTrust(game, from.id, to.id, e.trust);
    from.record.covertCaught += 1;
  }
  game.proposals.push(prop);
  pushLog('covert', `${from.name} ran a covert "${action.label}" on ${to.name} — ` +
    `${success ? 'succeeded' : 'failed'}${discovered ? ', and was discovered' : ', undetected'}.`,
    { fromTeam: from.id, toTeam: to.id, actionId: action.id, success, discovered });
  return { ok: true, covertResult: { success, discovered } };
}

function respondProposal(teamId, proposalId, response, rationale) {
  const prop = game.proposals.find((p) => p.id === proposalId);
  if (!prop) return { error: 'Unknown proposal.' };
  if (prop.toTeam !== teamId) return { error: 'Not addressed to you.' };
  const action = ACTION_BY_ID[prop.actionId];
  const from = game.teams[prop.fromTeam];
  const to = game.teams[prop.toTeam];
  if (!from || !to) return { error: 'Team missing.' };

  if (prop.requiresConsent) {
    if (prop.status !== 'pending') return { error: 'Already resolved.' };
    if (response === 'accept') {
      const e = action.effects.accept || {};
      if (e.initiator) applyAndLog(from, e.initiator, `${action.label} accepted by ${to.name}`, 'intl');
      if (e.target) applyAndLog(to, e.target, `accepted ${action.label} from ${from.name}`, 'intl');
      if (typeof e.trust === 'number') engine.adjustTrust(game, from.id, to.id, e.trust);
      from.record.cooperation += 1; to.record.cooperation += 1;
      if (action.id === 'multilateral_treaty' || action.id === 'crisis_treaty' || action.id === 'tech_alliance') {
        from.record.treaties += 1; to.record.treaties += 1;
      }
      prop.status = 'accepted';
    } else { // decline
      const e = action.effects.reject || {};
      if (e.initiator) applyAndLog(from, e.initiator, `${action.label} declined by ${to.name}`, 'intl');
      if (e.target) applyAndLog(to, e.target, `declined ${action.label}`, 'intl');
      if (typeof e.trust === 'number') engine.adjustTrust(game, from.id, to.id, e.trust);
      prop.status = 'declined';
    }
  } else {
    // Unilateral already applied; only retaliation is meaningful.
    if (prop.status === 'retaliated' || prop.status === 'absorbed') return { error: 'Already responded.' };
    if (response === 'retaliate' && action.effects.retaliate) {
      const e = action.effects.retaliate;
      if (e.initiator) applyAndLog(from, e.initiator, `retaliation from ${to.name}`, 'intl');
      if (e.target) applyAndLog(to, e.target, `retaliated against ${from.name}`, 'intl');
      if (typeof e.trust === 'number') engine.adjustTrust(game, from.id, to.id, e.trust);
      to.record.coercion += 1;
      prop.status = 'retaliated';
    } else {
      prop.status = 'absorbed';
    }
  }
  prop.response = response;
  prop.responseRationale = rationale || '';
  prop.resolvedAt = Date.now();
  pushLog('intl', `${to.name} responded "${response}" to ${from.name}'s ${prop.actionLabel}.`,
    { fromTeam: from.id, toTeam: to.id, response, rationale: rationale || '' });
  return { ok: true };
}

// ---- Admin utilities ---------------------------------------------------------
function editStat(teamId, key, value) {
  const team = game.teams[teamId];
  if (!team || !(key in team.stats)) return { error: 'Invalid team/stat.' };
  const before = team.stats[key];
  team.stats[key] = engine.clampStat(key, Number(value));
  pushLog('admin', `Admin set ${team.name} ${key}: ${before} -> ${team.stats[key]}.`,
    { teamId, effects: { [key]: team.stats[key] - before } });
  return { ok: true };
}

function addAdminNote(teamId, text) {
  game.adminNotes.push({ ts: Date.now(), round: game.round, teamId: teamId || null, text });
  pushLog('note', `Admin note${teamId ? ' on ' + (game.teams[teamId]?.name || teamId) : ''}: ${text}`, { teamId });
  return { ok: true };
}

function setSpotlight(payload) {
  game.public.spotlight = payload || { kind: 'none' };
  return { ok: true };
}

function setDomain(teamId, domain) {
  const team = game.teams[teamId];
  if (!team) return { error: 'Unknown team.' };
  if (!DOMAINS[domain]) return { error: 'Unknown domain.' };
  if (game.status === 'running') return { error: 'Cannot change domain mid-game.' };
  team.domain = domain;
  pushLog('setup', `${team.name} chose domain: ${DOMAINS[domain].name}.`, { teamId });
  return { ok: true };
}

// ---- Views (role-filtered) ---------------------------------------------------
function publicTeamView(t) {
  return {
    id: t.id, name: t.name, country: t.country, identity: t.identity, color: t.color,
    domain: t.domain, domainName: t.domain ? DOMAINS[t.domain].name : null,
    stats: t.stats, record: t.record, eliminated: t.eliminated,
    decidedDomestic: !!(t.domesticToday && t.domesticToday.decided),
    sentThisRound: game.proposals.some((p) => p.fromTeam === t.id && p.round === game.round)
  };
}

function guidanceFor() {
  const r = game.round, mr = game.maxRounds;
  if (game.status === 'ended' || game.phase === 'debrief')
    return { title: 'Game over', body: 'Final rankings and each team’s goal progress are on the Big Screen.',
      next: 'Press ⟲ Reset to play again.' };
  if (game.status === 'paused')
    return { title: 'Paused', body: 'Team input is frozen.', next: 'Press ▶ Resume to continue.' };
  if (game.status === 'lobby') {
    const missing = Object.values(game.teams).filter((t) => !t.domain);
    if (missing.length)
      return { title: 'Setup — choose technology domains',
        body: `Each team picks a domain on /team.html. Missing: ${missing.map((t) => t.name).join(', ')}.`,
        next: 'Quickest: press 🎲 Auto-assign Domains, then ▶ Start Game.' };
    return { title: 'Ready to start', body: 'All five teams have a domain.', next: 'Press ▶ Start Game.' };
  }
  // running
  if (game.phase === 'domestic')
    return { title: `Round ${r}/${mr} — Domestic policy`,
      body: 'Teams privately decide their domestic policy card on their own devices.',
      next: 'When teams have decided, press ⏭ Advance Phase (→ International).',
      tip: 'Optional: start a phase timer to keep pace.' };
  if (game.phase === 'international')
    return { title: `Round ${r}/${mr} — International relations`,
      body: 'Each team may send ONE international action; targets Accept or Decline. As reps present, use 📺 to spotlight a card on the Big Screen and record what they say in Notes.',
      next: 'Press ⏭ Advance Phase (→ Global Event).' };
  if (game.phase === 'global') {
    if (!game.globalEvent)
      return { title: `Round ${r}/${mr} — Global event`,
        body: 'No event revealed yet.',
        next: 'Press 🌐 Trigger Global — the event appears on the Big Screen (and in the panel below). Then press ⏭ Advance Phase.' };
    return { title: `Round ${r}/${mr} — Global event revealed`,
      body: `“${game.globalEvent.title}” is now showing on the Big Screen. Discuss its impact.`,
      next: 'Press ⏭ Advance Phase (→ Round Summary).' };
  }
  if (game.phase === 'summary')
    return { title: `Round ${r}/${mr} — Summary`,
      body: 'Updated scores and the cooperation network are on the Big Screen — let the room read each team’s status.',
      next: r >= mr ? 'Press ⏩ Next Round to finish → Debrief.'
                    : 'Press ⏩ Next Round for the next round, or 🏁 End Game to stop here.' };
  return { title: 'Running', body: '', next: '' };
}

function baseState() {
  const scores = engine.computeScores(game);
  return {
    status: game.status, round: game.round, maxRounds: game.maxRounds, phase: game.phase,
    cooperationIndex: engine.globalCooperationIndex(game),
    scores, goals: engine.computeGoals(game, DOMAINS),
    trustGraph: engine.trustGraph(game), timer: game.timer,
    globalEvent: game.globalEvent, public: game.public,
    guidance: guidanceFor(),
    updatedAt: game.updatedAt
  };
}

function metaPayload() {
  return {
    domains: DOMAINS, actions: INTL_ACTIONS, teamsMeta: TEAMS_META, statMeta: engine.STAT_META,
    globalEvents: GLOBAL_EVENTS.map((g) => ({ id: g.id, title: g.title, severity: g.severity }))
  };
}

function visibleProposalForTeam(p, teamId) {
  // Hide covert ops from the target unless discovered. Initiator always sees own.
  if (p.covert && p.toTeam === teamId && !p.discovered && p.fromTeam !== teamId) return null;
  return p;
}

function viewFor(role, teamId) {
  const state = baseState();
  state.teams = Object.values(game.teams).map(publicTeamView);
  state.trust = game.trust;

  if (role === 'admin') {
    state.role = 'admin';
    state.fullTeams = game.teams;
    state.proposals = game.proposals;
    state.adminNotes = game.adminNotes;
    state.log = game.log.slice(-200);
    state.scoreSnapshots = game.scoreSnapshots;
    return state;
  }

  if (role === 'team' && game.teams[teamId]) {
    state.role = 'team';
    state.you = game.teams[teamId];
    const card = game.teams[teamId].domesticToday;
    state.domesticCard = card ? DOMESTIC_BY_ID[card.cardId] : null;
    state.domesticState = card || null;
    state.proposals = game.proposals
      .filter((p) => (p.fromTeam === teamId || p.toTeam === teamId))
      .map((p) => visibleProposalForTeam(p, teamId))
      .filter(Boolean);
    return state;
  }

  // public / projector
  state.role = 'public';
  // Build spotlight detail for the projector.
  const sp = game.public.spotlight || { kind: 'none' };
  if (sp.kind === 'proposal') {
    const p = game.proposals.find((x) => x.id === sp.id);
    if (p) {
      const action = ACTION_BY_ID[p.actionId];
      state.spotlight = { kind: 'proposal', proposal: p, action,
        fromName: game.teams[p.fromTeam]?.name, toName: game.teams[p.toTeam]?.name,
        revealRationale: !!sp.revealRationale };
    }
  } else if (sp.kind === 'domestic') {
    const team = game.teams[sp.teamId];
    if (team && team.domesticToday) {
      const card = DOMESTIC_BY_ID[team.domesticToday.cardId];
      state.spotlight = { kind: 'domestic', teamId: team.id, teamName: team.name,
        card, decision: team.domesticToday, revealRationale: !!sp.revealRationale };
    }
  }
  return state;
}

// ---- HTTP + Socket.IO --------------------------------------------------------
const app = express();
app.use(express.static(PUBLIC_DIR));
app.get('/', (req, res) => res.sendFile(path.join(PUBLIC_DIR, 'index.html')));

// Export endpoints
app.get('/api/export/json', (req, res) => {
  res.setHeader('Content-Disposition', 'attachment; filename="techrace_game.json"');
  res.json(game);
});
app.get('/api/export/csv', (req, res) => {
  const rows = [['timestamp', 'round', 'phase', 'type', 'team', 'message', 'choice', 'rationale', 'effects']];
  for (const l of game.log) {
    const teamName = l.teamId && game.teams[l.teamId] ? game.teams[l.teamId].name : '';
    rows.push([
      new Date(l.ts).toISOString(), l.round, l.phase, l.type, teamName,
      (l.message || '').replace(/"/g, '""'),
      l.choice || '', (l.rationale || '').replace(/"/g, '""'),
      l.effects ? JSON.stringify(l.effects).replace(/"/g, '""') : ''
    ]);
  }
  const csv = rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="techrace_log.csv"');
  res.send(csv);
});

const server = http.createServer(app);
const io = new Server(server);

function broadcast() {
  persist();
  for (const [, s] of io.of('/').sockets) {
    const { role, teamId } = s.data || {};
    s.emit('state', viewFor(role || 'public', teamId));
  }
}

io.on('connection', (socket) => {
  socket.data = { role: 'public', teamId: null };
  socket.emit('meta', metaPayload());
  socket.emit('state', viewFor('public', null));

  socket.on('auth', (msg, cb) => {
    const { role, teamId, pin } = msg || {};
    if (role === 'admin') {
      if (pin !== ADMIN_PIN) return cb && cb({ error: 'Wrong admin PIN.' });
      socket.data = { role: 'admin', teamId: null };
    } else if (role === 'team') {
      const meta = TEAMS_META[teamId];
      if (!meta) return cb && cb({ error: 'Unknown team.' });
      if (String(pin) !== String(meta.pin)) return cb && cb({ error: 'Wrong team PIN.' });
      socket.data = { role: 'team', teamId };
    } else {
      socket.data = { role: 'public', teamId: null };
    }
    cb && cb({ ok: true, role: socket.data.role, teamId: socket.data.teamId });
    socket.emit('state', viewFor(socket.data.role, socket.data.teamId));
  });

  // ----- Team actions -----
  socket.on('team:selectDomain', (msg, cb) => guardTeam(socket, msg, cb, (tid) =>
    setDomain(tid, msg.domain)));
  socket.on('team:decideDomestic', (msg, cb) => guardTeam(socket, msg, cb, (tid) =>
    decideDomestic(tid, msg.choice, msg.rationale)));
  socket.on('team:propose', (msg, cb) => guardTeam(socket, msg, cb, (tid) =>
    submitProposal(tid, msg.actionId, msg.toTeam, msg.note)));
  socket.on('team:respond', (msg, cb) => guardTeam(socket, msg, cb, (tid) =>
    respondProposal(tid, msg.proposalId, msg.response, msg.rationale)));

  // ----- Admin actions -----
  socket.on('admin:cmd', (msg, cb) => {
    if (socket.data.role !== 'admin') return cb && cb({ error: 'Admin only.' });
    const res = handleAdmin(msg || {});
    if (res && !res.error) broadcast();
    cb && cb(res);
  });
});

function guardTeam(socket, msg, cb, fn) {
  if (socket.data.role !== 'team') return cb && cb({ error: 'Team login required.' });
  if (game.status === 'paused') return cb && cb({ error: 'Game is paused.' });
  const res = fn(socket.data.teamId);
  if (res && !res.error) broadcast();
  cb && cb(res);
}

function handleAdmin(msg) {
  switch (msg.cmd) {
    case 'openDomainSelection': return enterDomainSelection();
    case 'setDomain': return setDomain(msg.teamId, msg.domain);
    case 'start': return startGame();
    case 'advancePhase': return advancePhase();
    case 'nextRound': return nextRound();
    case 'endGame': return endGame();
    case 'startTimer': return startTimer(msg.seconds);
    case 'clearTimer': return clearTimer();
    case 'triggerGlobal': return triggerGlobal(msg.eventId);
    case 'editStat': return editStat(msg.teamId, msg.key, msg.value);
    case 'note': return addAdminNote(msg.teamId, msg.text);
    case 'spotlight': return setSpotlight(msg.payload);
    case 'setMaxRounds':
      game.maxRounds = Math.max(1, Math.min(10, parseInt(msg.value, 10) || DEFAULT_MAX_ROUNDS));
      return { ok: true };
    case 'pause': game.status = 'paused'; pushLog('flow', 'Game paused.'); return { ok: true };
    case 'resume': game.status = 'running'; pushLog('flow', 'Game resumed.'); return { ok: true };
    case 'reset': game = newGame(); pushLog('flow', 'Game reset.'); return { ok: true };
    case 'resolvePending':
      // Auto-resolve any lingering consent proposals as "no response" (rejects, mild).
      for (const p of game.proposals) {
        if (p.status === 'pending') { p.status = 'lapsed'; }
      }
      return { ok: true };
    default: return { error: 'Unknown admin command: ' + msg.cmd };
  }
}

// ---- Boot --------------------------------------------------------------------
loadGame();
server.listen(PORT, () => {
  console.log(`\n  Tech Race server running:  http://localhost:${PORT}`);
  console.log(`  Admin PIN: ${ADMIN_PIN}   (set ADMIN_PIN env var to change)`);
  console.log(`  Team PINs are in server/data/teams.json (field "pin").\n`);
  const ifaces = require('os').networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const i of ifaces[name]) {
      if (i.family === 'IPv4' && !i.internal) {
        console.log(`  LAN access for other devices: http://${i.address}:${PORT}`);
      }
    }
  }
  console.log('');
});
