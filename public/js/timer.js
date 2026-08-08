// Tech Race — per-round discussion timer.
//
// Gives each round a fixed block of team discussion time (10 minutes by default). When it
// expires the board says so loudly and plays a chime, which is the cue for each team's
// representative to come to the stage, explain their reasoning, and swipe.
//
// Two deliberate design constraints:
//   1. This module updates its own DOM nodes directly and NEVER calls UI.render(). A full
//      re-render once per second would destroy whatever the facilitator is typing into a
//      rationale textarea (and its focus).
//   2. The chime is synthesised with Web Audio, so there is no audio file to ship or fail to
//      load. That keeps the game a single self-contained static site that works offline.
(function () {
  'use strict';

  const LS_DURATION = 'techrace_timer_minutes';
  const LS_MUTED = 'techrace_timer_muted';
  const WARN_AT_MS = 60 * 1000;   // single soft warning beep at one minute remaining
  const AMBER_AT_MS = 120 * 1000; // colour shifts for at-a-glance pacing
  const RED_AT_MS = 30 * 1000;

  function readNum(key, fallback) {
    try { const v = parseFloat(localStorage.getItem(key)); return Number.isFinite(v) ? v : fallback; }
    catch (e) { return fallback; }
  }
  function readBool(key, fallback) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : v === 'true'; }
    catch (e) { return fallback; }
  }
  function save(key, value) { try { localStorage.setItem(key, String(value)); } catch (e) { /* ignore */ } }

  function fmt(ms) {
    const total = Math.max(0, Math.round(ms / 1000));
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  const Timer = {
    enabled: true,        // tests flip this off so no interval is left running
    minutes: readNum(LS_DURATION, 10),
    muted: readBool(LS_MUTED, false),

    active: false,        // is a timer currently on the board at all?
    running: false,
    expired: false,
    remainingMs: 0,
    overtimeMs: 0,
    _endsAt: 0,           // wall-clock target, so the countdown cannot drift
    _tick: null,
    _warned: false,
    _startedForRound: null,
    _audioCtx: null,

    // ---------------------------------------------------------------- audio
    // Browsers only allow audio after a user gesture; the facilitator clicking
    // "Reveal Round Event" counts, so we lazily create/resume the context then.
    _ctx() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!this._audioCtx) {
        try { this._audioCtx = new AC(); } catch (e) { return null; }
      }
      if (this._audioCtx.state === 'suspended' && this._audioCtx.resume) {
        this._audioCtx.resume().catch(() => {});
      }
      return this._audioCtx;
    },

    primeAudio() { this._ctx(); },

    _beep(freq, startOffset, duration, peak) {
      const ctx = this._ctx();
      if (!ctx) return;
      const t0 = ctx.currentTime + startOffset;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t0);
      // short attack / smooth decay so it reads as a chime rather than a click
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + duration + 0.05);
    },

    playWarning() {
      if (this.muted) return;
      this._beep(660, 0, 0.35, 0.18);
    },

    // Rising three-note chime then a long tone — audible across a lecture hall.
    playTimeUp() {
      if (this.muted) return;
      [[587.33, 0.0], [739.99, 0.22], [880.0, 0.44]].forEach(([f, t]) => this._beep(f, t, 0.3, 0.3));
      this._beep(880.0, 0.72, 1.1, 0.32);
    },

    testSound() {
      const wasMuted = this.muted;
      this.muted = false;
      this.playTimeUp();
      this.muted = wasMuted;
    },

    // ---------------------------------------------------------------- control
    setMinutes(m) {
      const v = Math.max(1, Math.min(60, Math.round(parseFloat(m) || 10)));
      this.minutes = v;
      save(LS_DURATION, v);
      if (!this.running && !this.expired) this.remainingMs = v * 60000;
      this.render();
    },

    setMuted(muted) {
      this.muted = !!muted;
      save(LS_MUTED, this.muted);
      this.render();
    },
    toggleMuted() { this.setMuted(!this.muted); },

    start(minutes) {
      if (!this.enabled) return;
      const mins = minutes == null ? this.minutes : minutes;
      this.remainingMs = mins * 60000;
      this.overtimeMs = 0;
      this.active = true;
      this.expired = false;
      this._warned = false;
      this._endsAt = Date.now() + this.remainingMs;
      this.running = true;
      this.primeAudio();
      this._startTicking();
      this.render();
    },

    pause() {
      if (!this.running) return;
      this.remainingMs = Math.max(0, this._endsAt - Date.now());
      this.running = false;
      this._stopTicking();
      this.render();
    },

    resume() {
      if (this.running) return;
      if (this.expired) { this.render(); return; }
      this._endsAt = Date.now() + this.remainingMs;
      this.running = true;
      this._startTicking();
      this.render();
    },

    toggle() { this.running ? this.pause() : this.resume(); },

    addMinutes(m) {
      const ms = m * 60000;
      if (this.expired) {
        // pulling time back out of overtime un-expires the round
        this.expired = false;
        this.overtimeMs = 0;
        this.remainingMs = ms;
        this._endsAt = Date.now() + ms;
        this.running = true;
        this._startTicking();
      } else {
        this.remainingMs = Math.max(0, this.remainingMs + ms);
        if (this.running) this._endsAt += ms;
      }
      this.render();
    },

    restart() { this.start(this.minutes); },

    // Facilitator decided the room is ready early — jump straight to the cue.
    endNow() {
      if (this.expired) return;
      this.remainingMs = 0;
      this._endsAt = Date.now();
      this._expire();
    },

    stop() {
      this.active = false;
      this.running = false;
      this.expired = false;
      this.overtimeMs = 0;
      this.remainingMs = this.minutes * 60000;
      this._warned = false;
      this._startedForRound = null;
      this._stopTicking();
      this.render();
    },

    _startTicking() {
      this._stopTicking();
      this._tick = setInterval(() => this._onTick(), 250);
    },
    _stopTicking() {
      if (this._tick) { clearInterval(this._tick); this._tick = null; }
    },

    _onTick() {
      if (!this.running) return;
      const left = this._endsAt - Date.now();

      if (!this.expired) {
        this.remainingMs = Math.max(0, left);
        if (!this._warned && left <= WARN_AT_MS && left > 0) {
          this._warned = true;
          this.playWarning();
        }
        if (left <= 0) { this._expire(); return; }
      } else {
        this.overtimeMs = Math.max(0, Date.now() - this._endsAt);
      }
      this.render();
    },

    _expire() {
      this.expired = true;
      this.remainingMs = 0;
      this.overtimeMs = 0;
      this.running = true;            // keep ticking so overtime counts up
      this._startTicking();
      this.playTimeUp();
      this.render();
    },

    // ---------------------------------------------------------------- sync
    // Called from UI.render(). Starts a fresh timer the first time we see each new
    // decision round, and clears it outside decision phases. Cheap and idempotent.
    syncWithPhase(state) {
      if (!this.enabled) return;
      const decisionPhase = state.phase === 'round' || state.phase === 'crisis' || state.phase === 'crisis-rps';
      if (decisionPhase) {
        if (this._startedForRound !== state.round) {
          this._startedForRound = state.round;
          this.start();
        }
      } else if (this._startedForRound !== null) {
        this.stop();
      }
      this.render();
    },

    // ---------------------------------------------------------------- view
    render() {
      const wrap = document.getElementById('timerStat');
      const display = document.getElementById('timerDisplay');
      const btn = document.getElementById('timerToggle');
      const banner = document.getElementById('timeUpBanner');
      if (!wrap || !display || !banner) return;

      const idle = !this.active;
      banner.classList.toggle('hidden', !this.expired);

      // Build the full class list in one go and assign once — assigning className after a
      // classList.toggle() would silently wipe the toggled class.
      let cls = 'topbar-stat timer-stat';
      if (idle) cls += ' hidden';
      if (this.expired) {
        cls += ' expired';
        display.textContent = '0:00';
        banner.innerHTML =
          `<span class="tu-icon">⏰</span>` +
          `<span class="tu-main">TIME'S UP — representatives to the stage</span>` +
          `<span class="tu-sub">Explain your reasoning, then swipe left or right.</span>` +
          `<span class="tu-over">+${fmt(this.overtimeMs)} over</span>`;
      } else {
        display.textContent = fmt(this.remainingMs);
        if (this.remainingMs <= RED_AT_MS) cls += ' red';
        else if (this.remainingMs <= AMBER_AT_MS) cls += ' amber';
        if (!this.running) cls += ' paused';
      }
      if (this.muted) cls += ' muted';
      wrap.className = cls;
      if (btn) btn.textContent = this.running && !this.expired ? '⏸' : '▶';
    },
  };

  window.Timer = Timer;
})();
