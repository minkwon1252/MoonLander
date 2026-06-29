/* Facilitator control room logic. */
function cmd(payload, ok) { return act('admin:cmd', payload, ok); }
registerTimerEl(document.getElementById('timerPill'));
registerTimerEl(document.getElementById('timerPill2'));
wireGuideButton('guideBtn');

async function doAdminLogin(pin) {
  const res = await emit('auth', { role: 'admin', pin });
  if (res.error) { toast(res.error, true); return; }
  localStorage.setItem('tr_admin', pin);
  document.getElementById('login').style.display = 'none';
  document.getElementById('dash').style.display = 'block';
}
document.getElementById('loginBtn').addEventListener('click', () =>
  doAdminLogin(document.getElementById('adminPin').value));
document.getElementById('adminPin').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') doAdminLogin(document.getElementById('adminPin').value);
});
socket.on('connect', () => {
  const p = localStorage.getItem('tr_admin'); if (p) doAdminLogin(p);
});

// Flow buttons
document.querySelectorAll('[data-cmd]').forEach((b) =>
  b.addEventListener('click', () => cmd({ cmd: b.dataset.cmd })));
document.getElementById('resetBtn').addEventListener('click', () => {
  if (confirm('Reset the entire game? This clears all decisions and stats.')) cmd({ cmd: 'reset' }, 'Game reset.');
});
document.getElementById('endBtn').addEventListener('click', () => {
  if (confirm('End the game now and go to the debrief / final results?')) cmd({ cmd: 'endGame' }, 'Game ended.');
});
document.querySelectorAll('[data-timer]').forEach((b) =>
  b.addEventListener('click', () => cmd({ cmd: 'startTimer', seconds: +b.dataset.timer }, 'Timer started.')));
document.getElementById('customTimerBtn').addEventListener('click', () => {
  const v = +document.getElementById('customTimer').value;
  if (v) cmd({ cmd: 'startTimer', seconds: v }, 'Timer started.');
});
document.getElementById('clearTimerBtn').addEventListener('click', () => cmd({ cmd: 'clearTimer' }));
document.getElementById('autoDomainBtn').addEventListener('click', async () => {
  if (!STATE || !META) return;
  const domainIds = Object.keys(META.domains);
  const teamIds = STATE.teams.map((t) => t.id);
  for (let i = 0; i < teamIds.length; i++) {
    await emit('admin:cmd', { cmd: 'setDomain', teamId: teamIds[i], domain: domainIds[i % domainIds.length] });
  }
  toast('Domains assigned to all teams. You can Start now.');
});
document.getElementById('globalBtn').addEventListener('click', () =>
  cmd({ cmd: 'triggerGlobal', eventId: document.getElementById('globalSelect').value || null }, 'Global event triggered.'));
document.getElementById('maxRounds').addEventListener('change', (e) =>
  cmd({ cmd: 'setMaxRounds', value: e.target.value }));
document.getElementById('noteBtn').addEventListener('click', () => {
  const t = document.getElementById('noteTeam').value;
  const text = document.getElementById('noteText').value.trim();
  if (!text) return;
  cmd({ cmd: 'note', teamId: t || null, text }, 'Note saved.');
  document.getElementById('noteText').value = '';
});
document.getElementById('spotDomBtn').addEventListener('click', () => {
  setSpot({ kind: 'domestic', teamId: document.getElementById('spotDomesticTeam').value,
    revealRationale: document.getElementById('spotRationale').checked });
});
function setSpot(payload) {
  if (payload.kind !== 'none') payload.revealRationale = document.getElementById('spotRationale').checked;
  cmd({ cmd: 'spotlight', payload });
}

// Meta-driven selects
onMeta((m) => {
  const gs = document.getElementById('globalSelect');
  if (gs.options.length) return;
  gs.appendChild(el('option', { value: '' }, '🎲 Random global event'));
  for (const g of m.globalEvents)
    gs.appendChild(el('option', { value: g.id }, `${g.title} (sev ${g.severity})`));
});

onState((s) => {
  if (s.role !== 'admin') return;
  document.getElementById('phasePill').innerHTML =
    `R<b>${s.round}</b>/${s.maxRounds} · ${phaseLabel(s.phase)} · <b>${s.status}</b>`;
  document.getElementById('coopIdx').textContent = s.cooperationIndex;
  const mr = document.getElementById('maxRounds');
  if (document.activeElement !== mr) mr.value = s.maxRounds;

  renderGuidance(document.getElementById('guidance'), s.guidance);
  renderAdminGlobal(s);
  fillTeamSelects(s);
  renderTeamsAdmin(s);
  renderProposals(s);
  renderNotes(s);
  renderLog(s);
});

