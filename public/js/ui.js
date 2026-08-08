// Tech Race — UI rendering & interaction layer. Pure DOM string rendering, re-rendered on every Engine change.
(function () {
  'use strict';

  const DOMAIN_ICON = { ai: '🤖', space: '🚀', semiconductors: '🔬', energy: '⚡', climate: '🌍', quantum: '⚛️', biotech: '🧬', robotics: '🦾', materials: '🧱' };
  const STAT_META = [
    { key: 'treasury', icon: '💰', label: 'Treasury', full: 'Treasury',
      desc: 'Public money available to spend. Everything ambitious costs it.' },
    { key: 'energy', icon: '⚡', label: 'Energy', full: 'Energy / Compute',
      desc: 'Power and computing capacity. Modern research runs on both.' },
    { key: 'politicalSupport', icon: '🏛️', label: 'Politics', full: 'Political Support',
      desc: 'Political capital to push decisions through and survive them.' },
    { key: 'publicWelfare', icon: '❤️', label: 'Welfare', full: 'Public Welfare',
      desc: 'Citizens’ material wellbeing and their trust in the programme.' },
    { key: 'rdCapacity', icon: '🔬', label: 'R&D', full: 'R&D Capacity',
      desc: 'Your national ability to do research — labs, people, institutions. This is what DRIVES roadmap progress each round; it is not the roadmap itself.' },
    { key: 'reputation', icon: '🌐', label: 'Reput.', full: 'International Reputation',
      desc: 'How other nations regard you. Below the danger line, cooperation stops working.' },
    { key: 'security', icon: '🛡️', label: 'Security', full: 'Security / Sovereignty',
      desc: 'Resilience to espionage, coercion and dependency on others.' },
    { key: 'environment', icon: '🌱', label: 'Environ.', full: 'Environment',
      desc: 'Environmental health of your growth path. Cheap now, expensive later.' },
  ];
  const STANCE_LABEL = { cooperate: '🤝 Cooperate', open: '🌐 Openness', protect: '🛡️ Protection', secrecy: '🤫 Secrecy', compete: '⚔️ Competition' };
  const CRISIS_STANCE_ICON = { compete: '⚔️', cooperate: '🤝', conserve: '🌱', diversify: '🔀' };
  const EVENT_TYPE_META = {
    shock: { icon: '⚠️', label: 'Global Shock' },
    boost: { icon: '✨', label: 'Global Boost' },
    mixed: { icon: '🔀', label: 'Mixed Event' },
    condition_change: { icon: '⚖️', label: 'Strategic Condition Change' },
    resource_conflict: { icon: '⚔️', label: 'Resource Conflict' },
  };
  const BALANCE_META = {
    stable: { label: 'Stable', color: '#4ecb71' },
    strained: { label: 'Strained', color: '#ffd166' },
    blocked: { label: 'Blocked', color: '#ff8b6b' },
    regressing: { label: 'Regressing', color: '#ff5c5c' },
  };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function fmtSigned(n) { return (n > 0 ? '+' : '') + n; }
  function statMeta(key) { return STAT_META.find(m => m.key === key); }

  // Pick only the 1-2 most influential stat effects to preview on a still-unresolved card,
  // so the board stays readable. Show one if it clearly dominates, otherwise the top two.
  function pickPreviewEffects(effects) {
    const entries = Object.entries(effects || {}).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
    if (entries.length === 0) return [];
    if (entries.length === 1) return entries;
    const [first, second] = entries;
    if (Math.abs(first[1]) >= Math.abs(second[1]) * 1.6) return [first];
    return [first, second];
  }

  const UI = {
    facilitatorOpen: false,
    fpSelectedTeam: null,
    focusedIndex: null,
    crisisAnnouncementDismissed: null, // resource id that has been dismissed

    init() {
      try {
        const saved = parseFloat(localStorage.getItem('techrace_ui_scale'));
        if (saved) { this.uiScale = saved; document.documentElement.style.setProperty('--ui-scale', saved); }
      } catch (e) { /* ignore */ }
      this.fpSelectedTeam = Engine.state.teamOrder[0];
      Engine.onChange(s => this.render(s));
      this.render(Engine.state);
    },

    toast(msg) {
      const el = document.getElementById('toast');
      el.textContent = msg;
      el.classList.remove('hidden');
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => el.classList.add('hidden'), 2600);
    },

    render(state) {
      this.renderTopbar(state);
      this.renderSituationBanner(state);
      this.renderTeamGrid(state);
      this.renderControlBar(state);
      this.renderGuideOverlay(state);
      this.renderSetupOverlay(state);
      this.renderCrisisOverlay(state);
      this.renderSummaryOverlay(state);
      this.renderDebriefOverlay(state);
      this.renderFacilitatorPanel(state);
    },

    // ---------------- Top bar ----------------
    renderTopbar(state) {
      document.getElementById('roundNum').textContent = state.round || '—';
      document.getElementById('maxRoundNum').textContent = state.maxRounds;
      const phaseNames = { setup: 'Setup', 'idle-round': 'Between Rounds', round: 'Policy Decisions', crisis: 'Resource Crisis', 'crisis-rps': 'Rock-Paper-Scissors', summary: 'Round Summary', debrief: 'Final Debrief' };
      document.getElementById('phaseLabel').textContent = phaseNames[state.phase] || state.phase;
      document.getElementById('trustFill').style.width = state.globalTrust + '%';
      document.getElementById('trustNum').textContent = state.globalTrust;
    },

    // The banner carries the round's event AND its plain-language effect guide, and stays up
    // through resource-conflict rounds too so teams can see the guidance while they choose.
    renderSituationBanner(state) {
      const el = document.getElementById('situationBanner');
      const ev = state.currentSituation
        || ((state.phase === 'crisis' || state.phase === 'crisis-rps') && state.currentCrisis
          ? state.currentCrisis.resource : null);
      const showing = ev && ['round', 'crisis', 'crisis-rps'].includes(state.phase);
      if (!showing) { el.classList.add('hidden'); return; }

      const meta = EVENT_TYPE_META[ev.type] || EVENT_TYPE_META.shock;
      const title = ev.type === 'resource_conflict' ? `${ev.icon || ''} ${ev.resource}` : ev.title;
      el.classList.remove('hidden');
      el.className = 'situation-banner type-' + (ev.type || 'shock');
      el.innerHTML = `<span class="sb-icon">${meta.icon}</span>
        <div class="sb-body">
          <div class="sb-line"><span class="sb-type">${esc(meta.label)}</span><span class="sb-title">${esc(title)}</span></div>
          <div class="sb-text">${esc(ev.situation)}</div>
          ${ev.effectGuide ? `<div class="sb-guide"><b>What this means:</b> ${esc(ev.effectGuide)}</div>` : ''}
        </div>`;
    },

    // ---------------- Team grid ----------------
    renderTeamGrid(state) {
      const grid = document.getElementById('teamGrid');
      grid.innerHTML = state.teamOrder.map((id, i) => this.renderTeamPanel(state, id, i)).join('');
    },

    renderTeamPanel(state, teamId, index) {
      const team = state.teams[teamId];
      const domain = team.domain ? Engine.getDomain(team.domain) : null;
      const focusClass = this.focusedIndex === index ? ' active-focus' : '';
      const stage = team.domain ? Engine.getRoadmapStage(teamId) : 0;
      const warnings = Engine.activeWarnings(teamId);

      const statsHtml = STAT_META.map(m => {
        const v = team.stats[m.key];
        const th = Engine.THRESHOLDS[m.key];
        const danger = th && v < th.value;
        const delta = team.lastStatDeltas ? team.lastStatDeltas[m.key] : 0;
        const deltaHtml = delta ? `<span class="stat-delta ${delta > 0 ? 'pos' : 'neg'}">${fmtSigned(delta)}</span>` : '';
        return `<div class="stat-row" title="${m.label}">
          <span class="stat-icon">${m.icon}</span>
          <span class="stat-label">${m.label}</span>
          <span class="stat-bar"><span class="stat-fill${danger ? ' danger' : ''}" style="width:${v}%"></span></span>
          <span class="stat-num">${v}</span>${deltaHtml}
        </div>`;
      }).join('');

      const warnHtml = warnings.length ? `<div class="tp-warnings">${warnings.map(w => `<span class="warn-badge">⚠ ${esc(w.label)}</span>`).join('')}</div>` : '';
      const balance = Engine.balanceStatus(teamId);
      const balMeta = BALANCE_META[balance];
      const balanceHtml = `<span class="balance-badge" style="--bal-color:${balMeta.color}" title="Roadmap balance status">${balMeta.label}</span>`;

      const roadmapSvg = domain ? Roadmap.render(domain.id, team.roadmapProgress / 100, team.color) : '';
      const rd = team.lastRoadmapDelta;
      const rdHtml = rd ? `<span class="roadmap-delta ${rd > 0 ? 'pos' : 'neg'}">${fmtSigned(rd)}</span>` : '';
      const roadmapHtml = domain ? `
        <div class="tp-roadmap">
          <div class="tp-roadmap-label">${DOMAIN_ICON[domain.id] || ''} ${esc(domain.name)}
            <span class="roadmap-pct">${team.roadmapProgress}%</span>${rdHtml}</div>
          ${roadmapSvg}
          <div class="tp-roadmap-stage">Stage ${stage + 1}/5 · ${esc(domain.stages[stage])}</div>
        </div>` : '';

      const cardZone = this.renderCardZone(state, teamId);

      return `<section class="team-panel${focusClass}" style="--team-color:${team.color}" data-team="${teamId}">
        <div class="tp-header">
          <div class="tp-name-block">
            <span class="tp-name">${esc(team.name)}</span>
            <span class="tp-country">${esc(team.country)}</span>
          </div>
          <div class="tp-domain">${domain ? (DOMAIN_ICON[domain.id] || '🎯') + ' ' + esc(domain.name) : '— no goal —'}</div>
        </div>
        ${domain ? `<div class="tp-balance-row">${balanceHtml}</div>` : ''}
        <div class="tp-stats">${statsHtml}</div>
        ${warnHtml}
        ${roadmapHtml}
        <div class="tp-card-zone">${cardZone}</div>
      </section>`;
    },

    renderCardZone(state, teamId) {
      const team = state.teams[teamId];

      if (state.phase === 'round') {
        if (team.choice) {
          const eff = team.choice.effects || {};
          const badges = Object.entries(eff).map(([k, v]) => {
            const meta = STAT_META.find(m => m.key === k);
            return `<span class="eff-badge ${v >= 0 ? 'pos' : 'neg'}">${meta ? meta.icon : ''} ${fmtSigned(v)}</span>`;
          }).join('');
          return `<div class="pcard-resolved">
            <div class="r-title">${esc(team.pendingCard.title)}</div>
            <div class="r-choice">✅ ${esc(team.choice.label)}${team.choice.stance ? ' · ' + STANCE_LABEL[team.choice.stance] : ''}</div>
            <div class="r-effects">${badges}</div>
            ${team.choice.rationale ? `<div class="rationale-box"><label>Rationale</label><div style="font-size:0.72rem;color:#cdd3ef;">${esc(team.choice.rationale)}</div></div>` : ''}
          </div>`;
        }
        const card = team.pendingCard;
        if (!card) return `<div class="tp-idle">Waiting for next card…</div>`;
        const previewBadges = (effects) => pickPreviewEffects(effects).map(([k, v]) => {
          const m = statMeta(k);
          return `<span class="opt-preview ${v >= 0 ? 'pos' : 'neg'}">${m ? m.icon : ''} ${fmtSigned(v)}</span>`;
        }).join('');
        return `<div class="pcard">
            <div class="pcard-title">${esc(card.title)}</div>
            <div class="pcard-situation">${esc(card.situation)}</div>
            <div class="pcard-question">${esc(card.question)}</div>
          </div>
          <div class="pcard-options">
            <button class="pcard-opt left" onclick="UI.resolve('${teamId}','left')">
              <span class="opt-arrow">◀</span> ${esc(card.left.label)}
              <span class="opt-preview-row">${previewBadges(card.left.effects)}</span>
            </button>
            <button class="pcard-opt right" onclick="UI.resolve('${teamId}','right')">
              ${esc(card.right.label)} <span class="opt-arrow">▶</span>
              <span class="opt-preview-row">${previewBadges(card.right.effects)}</span>
            </button>
          </div>
          <div class="rationale-box">
            <label>Facilitator note — why this choice? (optional)</label>
            <textarea id="rationale-${teamId}" placeholder="Representative's reasoning…"></textarea>
          </div>`;
      }

      if (state.phase === 'crisis' || state.phase === 'crisis-rps') {
        const crisis = state.currentCrisis;
        if (!crisis) return `<div class="tp-idle">—</div>`;
        const chosen = crisis.choices[teamId];
        if (chosen) {
          return `<div class="crisis-waiting">${CRISIS_STANCE_ICON[chosen]} ${esc(crisis.resource.choices[chosen].label)}<br><span style="font-size:0.68rem;color:#8a91ad;font-weight:400;">waiting for other teams…</span></div>`;
        }
        const opts = ['compete', 'cooperate', 'conserve', 'diversify'];
        return `<div class="tp-crisis-choices">${opts.map(o => `<button class="crisis-choice-btn" onclick="UI.crisisChoice('${teamId}','${o}')">${CRISIS_STANCE_ICON[o]} ${esc(crisis.resource.choices[o].label)}</button>`).join('')}</div>`;
      }

      if (state.phase === 'setup') {
        return `<div class="tp-idle">Select a technology direction above to begin.</div>`;
      }
      if (state.phase === 'summary') {
        return `<div class="tp-idle">Round ${state.round} resolved — see summary.</div>`;
      }
      if (state.phase === 'debrief') {
        return `<div class="tp-idle">Game complete — see final debrief.</div>`;
      }
      return `<div class="tp-idle">Ready for round ${state.round + 1}.</div>`;
    },

    resolve(teamId, side) {
      const ta = document.getElementById('rationale-' + teamId);
      Engine.resolveChoice(teamId, side, ta ? ta.value : '');
    },

    crisisChoice(teamId, stance) {
      Engine.setCrisisChoice(teamId, stance);
      if (Engine.allCrisisChoicesMade()) this.toast('All teams have chosen — click "Resolve Crisis" below.');
    },

    // ---------------- Control bar ----------------
    renderControlBar(state) {
      const bar = document.getElementById('controlBar');
      let html = '';
      switch (state.phase) {
        case 'setup':
          html = `<span class="cb-hint">Assign each team's technology direction above, then start the game.</span>`;
          break;
        case 'idle-round':
          html = `<button class="cb-btn primary" onclick="Engine.revealEvent()">🌐 Reveal Round Event</button>
                  <span class="cb-hint">One random event — shock, boost, mixed, condition change, or resource conflict — chosen automatically.</span>`;
          break;
        case 'round': {
          const resolved = state.teamOrder.filter(id => state.teams[id].choice).length;
          if (resolved < 4) {
            html = `<span class="cb-hint">${resolved}/4 teams have decided — click a team's LEFT/RIGHT option above.</span>`;
          } else {
            html = `<button class="cb-btn primary" onclick="Engine.finalizeRound()">▶ Apply Round Effects</button>`;
          }
          break;
        }
        case 'crisis': {
          const chosen = state.teamOrder.filter(id => state.currentCrisis.choices[id]).length;
          if (chosen < 4) {
            html = `<span class="cb-hint">${chosen}/4 teams have chosen a strategy.</span>`;
          } else {
            html = `<button class="cb-btn primary" onclick="Engine.resolveCrisis()">⚔️ Resolve Crisis</button>`;
          }
          break;
        }
        case 'crisis-rps':
          html = `<span class="cb-hint">Play Rock-Paper-Scissors on stage, then enter the winner in the overlay above.</span>`;
          break;
        case 'summary':
          html = state.round >= state.maxRounds
            ? `<button class="cb-btn primary" onclick="Engine.nextRound()">🏁 Finish Game → Final Debrief</button>`
            : `<button class="cb-btn primary" onclick="Engine.nextRound()">Next Round →</button>`;
          break;
        case 'debrief':
          html = `<button class="cb-btn" onclick="Export.json()">⬇ Export JSON</button>
                  <button class="cb-btn" onclick="Export.csv()">⬇ Export CSV</button>
                  <button class="cb-btn warn" onclick="UI.resetGame()">🔄 New Game</button>`;
          break;
      }
      bar.innerHTML = html;
    },

    // ---------------- Guide overlay (shown once, before setup) ----------------
    renderGuideOverlay(state) {
      const el = document.getElementById('guideOverlay');
      if (state.phase !== 'guide') { el.classList.add('hidden'); el.innerHTML = ''; return; }
      el.classList.remove('hidden');
      el.innerHTML = `<div class="overlay-box"><div class="guide-box">
        <div class="guide-title">🌐 Tech Race</div>
        <div class="guide-sub">International Cooperation &amp; Competition — how to play</div>

        <div class="guide-section">
          <h4>Purpose &amp; story</h4>
          <p>Four engineering-led national systems are racing to build the next generation of strategic technology
          — at the same moment the world is negotiating trade rules, weathering shocks, and fighting over scarce
          resources. You lead one of them. Every choice you make is a political, economic, diplomatic, ethical
          and social decision at once — that's the point. The goal isn't just to build technology fastest; it's
          to build it <b>without your own country falling apart underneath you.</b></p>
        </div>

        <div class="guide-section">
          <h4>The four teams</h4>
          <p>${GAME_DATA.teams.map(t => `<b>${esc(t.name)}</b> (${esc(t.country)})`).join(' · ')} — each a real
          national/regional innovation system with its own starting strengths and weaknesses.</p>
        </div>

        <div class="guide-section">
          <h4>The eight national stats (0–100 each)</h4>
          <ul class="guide-stats">
            ${STAT_META.map(m => `<li><b>${m.icon} ${esc(m.full)}</b> — ${esc(m.desc)}
              <span class="guide-th">danger below ${Engine.THRESHOLDS[m.key].value}</span></li>`).join('')}
          </ul>
          <p>Almost every decision trades one of these against another — there is no move that only helps.</p>
        </div>

        <div class="guide-section">
          <h4>R&amp;D Capacity vs Roadmap Progress — not the same thing</h4>
          <p><b>R&amp;D Capacity</b> is one of your eight stats: how much research your country is <i>capable</i>
          of doing. <b>Roadmap Progress</b> is a separate 0–100% track showing how far your chosen national
          project has actually got. Every round, your R&amp;D Capacity is converted into roadmap progress —
          <i>but only if the rest of your country is holding together.</i> Every team's roadmap starts at
          <b>0%</b>, no matter how strong its starting stats are.</p>
        </div>

        <div class="guide-section">
          <h4>Global Trust — why it exists</h4>
          <p>Global Trust (top bar) is the world's overall willingness to cooperate. It is <b>not decoration</b>
          — it multiplies real numbers:</p>
          <ul class="guide-stats">
            <li><b>High trust</b> — cooperation bonuses, joint research and shared standards pay out much more,
              and global crises are cushioned because the world coordinates its response.</li>
            <li><b>Low trust</b> — cooperation rewards shrink toward nothing, global shocks hit noticeably
              harder, and losing a resource conflict costs far more because nobody helps you recover.</li>
          </ul>
          <p>It rises when teams cooperate and falls when several teams compete or fight over resources. Your
          table's collective behaviour in early rounds sets how punishing the later ones are.</p>
        </div>

        <div class="guide-section">
          <h4>Choosing a technology goal</h4>
          <p>Before play begins, each team's representative picks one technology direction to pursue for the
          whole game — AI, Space, Semiconductors, Energy, Climate, Quantum, Biotech, Robotics, or Advanced
          Materials. This shapes which policy cards you receive and what your roadmap looks like. Cards also
          change as you advance: an early-stage semiconductor programme is asked about talent, lithography
          access and cleanroom water; a late-stage one faces export controls, monopoly pricing and yield secrecy.</p>
        </div>

        <div class="guide-section">
          <h4>Policy cards &amp; swiping left/right</h4>
          <p>Each round (most rounds), your team gets one policy card: a real dilemma with two options. The
          card previews only the 1–2 <i>most important</i> effects of each side — the full effect (2–4 stats) is
          applied once you decide. Your representative argues for a side in front of the room; the facilitator
          clicks <b>◀ left</b> or <b>right ▶</b> to lock it in.</p>
        </div>

        <div class="guide-section">
          <h4>International &amp; global events</h4>
          <p>At the start of every round, the game randomly reveals <b>one</b> shared event — nobody chooses
          which kind. It might be a <b>global shock</b> (bad news for everyone), a <b>global boost</b> (an
          opportunity), a <b>mixed event</b> (helps some strategies, hurts others), a <b>strategic condition
          change</b> (shifts what's safe going forward), or a <b>resource conflict</b> (see below). It applies to
          all four teams before that round's cards are dealt.</p>
          <p>Every event comes with a short <b>"What this means"</b> guide in the banner — a plain-language
          hint at who is exposed and which strategies get riskier this round (for example: <i>"Energy-heavy
          strategies become riskier this round"</i>). It never gives you exact numbers, but read it before you
          decide.</p>
        </div>

        <div class="guide-section">
          <h4>Resource conflicts &amp; Rock-Paper-Scissors</h4>
          <p>When the event is a resource conflict (GPUs, oil, rare metals, launch windows, talent...), every
          team picks a stance instead of a card: <b>compete</b>, <b>cooperate</b>, <b>conserve</b>, or
          <b>diversify</b>. If two or more teams compete for the same resource, it's settled live with
          <b>Rock-Paper-Scissors on stage</b> — the facilitator enters the winner, who takes the full reward
          while the losers pay a penalty.</p>
        </div>

        <div class="guide-section">
          <h4>What stops or reverses your roadmap</h4>
          <p>Each round your roadmap advances by roughly <b>R&amp;D Capacity ÷ 5</b> — but only if your country
          can support it. At the end of every round the game counts how many of your eight stats are below their
          danger line:</p>
          <ul class="guide-stats">
            <li><b>0 in danger</b> — full speed ahead.</li>
            <li><b>1 in danger</b> — advance is <b>halved</b>.</li>
            <li><b>2 in danger</b> — advance is <b>zero</b>. The roadmap is frozen until you fix them.</li>
            <li><b>3 or more</b> — the roadmap <b>goes backwards</b>. Work you already did is lost.</li>
          </ul>
          <p>A very lopsided country (huge gap between best and worst stat) loses further progress on top of
          that. You cannot sprint your way out of a collapsing system — you must repair the weak stats first.</p>
          <p><b>Development is not free.</b> Every point of roadmap progress burns treasury and energy as
          upkeep, so the faster you build, the harder your money and your grid are squeezed. That squeeze is
          usually what eventually trips the danger thresholds above.</p>
        </div>

        <div class="guide-section">
          <h4>Final objective</h4>
          <p>After 8 rounds the game ends in a debrief. Your score is <b>half roadmap progress, half national
          balance</b>. Racing ahead on a collapsing country scores badly — and so does a perfectly stable country
          that never built anything. You have to do both.</p>
        </div>

        <div class="setup-actions">
          <button class="cb-btn primary" onclick="Engine.finishGuide()">▶ Continue to Team Setup</button>
        </div>
      </div></div>`;
    },

    // ---------------- Setup overlay ----------------
    renderSetupOverlay(state) {
      const el = document.getElementById('setupOverlay');
      if (state.phase !== 'setup') { el.classList.add('hidden'); el.innerHTML = ''; return; }
      el.classList.remove('hidden');
      const domains = GAME_DATA.domains;
      el.innerHTML = `<div class="overlay-box">
        <div class="setup-title">🌐 Tech Race</div>
        <div class="setup-sub">Each team representative comes forward and selects the technology direction their country will pursue.</div>
        <div class="setup-teams">
          ${state.teamOrder.map(id => {
            const team = state.teams[id];
            return `<div class="setup-team" style="border-color:${team.color}44">
              <h3>${esc(team.name)}</h3>
              <div class="st-country">${esc(team.country)} · ${esc(team.identity)}</div>
              <div class="domain-grid">
                ${domains.map(d => `<button class="domain-btn${team.domain === d.id ? ' selected' : ''}" onclick="UI.selectDomain('${id}','${d.id}')">${DOMAIN_ICON[d.id]} ${esc(d.name)}</button>`).join('')}
              </div>
            </div>`;
          }).join('')}
        </div>
        <div class="setup-actions">
          <button class="cb-btn" onclick="Engine.randomAssignDomains()">🎲 Randomly Assign All</button>
          <button class="cb-btn primary" onclick="UI.startGame()">▶ Start Game</button>
        </div>
      </div>`;
    },

    selectDomain(teamId, domainId) { Engine.assignDomain(teamId, domainId); },
    startGame() {
      if (!Engine.allDomainsAssigned()) { this.toast('Every team needs a technology direction first.'); return; }
      Engine.startGame();
    },

    // ---------------- Crisis overlay ----------------
    renderCrisisOverlay(state) {
      const el = document.getElementById('crisisOverlay');
      if (state.phase === 'crisis' && state.currentCrisis && this.crisisAnnouncementDismissed !== state.currentCrisis.resource.id) {
        const r = state.currentCrisis.resource;
        el.classList.remove('hidden');
        el.innerHTML = `<div class="crisis-box">
          <div class="crisis-icon">${r.icon}</div>
          <div class="crisis-title">Shared Scarce Resource Crisis: ${esc(r.resource)}</div>
          <div class="crisis-situation">${esc(r.situation)}</div>
          ${r.effectGuide ? `<div class="crisis-guide"><b>What this means:</b> ${esc(r.effectGuide)}</div>` : ''}
          <button class="cb-btn primary" onclick="UI.dismissCrisisAnnouncement('${r.id}')">Begin — Collect Team Choices</button>
        </div>`;
        return;
      }
      if (state.phase === 'crisis-rps') {
        const competitors = Engine.competitorsInCrisis();
        el.classList.remove('hidden');
        el.innerHTML = `<div class="crisis-box">
          <div class="crisis-icon">${state.currentCrisis.resource.icon}</div>
          <div class="crisis-title">${esc(state.currentCrisis.resource.resource)}: Multiple Teams Are Competing</div>
          <div class="rps-banner">🪨 📄 ✂️ ROCK–PAPER–SCISSORS REQUIRED, ON STAGE</div>
          <div class="crisis-situation">Play rock-paper-scissors between the competing teams, then click the winner below.</div>
          <div class="rps-competitors">
            ${competitors.map(id => `<button class="rps-winner-btn" style="--team-color:${state.teams[id].color}" onclick="UI.pickRPSWinner('${id}')">${esc(state.teams[id].name)} wins</button>`).join('')}
          </div>
        </div>`;
        return;
      }
      el.classList.add('hidden');
      el.innerHTML = '';
    },

    dismissCrisisAnnouncement(resourceId) { this.crisisAnnouncementDismissed = resourceId; this.render(Engine.state); },
    pickRPSWinner(teamId) { Engine.setRPSWinner(teamId); Engine.resolveCrisis(); },

    // ---------------- Summary overlay ----------------
    renderSummaryOverlay(state) {
      const el = document.getElementById('summaryOverlay');
      if (state.phase !== 'summary' || !state.roundSummary) { el.classList.add('hidden'); el.innerHTML = ''; return; }
      el.classList.remove('hidden');
      const s = state.roundSummary;
      const balHtml = (s.balanceNotes && s.balanceNotes.length) ? `<div class="summary-interactions">
        ${s.balanceNotes.map(n => `<div class="ix-row">${n.status === 'regressing' ? '📉' : n.status === 'blocked' ? '⛔' : n.status === 'unbalanced' ? '⚖️' : '🐢'} ${esc(n.message)}</div>`).join('')}
      </div>` : '';
      const isLast = state.round >= state.maxRounds;
      const contBtn = `<div class="debrief-actions"><button class="cb-btn primary" onclick="UI.closeSummary()">${isLast ? '🏁 Finish Game → Final Debrief' : 'Continue → Round ' + (state.round + 1)}</button></div>`;

      if (s.crisis) {
        el.innerHTML = `<div class="overlay-box"><div class="summary-box">
          <div class="summary-title">${s.crisis.icon} Crisis Resolved: ${esc(s.crisis.resource)}</div>
          <div class="summary-list">
            ${s.choices.map(c => {
              const eff = Object.entries(c.effects || {}).map(([k, v]) => {
                const m = STAT_META.find(mm => mm.key === k);
                return `<span class="eff-badge ${v >= 0 ? 'pos' : 'neg'}">${m ? m.icon : ''} ${fmtSigned(v)}</span>`;
              }).join(' ');
              const won = s.rpsWinner === c.teamId ? ' 🏆' : '';
              return `<div class="summary-item"><b>${esc(c.teamName)}${won}</b> — ${CRISIS_STANCE_ICON[c.stance] || ''} ${esc(c.stance)}<br>${eff}</div>`;
            }).join('')}
          </div>
          ${balHtml}
          ${contBtn}
        </div></div>`;
        return;
      }

      const ixHtml = s.interactionLog.length ? `<div class="summary-interactions">
        ${s.interactionLog.map(ix => `<div class="ix-row">🔗 <b>${esc(ix.rule.replace(/_/g, ' '))}:</b> ${esc(ix.description)}</div>`).join('')}
      </div>` : '';

      const typeMeta = EVENT_TYPE_META[s.situation.type] || EVENT_TYPE_META.shock;
      el.innerHTML = `<div class="overlay-box"><div class="summary-box">
        <div class="summary-title">${typeMeta.icon} Round ${s.round} Summary — ${esc(s.situation.title)}</div>
        <div class="summary-list">
          ${s.choices.map(c => `<div class="summary-item"><b>${esc(c.teamName)}</b> — ${esc(c.cardTitle)}<br>Chose: <i>${esc(c.choice.label)}</i>${c.choice.rationale ? '<br><span style="color:#8a91ad;">"' + esc(c.choice.rationale) + '"</span>' : ''}</div>`).join('')}
        </div>
        ${ixHtml}
        ${balHtml}
        ${contBtn}
      </div></div>`;
    },

    // The summary overlay covers the control bar, so this button must advance the game itself.
    closeSummary() { Engine.nextRound(); },

    // ---------------- Debrief overlay ----------------
    renderDebriefOverlay(state) {
      const el = document.getElementById('debriefOverlay');
      if (state.phase !== 'debrief' || !state.debrief) { el.classList.add('hidden'); el.innerHTML = ''; return; }
      el.classList.remove('hidden');
      const d = state.debrief;
      el.innerHTML = `<div class="overlay-box"><div class="debrief-box">
        <div class="debrief-title">🏁 Final Debrief</div>
        <table class="rank-table">
          <thead><tr><th>#</th><th>Team</th><th>Score</th><th>Roadmap</th><th>Balance</th>${STAT_META.map(m => `<th title="${esc(m.full)}">${m.icon}</th>`).join('')}</tr></thead>
          <tbody>
            ${d.ranking.map((r, i) => `<tr><td class="rk">${i + 1}</td><td>${esc(r.teamName)}</td><td class="rk">${r.score}</td><td>${r.roadmapProgress}% <span style="color:#8a91ad">(stage ${r.roadmapStage}/5)</span></td><td>${r.balance}</td>${STAT_META.map(m => `<td>${r.stats[m.key]}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
        <div class="debrief-badges">
          <div class="debrief-badge"><div class="db-label">Most Cooperative</div><div class="db-value">${d.mostCooperative ? esc(d.mostCooperative.teamName) : '—'}</div></div>
          <div class="debrief-badge"><div class="db-label">Most Aggressive</div><div class="db-value">${d.mostAggressive ? esc(d.mostAggressive.teamName) : '—'}</div></div>
          <div class="debrief-badge"><div class="db-label">Most Resilient</div><div class="db-value">${d.mostResilient ? esc(d.mostResilient.teamName) : '—'}</div></div>
        </div>
        <div class="debrief-section">
          <h4>Biggest Tradeoff</h4>
          <p>${d.biggestTradeoff ? `<b>${esc(d.biggestTradeoff.teamName)}</b> — "${esc(d.biggestTradeoff.cardTitle)}": chose <i>${esc(d.biggestTradeoff.choiceLabel)}</i>` : 'No sharp tradeoffs recorded.'}</p>
        </div>
        <div class="debrief-section">
          <h4>Most Ethically Difficult Decision</h4>
          <p>${d.mostDifficult ? `<b>${esc(d.mostDifficult.teamName)}</b> — "${esc(d.mostDifficult.cardTitle)}": ${esc(d.mostDifficult.discussionPrompt || '')}` : '—'}</p>
        </div>
        <div class="debrief-section">
          <h4>Key Discussion Questions</h4>
          <ul>${d.discussionQuestions.map(q => `<li>${esc(q)}</li>`).join('')}</ul>
        </div>
        <div class="debrief-actions">
          <button class="cb-btn" onclick="Export.json()">⬇ Export JSON</button>
          <button class="cb-btn" onclick="Export.csv()">⬇ Export CSV</button>
          <button class="cb-btn warn" onclick="UI.resetGame()">🔄 New Game</button>
        </div>
      </div></div>`;
    },

    resetGame() {
      if (!confirm('Reset the entire game? This clears all decisions and logs.')) return;
      Engine.reset();
      this.crisisAnnouncementDismissed = null;
      this.fpSelectedTeam = Engine.state.teamOrder[0];
    },

    // ---------------- Facilitator panel ----------------
    toggleFacilitator() {
      this.facilitatorOpen = !this.facilitatorOpen;
      this.render(Engine.state);
    },

    renderFacilitatorPanel(state) {
      const el = document.getElementById('facilitatorPanel');
      el.classList.toggle('hidden', !this.facilitatorOpen);
      if (!this.facilitatorOpen) { el.innerHTML = ''; return; }

      const selected = this.fpSelectedTeam || state.teamOrder[0];
      const team = state.teams[selected];

      const flowButtons = [];
      if (state.phase === 'idle-round') {
        flowButtons.push(`<button class="fp-btn" onclick="Engine.revealEvent()">🌐 Reveal Round Event</button>`);
      }
      if (state.phase === 'round') flowButtons.push(`<button class="fp-btn" onclick="Engine.finalizeRound()">▶ Apply Round Effects</button>`);
      if (state.phase === 'crisis') flowButtons.push(`<button class="fp-btn" onclick="Engine.resolveCrisis()">⚔️ Resolve Crisis</button>`);
      if (state.phase === 'summary') flowButtons.push(`<button class="fp-btn" onclick="Engine.nextRound()">Next Round →</button>`);

      el.innerHTML = `
        <div class="fp-title">☰ Facilitator Controls</div>

        <div class="fp-section">
          <h4>Flow</h4>
          <div class="fp-row">${flowButtons.join('') || '<span class="cb-hint">No flow action pending.</span>'}</div>
        </div>

        <div class="fp-section">
          <h4>Manual Stat Adjustment</h4>
          <div class="fp-team-select">
            ${state.teamOrder.map(id => `<button class="fp-btn" style="${selected === id ? 'border-color:' + state.teams[id].color + ';color:' + state.teams[id].color : ''}" onclick="UI.fpSelectTeam('${id}')">${esc(state.teams[id].name)}</button>`).join('')}
          </div>
          ${STAT_META.map(m => `<div class="fp-stat-adjust">
              <span class="sa-label">${m.icon} ${m.label}</span>
              <b>${team.stats[m.key]}</b>
              <span class="sa-btns">
                <button onclick="Engine.manualAdjustStat('${selected}','${m.key}',-5)">-5</button>
                <button onclick="Engine.manualAdjustStat('${selected}','${m.key}',-1)">-1</button>
                <button onclick="Engine.manualAdjustStat('${selected}','${m.key}',1)">+1</button>
                <button onclick="Engine.manualAdjustStat('${selected}','${m.key}',5)">+5</button>
              </span>
            </div>`).join('')}
        </div>

        <div class="fp-section">
          <h4>Game Settings</h4>
          <div class="fp-row">
            <label class="cb-hint">Rounds: </label>
            <input type="number" min="3" max="12" value="${state.maxRounds}" style="width:50px;background:#1c2033;color:#fff;border:1px solid #343a58;border-radius:6px;" onchange="UI.setMaxRounds(this.value)" />
          </div>
          <div class="fp-row">
            <label class="cb-hint">Text size (for your projector):</label>
            <button class="fp-btn" onclick="UI.adjustScale(-0.05)">A−</button>
            <button class="fp-btn" onclick="UI.adjustScale(0.05)">A+</button>
            <button class="fp-btn" onclick="UI.setScale(1)">Reset</button>
            <span class="cb-hint" id="scaleReadout">${Math.round(this.uiScale * 100)}%</span>
          </div>
        </div>

        <div class="fp-section">
          <h4>Save / Export</h4>
          <div class="fp-row">
            <button class="fp-btn" onclick="Export.saveLocal()">💾 Save</button>
            <button class="fp-btn" onclick="Export.loadLocal()">📂 Load</button>
            <button class="fp-btn" onclick="Export.json()">⬇ JSON</button>
            <button class="fp-btn" onclick="Export.csv()">⬇ CSV</button>
            <button class="fp-btn danger" onclick="UI.resetGame()">🗑 Reset Game</button>
          </div>
        </div>

        <div class="fp-section">
          <h4>Recent Log</h4>
          <div class="fp-log">${state.log.slice(-10).reverse().map(l => `<div>R${l.round} · ${esc(l.type)} · ${esc(l.teamName || l.title || l.resource || '')}</div>`).join('') || '<div>No decisions yet.</div>'}</div>
        </div>
      `;
    },

    fpSelectTeam(id) { this.fpSelectedTeam = id; this.render(Engine.state); },

    // Live text scaling — every size in the sheet is rem-based, so this one variable
    // resizes the whole board to suit the room.
    uiScale: 1,
    setScale(v) {
      this.uiScale = Math.max(0.7, Math.min(1.8, Math.round(v * 100) / 100));
      document.documentElement.style.setProperty('--ui-scale', this.uiScale);
      try { localStorage.setItem('techrace_ui_scale', String(this.uiScale)); } catch (e) { /* ignore */ }
      this.render(Engine.state);
    },
    adjustScale(delta) { this.setScale(this.uiScale + delta); },
    setMaxRounds(v) {
      const n = Math.max(3, Math.min(10, parseInt(v, 10) || 6));
      Engine.state.maxRounds = n;
      Engine._emit();
    },
  };

  window.UI = UI;
})();
