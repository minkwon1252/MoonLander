'use strict';

/**
 * engine.js — pure game logic for Tech Race.
 * State model uses EIGHT national variables plus a directional trust matrix
 * between teams (trust powers the diplomacy score and the cooperation graph).
 */

// Canonical state variables. Treasury may go negative (debt); others clamp 0..100.
const STAT_META = {
  treasury:         { label: 'Treasury',         min: -100, max: 100, danger: 0,  warnLow: true },
  energy:           { label: 'Energy / Compute', min: 0,   max: 100, danger: 15, warnLow: true },
  politicalSupport: { label: 'Political Support', min: 0,  max: 100, danger: 20, warnLow: true },
  publicUtility:    { label: 'Public Welfare',   min: 0,   max: 100, danger: 20, warnLow: true },
  techProgress:     { label: 'Tech Progress',    min: 0,   max: 100, danger: 0,  warnLow: false },
  environment:      { label: 'Sustainability',   min: 0,   max: 100, danger: 25, warnLow: true },
  talent:           { label: 'Talent Pool',      min: 0,   max: 100, danger: 20, warnLow: true },
  supplyChain:      { label: 'Supply Chain',     min: 0,   max: 100, danger: 20, warnLow: true }
};
const STAT_KEYS = Object.keys(STAT_META);

const BASE_STATS = {
  treasury: 50, energy: 50, politicalSupport: 50, publicUtility: 50,
  techProgress: 20, environment: 50, talent: 50, supplyChain: 50
};

// Light per-round passive flavor tied to each team's governance model.
const PASSIVES = {
  utokyo: { talent: 1 },
  nus:    { talent: 2 },
  hkust:  { treasury: 1, supplyChain: -1 },
  snu1:   { supplyChain: 1 },
  snu2:   { politicalSupport: 1 }
};

function clampStat(key, value) {
  const m = STAT_META[key];
  if (!m) return value;
  return Math.max(m.min, Math.min(m.max, Math.round(value)));
}

function makeInitialStats(startMods = {}) {
  const stats = { ...BASE_STATS };
  for (const k of Object.keys(startMods)) {
    if (stats[k] === undefined) continue;
    stats[k] = stats[k] + startMods[k];
  }
  for (const k of STAT_KEYS) stats[k] = clampStat(k, stats[k]);
  return stats;
}

/**
 * Apply an effects object {statKey: delta} to a stats object in place.
 * Unknown keys are ignored. Returns the per-stat diff actually applied.
 */
function applyEffects(stats, effects) {
  const diff = {};
  if (!effects) return diff;
  for (const k of Object.keys(effects)) {
    if (stats[k] === undefined) continue;
    const before = stats[k];
    stats[k] = clampStat(k, stats[k] + effects[k]);
    if (stats[k] !== before) diff[k] = stats[k] - before;
  }
  return diff;
}

// ---- Trust matrix ------------------------------------------------------------
function trustKey(a, b) { return `${a}->${b}`; }
function getTrust(game, a, b) {
  const v = game.trust[trustKey(a, b)];
  return v === undefined ? 50 : v;
}
function setTrust(game, a, b, value) {
  game.trust[trustKey(a, b)] = Math.max(0, Math.min(100, Math.round(value)));
}
function adjustTrust(game, a, b, delta, bidirectional = true) {
  setTrust(game, a, b, getTrust(game, a, b) + delta);
  if (bidirectional) setTrust(game, b, a, getTrust(game, b, a) + delta);
}

