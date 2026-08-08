// Bootstraps the Tech Race single-screen app.
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    UI.init();

    document.getElementById('facilitatorToggle').addEventListener('click', () => UI.toggleFacilitator());

    // The tour spotlight is drawn from measured element positions, so it has to be
    // recomputed whenever the layout moves.
    window.addEventListener('resize', () => { if (UI.tourActive) UI.render(Engine.state); });

    document.addEventListener('keydown', (e) => {
      // Escape must ALWAYS close the facilitator panel, even while typing in one of its own
      // fields — otherwise clicking the rounds input traps the panel open.
      if (e.key === 'Escape') {
        if (UI.tourActive) { UI.endTour(); return; }
        if (UI.facilitatorOpen) { UI.closeFacilitator(); e.target.blur && e.target.blur(); }
        return;
      }

      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'textarea' || tag === 'input') return; // don't hijack typing

      if (UI.tourActive) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); UI.tourNext(); }
        return; // the tour owns the keyboard while it runs
      }

      if (e.key === 'f' || e.key === 'F') { UI.toggleFacilitator(); return; }
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
