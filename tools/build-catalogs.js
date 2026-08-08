#!/usr/bin/env node
// Regenerates the two review CSVs from the game's own data files.
// Run after editing anything in public/js/data/:   node tools/build-catalogs.js
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'public/js/data');

global.window = global;
['teams', 'domains', 'cards', 'events', 'resources'].forEach(f => require(path.join(DATA, `${f}.js`)));
const D = window.GAME_DATA;

const DOMAIN_NAME = {};
D.domains.forEach(d => { DOMAIN_NAME[d.id] = d.name; });
DOMAIN_NAME.general = 'General (any domain)';

// Column order shared by both files for the eight stats.
const STAT_COLS = [
  ['treasury', 'treasury_effect'],
  ['energy', 'energy_compute_effect'],
  ['politicalSupport', 'political_support_effect'],
  ['publicWelfare', 'public_welfare_effect'],
  ['rdCapacity', 'rd_capacity_effect'],
  ['reputation', 'international_reputation_effect'],
  ['security', 'security_sovereignty_effect'],
  ['environment', 'environment_effect'],
];

function esc(v) {
  if (v === null || v === undefined) return '';
  const s = String(v);
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}
function row(cols) { return cols.map(esc).join(','); }
function signed(n) { return n ? (n > 0 ? '+' + n : String(n)) : ''; }

// One readable cell per stat, combining both options: "L+8 / R-4".
// A gamble option has no flat `effects` — its outcome is two probability branches, so it is
// rendered as "L 55%:+14 / 45%:-12" to keep both possibilities visible in the review sheet.
function optionCell(opt, key, tag) {
  if (opt.gamble) {
    const pct = Math.round(opt.gamble.chance * 100);
    const win = opt.gamble.success[key];
    const lose = opt.gamble.failure[key];
    if (!win && !lose) return '';
    return `${tag} ${pct}%:${signed(win) || '0'} / ${100 - pct}%:${signed(lose) || '0'}`;
  }
  const v = opt.effects[key];
  return v ? `${tag}${signed(v)}` : '';
}
function combinedEffect(left, right, key) {
  const l = optionCell(left, key, 'L');
  const r = optionCell(right, key, 'R');
  if (!l && !r) return '';
  return [l || 'L0', r || 'R0'].join(' / ');
}

// ----------------------------- policy decisions -----------------------------
const STAGE_LABEL = {
  early: 'early (stages 1-2)',
  mid: 'mid (stages 3-4)',
  late: 'late (stage 5)',
  any: 'any stage',
};

const policyHeader = [
  'technology_domain', 'roadmap_stage', 'decision_title', 'core_question',
  'left_choice', 'right_choice', 'decision_type',
  ...STAT_COLS.map(c => c[1]),
  'educational_note',
];

const policyRows = D.cards
  .slice()
  .sort((a, b) => (a.domain === b.domain ? String(a.stage).localeCompare(String(b.stage)) : a.domain.localeCompare(b.domain)))
  .map(c => row([
    DOMAIN_NAME[c.domain] || c.domain,
    STAGE_LABEL[c.stage] || c.stage,
    c.title,
    c.question,
    c.left.label,
    c.right.label,
    (c.left.gamble || c.right.gamble) ? 'GAMBLE (probabilistic outcome)' : 'certain outcome',
    ...STAT_COLS.map(([key]) => combinedEffect(c.left, c.right, key)),
    c.educationalNote || '',
  ]));

fs.writeFileSync(path.join(ROOT, 'policy_decisions_catalog.csv'),
  [policyHeader.join(','), ...policyRows].join('\n') + '\n');

// --------------------------- international events ---------------------------
const eventHeader = [
  'event_title', 'event_type', 'description', 'affected_resource_or_issue',
  'resource_conflict_required',
  ...STAT_COLS.map(c => c[1]),
  'global_trust_effect', 'effect_guide', 'follow_up_domestic_relevance', 'educational_note',
];

// For a normal event: base effects, noting which are domain-conditional.
function eventEffectCell(ev, key) {
  const parts = [];
  if (ev.base && ev.base[key]) parts.push(`all ${signed(ev.base[key])}`);
  Object.entries(ev.domainEffects || {}).forEach(([dom, eff]) => {
    if (eff[key]) parts.push(`${dom} ${signed(eff[key])}`);
  });
  (ev.modifiers || []).forEach(m => {
    if (m.effects && m.effects[key]) {
      const cond = m.when === 'statBelow' ? `if ${m.stat}<${m.value}` : `if ${m.stat}>${m.value}`;
      parts.push(`${cond} ${signed(m.effects[key])}`);
    }
  });
  return parts.join('; ');
}

// For a resource conflict: what each stance does to this stat.
function resourceEffectCell(res, key) {
  const parts = [];
  const c = res.choices;
  const w = c.compete.winEffects[key], l = c.compete.loseEffects[key], s = c.compete.soloEffects[key];
  if (w) parts.push(`compete-win ${signed(w)}`);
  if (l) parts.push(`compete-lose ${signed(l)}`);
  if (s) parts.push(`compete-solo ${signed(s)}`);
  ['cooperate', 'conserve', 'diversify'].forEach(st => {
    if (c[st].effects[key]) parts.push(`${st} ${signed(c[st].effects[key])}`);
  });
  return parts.join('; ');
}

const TRUST_NOTE = {
  shock: 'damage scaled by global trust (low trust = harsher)',
  mixed: 'damage scaled by global trust (low trust = harsher)',
  boost: '—',
  condition_change: '—',
};

const eventRows = [];

D.events.slice().sort((a, b) => a.type.localeCompare(b.type) || a.title.localeCompare(b.title)).forEach(ev => {
  eventRows.push(row([
    ev.title,
    ev.type,
    ev.situation,
    (ev.tags || []).join(' / '),
    'no',
    ...STAT_COLS.map(([key]) => eventEffectCell(ev, key)),
    TRUST_NOTE[ev.type] || '—',
    ev.effectGuide || '',
    Object.keys(ev.domainEffects || {}).length
      ? `hits ${Object.keys(ev.domainEffects).join(', ')} programmes hardest`
      : 'applies evenly to all four teams',
    ev.educationalNote || '',
  ]));
});

D.resources.slice().sort((a, b) => a.title.localeCompare(b.title)).forEach(res => {
  eventRows.push(row([
    res.title,
    'resource_conflict',
    res.situation,
    res.resource,
    'yes — if 2+ teams choose compete, resolve with Rock-Paper-Scissors on stage',
    ...STAT_COLS.map(([key]) => resourceEffectCell(res, key)),
    'compete −3 per competing team; cooperate +3 per cooperating team',
    res.effectGuide || '',
    (res.relevantDomains || []).length
      ? `most relevant to ${res.relevantDomains.join(', ')} programmes`
      : 'relevant to all programmes',
    res.educationalNote || '',
  ]));
});

fs.writeFileSync(path.join(ROOT, 'international_events_catalog.csv'),
  [eventHeader.join(','), ...eventRows].join('\n') + '\n');

console.log(`policy_decisions_catalog.csv      ${policyRows.length} decisions`);
console.log(`international_events_catalog.csv  ${eventRows.length} events (${D.events.length} global + ${D.resources.length} resource conflicts)`);
