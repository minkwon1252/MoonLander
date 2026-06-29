/* Projector / public screen. Read-only, controlled by admin reveals. */
registerTimerEl(document.getElementById('timerPill'));

onState((s) => {
  document.getElementById('phasePill').innerHTML =
    `Round <b>${s.round}</b> / ${s.maxRounds} · ${phaseLabel(s.phase)}${s.status === 'paused' ? ' · PAUSED' : ''}`;
  document.getElementById('coopIdx').textContent = s.cooperationIndex;

  renderBoard(s);
  renderGraph(s);
  renderSpotlight(s);
  renderGlobal(s);
  renderSummary(s);
  renderDebrief(s);
});

function renderGraph(s) {
  if (!META || !s.trustGraph) return;
  renderTrustGraph(document.getElementById('trustGraph'), s.teams, s.trustGraph, 380);
}

function renderBoard(s) {
  const b = document.getElementById('board'); clear(b);
  // sort by composite for a subtle ranking feel
  const ranked = [...s.teams].sort((a, x) => (s.scores[x.id]?.composite || 0) - (s.scores[a.id]?.composite || 0));
  ranked.forEach((t, i) => {
    const sc = s.scores[t.id] || {};
    const card = el('div', { class: 'teamcard', style: `--c:${t.color}` });
    card.appendChild(el('div', { class: 'flex between' },
      el('h3', { style: 'margin:0' }, `${i === 0 ? '👑 ' : ''}${t.name}`),
      el('span', { class: 'tag' }, t.domainName || '—')));
    card.appendChild(el('div', { class: 'country' }, t.country + ' · ' + t.identity));
    card.appendChild(el('div', { class: 'composite' }, String(sc.composite ?? '—')));
    // mini stat bars (key 6 of the 8)
    const keys = ['techProgress', 'publicUtility', 'politicalSupport', 'energy', 'environment', 'supplyChain'];
    const mini = el('div', { class: 'stats' });
    for (const k of keys) {
      const m = META.statMeta[k];
      const pct = Math.max(0, Math.min(100, ((t.stats[k] - m.min) / (m.max - m.min)) * 100));
      const danger = m.warnLow && t.stats[k] <= m.danger;
      mini.appendChild(el('div', { class: 'stat' + (danger ? ' danger' : '') },
        el('div', { class: 'row' }, el('span', {}, m.label), el('b', {}, String(t.stats[k]))),
        el('div', { class: 'bar' }, el('div', { class: 'fill', style: `width:${pct}%` }))));
    }
    card.appendChild(mini);
    if (t.decidedDomestic && s.phase === 'domestic')
      card.appendChild(el('div', { class: 'banner good small', style: 'margin-top:8px' }, '✓ domestic decided'));
    else if (s.phase === 'domestic')
      card.appendChild(el('div', { class: 'banner warn small', style: 'margin-top:8px' }, '… deciding'));
    if (t.sentThisRound && s.phase === 'international')
      card.appendChild(el('div', { class: 'banner info small', style: 'margin-top:8px' }, '✈ action sent'));
    b.appendChild(card);
  });
}

function renderSpotlight(s) {
  const box = document.getElementById('spotBox'); clear(box);
  const sp = s.spotlight;
  if (!sp) return;
  if (sp.kind === 'proposal') {
    const p = sp.proposal, a = sp.action;
    const d = el('div', { class: 'card-panel', style: 'margin-bottom:18px;border:1px solid var(--accent)' },
      el('div', { class: 'muted' }, `INTERNATIONAL · ${sp.fromName} → ${sp.toName || 'all'}`),
      el('h2', {}, a.label),
      el('p', {}, a.description),
      p.note ? el('div', { class: 'note' }, '“' + p.note + '”') : null);
    if (a.discussionPrompt) d.appendChild(el('div', { class: 'note' }, '💬 ' + a.discussionPrompt));
    d.appendChild(statusBanner(p));
    if (sp.revealRationale && p.responseRationale)
      d.appendChild(el('div', { class: 'banner info' }, 'Response rationale: “' + p.responseRationale + '”'));
    box.appendChild(d);
  } else if (sp.kind === 'domestic') {
    const c = sp.card, dec = sp.decision;
    const d = el('div', { class: 'card-panel', style: 'margin-bottom:18px;border:1px solid var(--accent)' },
      el('div', { class: 'muted' }, `DOMESTIC · ${sp.teamName}`),
      el('h2', {}, c.title),
      el('p', {}, c.narrative),
      el('div', { class: 'q', style: 'font-size:1.2rem;font-weight:650' }, c.question));
    const opts = el('div', { class: 'options' });
    opts.appendChild(spotOpt('A', c.optionA, dec.decided && dec.choice === 'A'));
    opts.appendChild(spotOpt('B', c.optionB, dec.decided && dec.choice === 'B'));
    d.appendChild(opts);
    if (!dec.decided) d.appendChild(el('div', { class: 'banner warn', style: 'margin-top:12px' }, '⌛ Waiting for decision…'));
    if (dec.decided && sp.revealRationale && dec.rationale)
      d.appendChild(el('div', { class: 'banner info', style: 'margin-top:12px' }, 'Rationale: “' + dec.rationale + '”'));
    if (c.discussionPrompt) d.appendChild(el('div', { class: 'note' }, '💬 ' + c.discussionPrompt));
    box.appendChild(d);
  }
}

function spotOpt(letter, opt, chosen) {
  return el('div', { class: 'opt ' + letter + (chosen ? '' : ''), style: chosen ? 'border-color:var(--good);box-shadow:0 0 0 2px var(--good)' : '' },
    el('div', { class: 'lab' }, (chosen ? '✓ ' : '') + opt.label));
}

