# Tech Race: International Cooperation & Competition

A **single-screen, local** technology-policy & diplomacy simulation for live conference use, built for the
Selene Program. Four teams of engineering students each lead a national/regional innovation system, making
policy decisions in front of a shared projected screen — no logins, no networking, no cloud.

> The winner is **not** whoever has the highest tech number. Technology Progress is balance-gated: if a team lets
> other stats collapse, its roadmap slows, blocks, or actively regresses — see [Balance & difficulty](#balance--difficulty-technology-progress-is-not-automatic)
> below. The final ranking is a balanced score across all eight national stats. See the in-app
> [**Game Book**](public/gamebook.html) for full rules, the 2-hour schedule, and debrief questions.

**Flow:** Guide screen → Team goal selection → Main game (5–6 rounds) → Final debrief.

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
- Content (teams, domains, 98 policy cards, 27 international/global events, 12 resource conflicts) is data-driven
  in `public/js/data/*.js` — plain JS files, easy to read and edit without any tooling.
- Fully static — works from `file://`, a local server, or **GitHub Pages** (see below).

## Balance & difficulty: Technology Progress is not automatic

Every round, each team's Technology Progress is checked against the other seven stats:

| Stats in danger | Status | Effect |
|---|---|---|
| 0 | 🟢 Stable | Grows normally |
| 1 | 🟡 Strained | This round's gain is halved |
| 2 | 🟠 Blocked | This round's gain is cancelled entirely |
| 3+ | 🔴 Regressing | Technology Progress actively falls |

An extremely wide spread between a team's best and worst stat costs a further penalty even when Technology
Progress is high. A team's live status shows as a small badge on its panel, and every round summary explains
which stats blocked or reversed anyone's progress. This is what makes "grow fast but stay balanced" the actual
objective instead of just flavor text.

## One random event per round

The facilitator never picks what happens — clicking **🌐 Reveal Round Event** draws one random entry from a
single pool of 27 global events + 12 resource conflicts. Its type decides the round:

- **⚠️ Shock** — bad news for everyone · **✨ Boost** — a shared opportunity
- **🔀 Mixed** — helps some strategies, hurts others · **⚖️ Condition change** — shifts what's safe going forward
- **⚔️ Resource conflict** — no cards this round; all 4 teams pick compete/cooperate/conserve/diversify, and 2+
  "compete" picks resolve with **Rock-Paper-Scissors on stage** (facilitator enters the winner)

For the first four types, the event applies to all teams, then each team gets one policy card. The card previews
only its **1–2 most influential stat effects** (not all 2–4) to keep the board readable; the full effect applies
once the choice is confirmed. After a decision, each affected stat bar shows a small `(+3)`/`(−5)` beside it
until that team's next decision.

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
3. That's it — there is no separate "screen" mode to open elsewhere. The one page is simultaneously the game
   board, the facilitator console, and the projected display.

## How to control the game as facilitator

- The **guide screen** opens first — let the room read it (or narrate it) before setup.
- The **setup screen** lets each team's representative pick a technology direction by clicking it live.
- Each round, click **🌐 Reveal Round Event** — the game randomly picks the event and its type; you do not choose.
- During a card round, click a team's **left/right card option** directly on their panel to resolve their decision
  (the representative should explain their reasoning to the room first).
- **Keyboard shortcuts:** press `1`–`4` to focus a team, then `←`/`→` to resolve their pending card. `Enter`
  advances the flow (reveal event → apply effects → next round) when the current step is ready. `F` toggles
  the facilitator side panel. `Escape` closes it.
- The **facilitator panel** (`☰ Facilitator` button, top-right, or press `F`) holds everything that shouldn't
  clutter the projected board: manual stat adjustment per team, round-count settings, save/load, and log export.
- **Resource conflicts** (one possible outcome of "Reveal Round Event"): if two or more teams choose to compete
  for the same resource, the board displays **"Rock-Paper-Scissors Required"** — play it live on stage, then
  click the winner in the overlay.

## How to edit cards / events / crises

Everything lives in `public/js/data/`, as plain arrays of JS objects (no build step — edit and reload):

| File | Contents |
|---|---|
| `teams.js` | The 4 teams: identity, flavor text, starting stat modifiers. |
| `domains.js` | The 9 technology directions and their 5-stage roadmap labels. |
| `cards.js` | 98 policy cards (56 domain-specific + 42 general). Each has `title`, `situation`, `question`, `left`/`right` options (`label`, `effects`, optional `stance`), `tags`, `severity`, `discussionPrompt`, `educationalNote`. |
| `events.js` | 27 international/global events, each tagged `type`: `shock`, `boost`, `mixed`, or `condition_change` (`base` effects for all teams, optional `domainEffects` and stat-threshold `modifiers`). |
| `resources.js` | 12 resource conflicts (`type: 'resource_conflict'`) with `compete`/`cooperate`/`conserve`/`diversify` choices. |

`events.js` and `resources.js` are combined into a single pool at runtime — `Engine.revealEvent()` picks one
random, unused entry from both files together each round, so resource conflicts are just one possible event type
rather than a separately triggered system.

To add a card, copy an existing object in `cards.js` and give it a unique `id`. Stat keys you can use in
`effects`: `treasury`, `energy`, `politicalSupport`, `publicWelfare`, `techProgress`, `reputation`, `security`,
`sustainability`. The optional `stance` field (`cooperate` / `open` / `protect` / `secrecy` / `compete`) drives
the simplified international-interaction system described in the Game Book. Aim for 2–4 affected stats per
option — the UI automatically previews only the 1–2 most influential ones on the card itself.

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
