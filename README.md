<div align="center">

<img src="assets/tech-race-logo.png" alt="Tech Race — International Cooperation &amp; Competition" width="340">

# Tech Race: International Cooperation &amp; Competition

### ▶ Play it now — **[minkwon1252.github.io/MoonLander](https://minkwon1252.github.io/MoonLander/)**

*A one-screen technology-policy simulation for the Selene Program*

</div>

---

A **single-screen, local** technology-policy & diplomacy simulation for live conference use, built for the
Selene Program. Four teams of engineering students each lead a national/regional innovation system, making
policy decisions in front of a shared projected screen — no logins, no networking, no cloud.

> The winner is **not** whoever builds fastest. Roadmap progress is balance-gated: if a team lets its other
> stats collapse, the roadmap slows, freezes, or actively regresses — see [Balance & difficulty](#balance--difficulty-roadmap-progress-is-not-automatic)
> below. The final score is half roadmap progress and half national balance. See the in-app
> [**Game Book**](public/gamebook.html) for full rules, the 2-hour schedule, and debrief questions.

**Flow:** Guide screen → *(optional)* guided screen tour → Team goal selection → Main game (8 rounds) → Final debrief.

## Project purpose

This is not a game about countries winning a race — it's a game about the responsibility of engineers in an
age of technological competition. Every policy card forces a real tradeoff between progress, openness, security,
public welfare, and the environment. Every decision is simultaneously political, economic, diplomatic, ethical,
and social. The facilitated debrief is where the learning happens.

## What changed from the original design

The original version required **seven connected devices** (five team screens, one admin screen, one projector
screen) over a real-time backend. That added setup risk for a one-off conference session. This version runs
entirely on **one laptop connected to one big screen** — the projected screen *is* the game board. Team
representatives stand in front of their section, argue their case, and the facilitator clicks the decision.

## Tech stack

- **Plain HTML / CSS / vanilla JavaScript.** No build step, no framework, no CDN, no bundler.
- **All game data lives in the browser tab** (in-memory JS state). Nothing is sent over a network.
- **Optional `localStorage` checkpoint** and **JSON/CSV export** for the decision log.
- Content (teams, domains, 152 policy cards, 38 international/global events, 12 resource conflicts) is data-driven
  in `public/js/data/*.js` — plain JS files, easy to read and edit without any tooling.
- Fully static — works from `file://`, a local server, or **GitHub Pages** (see below).
- Two review spreadsheets (`policy_decisions_catalog.csv`, `international_events_catalog.csv`) are generated
  from that same data — see [Reviewing the content](#reviewing-the-content-csv-catalogs).

## The eight national stats

| Stat | Meaning | Danger below |
|---|---|---|
| 💰 Treasury | Public money available to spend | 20 |
| ⚡ Energy / Compute | Power and computing capacity | 20 |
| 🏛️ Political Support | Political capital to push decisions through | 25 |
| ❤️ Public Welfare | Citizens' wellbeing and trust in the programme | 25 |
| 🔬 R&D Capacity | National *ability to do research* — labs, people, institutions | 20 |
| 🌐 International Reputation | How other nations regard you | 25 |
| 🛡️ Security / Sovereignty | Resilience to espionage, coercion, dependency | 25 |
| 🌱 Environment | Environmental health of the growth path | 25 |

**R&D Capacity is not Roadmap Progress.** R&D Capacity is a *stat* (how much research you can do).
**Roadmap Progress** is a separate 0–100% track (how far your chosen national project has actually got), and it
**starts at 0% for every team** regardless of their starting stats. Each round, R&D Capacity is converted into
roadmap progress — if the rest of the country can support it.

## Balance & difficulty: roadmap progress is not automatic

Each round the roadmap advances by roughly **R&D Capacity ÷ 5**, then the game counts how many of the eight
stats sit below their danger threshold:

| Stats in danger | Status | Effect on roadmap |
|---|---|---|
| 0 | 🟢 Stable | Full advance |
| 1 | 🟡 Strained | Advance **halved** |
| 2 | 🟠 Blocked | Advance is **zero** — the roadmap freezes |
| 3+ | 🔴 Regressing | The roadmap **goes backwards**; completed work is lost |

Two further pressures make fast growth genuinely hard:

- **Development upkeep** — every point of roadmap progress burns treasury and energy, so the faster you build,
  the harder your money and grid are squeezed. This is usually what eventually trips a threshold.
- **Imbalance penalty** — a very wide spread between your best and worst stat costs extra progress even if
  nothing has crossed a threshold yet.

A team must recover its weak stats before development continues. Live status shows as a badge on each panel,
and every round summary names exactly which stats blocked or reversed progress.

## Global Trust

One shared value for the whole room (starts at 60), representing the world's overall willingness to cooperate.
It is a real multiplier, not decoration:

- **High trust** → cooperation bonuses pay up to **1.6×**; global shocks are cushioned to **~0.8×** damage.
- **Low trust** → cooperation shrinks to **~0.4×**; shocks hit at **1.6×** and losing a resource conflict costs
  far more, because nobody helps you recover.

It rises when teams cooperate (in card choices and in resource conflicts) and falls when several teams compete
at once. Early-round behaviour therefore sets how punishing the later rounds are — for everyone.

## One random event per round

The facilitator never picks what happens — clicking **🌐 Reveal Round Event** draws one random entry from a
single pool of 38 global events + 12 resource conflicts. Its type decides the round:

- **⚠️ Shock** — bad news for everyone · **✨ Boost** — a shared opportunity
- **🔀 Mixed** — helps some strategies, hurts others · **⚖️ Condition change** — shifts what's safe going forward
- **⚔️ Resource conflict** — no cards this round; all 4 teams pick compete/cooperate/conserve/diversify, and 2+
  "compete" picks resolve with **Rock-Paper-Scissors on stage** (facilitator enters the winner)

Every event carries a short **"What this means"** guide shown in the banner *before* anyone decides — a
plain-language hint at who is exposed and which strategies just got riskier (e.g. *"Energy Shock — energy-heavy
strategies become riskier this round"*). It never reveals exact numbers.

About a third of the events are **domain-agnostic**: recession, energy shock, public distrust, talent migration,
supply-chain disruption, cyberattack, climate disaster, export-control tension, research fraud, standards
disputes and open science hit every team regardless of the technology they chose — what separates the teams is
how they have been playing, not what they picked.

For the first four types, the event applies to all teams, then each team gets one policy card. The card previews
only its **1–2 most influential stat effects** (not all 2–4) to keep the board readable; the full effect applies
once the choice is confirmed. After a decision, each affected stat bar shows a small `(+3)`/`(−5)` beside it
until that team's next decision.

## Round discussion timer

Each round gives the teams a fixed block of debate time — **10 minutes by default** — shown as a large
countdown in the top bar. It starts automatically when the round event is revealed, and stops when the round
resolves. There is nothing to set up.

| Cue | What happens |
|---|---|
| 2:00 left | countdown turns **amber** |
| 1:00 left | a single soft warning beep |
| 0:30 left | countdown turns **red** and pulses |
| 0:00 | a rising chime plays and a full-width red banner announces **"TIME'S UP — representatives to the stage"**, then counts the overtime |

That banner is the cue for each team's representative to come to the front, explain their reasoning, and swipe.
The board does not force the decision — the room keeps going at its own pace while the overtime ticks up.

**Controls** (facilitator panel → Round Timer, or keyboard): pause/resume (`T`), add a minute (`+`), restart,
**End Now** to cut discussion short, mute, and a **Test Sound** button to check audio before the session. The
duration and mute setting are remembered in the browser.

The chime is synthesised with Web Audio, so there is no audio file to ship or fail to load — but browsers block
sound until the page has seen a click, so **click anywhere once when you open the game** (opening the guide or
revealing the first event is enough) and use **Test Sound** to confirm the hall can hear it.

## How to run it locally

You do not need Node, npm, or a server. Pick whichever is easiest:

**Option A — just open the file (simplest):**

```bash
open public/index.html        # macOS
xdg-open public/index.html    # Linux
```
Or just double-click `public/index.html` in your file browser. Everything (data, engine, UI) is loaded via
plain `<script>` tags, so it works straight from disk.

**Option B — tiny local server (zero dependencies):**

```bash
node server.js
```
Then open the printed `http://localhost:5173` URL. This is only useful if your browser restricts something when
opening pages via `file://`; functionally it's identical to Option A. `npm start` runs the same script.

**Option C — GitHub Pages (already wired up):** this repo includes a GitHub Actions workflow
(`.github/workflows/deploy-pages.yml`) that publishes the `public/` folder to GitHub Pages automatically on every
push to `main`. No backend, database, or build step — it just uploads the static files as-is.

One-time setup (only needed once per repo):
1. On GitHub, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions** (not "Deploy from a branch").
3. Push to `main` (or re-run the workflow from the **Actions** tab). The first run creates the `github-pages`
   environment and deploys the site.
4. Your game will be live at `https://<your-username>.github.io/<repo-name>/`. GitHub shows the exact URL in
   **Settings → Pages** and in the workflow run summary under **Actions**.

After that, every push to `main` redeploys automatically — no manual steps. Share the `github.io` URL, or just
open it on the laptop connected to the projector.

## How to use projector mode

1. Connect your laptop to the room's projector/big screen (mirror or extend — mirror is simplest).
2. Open `public/index.html` full-screen on that display (`F11` in most browsers).
2b. All text is sized for reading from the back of a lecture hall. If it is still too small (or too large) for
   your room, open the facilitator panel (`F`) → **Game Settings** → **A− / A+**. That scales the entire
   interface live and remembers your choice in this browser.
3. That's it — there is no separate "screen" mode to open elsewhere. The one page is simultaneously the game
   board, the facilitator console, and the projected display.

## How to control the game as facilitator

- The **guide screen** opens first — let the room read it (or narrate it) before setup.
- **🔎 Start Screen Guide** on that page runs an 11-step interactive tour of the board: it dims the screen,
  spotlights one element at a time (top bar, event guide, team panels, stats, +3/−2 change indicators, roadmap,
  policy card, left/right choices, effect preview, facilitator controls, round summary) and explains each in
  large type. **Enter** advances; **Next**, **Back** and **Skip Guide** buttons are also on screen, and Escape
  aborts. It runs on a throwaway demo board and restores the real game state exactly when it ends, so it can
  never affect play. Recommended before a first session.
- The **setup screen** lets each team's representative pick a technology direction by clicking it live.
- Each round, click **🌐 Reveal Round Event** — the game randomly picks the event and its type; you do not choose.
- During a card round, click a team's **left/right card option** directly on their panel to resolve their decision
  (the representative should explain their reasoning to the room first).
- **Keyboard shortcuts:** `T` pauses/resumes the discussion timer and `+` adds a minute to it. Press `1`–`4`
  to focus a team, then `←`/`→` to resolve their pending card. `Enter`
  advances the flow (reveal event → apply effects → next round) when the current step is ready. `F` toggles
  the facilitator side panel. `Escape` closes it.
- The **facilitator panel** (`☰ Facilitator` button, top-right, or press `F`) holds everything that shouldn't
  clutter the projected board: manual stat adjustment per team, round-count settings, text size, save/load, and
  log export. It is a non-blocking side panel — gameplay continues while it is open — and closes via its **×**
  button, **Escape** (even while typing in its own fields), or the top-bar toggle.
- **Resource conflicts** (one possible outcome of "Reveal Round Event"): if two or more teams choose to compete
  for the same resource, the board displays **"Rock-Paper-Scissors Required"** — play it live on stage, then
  click the winner in the overlay.

## How to edit cards / events / crises

Everything lives in `public/js/data/`, as plain arrays of JS objects (no build step — edit and reload):

| File | Contents |
|---|---|
| `teams.js` | The 4 teams: identity, flavor text, starting stat modifiers. |
| `domains.js` | The 9 technology directions and their 5-stage roadmap labels. |
| `cards.js` | 152 policy cards. Each has `domain`, `stage`, `title`, `situation`, `question`, `left`/`right` options (`label`, `effects`, optional `stance`), `tags`, `severity`, `discussionPrompt`, `educationalNote`. |
| `events.js` | 38 international/global events (11 of them domain-agnostic), each tagged `type`: `shock`, `boost`, `mixed`, or `condition_change` (`base` effects for all teams, optional `domainEffects` and stat-threshold `modifiers`). |
| `resources.js` | 12 resource conflicts (`type: 'resource_conflict'`) with `compete`/`cooperate`/`conserve`/`diversify` choices. |

`events.js` and `resources.js` are combined into a single pool at runtime — `Engine.revealEvent()` picks one
random, unused entry from both files together each round, so resource conflicts are just one possible event type
rather than a separately triggered system.

**Card `stage` field** — cards are matched to both the team's technology *and* how far its roadmap has got:

| `stage` | Dealt when roadmap is | Count |
|---|---|---|
| `'early'` | 0–39% | 18 (2 per domain) |
| `'mid'` | 40–59% | 18 (2 per domain) |
| `'late'` | 60–100% | 18 (2 per domain) |
| `'any'` | any time (fallback + all `general` cards) | 98 |

To add a card, copy an existing object in `cards.js` and give it a unique `id`. Stat keys you can use in
`effects`: `treasury`, `energy`, `politicalSupport`, `publicWelfare`, `rdCapacity`, `reputation`, `security`,
`environment`. The optional `stance` field (`cooperate` / `open` / `protect` / `secrecy` / `compete`) drives
the simplified international-interaction system described in the Game Book. Use **2–4 affected stats per
option** — the UI automatically previews only the 1–2 most influential ones on the card itself.

## Pre-game slide deck

`Tech_Race_Quick_Guide.pptx` — a 9-slide briefing to run **before** gameplay: why we play, your role, the eight
balances, how a round works, global events, the roadmap, winning, and a closing message. Bright conference
styling, very large type, Selene logo on every slide.

Regenerate it after editing `tools/build_slides.py`:

```bash
python3 tools/build_slides.py     # requires python-pptx
```

## Reviewing the content (CSV catalogs)

Two spreadsheets at the repo root let you review every decision and event without reading any code:

| File | Contents |
|---|---|
| `policy_decisions_catalog.csv` | All 152 policy cards — domain, stage, title, question, both choices, all eight stat effects (as `L+8 / R-4`), educational note. |
| `international_events_catalog.csv` | All 50 events — title, type, description, affected issue, whether Rock-Paper-Scissors is required, all eight stat effects, global-trust effect, the player-facing effect guide, domestic relevance, educational note. |

Both are **generated from the game's own data**, so they can never drift out of sync. After editing anything in
`public/js/data/`, regenerate them with:

```bash
node tools/build-catalogs.js
```

## How to edit teams

Edit `public/js/data/teams.js`. Each team has `id`, `name`, `country`, `identity`, `model`, `color` (used for
that team's panel accent and roadmap color), `advantages`, `constraints`, and `startMods` (stat deltas applied
on top of the default baseline of 50 for every stat).

## How to export logs

Click **⬇ Export JSON** or **⬇ Export CSV** — available any time from the facilitator panel, and again on the
final debrief screen. Exports include every decision (round, team, card, choice, rationale, stat effects,
resulting stats), every international situation, and every resource-crisis resolution, as a downloaded file
(nothing leaves your machine).

## File structure

```
public/
  index.html          # the single game screen (guide → setup → rounds → debrief)
  gamebook.html        # printable rulebook
  .nojekyll             # tells GitHub Pages not to run Jekyll over these files
  css/game.css          # projector-friendly styling
  js/
    data/
      teams.js domains.js cards.js events.js resources.js
    engine.js           # game state machine, round algorithm, interaction effects
    roadmap.js           # SVG roadmap visuals per technology domain
    ui.js                 # DOM rendering + interaction
    export.js              # JSON/CSV export, localStorage save/load
    main.js                  # bootstrap + keyboard shortcuts
server.js              # optional zero-dependency static file server (npm start)
tools/build-catalogs.js  # regenerates the two review CSVs from public/js/data/
tools/build_slides.py    # regenerates the pre-game PPTX deck
Tech_Race_Quick_Guide.pptx        # 9-slide pre-game briefing
policy_decisions_catalog.csv      # all 152 policy decisions, for review
international_events_catalog.csv  # all 39 global events & resource conflicts, for review
.github/workflows/
  deploy-pages.yml     # auto-deploys public/ to GitHub Pages on every push to main
```

## Known limitations

- Designed for **exactly 4 teams** on **one screen**; it is not a multiplayer or remote-participation tool.
- Game state lives only in the browser tab — closing the tab without saving loses progress (use **Save** in the
  facilitator panel, or export the log, before closing).
- Resource-crisis Rock-Paper-Scissors is played physically in the room; the app only records the winner you
  enter, it does not adjudicate RPS itself.
- Stance tagging on card options (used for the cooperation/competition interaction system) is authored per
  card, not universal — some cards are intentionally domestic-only and don't trigger interaction effects.

## Future improvements

- A simple in-browser card/event editor (currently requires editing the JS data files directly).
- Optional projector-only "clean view" that hides the facilitator's rationale-entry affordances.
- Per-team printable summary sheets for post-game reflection.
- Localization of card text for non-English cohorts.