function statusBanner(p) {
  const map = { accepted: ['good', '✓ Accepted'], declined: ['bad', '✕ Declined'],
    pending: ['warn', '⌛ Awaiting response'],
    delivered: ['info', 'Delivered'], retaliated: ['bad', '⚔ Retaliated'], absorbed: ['info', 'Absorbed'],
    lapsed: ['muted', 'Lapsed'] };
  const [cls, txt] = map[p.status] || ['info', p.status];
  return el('div', { class: 'banner ' + (cls === 'muted' ? 'info' : cls), style: 'margin-top:12px' }, txt);
}

function renderGlobal(s) {
  const box = document.getElementById('globalBox'); clear(box);
  if (!s.public || !s.public.globalRevealed || !s.globalEvent) return;
  const g = s.globalEvent;
  const d = el('div', { class: 'global-reveal', style: 'margin-bottom:18px' },
    el('div', { class: 'sev' }, el('b', {}, '⚠ GLOBAL EVENT'), `  ·  severity ${g.severity}`),
    el('h2', {}, g.title),
    el('p', {}, g.narrative));
  if (g.discussionPrompt) d.appendChild(el('div', { class: 'note' }, '💬 ' + g.discussionPrompt));
  if (g.educationalNote) d.appendChild(el('div', { class: 'note muted' }, g.educationalNote));
  box.appendChild(d);
}

function renderSummary(s) {
  const box = document.getElementById('summaryBox');
  if (s.phase !== 'summary') { box.style.display = 'none'; return; }
  box.style.display = 'block'; clear(box);
  box.appendChild(el('h2', {}, `Round ${s.round} Summary`));
  const grid = el('div', { class: 'teamgrid' });
  for (const t of s.teams) {
    const sc = s.scores[t.id] || {};
    grid.appendChild(el('div', { class: 'teamcard', style: `--c:${t.color}` },
      el('h3', {}, t.name),
      el('div', { class: 'composite' }, String(sc.composite)),
      el('div', { class: 'small muted' },
        `Tech ${sc.techLeadership} · Stability ${sc.socialStability} · Diplomacy ${sc.diplomacy} · ` +
        `Ethics ${sc.ethical} · Resilience ${sc.resilience}`)));
  }
  box.appendChild(grid);
}

function renderDebrief(s) {
  const box = document.getElementById('debriefBox'); clear(box);
  if (s.phase !== 'debrief') return;
  const ranked = [...s.teams].sort((a, x) => (s.scores[x.id]?.composite || 0) - (s.scores[a.id]?.composite || 0));
  const d = el('div', { class: 'card-panel', style: 'margin-top:18px' });
  d.appendChild(el('h2', {}, '🏁 Final Results & Debrief'));
  const ol = el('div', {});
  ranked.forEach((t, i) => {
    const sc = s.scores[t.id];
    ol.appendChild(el('div', { class: 'flex between', style: 'padding:8px 0;border-bottom:1px solid var(--line)' },
      el('div', {}, el('b', {}, `${i + 1}. ${t.name}`), ' ', el('span', { class: 'muted' }, t.country + ' · ' + (t.domainName || ''))),
      el('div', { class: 'composite' }, String(sc.composite))));
  });
  d.appendChild(ol);

  // Goal achievement — how close each team got to its goal.
  d.appendChild(el('div', { class: 'divider' }));
  d.appendChild(el('h3', {}, 'How close did each team get to its goal?'));
  const goalGrid = el('div', { class: 'grid', style: 'grid-template-columns:1fr 1fr' });
  for (const t of ranked) {
    const g = s.goals && s.goals[t.id];
    const sc = s.scores[t.id];
    const card = el('div', { class: 'card-panel', style: `border-top:4px solid ${t.color};box-shadow:none` });
    card.appendChild(el('div', { class: 'flex between' },
      el('h3', { style: 'margin:0' }, `${t.name} — ${t.country}`),
      el('span', { class: 'composite' }, g ? g.percent + '%' : '—')));
    card.appendChild(el('div', { class: 'muted small' }, t.domainName || ''));
    if (g) {
      card.appendChild(el('div', { class: 'goal-bar' }, el('div', { class: 'fill', style: `width:${g.percent}%` })));
      for (const c of g.criteria)
        card.appendChild(el('div', { class: 'crit' },
          el('span', { class: 'mark ' + (c.met ? 'met' : 'miss') }, c.met ? '✓' : '○'),
          el('span', {}, el('b', {}, c.label), ' ', el('span', { class: 'muted small' }, '— ' + c.detail))));
    }
    card.appendChild(el('div', { class: 'small muted', style: 'margin-top:8px' },
      `Tech ${sc.techLeadership} · Stability ${sc.socialStability} · Diplomacy ${sc.diplomacy} · ` +
      `Ethics ${sc.ethical} · Resilience ${sc.resilience}`));
    goalGrid.appendChild(card);
  }
  d.appendChild(goalGrid);

  d.appendChild(el('div', { class: 'divider' }));
  d.appendChild(el('h3', {}, 'Discussion questions'));
  const qs = [
    'Which policies created fast innovation but hidden social, environmental, or trust costs?',
    'Which teams benefited most from cooperation — and who paid for going it alone?',
    'Did any team buy technological leadership by sacrificing public welfare or the planet?',
    'Did secrecy protect innovation, or did it isolate and weaken the system?',
    'Were you acting as neutral engineers, national strategists, or political actors? When did those roles conflict?',
    'What should future engineers take from this simulation into real careers?'
  ];
  const ul = el('ul', {});
  qs.forEach((q) => ul.appendChild(el('li', {}, q)));
  d.appendChild(ul);
  box.appendChild(d);
}
