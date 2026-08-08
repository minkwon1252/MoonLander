// Tech Race — single-screen game engine.
// Pure client-side state machine. No network, no backend. One instance drives the whole board.
(function () {
  'use strict';

  const D = window.GAME_DATA;
  // The eight national-system stats. NOTE: rdCapacity is the nation's *ability to do research*,
  // which is deliberately NOT the same thing as roadmap progress toward the chosen technology goal.
  // Roadmap progress is tracked separately per team (team.roadmapProgress, starts at 0).
  const STATS = ['treasury', 'energy', 'politicalSupport', 'publicWelfare', 'rdCapacity', 'reputation', 'security', 'environment'];
  const THRESHOLDS = {
    treasury: { value: 20, label: 'Fiscal crisis' },
    energy: { value: 20, label: 'Power / compute shortage' },
    politicalSupport: { value: 25, label: 'Political instability' },
    publicWelfare: { value: 25, label: 'Social unrest' },
    rdCapacity: { value: 20, label: 'Research capacity collapse' },
    reputation: { value: 25, label: 'Diplomatically isolated' },
    security: { value: 25, label: 'Sovereignty at risk' },
    environment: { value: 25, label: 'Environmental backlash' },
  };
  // roadmap stage index (progress/20) -> which band of policy cards that team now faces.
  // late starts at stage 4 (60%+) so late-stage dilemmas are actually reached within a 6-round game.
  const STAGE_BANDS = ['early', 'early', 'mid', 'late', 'late'];

  function clamp(v) { return Math.max(0, Math.min(100, Math.round(v))); }
  function uid() { return Math.random().toString(36).slice(2, 10); }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function freshStats(startMods) {
    const stats = {};
    STATS.forEach(s => { stats[s] = 50; });
    Object.entries(startMods || {}).forEach(([k, v]) => { if (stats[k] != null) stats[k] += v; });
    STATS.forEach(s => { stats[s] = clamp(stats[s]); });
    return stats;
  }

  function makeTeamState(t) {
    return {
      id: t.id, name: t.name, country: t.country, identity: t.identity, model: t.model,
      color: t.color, advantages: t.advantages, constraints: t.constraints,
      domain: null,
      stats: freshStats(t.startMods),
      // Progress toward the chosen technology goal. ALWAYS starts at 0 — no team gets a head
      // start on the roadmap regardless of its national stat advantages.
      roadmapProgress: 0,
      lastRoadmapDelta: 0,
      usedCardIds: [],
      pendingCard: null,
      choice: null, // {side, label, effects, stance, rationale}
      lastEffects: null,
      thresholdBreaches: 0,
      stanceCounts: { cooperate: 0, open: 0, protect: 0, secrecy: 0, compete: 0 },
      crisisStance: null,
      roundDeltaAccum: {}, // stat deltas accumulated so far this round (event + card + interaction + balance)
      lastStatDeltas: {}, // frozen snapshot shown beside stat bars until the next decision touches this team
      balanceNote: null,
    };
  }

  function initialState() {
    const teams = {};
    D.teams.forEach(t => { teams[t.id] = makeTeamState(t); });
    return {
      phase: 'guide', // guide | setup | idle-round | round | crisis | crisis-rps | summary | debrief
      round: 0,
      maxRounds: 8,
      globalTrust: 60,
      tension: 0,
      usedEventIds: [], // shared pool: covers both GAME_DATA.events and GAME_DATA.resources (unique ids)
      currentSituation: null,
      currentCrisis: null,
      teams,
      teamOrder: D.teams.map(t => t.id),
      log: [],
      roundSummary: null,
      debrief: null,
    };
  }

  const Engine = {
    state: initialState(),
    _listeners: [],
    onChange(fn) { this._listeners.push(fn); },
    _emit() { this._listeners.forEach(fn => fn(this.state)); },

    reset() {
      this.state = initialState();
      this._emit();
    },

    serialize() { return JSON.stringify(this.state); },
    loadState(obj) {
      this.state = obj;
      this._emit();
    },

    // ---------- Setup ----------
    assignDomain(teamId, domainId) {
      this.state.teams[teamId].domain = domainId;
      this._emit();
    },
    randomAssignDomains() {
      const domains = shuffle(D.domains.map(d => d.id));
      this.state.teamOrder.forEach((id, i) => { this.state.teams[id].domain = domains[i % domains.length]; });
      this._emit();
    },
    allDomainsAssigned() {
      return this.state.teamOrder.every(id => this.state.teams[id].domain);
    },
    startGame() {
      if (!this.allDomainsAssigned()) return;
      this.state.phase = 'idle-round';
      this.state.round = 0;
      this._emit();
    },

    // ---------- Guide ----------
    finishGuide() {
      this.state.phase = 'setup';
      this._emit();
    },

    // ---------- Unified event reveal ----------
    // Every round draws exactly one random event from a single shared pool. The event's own
    // `type` decides what happens next — the facilitator never chooses the type:
    //   'resource_conflict' -> a resource-crisis round (4-way stance choice, RPS on ties)
    //   'shock' | 'boost' | 'mixed' | 'condition_change' -> a situation round (cards dealt after effects)
    revealEvent() {
      const fullPool = D.events.concat(D.resources);
      let pool = fullPool.filter(e => !this.state.usedEventIds.includes(e.id));
      if (pool.length === 0) { this.state.usedEventIds = []; pool = fullPool; }
      const ev = pick(pool);
      this.state.usedEventIds.push(ev.id);
      this.state.round += 1;
      this.state.roundSummary = null;
      this.state.currentSituation = null;
      this.state.currentCrisis = null;

      this.state.teamOrder.forEach(id => {
        const team = this.state.teams[id];
        team.roundDeltaAccum = {};
        team.choice = null;
        team.lastEffects = null;
        team.crisisStance = null;
        team.balanceNote = null;
      });

      if (ev.type === 'resource_conflict') {
        this.state.phase = 'crisis';
        this.state.currentCrisis = { resource: ev, choices: {}, rpsWinner: null, resolved: false };
        this._emit();
        return;
      }

      this.state.phase = 'round';
      this.state.currentSituation = ev;
      const teamEffects = {};
      this.state.teamOrder.forEach(id => {
        const team = this.state.teams[id];
        const eff = Object.assign({}, ev.base, ev.domainEffects && ev.domainEffects[team.domain]);
        (ev.modifiers || []).forEach(m => {
          const cur = team.stats[m.stat];
          if ((m.when === 'statBelow' && cur < m.value) || (m.when === 'statAbove' && cur > m.value)) {
            Object.entries(m.effects).forEach(([k, v]) => { eff[k] = (eff[k] || 0) + v; });
          }
        });
        // Low global trust makes shared crises bite harder; high trust cushions them, because
        // the world coordinates its response. Only the damage is scaled, never the upside.
        const scaled = (ev.type === 'shock' || ev.type === 'mixed')
          ? this._scale(eff, this.harshnessMultiplier(), true)
          : eff;
        this._applyEffects(team, scaled);
        teamEffects[id] = scaled;
      });

      this.state.log.push({
        id: uid(), type: 'situation', round: this.state.round,
        eventId: ev.id, eventType: ev.type, title: ev.title, situation: ev.situation,
        teamEffects, timestamp: Date.now(),
      });

      this._dealCards();
      this._emit();
    },

    _dealCards() {
      this.state.teamOrder.forEach(id => {
        const team = this.state.teams[id];
        team.pendingCard = this._pickCard(team);
      });
    },

    // Cards depend on BOTH the team's chosen technology AND how far along its roadmap it is.
    // Priority: (1) domain cards written for the current stage band, (2) other domain cards,
    // (3) general cross-cutting cards. General cards appear ~25% of the time for variety.
    _pickCard(team) {
      const band = this.stageBand(team.id);
      const unused = c => !team.usedCardIds.includes(c.id);
      const stageCards = D.cards.filter(c => c.domain === team.domain && c.stage === band && unused(c));
      const anyDomain = D.cards.filter(c => c.domain === team.domain && c.stage === 'any' && unused(c));
      const generalCards = D.cards.filter(c => c.domain === 'general' && unused(c));

      let pool = null;
      if (generalCards.length && Math.random() < 0.25) pool = generalCards;
      if (!pool || !pool.length) pool = stageCards;
      if (!pool.length) pool = anyDomain;
      if (!pool.length) pool = generalCards;
      if (!pool.length) {
        team.usedCardIds = [];
        pool = D.cards.filter(c => c.domain === team.domain || c.domain === 'general');
      }
      const card = pick(pool);
      team.usedCardIds.push(card.id);
      return card;
    },

    resolveChoice(teamId, side, rationale) {
      const team = this.state.teams[teamId];
      if (!team.pendingCard || team.choice) return;
      const card = team.pendingCard;
      const opt = side === 'left' ? card.left : card.right;
      this._applyEffects(team, opt.effects);
      team.choice = { side, label: opt.label, effects: opt.effects, stance: opt.stance, rationale: rationale || '' };
      team.lastEffects = opt.effects;
      if (opt.stance) team.stanceCounts[opt.stance] = (team.stanceCounts[opt.stance] || 0) + 1;

      this.state.log.push({
        id: uid(), type: 'card', round: this.state.round,
        teamId, teamName: team.name, domain: team.domain,
        cardId: card.id, cardTitle: card.title, situation: card.situation, question: card.question,
        choiceSide: side, choiceLabel: opt.label, stance: opt.stance,
        rationale: rationale || '', statEffects: opt.effects, resultingStats: Object.assign({}, team.stats),
        discussionPrompt: card.discussionPrompt, educationalNote: card.educationalNote, severity: card.severity,
        timestamp: Date.now(),
      });
      this._emit();
    },

    setRationale(teamId, text) {
      const team = this.state.teams[teamId];
      if (team.choice) team.choice.rationale = text;
      else if (team.pendingCard) team._draftRationale = text;
      this._emit();
    },

    allTeamsResolved() {
      return this.state.teamOrder.every(id => this.state.teams[id].choice);
    },

    finalizeRound() {
      if (!this.allTeamsResolved()) return;
      const interactionLog = this._applyInteractionEffects();
      const balanceNotes = this._finalizeTeamsForRound();
      this.state.roundSummary = {
        round: this.state.round,
        situation: this.state.currentSituation,
        choices: this.state.teamOrder.map(id => {
          const t = this.state.teams[id];
          return { teamId: id, teamName: t.name, cardTitle: t.pendingCard.title, choice: t.choice };
        }),
        interactionLog,
        balanceNotes,
      };
      this.state.phase = 'summary';
      this._emit();
    },

    _applyInteractionEffects() {
      const log = [];
      const choices = this.state.teamOrder.map(id => ({ id, stance: this.state.teams[id].choice.stance }));
      const cooperators = choices.filter(c => c.stance === 'cooperate' || c.stance === 'open');
      const protectors = choices.filter(c => c.stance === 'protect');
      const competitors = choices.filter(c => c.stance === 'compete');
      const secretive = choices.filter(c => c.stance === 'secrecy');
      const openTeams = choices.filter(c => c.stance === 'open');

      if (cooperators.length >= 2) {
        const affected = [];
        const mult = this.cooperationMultiplier();
        cooperators.forEach(c => {
          const team = this.state.teams[c.id];
          if (team.stats.reputation < THRESHOLDS.reputation.value) return; // low reputation nullifies cooperation
          this._applyEffects(team, this._scale({ reputation: 4, rdCapacity: 3 }, mult));
          affected.push(c.id);
        });
        this.state.globalTrust = clamp(this.state.globalTrust + 4);
        if (affected.length) log.push({ rule: 'cooperation_bonus', teams: affected, description: `${affected.length} teams aligned on cooperation — shared reputation & R&D gained (x${mult.toFixed(1)} at ${this.state.globalTrust} global trust). Global trust rose.` });
      }
      if (protectors.length >= 1 && cooperators.length >= 2) {
        protectors.forEach(c => {
          const team = this.state.teams[c.id];
          this._applyEffects(team, { security: 4, reputation: -3 });
        });
        log.push({ rule: 'protection_penalty', teams: protectors.map(c => c.id), description: 'Protectionist stance while others cooperated — security gained, reputation cost.' });
      }
      if (competitors.length >= 3) {
        this.state.globalTrust = clamp(this.state.globalTrust - 8);
        log.push({ rule: 'competition_trust_loss', teams: competitors.map(c => c.id), description: 'Widespread competition — global trust fell, weakening future cooperation gains.' });
      }
      if (secretive.length >= 1 && openTeams.length >= 1) {
        secretive.forEach(c => {
          const team = this.state.teams[c.id];
          this._applyEffects(team, { rdCapacity: 3, reputation: -2 });
        });
        openTeams.forEach(c => {
          const team = this.state.teams[c.id];
          this._applyEffects(team, { reputation: 2 });
        });
        this.state.tension += 1;
        log.push({ rule: 'secrecy_tension', teams: secretive.map(c => c.id), description: 'Secrecy alongside openness — short-term tech gain for the secretive, rising diplomatic tension.' });
      }
      return log;
    },

    nextRound() {
      if (this.state.round >= this.state.maxRounds) {
        this._computeDebrief();
        this.state.phase = 'debrief';
      } else {
        this.state.phase = 'idle-round';
        this.state.currentSituation = null;
        this.state.currentCrisis = null;
        this.state.roundSummary = null;
      }
      this._emit();
    },

    // ---------- Resource crisis (a resource_conflict-type event revealed by revealEvent()) ----------
    setCrisisChoice(teamId, stance) {
      const crisis = this.state.currentCrisis;
      if (!crisis) return;
      crisis.choices[teamId] = stance;
      this.state.teams[teamId].crisisStance = stance;
      this._emit();
    },

    allCrisisChoicesMade() {
      const crisis = this.state.currentCrisis;
      return crisis && this.state.teamOrder.every(id => crisis.choices[id]);
    },

    competitorsInCrisis() {
      const crisis = this.state.currentCrisis;
      if (!crisis) return [];
      return this.state.teamOrder.filter(id => crisis.choices[id] === 'compete');
    },

    needsRPS() { return this.competitorsInCrisis().length >= 2; },

    setRPSWinner(teamId) {
      if (this.state.currentCrisis) this.state.currentCrisis.rpsWinner = teamId;
      this._emit();
    },

    resolveCrisis() {
      const crisis = this.state.currentCrisis;
      if (!crisis || !this.allCrisisChoicesMade()) return;
      const competitors = this.competitorsInCrisis();
      if (competitors.length >= 2 && !crisis.rpsWinner) { this.state.phase = 'crisis-rps'; this._emit(); return; }

      const effectsApplied = {};
      this.state.teamOrder.forEach(id => {
        const team = this.state.teams[id];
        const stance = crisis.choices[id];
        const choiceDef = crisis.resource.choices[stance];
        let eff;
        if (stance === 'compete') {
          if (competitors.length >= 2) {
            // Losing a contested resource hurts more in a low-trust world: nobody helps you recover.
            eff = id === crisis.rpsWinner
              ? choiceDef.winEffects
              : this._scale(choiceDef.loseEffects, this.harshnessMultiplier(), true);
          } else {
            eff = choiceDef.soloEffects;
          }
        } else if (stance === 'cooperate') {
          eff = this._scale(choiceDef.effects, this.cooperationMultiplier());
        } else {
          eff = choiceDef.effects;
        }
        this._applyEffects(team, eff);
        effectsApplied[id] = eff;
      });

      // Aggressive scrambles corrode trust; broad cooperation rebuilds it.
      const cooperatorCount = this.state.teamOrder.filter(id => crisis.choices[id] === 'cooperate').length;
      this.state.globalTrust = clamp(this.state.globalTrust - competitors.length * 3 + cooperatorCount * 3);

      crisis.resolved = true;
      this.state.log.push({
        id: uid(), type: 'resource_crisis', round: this.state.round,
        resourceId: crisis.resource.id, resource: crisis.resource.resource, situation: crisis.resource.situation,
        choices: Object.assign({}, crisis.choices), rpsWinner: crisis.rpsWinner, effectsApplied,
        timestamp: Date.now(),
      });
      const balanceNotes = this._finalizeTeamsForRound();
      this.state.roundSummary = {
        round: this.state.round,
        crisis: crisis.resource,
        choices: this.state.teamOrder.map(id => ({ teamId: id, teamName: this.state.teams[id].name, stance: crisis.choices[id], effects: effectsApplied[id] })),
        rpsWinner: crisis.rpsWinner,
        balanceNotes,
      };
      this.state.phase = 'summary';
      this._emit();
    },

    // ---------- Shared ----------
    _applyEffects(team, effects) {
      Object.entries(effects || {}).forEach(([k, v]) => {
        if (team.stats[k] == null) return;
        const before = team.stats[k];
        team.stats[k] = clamp(before + v);
        const th = THRESHOLDS[k];
        if (th && before >= th.value && team.stats[k] < th.value) team.thresholdBreaches += 1;
        team.roundDeltaAccum[k] = (team.roundDeltaAccum[k] || 0) + (team.stats[k] - before);
      });
    },

    manualAdjustStat(teamId, stat, delta) {
      const team = this.state.teams[teamId];
      this._applyEffects(team, { [stat]: delta });
      team.lastStatDeltas = Object.assign({}, team.roundDeltaAccum);
      this._emit();
    },

    activeWarnings(teamId) {
      const team = this.state.teams[teamId];
      return Object.entries(THRESHOLDS)
        .filter(([stat, t]) => team.stats[stat] < t.value)
        .map(([stat, t]) => ({ stat, label: t.label }));
    },

    // Number of the seven non-tech stats currently below their danger threshold — drives
    // roadmap blocking/regression (see _applyRoadmapAdvance) and the team-panel balance badge.
    dangerCount(teamId) {
      const team = this.state.teams[teamId];
      return Object.entries(THRESHOLDS).filter(([stat, t]) => team.stats[stat] < t.value).length;
    },
    balanceStatus(teamId) {
      const dc = this.dangerCount(teamId);
      if (dc === 0) return 'stable';
      if (dc === 1) return 'strained';
      if (dc === 2) return 'blocked';
      return 'regressing';
    },

    // ---------- Roadmap advance: the core difficulty mechanic ----------
    // Roadmap progress is EARNED from R&D Capacity but GATED by whole-system balance.
    // Building fast is only possible if money, energy, politics, welfare, security and the
    // environment all hold up at the same time.
    //   0 danger stats  -> full advance
    //   1 danger stat   -> halved ("strained")
    //   2 danger stats  -> no advance at all ("blocked")
    //   3+ danger stats -> roadmap actively REGRESSES ("regressing")
    // A very wide spread between best and worst stat costs an extra point even when nothing
    // has crossed a threshold yet — lopsided development is penalised on its own.
    _applyRoadmapAdvance(team) {
      const dangerCount = this.dangerCount(team.id);
      const danger = this.activeWarnings(team.id).map(w => w.label);
      // Base advance scales with R&D capacity: 50 rdCapacity ~ +10/round, 80 ~ +16/round.
      // Tuned so a well-balanced team that invests in R&D can reach the late stages within
      // 5-6 rounds, while a merely average one finishes mid-roadmap.
      let advance = team.stats.rdCapacity / 5;
      let note = null;
      let status = 'stable';

      if (dangerCount === 1) {
        advance = advance / 2;
        status = 'strained';
        note = `${team.name}: roadmap slowed by half — ${danger[0]}.`;
      } else if (dangerCount === 2) {
        advance = 0;
        status = 'blocked';
        note = `${team.name}: roadmap BLOCKED — ${danger.join(' & ')}. Recover these before development continues.`;
      } else if (dangerCount >= 3) {
        advance = -(dangerCount - 2) * 4;
        status = 'regressing';
        note = `${team.name}: roadmap REGRESSING — ${dangerCount} stats in danger (${danger.join(', ')}).`;
      }

      const spread = Math.max(...STATS.map(s => team.stats[s])) - Math.min(...STATS.map(s => team.stats[s]));
      if (spread > 55) {
        advance -= 2;
        const extra = `Development is badly unbalanced (${spread}-point spread) — 2 further progress lost.`;
        note = note ? note + ' ' + extra : `${team.name}: ${extra}`;
        if (status === 'stable') status = 'unbalanced';
      }

      advance = Math.round(advance);
      // "Blocked" must mean frozen, not slightly negative — regression is reserved for 3+ danger stats.
      if (status === 'blocked') advance = 0;
      const before = team.roadmapProgress;
      team.roadmapProgress = clamp(before + advance);
      team.lastRoadmapDelta = team.roadmapProgress - before;

      // DEVELOPMENT UPKEEP: building fast is not free. Every point of roadmap progress burns
      // money and power, so a team sprinting on high R&D drains its treasury and grid — which
      // is usually what eventually trips the balance gate above.
      if (advance > 0) {
        const cost = { treasury: -Math.round(advance / 2.5), energy: -Math.round(advance / 3.5) };
        this._applyEffects(team, cost);
        const costNote = `Development upkeep: ${cost.treasury} treasury, ${cost.energy} energy.`;
        note = note ? note + ' ' + costNote : null; // only surfaced when something else is already wrong
        team.lastUpkeep = cost;
      } else {
        team.lastUpkeep = null;
      }

      team.balanceNote = note ? { teamId: team.id, teamName: team.name, status, message: note } : null;
      return team.balanceNote;
    },

    _finalizeTeamsForRound() {
      const notes = [];
      this.state.teamOrder.forEach(id => {
        const team = this.state.teams[id];
        const note = this._applyRoadmapAdvance(team);
        team.lastStatDeltas = Object.assign({}, team.roundDeltaAccum);
        if (note) notes.push(note);
      });
      return notes;
    },

    getDomain(domainId) { return D.domains.find(d => d.id === domainId); },
    getRoadmapStage(teamId) {
      const team = this.state.teams[teamId];
      return Math.min(4, Math.floor(team.roadmapProgress / 20));
    },
    stageBand(teamId) { return STAGE_BANDS[this.getRoadmapStage(teamId)]; },

    // ---------- Global Trust ----------
    // Represents the world's overall willingness to cooperate. It is a real multiplier, not decoration:
    //   high trust -> cooperation bonuses and joint responses work better
    //   low trust  -> global shocks hurt more and losing a resource conflict hurts more
    trustFactor() { return this.state.globalTrust / 100; },
    cooperationMultiplier() { return 0.4 + this.trustFactor() * 1.2; },   // 0.4x at 0 trust, 1.6x at 100
    harshnessMultiplier() { return 1.6 - this.trustFactor() * 0.8; },      // 1.6x at 0 trust, 0.8x at 100
    _scale(effects, factor, negativeOnly) {
      const out = {};
      Object.entries(effects || {}).forEach(([k, v]) => {
        out[k] = (negativeOnly && v > 0) ? v : Math.round(v * factor);
      });
      return out;
    },

    // ---------- Debrief ----------
    _computeDebrief() {
      const teams = this.state.teamOrder.map(id => this.state.teams[id]);
      // Final score = how far the national project actually got, weighted equally against how
      // healthy the country still is. Racing ahead on a collapsing system scores badly, and so
      // does a perfectly balanced country that never built anything.
      const balanceOf = t => STATS.reduce((s, k) => s + t.stats[k], 0) / STATS.length;
      const score = t => t.roadmapProgress * 0.5 + balanceOf(t) * 0.5;
      const ranking = teams.slice().sort((a, b) => score(b) - score(a))
        .map(t => ({
          teamId: t.id, teamName: t.name,
          score: Math.round(score(t) * 10) / 10,
          roadmapProgress: t.roadmapProgress,
          roadmapStage: this.getRoadmapStage(t.id) + 1,
          balance: Math.round(balanceOf(t) * 10) / 10,
          stats: t.stats,
        }));

      const mostCooperative = teams.slice().sort((a, b) =>
        (b.stanceCounts.cooperate + b.stanceCounts.open) - (a.stanceCounts.cooperate + a.stanceCounts.open))[0];
      const mostAggressive = teams.slice().sort((a, b) => {
        const ac = a.stanceCounts.compete + (this.state.log.filter(l => l.type === 'resource_crisis' && l.choices[a.id] === 'compete').length);
        const bc = b.stanceCounts.compete + (this.state.log.filter(l => l.type === 'resource_crisis' && l.choices[b.id] === 'compete').length);
        return bc - ac;
      })[0];
      const mostResilient = teams.slice().sort((a, b) => a.thresholdBreaches - b.thresholdBreaches)[0];

      const cardLogs = this.state.log.filter(l => l.type === 'card');
      let biggestTradeoff = null, bestTradeoffScore = -1;
      cardLogs.forEach(l => {
        const vals = Object.values(l.statEffects || {});
        const hasPos = vals.some(v => v > 0), hasNeg = vals.some(v => v < 0);
        const magnitude = vals.reduce((s, v) => s + Math.abs(v), 0);
        if (hasPos && hasNeg && magnitude > bestTradeoffScore) { bestTradeoffScore = magnitude; biggestTradeoff = l; }
      });

      const mostDifficult = cardLogs.slice().sort((a, b) => (b.severity || 0) - (a.severity || 0))[0];

      const discussionQuestions = [];
      cardLogs.slice().sort((a, b) => (b.severity || 0) - (a.severity || 0)).forEach(l => {
        if (discussionQuestions.length < 6 && l.discussionPrompt && !discussionQuestions.includes(l.discussionPrompt)) {
          discussionQuestions.push(l.discussionPrompt);
        }
      });

      this.state.debrief = {
        ranking,
        mostCooperative: mostCooperative && { teamId: mostCooperative.id, teamName: mostCooperative.name },
        mostAggressive: mostAggressive && { teamId: mostAggressive.id, teamName: mostAggressive.name },
        mostResilient: mostResilient && { teamId: mostResilient.id, teamName: mostResilient.name },
        biggestTradeoff,
        mostDifficult,
        discussionQuestions,
        globalTrust: this.state.globalTrust,
      };
    },
  };

  Engine.THRESHOLDS = THRESHOLDS;
  Engine.STATS = STATS;
  window.Engine = Engine;
})();
