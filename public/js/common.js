/* Shared client helpers for Tech Race screens. */
const socket = io();
let META = null;
let STATE = null;
const _stateHandlers = [];
const _metaHandlers = [];

socket.on('meta', (m) => { META = m; _metaHandlers.forEach((h) => h(m)); });
socket.on('state', (s) => { STATE = s; _stateHandlers.forEach((h) => h(s)); });

function onState(fn) { _stateHandlers.push(fn); if (STATE) fn(STATE); }
function onMeta(fn) { _metaHandlers.push(fn); if (META) fn(META); }

function emit(event, msg) {
  return new Promise((resolve) => socket.emit(event, msg, (res) => resolve(res || {})));
}

function el(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  for (const k in attrs) {
    if (k === 'class') e.className = attrs[k];
    else if (k === 'html') e.innerHTML = attrs[k];
    else if (k.startsWith('on') && typeof attrs[k] === 'function') e.addEventListener(k.slice(2), attrs[k]);
    else if (attrs[k] !== null && attrs[k] !== undefined) e.setAttribute(k, attrs[k]);
  }
  for (const c of children) {
    if (c == null) continue;
    e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return e;
}

function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

let _toastTimer = null;
function toast(msg, isErr) {
  let t = document.querySelector('.toast');
  if (!t) { t = el('div', { class: 'toast' }); document.body.appendChild(t); }
  t.textContent = msg;
  t.className = 'toast show' + (isErr ? ' err' : '');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => { t.className = 'toast'; }, 2600);
}

async function act(event, msg, okMsg) {
  const res = await emit(event, msg);
  if (res.error) toast(res.error, true);
  else if (okMsg) toast(okMsg);
  return res;
}

/* Render the 12 stat bars for a team into a container. */
function renderStats(container, stats, statMeta) {
  clear(container);
  for (const key of Object.keys(statMeta)) {
    const m = statMeta[key];
    const v = stats[key];
    const pct = Math.max(0, Math.min(100, ((v - (m.min)) / (m.max - m.min)) * 100));
    const danger = m.warnLow && v <= m.danger;
    container.appendChild(
      el('div', { class: 'stat' + (danger ? ' danger' : '') },
        el('div', { class: 'row' }, el('span', {}, m.label), el('b', {}, String(v))),
        el('div', { class: 'bar' }, el('div', { class: 'fill', style: `width:${pct}%` }))
      )
    );
  }
}

function fxString(effects) {
  if (!effects) return '';
  const parts = [];
  for (const k of Object.keys(effects)) {
    const v = effects[k];
    const lab = META && META.statMeta[k] ? META.statMeta[k].label : k;
    const cls = v >= 0 ? 'up' : 'down';
    parts.push(`<span class="${cls}">${lab} ${v >= 0 ? '+' : ''}${v}</span>`);
  }
  return parts.join(' · ');
}

function phaseLabel(p) {
  return ({ lobby: 'Lobby', domain: 'Domain Selection', domestic: 'Domestic',
    international: 'International', global: 'Global Event', summary: 'Round Summary',
    debrief: 'Debrief' })[p] || p;
}

/* ---- Host guide modal (shared by admin & projector) ---- */
function hostGuideHtml() {
  return `
  <h2>🎙️ Host / Facilitator Guide</h2>
  <p class="muted">You drive the whole game from the <b>Admin</b> page. The <b>Big Screen</b> (/screen.html) is for
  the room; teams use <b>/team.html</b> with their PIN. Keep Admin + Big Screen open side by side.</p>

  <h3>0 · Before you begin</h3>
  <ul>
    <li>Open <b>/admin.html</b> (PIN <code>STEM_Selene_Admin</code>) and <b>/screen.html</b> on the projector.</li>
    <li>Give each team its PIN: UTokyo <b>JPN</b>, NUS <b>SGN</b>, HKUST <b>HKG</b>, SNU-1 <b>ROK</b>, SNU-2 <b>NK</b>.</li>
  </ul>

  <h3>1 · Setup</h3>
  <ul>
    <li>Teams open /team.html and pick a technology domain — or you press <b>🎲 Auto-assign Domains</b> (great for solo tests).</li>
    <li>Set the number of rounds if you want fewer than 10. Press <b>▶ Start Game</b>.</li>
  </ul>

  <h3>2 · Each round = 4 phases (drive them with “⏭ Advance Phase”)</h3>
  <ol>
    <li><b>Domestic</b> — teams privately decide their policy card. Advance when ready.</li>
    <li><b>International</b> — each team sends ONE action (cooperate / restrict / covert…); targets Accept or Decline.
    Reps come to the front: use <b>📺</b> next to a card to spotlight it on the Big Screen, and type what they say into <b>Notes</b>.</li>
    <li><b>Global</b> — press <b>🌐 Trigger Global</b>. <u>The event appears on the BIG SCREEN</u> (and in the panel on your Admin page). Discuss it, then Advance.</li>
    <li><b>Summary</b> — scores and the cooperation-network graph update on the Big Screen. Let the room read each team’s status.</li>
  </ol>
  <p>Then press <b>⏩ Next Round</b>.</p>

  <h3>3 · Tools any time</h3>
  <ul>
    <li><b>Phase timer</b> (1/2/3/5 min or custom) — shows on every screen; it’s a visual aid only.</li>
    <li><b>Edit any stat</b> from a team’s panel; <b>add Notes</b> for the debrief; <b>Export JSON/CSV</b> for your record.</li>
    <li><b>Pause</b> freezes team input; <b>🏁 End Game</b> jumps straight to the debrief (final ranking + each team’s goal %).</li>
  </ul>

  <h3>4 · Troubleshooting</h3>
  <ul>
    <li><b>“I can’t see the global event.”</b> Global events show on the <b>Big Screen</b> (and the Admin “Current Global Event” panel) — they are not a pop-up on the team screens. Make sure you pressed <b>Trigger Global</b>.</li>
    <li><b>Decisions don’t move the game.</b> The game advances when <i>you</i> press Advance Phase — undecided teams simply take no action that phase.</li>
    <li><b>Reset</b> wipes everything (asks first). On free hosting, export your log occasionally as a backup.</li>
  </ul>`;
}