// ---- End-of-round thresholds + passives -------------------------------------
function processRoundEnd(game) {
  const notes = [];
  for (const team of Object.values(game.teams)) {
    if (team.eliminated) continue;
    const s = team.stats;

    const passive = PASSIVES[team.id];
    if (passive) applyEffects(s, passive);

    if (s.publicUtility < STAT_META.publicUtility.danger) {
      applyEffects(s, { politicalSupport: -5 });
      notes.push(`${team.name}: protests over low public welfare (-5 political support).`);
    }
    if (s.treasury < 0) {
      applyEffects(s, { treasury: -3, politicalSupport: -2 });
      notes.push(`${team.name}: debt servicing bites (-3 treasury, -2 political support).`);
    }
    if (s.energy < STAT_META.energy.danger) {
      applyEffects(s, { techProgress: -3 });
      notes.push(`${team.name}: energy shortage stalls research (-3 tech progress).`);
    }
    if (s.environment < STAT_META.environment.danger) {
      applyEffects(s, { publicUtility: -3 });
      notes.push(`${team.name}: environmental damage erodes welfare (-3 public welfare).`);
    }
    if (s.supplyChain < STAT_META.supplyChain.danger) {
      applyEffects(s, { techProgress: -2 });
      notes.push(`${team.name}: fragile supply chains slow progress (-2 tech progress).`);
    }
    if (s.talent < STAT_META.talent.danger) {
      applyEffects(s, { techProgress: -2 });
      notes.push(`${team.name}: talent shortage slows research (-2 tech progress).`);
    }
  }
  return notes;
}

// ---- Global event resolution -------------------------------------------------
function applyGlobalEvent(game, event) {
  const log = [];
  for (const team of Object.values(game.teams)) {
    if (team.eliminated) continue;
    const s = team.stats;
    const totalDiff = {};
    const merge = (d) => { for (const k in d) totalDiff[k] = (totalDiff[k] || 0) + d[k]; };

    if (event.base) merge(applyEffects(s, event.base));
    if (event.domainEffects && team.domain && event.domainEffects[team.domain]) {
      merge(applyEffects(s, event.domainEffects[team.domain]));
    }
    if (Array.isArray(event.modifiers)) {
      for (const mod of event.modifiers) {
        const v = s[mod.stat];
        if (v === undefined) continue;
        const hit = (mod.when === 'statBelow' && v < mod.value) ||
                    (mod.when === 'statAbove' && v > mod.value);
        if (hit) merge(applyEffects(s, mod.effects));
      }
    }
    log.push({ teamId: team.id, teamName: team.name, diff: totalDiff });
  }
  return log;
}

// ---- Scoring -----------------------------------------------------------------
function avg(nums) { return nums.reduce((a, b) => a + b, 0) / nums.length; }
function clamp01(v) { return Math.max(0, Math.min(100, v)); }
function round1(v) { return Math.round(v * 10) / 10; }

function averageTrustFor(game, teamId) {
  const others = Object.keys(game.teams).filter((id) => id !== teamId);
  if (!others.length) return 50;
  return avg(others.map((o) => (getTrust(game, teamId, o) + getTrust(game, o, teamId)) / 2));
}

function domainBestMap(teams) {
  const best = {};
  for (const t of teams) {
    if (!t.domain) continue;
    if (!(t.domain in best) || t.stats.techProgress > best[t.domain]) best[t.domain] = t.stats.techProgress;
  }
  return best;
}

function computeScores(game) {
  const result = {};
  const teams = Object.values(game.teams);
  const domainBest = domainBestMap(teams);

  for (const t of teams) {
    const s = t.stats;
    const rec = t.record || {};
    const isDomainLeader = t.domain && s.techProgress >= domainBest[t.domain] && s.techProgress > 0;
    const trustAvg = averageTrustFor(game, t.id);

    const techLeadership = clamp01(s.techProgress + (isDomainLeader ? 12 : 0));
    const socialStability = avg([s.publicUtility, s.politicalSupport]);
    const diplomacy = clamp01(
      trustAvg + (rec.cooperation || 0) * 3 - (rec.coercion || 0) * 3 - (rec.covertCaught || 0) * 4
    );
    const ethical = clamp01(
      50 +
      (s.environment - 50) * 0.4 +
      (s.publicUtility - 50) * 0.4 -
      (rec.covertCaught || 0) * 8 -
      (rec.coercion || 0) * 3 -
      Math.max(0, s.techProgress - 65) * (socialStability < 40 ? 0.6 : 0.15)
    );
    const resilience = avg([s.supplyChain, s.talent, s.energy]);

    const composite =
      techLeadership * 0.25 +
      socialStability * 0.20 +
      diplomacy * 0.20 +
      ethical * 0.20 +
      resilience * 0.15;

    result[t.id] = {
      techLeadership: round1(techLeadership),
      socialStability: round1(socialStability),
      diplomacy: round1(diplomacy),
      ethical: round1(ethical),
      resilience: round1(resilience),
      composite: round1(composite),
      isDomainLeader
    };
  }
  return result;
}