function renderAdminGlobal(s) {
  const p = document.getElementById('globalPanel');
  if (!s.globalEvent || !s.public || !s.public.globalRevealed) { p.style.display = 'none'; return; }
  p.style.display = 'block'; clear(p);
  const g = s.globalEvent;
  p.appendChild(el('div', { class: 'sev' }, el('b', {}, '⚠ CURRENT GLOBAL EVENT'), `  · severity ${g.severity}`));
  p.appendChild(el('h2', { style: 'margin:6px 0' }, g.title));
  p.appendChild(el('p', { class: 'muted' }, g.narrative));
  // per-team impact
  if (Array.isArray(g.log)) {
    const grid = el('div', { class: 'stats' });
    for (const row of g.log) {
      const fx = Object.keys(row.diff || {}).length ? fxString(row.diff) : '<span class="muted">no change</span>';
      grid.appendChild(el('div', { class: 'small' }, el('b', {}, row.teamName + ': '),
        el('span', { html: fx })));
    }
    p.appendChild(grid);
  }
  p.appendChild(el('div', { class: 'note' }, '👁 This is also displayed on the Big Screen.'));
}

function fillTeamSelects(s) {
  for (const id of ['noteTeam', 'spotDomesticTeam']) {
    const sel = document.getElementById(id);
    if (sel.options.length) continue;
    if (id === 'noteTeam') sel.appendChild(el('option', { value: '' }, '— general —'));
    for (const t of s.teams) sel.appendChild(el('option', { value: t.id }, t.name));
  }
}

function renderTeamsAdmin(s) {
  const box = document.getElementById('teamsAdmin');
  // Don't clobber an input/select the host is actively editing.
  if (box.contains(document.activeElement)) return;
  clear(box);
  for (const id of Object.keys(s.fullTeams)) {
    const t = s.fullTeams[id];
    const sc = s.scores[id] || {};
    const panel = el('div', { class: 'card-panel', style: `border-top:4px solid ${t.color}` });
    const header = el('div', { class: 'flex between' },
      el('h3', { style: 'margin:0' }, `${t.name} — ${t.country}`));
    if (s.status === 'lobby' || s.status === 'paused') {
      const dsel = el('select', { style: 'width:auto;padding:4px;font-size:.8rem' });
      dsel.appendChild(el('option', { value: '' }, '— pick domain —'));
      for (const did of Object.keys(META.domains))
        dsel.appendChild(el('option', { value: did }, META.domains[did].name));
      dsel.value = t.domain || '';
      dsel.addEventListener('change', () => cmd({ cmd: 'setDomain', teamId: id, domain: dsel.value }));
      header.appendChild(dsel);
    } else {
      header.appendChild(el('span', { class: 'tag' }, t.domain ? META.domains[t.domain].name : 'no domain'));
    }
    panel.appendChild(header);
    panel.appendChild(el('div', { class: 'small muted' },
      `Composite ${sc.composite ?? '—'} · ${t.record.cooperation} coop · ${t.record.coercion} coerce · ` +
      `${t.record.covertCaught} caught`));

    // domestic decision today
    const dt = t.domesticToday;
    if (dt) {
      panel.appendChild(el('div', { class: 'note' },
        dt.decided ? `Domestic: chose ${dt.choice}${dt.rationale ? ' — “' + dt.rationale + '”' : ''}`
                   : 'Domestic: not yet decided'));
    }

    // editable stats (compact)
    const statWrap = el('div', { class: 'stats', style: 'margin-top:8px' });
    for (const k of Object.keys(META.statMeta)) {
      const inp = el('input', { type: 'number', value: t.stats[k], style: 'padding:4px;font-size:.78rem' });
      inp.addEventListener('change', () => cmd({ cmd: 'editStat', teamId: id, key: k, value: inp.value }));
      statWrap.appendChild(el('div', { class: 'stat' },
        el('div', { class: 'row' }, el('span', { class: 'small' }, META.statMeta[k].label)), inp));
    }
    panel.appendChild(statWrap);
    box.appendChild(panel);
  }
}

function renderProposals(s) {
  const b = document.getElementById('propBody'); clear(b);
  const name = (id) => (s.teams.find((t) => t.id === id) || {}).name || id || 'all';
  for (const p of [...s.proposals].reverse()) {
    const spotBtn = el('button', { class: 'btn small',
      onclick: () => cmd({ cmd: 'spotlight', payload: { kind: 'proposal', id: p.id,
        revealRationale: document.getElementById('spotRationale').checked } }) }, '📺');
    let st = p.status;
    if (p.covert) st = `covert:${p.success ? 'ok' : 'fail'}${p.discovered ? '/exposed' : ''}`;
    b.appendChild(el('tr', {},
      el('td', {}, 'R' + p.round),
      el('td', {}, p.actionLabel),
      el('td', {}, `${name(p.fromTeam)}→${name(p.toTeam)}`),
      el('td', {}, st),
      el('td', {}, spotBtn)));
  }
}

function renderNotes(s) {
  const box = document.getElementById('notesList'); clear(box);
  for (const n of [...s.adminNotes].reverse()) {
    const who = n.teamId && s.fullTeams[n.teamId] ? s.fullTeams[n.teamId].name : 'general';
    box.appendChild(el('div', { class: 'small', style: 'padding:6px 0;border-bottom:1px solid var(--line)' },
      el('b', {}, `[R${n.round}] ${who}: `), n.text));
  }
}

function renderLog(s) {
  const b = document.getElementById('logBody'); clear(b);
  for (const l of [...s.log].reverse().slice(0, 120)) {
    b.appendChild(el('tr', {},
      el('td', { class: 'muted' }, 'R' + l.round),
      el('td', { class: 'muted' }, l.type),
      el('td', {}, l.message)));
  }
}
