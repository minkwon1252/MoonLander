// Export / persistence: JSON + CSV log export, localStorage save/load.
(function () {
  'use strict';

  const SAVE_KEY = 'techrace_save_v1';

  function download(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  function timestamp() {
    const d = new Date();
    return d.toISOString().slice(0, 19).replace(/[:T]/g, '-');
  }

  function csvEscape(v) {
    if (v == null) return '';
    const s = typeof v === 'object' ? JSON.stringify(v) : String(v);
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  }

  const COLUMNS = ['round', 'type', 'team', 'domain', 'title', 'situationOrQuestion', 'choice', 'stance', 'rationale', 'effects', 'resultingStats', 'discussionPrompt'];

  function logToRows(log) {
    return log.map(l => {
      if (l.type === 'card') {
        return { round: l.round, type: 'card', team: l.teamName, domain: l.domain, title: l.cardTitle, situationOrQuestion: l.question, choice: l.choiceLabel, stance: l.stance || '', rationale: l.rationale, effects: l.statEffects, resultingStats: l.resultingStats, discussionPrompt: l.discussionPrompt };
      }
      if (l.type === 'situation') {
        return { round: l.round, type: 'situation', team: 'ALL', domain: '', title: l.title, situationOrQuestion: l.situation, choice: '', stance: '', rationale: '', effects: l.teamEffects, resultingStats: '', discussionPrompt: '' };
      }
      if (l.type === 'resource_crisis') {
        return { round: l.round, type: 'resource_crisis', team: 'ALL', domain: '', title: l.resource, situationOrQuestion: l.situation, choice: JSON.stringify(l.choices), stance: l.rpsWinner ? 'RPS winner: ' + l.rpsWinner : '', rationale: '', effects: l.effectsApplied, resultingStats: '', discussionPrompt: '' };
      }
      return { round: l.round, type: l.type, team: '', domain: '', title: '', situationOrQuestion: '', choice: '', stance: '', rationale: '', effects: '', resultingStats: '', discussionPrompt: '' };
    });
  }

  const Export = {
    json() {
      const payload = {
        exportedAt: new Date().toISOString(),
        maxRounds: Engine.state.maxRounds,
        finalRound: Engine.state.round,
        globalTrust: Engine.state.globalTrust,
        teams: Engine.state.teamOrder.map(id => Engine.state.teams[id]),
        log: Engine.state.log,
        debrief: Engine.state.debrief,
      };
      download(`techrace-log-${timestamp()}.json`, JSON.stringify(payload, null, 2), 'application/json');
      UI.toast('Exported JSON log.');
    },

    csv() {
      const rows = logToRows(Engine.state.log);
      const header = COLUMNS.join(',');
      const body = rows.map(r => COLUMNS.map(c => csvEscape(r[c])).join(',')).join('\n');
      download(`techrace-log-${timestamp()}.csv`, header + '\n' + body, 'text/csv');
      UI.toast('Exported CSV log.');
    },

    saveLocal() {
      try {
        localStorage.setItem(SAVE_KEY, Engine.serialize());
        UI.toast('Game saved to this browser.');
      } catch (e) {
        UI.toast('Save failed: ' + e.message);
      }
    },

    loadLocal() {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) { UI.toast('No saved game found.'); return; }
      try {
        Engine.loadState(JSON.parse(raw));
        UI.toast('Game loaded.');
      } catch (e) {
        UI.toast('Load failed: ' + e.message);
      }
    },
  };

  window.Export = Export;
})();
