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