// ---- Team goals & goal progress ---------------------------------------------
function computeGoal(game, teamId, domains) {
  const t = game.teams[teamId];
  if (!t) return null;
  const s = t.stats;
  const teams = Object.values(game.teams);
  const domainBest = domainBestMap(teams);
  const isLeader = t.domain && s.techProgress >= domainBest[t.domain] && s.techProgress > 0;
  const trustAvg = averageTrustFor(game, teamId);
  const domainName = t.domain && domains[t.domain] ? domains[t.domain].name : 'your technology';

  // Scale a value between a low floor (≈0%) and an aspirational target (≈100%),
  // so a baseline-50 team sits near the middle and must actively improve to win.
  const sc = (val, floor, target) => Math.max(0, Math.min(1, (val - floor) / (target - floor)));
  const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const criteria = [
    { label: `Lead the world in ${domainName}`,
      weight: 0.30,
      met: isLeader || s.techProgress >= 78,
      detail: `Tech ${s.techProgress}${isLeader ? ' · domain leader' : ''}`,
      fraction: isLeader ? 1 : sc(s.techProgress, 20, 78) },
    { label: 'Keep society stable & legitimate',
      weight: 0.25,
      met: s.publicUtility >= 62 && s.politicalSupport >= 58,
      detail: `Welfare ${s.publicUtility}, Support ${s.politicalSupport}`,
      fraction: mean([sc(s.publicUtility, 15, 80), sc(s.politicalSupport, 15, 80)]) },
    { label: 'Develop sustainably',
      weight: 0.15,
      met: s.environment >= 62,
      detail: `Sustainability ${s.environment}`,
      fraction: sc(s.environment, 15, 80) },
    { label: 'Stay resourced & resilient',
      weight: 0.15,
      met: s.treasury >= 25 && s.energy >= 50 && s.supplyChain >= 55 && s.talent >= 55,
      detail: `Treasury ${s.treasury}, Energy ${s.energy}, Supply ${s.supplyChain}, Talent ${s.talent}`,
      fraction: mean([sc(s.treasury, -25, 70), sc(s.energy, 10, 75), sc(s.supplyChain, 15, 78), sc(s.talent, 15, 78)]) },
    { label: 'Be a trusted international partner',
      weight: 0.15,
      met: trustAvg >= 62,
      detail: `Avg trust ${round1(trustAvg)}`,
      fraction: sc(trustAvg, 25, 78) }
  ];
  const percent = round1(criteria.reduce((a, c) => a + c.weight * c.fraction, 0) * 100);
  return {
    statement: `Become the world leader in ${domainName} while keeping your society stable, ` +
      `sustainable, well-resourced and trusted.`,
    percent, criteria
  };
}

function computeGoals(game, domains) {
  const out = {};
  for (const id of Object.keys(game.teams)) out[id] = computeGoal(game, id, domains);
  return out;
}

// Global cooperation health = average pairwise trust.
function globalCooperationIndex(game) {
  const ids = Object.keys(game.teams);
  const pairs = [];
  for (let i = 0; i < ids.length; i++)
    for (let j = i + 1; j < ids.length; j++)
      pairs.push((getTrust(game, ids[i], ids[j]) + getTrust(game, ids[j], ids[i])) / 2);
  return pairs.length ? round1(avg(pairs)) : 50;
}

// Symmetric trust matrix for the cooperation-network graph.
function trustGraph(game) {
  const ids = Object.keys(game.teams);
  const edges = [];
  for (let i = 0; i < ids.length; i++)
    for (let j = i + 1; j < ids.length; j++) {
      const a = ids[i], b = ids[j];
      edges.push({ a, b, trust: Math.round((getTrust(game, a, b) + getTrust(game, b, a)) / 2) });
    }
  return edges;
}

module.exports = {
  STAT_META, STAT_KEYS, BASE_STATS,
  makeInitialStats, applyEffects, clampStat,
  trustKey, getTrust, setTrust, adjustTrust,
  processRoundEnd, applyGlobalEvent,
  computeScores, computeGoals, computeGoal,
  globalCooperationIndex, averageTrustFor, trustGraph
};
