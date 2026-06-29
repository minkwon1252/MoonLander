/* Team console logic. */
let MY_TEAM = null;
registerTimerEl(document.getElementById('timerPill'));

// ---- Login ----
function fillLoginTeams() {
  const sel = document.getElementById('loginTeam');
  if (!META || sel.options.length) return;
  for (const id of Object.keys(META.teamsMeta)) {
    const m = META.teamsMeta[id];
    sel.appendChild(el('option', { value: id }, `${m.name} — ${m.country}`));
  }
}
onMeta(fillLoginTeams);

async function doLogin(teamId, pin) {
  const res = await emit('auth', { role: 'team', teamId, pin });
  if (res.error) { toast(res.error, true); return false; }
  MY_TEAM = teamId;
  localStorage.setItem('tr_team', teamId);
  localStorage.setItem('tr_pin', pin);
  document.getElementById('login').style.display = 'none';
  document.getElementById('dash').style.display = 'block';
  document.getElementById('logoutBtn').style.display = 'inline-flex';
  document.getElementById('teamLabel').textContent = '· ' + (META.teamsMeta[teamId].name);
  return true;
}

document.getElementById('loginBtn').addEventListener('click', () => {
  doLogin(document.getElementById('loginTeam').value, document.getElementById('loginPin').value);
});
document.getElementById('loginPin').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('loginBtn').click();
});
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('tr_team'); localStorage.removeItem('tr_pin'); location.reload();
});

// Auto re-login after refresh.
socket.on('connect', () => {
  const t = localStorage.getItem('tr_team'), p = localStorage.getItem('tr_pin');
  if (t && p) doLogin(t, p);
});

// ---- Render ----
onState((s) => {
  document.getElementById('phasePill').innerHTML =
    `R<b>${s.round}</b>/${s.maxRounds} · ${phaseLabel(s.phase)}${s.status === 'paused' ? ' (PAUSED)' : ''}`;
  if (s.role !== 'team' || !s.you) return;
  MY_TEAM = s.you.id;
  renderDashboard(s);
});

function renderDashboard(s) {
  const you = s.you;
  document.getElementById('dashTeamName').textContent = `${you.name} — ${you.country}`;
  document.getElementById('dashIdentity').textContent = META.teamsMeta[you.id].model;
  document.getElementById('dashDomain').textContent = you.domain ? META.domains[you.domain].name : 'No domain yet';

  renderStats(document.getElementById('statBox'), you.stats, META.statMeta);
  renderScores(document.getElementById('scoreBox'), s.scores[you.id]);
  renderGoal(s.goals && s.goals[you.id]);
  renderWarnings(you);

  // Domain selection
  const dp = document.getElementById('domainPanel');
  if (!you.domain && (s.status === 'lobby')) { dp.style.display = 'block'; renderDomainGrid(); }
  else dp.style.display = 'none';

  renderDomestic(s);
  renderIntl(s);
  renderOthers(s);
  renderHistory(you);
}

function renderScores(box, sc) {
  clear(box);
  if (!sc) return;
  const map = { techLeadership: 'Tech Leadership', socialStability: 'Social Stability',
    diplomacy: 'Diplomacy', ethical: 'Ethical Eng.', resilience: 'Resilience', composite: 'COMPOSITE' };
  for (const k of Object.keys(map)) {
    box.appendChild(el('div', { class: 'stat' },
      el('div', { class: 'row' }, el('span', {}, map[k]), el('b', {}, String(sc[k])))));
  }
}

function renderGoal(goal) {
  if (!goal) return;
  document.getElementById('goalPct').textContent = `· ${goal.percent}%`;
  document.getElementById('goalStatement').textContent = goal.statement;
  document.getElementById('goalFill').style.width = goal.percent + '%';
  const box = document.getElementById('goalCriteria'); clear(box);
  for (const c of goal.criteria) {
    box.appendChild(el('div', { class: 'crit' },
      el('span', { class: 'mark ' + (c.met ? 'met' : 'miss') }, c.met ? '✓' : '○'),
      el('span', {}, el('b', {}, c.label), el('br'),
        el('span', { class: 'muted small' }, c.detail))));
  }
}

function renderWarnings(you) {
  const box = document.getElementById('warnings'); clear(box);
  const dangers = [];
  for (const k of Object.keys(META.statMeta)) {
    const m = META.statMeta[k];
    if (m.warnLow && you.stats[k] <= m.danger)
      dangers.push(`${m.label} critically low (${you.stats[k]})`);
  }
  if (you.stats.treasury < 0) dangers.unshift(`Treasury in deficit (${you.stats.treasury}) — debt penalties active`);
  if (dangers.length) box.appendChild(el('div', { class: 'banner bad' },
    '⚠ ' + dangers.join('  ·  ')));
}