function openModal(html) {
  closeModal();
  const back = el('div', { class: 'modal-backdrop', onclick: (e) => { if (e.target === back) closeModal(); } });
  const box = el('div', { class: 'modal' });
  box.innerHTML = html;
  const close = el('button', { class: 'btn', style: 'margin-top:16px', onclick: closeModal }, 'Close');
  box.appendChild(close);
  back.appendChild(box);
  document.body.appendChild(back);
}
function closeModal() { const m = document.querySelector('.modal-backdrop'); if (m) m.remove(); }
function wireGuideButton(id) {
  const b = document.getElementById(id);
  if (b) b.addEventListener('click', () => openModal(hostGuideHtml()));
}

/* Render the live "what to do next" guidance into a container. */
function renderGuidance(node, g) {
  if (!node || !g) return;
  clear(node);
  node.appendChild(el('div', { class: 'g-title' }, g.title));
  if (g.body) node.appendChild(el('div', { class: 'g-body' }, g.body));
  if (g.next) node.appendChild(el('div', { class: 'g-next' }, '➡ ' + g.next));
  if (g.tip) node.appendChild(el('div', { class: 'g-tip' }, '💡 ' + g.tip));
}

/* ---- Phase timer (shared countdown) ---- */
const _timerEls = [];
function registerTimerEl(node) { if (node) _timerEls.push(node); }
function tickTimers() {
  const t = STATE && STATE.timer;
  for (const node of _timerEls) {
    if (!t || !t.endsAt) { node.textContent = '⏱ —'; node.className = 'timer-display idle'; continue; }
    const rem = Math.max(0, Math.round((t.endsAt - Date.now()) / 1000));
    const mm = String(Math.floor(rem / 60)).padStart(2, '0');
    const ss = String(rem % 60).padStart(2, '0');
    node.textContent = (rem === 0 ? "⏱ TIME'S UP" : `⏱ ${mm}:${ss}`);
    node.className = 'timer-display' + (rem === 0 ? ' up' : rem <= 10 ? ' low' : '');
  }
}
setInterval(tickTimers, 500);
onState(() => tickTimers());

/* ---- Cooperation-network graph (SVG, circular layout) ---- */
function renderTrustGraph(svg, teams, edges, size) {
  size = size || 360;
  const R = size / 2 - 46, cx = size / 2, cy = size / 2;
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.setAttribute('width', '100%');
  while (svg.firstChild) svg.removeChild(svg.firstChild);
  const SVGNS = 'http://www.w3.org/2000/svg';
  const pos = {};
  teams.forEach((t, i) => {
    const ang = (-Math.PI / 2) + (i * 2 * Math.PI / teams.length);
    pos[t.id] = { x: cx + R * Math.cos(ang), y: cy + R * Math.sin(ang), color: t.color, name: t.name };
  });
  const color = (v) => v >= 62 ? '#36c98a' : v >= 45 ? '#6b7aa8' : '#ef5b6b';
  for (const e of edges) {
    const a = pos[e.a], b = pos[e.b]; if (!a || !b) continue;
    const ln = document.createElementNS(SVGNS, 'line');
    ln.setAttribute('x1', a.x); ln.setAttribute('y1', a.y);
    ln.setAttribute('x2', b.x); ln.setAttribute('y2', b.y);
    ln.setAttribute('stroke', color(e.trust));
    ln.setAttribute('stroke-width', Math.max(1, e.trust / 16));
    ln.setAttribute('stroke-opacity', e.trust >= 45 ? 0.85 : 0.95);
    svg.appendChild(ln);
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const tl = document.createElementNS(SVGNS, 'text');
    tl.setAttribute('x', mx); tl.setAttribute('y', my); tl.setAttribute('fill', color(e.trust));
    tl.setAttribute('font-size', '11'); tl.setAttribute('text-anchor', 'middle');
    tl.textContent = e.trust;
    svg.appendChild(tl);
  }
  for (const t of teams) {
    const p = pos[t.id];
    const c = document.createElementNS(SVGNS, 'circle');
    c.setAttribute('cx', p.x); c.setAttribute('cy', p.y); c.setAttribute('r', 22);
    c.setAttribute('fill', p.color); c.setAttribute('stroke', '#0b1020'); c.setAttribute('stroke-width', '3');
    svg.appendChild(c);
    const tx = document.createElementNS(SVGNS, 'text');
    tx.setAttribute('x', p.x); tx.setAttribute('y', p.y + 38); tx.setAttribute('fill', '#e8edf7');
    tx.setAttribute('font-size', '13'); tx.setAttribute('text-anchor', 'middle'); tx.setAttribute('font-weight', '700');
    tx.textContent = t.name;
    svg.appendChild(tx);
  }
}
