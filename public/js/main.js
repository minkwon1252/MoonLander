// Bootstraps the Tech Race single-screen app.
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    UI.init();

    document.getElementById('facilitatorToggle').addEventListener('click', () => UI.toggleFacilitator());

    document.addEventListener('keydown', (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'textarea' || tag === 'input') return; // don't hijack typing

      if (e.key === 'f' || e.key === 'F') { UI.toggleFacilitator(); return; }
      if (e.key === 'Escape') {
        if (UI.facilitatorOpen) UI.toggleFacilitator();
        return;
      }
      if (['1', '2', '3', '4'].includes(e.key)) {
        UI.focusedIndex = parseInt(e.key, 10) - 1;
        UI.render(Engine.state);
        return;
      }
      if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && UI.focusedIndex != null) {
        const teamId = Engine.state.teamOrder[UI.focusedIndex];
        const team = Engine.state.teams[teamId];
        if (Engine.state.phase === 'round' && team.pendingCard && !team.choice) {
          UI.resolve(teamId, e.key === 'ArrowLeft' ? 'left' : 'right');
        } else if ((Engine.state.phase === 'crisis') && !Engine.state.currentCrisis.choices[teamId]) {
          UI.toast('Use the on-screen buttons to pick a resource-crisis strategy.');
        }
      }
      if (e.key === 'Enter') {
        const s = Engine.state;
        if (s.phase === 'guide') Engine.finishGuide();
        else if (s.phase === 'idle-round') Engine.revealEvent();
        else if (s.phase === 'round' && Engine.allTeamsResolved()) Engine.finalizeRound();
        else if (s.phase === 'crisis' && Engine.allCrisisChoicesMade()) Engine.resolveCrisis();
        else if (s.phase === 'summary') Engine.nextRound();
      }
    });

    // Try to restore an autosave from a previous session on this machine, if present.
    // (Facilitator can always choose "New Game" from the debrief or reset from the panel.)
  });
})();