function renderDomainGrid() {
  const g = document.getElementById('domainGrid'); clear(g);
  for (const id of Object.keys(META.domains)) {
    const d = META.domains[id];
    g.appendChild(el('div', { class: 'opt', onclick: () => act('team:selectDomain', { domain: id }, 'Domain chosen.') },
      el('div', { class: 'lab' }, d.name),
      el('div', { class: 'fx' }, d.blurb)));
  }
}

// ---- Domestic ----
function renderDomestic(s) {
  const p = document.getElementById('domesticPanel'); clear(p);
  if (s.phase !== 'domestic' || !s.domesticCard) {
    p.appendChild(el('h2', {}, 'Domestic Policy'));
    p.appendChild(el('p', { class: 'muted small' },
      s.status === 'lobby' ? 'Waiting for the facilitator to start the game.' :
      'No domestic card active in this phase.'));
    return;
  }
  const card = s.domesticCard, st = s.domesticState;
  p.appendChild(el('h2', {}, 'Domestic Policy Card'));
  const dec = el('div', { class: 'decision' },
    el('h3', {}, card.title),
    el('div', { class: 'ctx' }, card.narrative),
    el('div', { class: 'q' }, card.question));

  if (st.decided) {
    const chosen = st.choice === 'A' ? card.optionA : card.optionB;
    dec.appendChild(el('div', { class: 'banner good' }, `✓ You chose: ${chosen.label}`));
    if (st.rationale) dec.appendChild(el('div', { class: 'note' }, '“' + st.rationale + '”'));
  } else {
    const opts = el('div', { class: 'options' });
    opts.appendChild(optionCard('A', card.optionA));
    opts.appendChild(optionCard('B', card.optionB));
    dec.appendChild(opts);
    dec.appendChild(el('label', {}, 'Why? (recorded for the debrief — optional but encouraged)'));
    const ta = el('textarea', { id: 'domRationale', placeholder: 'Your team’s reasoning…' });
    dec.appendChild(ta);
    dec.appendChild(el('p', { class: 'muted small' }, 'Tip: agree on your reasoning before you commit — it cannot be changed.'));
  }
  if (card.discussionPrompt) dec.appendChild(el('div', { class: 'note' }, '💬 ' + card.discussionPrompt));
  p.appendChild(dec);

  function optionCard(letter, opt) {
    return el('div', { class: 'opt ' + letter, onclick: () => {
        const r = document.getElementById('domRationale');
        act('team:decideDomestic', { choice: letter, rationale: r ? r.value : '' }, 'Decision recorded.');
      } },
      el('div', { class: 'lab' }, opt.label),
      el('div', { class: 'fx', html: fxString(opt.effects) }));
  }
}

// ---- International ----
function renderIntl(s) {
  const p = document.getElementById('intlPanel'); clear(p);
  p.appendChild(el('h2', {}, 'International Relations'));

  // Incoming proposals needing my response
  const incoming = (s.proposals || []).filter((x) =>
    x.toTeam === MY_TEAM && (x.status === 'pending' || (!x.requiresConsent && x.status === 'delivered')));
  if (incoming.length) {
    p.appendChild(el('h3', { class: 'small muted' }, 'Awaiting your response'));
    for (const pr of incoming) p.appendChild(incomingCard(pr, s));
  }

  if (s.phase === 'international') {
    p.appendChild(el('div', { class: 'divider' }));
    p.appendChild(el('h3', { class: 'small muted' }, 'Make your move (one per round)'));
    if (s.sentThisRound) {
      p.appendChild(el('div', { class: 'banner info' }, 'You have used your international action this round.'));
    } else {
      p.appendChild(proposeForm(s));
    }
  } else {
    p.appendChild(el('p', { class: 'muted small' }, 'International proposals open during the International phase.'));
  }

  // History of my proposals this round + resolved ones
  const mine = (s.proposals || []).filter((x) => x.fromTeam === MY_TEAM);
  if (mine.length) {
    p.appendChild(el('div', { class: 'divider' }));
    p.appendChild(el('h3', { class: 'small muted' }, 'Your initiated actions'));
    for (const pr of mine.slice(-6).reverse()) p.appendChild(proposalSummary(pr, s));
  }
}

function actionById(id) { return (META.actions || []).find((a) => a.id === id); }

function proposeForm(s) {
  const box = el('div', {});
  const actSel = el('select', { id: 'actSel' });
  for (const a of META.actions) actSel.appendChild(el('option', { value: a.id }, a.label + ' — ' + a.category));
  const tgtSel = el('select', { id: 'tgtSel' });
  for (const t of s.teams) if (t.id !== MY_TEAM)
    tgtSel.appendChild(el('option', { value: t.id }, t.name + ' (' + t.country + ')'));

  const desc = el('div', { class: 'note', id: 'actDesc' });
  function updateDesc() {
    const a = actionById(actSel.value);
    let txt = a.description;
    if (a.covert) txt += '  ⚠ COVERT: resolves immediately and secretly. May be discovered.';
    if (a.multilateral) txt += '  (Sent to all other teams.)';
    desc.innerHTML = txt + (a.discussionPrompt ? `<br><span class="muted">💬 ${a.discussionPrompt}</span>` : '');
    document.getElementById('tgtWrap').style.display = a.multilateral ? 'none' : 'block';
  }
  actSel.addEventListener('change', updateDesc);

  box.appendChild(el('label', {}, 'Action'));
  box.appendChild(actSel);
  const tgtWrap = el('div', { id: 'tgtWrap' }, el('label', {}, 'Target team'), tgtSel);
  box.appendChild(tgtWrap);
  box.appendChild(el('label', {}, 'Note to target / rationale (optional)'));
  box.appendChild(el('textarea', { id: 'propNote', placeholder: 'e.g. “We propose a joint safety standard to avoid a race to the bottom.”' }));
  box.appendChild(desc);
  box.appendChild(el('button', { class: 'btn primary block', style: 'margin-top:10px',
    onclick: async () => {
      const a = actionById(actSel.value);
      const res = await act('team:propose', { actionId: actSel.value,
        toTeam: a.multilateral ? null : tgtSel.value,
        note: document.getElementById('propNote').value }, 'Action submitted.');
      if (res.covertResult) toast(`Covert op: ${res.covertResult.success ? 'succeeded' : 'failed'}` +
        `${res.covertResult.discovered ? ' — DISCOVERED!' : ' (undetected)'}`, res.covertResult.discovered);
    } }, 'Submit Action'));
  setTimeout(updateDesc, 0);
  return box;
}

function incomingCard(pr, s) {
  const a = actionById(pr.actionId);
  const fromName = (s.teams.find((t) => t.id === pr.fromTeam) || {}).name || pr.fromTeam;
  const d = el('div', { class: 'decision', style: 'margin:10px 0' },
    el('h3', {}, `${a.label}`),
    el('div', { class: 'muted small' }, `From ${fromName} · ${pr.category}`),
    el('div', { class: 'ctx', style: 'margin-top:6px' }, a.description),
    pr.note ? el('div', { class: 'note' }, '“' + pr.note + '”') : null);

  const row = el('div', { class: 'btn-row', style: 'margin-top:10px' });
  const ratId = 'rat_' + pr.id;
  if (pr.requiresConsent) {
    row.appendChild(el('button', { class: 'btn good', onclick: () => respond(pr.id, 'accept', ratId) }, 'Accept'));
    row.appendChild(el('button', { class: 'btn bad', onclick: () => respond(pr.id, 'decline', ratId) }, 'Decline'));
  } else {
    row.appendChild(el('button', { class: 'btn', onclick: () => respond(pr.id, 'absorb', ratId) }, 'Accept the outcome'));
    if (a.effects.retaliate)
      row.appendChild(el('button', { class: 'btn bad', onclick: () => respond(pr.id, 'retaliate', ratId) }, 'Retaliate'));
  }
  d.appendChild(el('textarea', { id: ratId, placeholder: 'Your reasoning (optional)…', style: 'margin-top:8px' }));
  d.appendChild(row);
  return d;
}

function respond(id, response, ratId) {
  const r = document.getElementById(ratId);
  act('team:respond', { proposalId: id, response, rationale: r ? r.value : '' }, 'Response sent.');
}

function proposalSummary(pr, s) {
  const toName = (s.teams.find((t) => t.id === pr.toTeam) || {}).name || pr.toTeam || 'all';
  let status = pr.status;
  if (pr.covert) status = `${pr.success ? 'success' : 'failed'}${pr.discovered ? ', exposed' : ''}`;
  return el('div', { class: 'small', style: 'padding:4px 0;border-bottom:1px solid var(--line)' },
    el('b', {}, pr.actionLabel), ` → ${toName} `, el('span', { class: 'tag' }, status));
}

// ---- Others & history ----
function renderOthers(s) {
  const g = document.getElementById('othersGrid'); clear(g);
  for (const t of s.teams) {
    if (t.id === MY_TEAM) continue;
    const sc = s.scores[t.id] || {};
    g.appendChild(el('div', { class: 'teamcard', style: `--c:${t.color}` },
      el('h3', {}, t.name),
      el('div', { class: 'country' }, `${t.country} · ${t.domainName || '—'}`),
      el('div', { class: 'composite' }, String(sc.composite ?? '—')),
      el('div', { class: 'small muted' },
        `Tech ${t.stats.techProgress} · Welfare ${t.stats.publicUtility} · Supply ${t.stats.supplyChain}`)));
  }
}

function renderHistory(you) {
  const b = document.getElementById('historyBody'); clear(b);
  for (const h of [...you.history].reverse()) {
    b.appendChild(el('tr', {},
      el('td', {}, 'R' + h.round),
      el('td', {}, h.title),
      el('td', {}, h.optionLabel || h.choice || ''),
      el('td', { html: fxString(h.effects) }),
      el('td', { class: 'muted' }, h.rationale || '')));
  }
}
