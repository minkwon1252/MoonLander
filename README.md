# Tech Race: International Cooperation & Competition

> ### 🌐 Live game: **https://tech-race.onrender.com**
> - **Teams:** https://tech-race.onrender.com/team.html — PINs: UTokyo `JPN` · NUS `SGN` · HKUST `HKG` · SNU-1 `ROK` · SNU-2 `NK`
> - **Facilitator / Admin:** https://tech-race.onrender.com/admin.html — PIN `STEM_Selene_Admin`
> - **Projector / Big screen:** https://tech-race.onrender.com/screen.html
> - **Rule book:** https://tech-race.onrender.com/gamebook.html
>
> _(Free Render instances sleep after ~15 min idle; the first visit may take ~30s to wake up.)_

A serious, Reigns-style **technology-policy & diplomacy simulation** for live conference use.
Five teams of engineering students each lead a national/regional innovation system through an age of
technological competition — making domestic policy, negotiating (and sometimes betraying) one another
internationally, and weathering global shocks. It is a **decision tool and debate generator**, not just a game:
every card forces a real tradeoff, and the facilitated debrief is where the learning happens.

> The winner is **not** whoever has the highest tech number. A system that races ahead while gutting public
> welfare, poisoning its environment, or burning every alliance collapses under its own success.

---

## Educational purpose

The game pushes future engineers to confront questions their careers will actually pose: how to balance
innovation, openness, national security, public welfare, energy and the environment; when to cooperate vs.
compete, protect vs. share; and what happens when technical progress outruns laws and public understanding.
See the in-app **Game Book** (`/gamebook.html`) for the full pedagogical framing, scoring rationale, schedule
and debrief questions.

## Tech stack

- **Backend:** Node.js + Express + Socket.IO — one authoritative game server, real-time sync to all screens.
- **Frontend:** plain HTML/CSS/vanilla JS. **No build step, no framework, no CDN** (the Socket.IO client is served
  locally), so it runs reliably offline on a single laptop during a session.
- **Persistence:** the full game state auto-saves to `data/save/game.json` on every change and reloads on restart.
  Plus downloadable JSON/CSV exports.
- **Data-driven content:** all cards/events live in editable JSON under `server/data/`.

## Requirements

- Node.js **18+** (tested on Node 24).

## Install & run locally

```bash
npm install
npm start
```

You'll see output like:

```
  Tech Race server running:  http://localhost:3000
  Admin PIN: admin   (set ADMIN_PIN env var to change)
  LAN access for other devices: http://192.168.x.x:3000
```

Open the printed **LAN URL** on phones/laptops so every team can join the same session over Wi-Fi.

### Environment variables (all optional)

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `3000` | HTTP/WebSocket port |
| `ADMIN_PIN` | `STEM_Selene_Admin` | Facilitator login PIN |
| `MAX_ROUNDS` | `10` | Default number of rounds (adjustable live, 1–15) |

```bash
ADMIN_PIN=my_secret PORT=8080 MAX_ROUNDS=8 npm start
```

## Screens & access

| Screen | URL | Login |
|--------|-----|-------|
| **Landing / role chooser** | `/` | — |
| **Team console** | `/team.html` | team + team PIN |
| **Facilitator / Admin** | `/admin.html` | admin PIN |
| **Projector / public screen** | `/screen.html` | — (open on the big display) |
| **Game Book (rules)** | `/gamebook.html` | — |

**Admin PIN:** `STEM_Selene_Admin` (override with the `ADMIN_PIN` env var).

**Team PINs** are the `pin` field in `server/data/teams.json`:

| Team | Country | PIN |
|------|---------|-----|
| UTokyo | Japan | `JPN` |
| NUS | Singapore | `SGN` |
| HKUST | Hong Kong | `HKG` |
| SNU-1 | Korea-1 | `ROK` |
| SNU-2 | Korea-2 | `NK` |

## Testing alone (no five logins needed)

You do **not** need five people to start a test. On the **admin screen**:

1. Log in with the admin PIN.
2. Click **🎲 Auto-assign Domains** (gives every team a distinct domain) — or pick each team's domain from the
   dropdown in its panel.
3. Click **▶ Start Game**.

From there you can **Advance Phase**, **Trigger Global**, watch scores/goals/the cooperation graph update, and
**End Game** — all solo. To also test what a *team* sees and clicks, open extra browser tabs at `/team.html` and log
in with the team PINs (`JPN`, `SGN`, `HKG`, `ROK`, `NK`); one laptop can run all five tabs at once.

## Running a session (facilitator flow)

1. Open `/admin.html`, log in, and open `/screen.html` on the projector.
2. Click **Open Domain Selection**. Each team logs into `/team.html` and picks a technology domain.
3. Click **Start Game**. Each round:
   - **Domestic** — teams privately decide their policy card (with a written rationale).
   - **Advance Phase → International** — each team makes one move toward another; targets respond. Use the
     📺 buttons to **spotlight** a card on the projector while a representative explains it; record what they say
     in the **Notes** box.
   - **Advance Phase → Global** — click **Trigger Global** (random or pick one) to reveal a world event dramatically.
   - **Advance Phase → Summary** — threshold penalties resolve and scores update.
   - **Next Round** to continue; after the last round the projector shows the **debrief**.
4. **Phase timers:** start a 1/2/3/5-minute (or custom) countdown for the current phase; it shows on every screen and
   flashes when it hits zero (it's a visual aid — it never force-advances the game).
5. After each round's **Summary**, the projector shows every team's status plus the **cooperation-network graph**
   (mutual trust between teams). Default is **10 rounds**; you can change it live (1–15).
6. **End Game** ends the session immediately and jumps to the debrief — the projector then shows final rankings and
   **how close each team got to its goal** (a per-team checklist with a completion %).
7. **Export JSON / CSV** at any time. **Pause/Resume** and **Reset** are available (Reset/End ask for confirmation).
   You can also **manually edit any team's stats** from the admin team panels.

## Configuring teams

Edit `server/data/teams.json`: each team has a `name`, `country`, `identity`, `model`, `color`, `pin`, advantage/
constraint text, and `startMods` (starting stat offsets from a base of ~50). The five team IDs
(`utokyo, nus, hkust, snu1, snu2`) are referenced by team-specific cards — keep the IDs if you edit in place.

## Modifying / adding cards

All content is JSON in `server/data/`:

- `cards_domestic.json` — domestic policy cards. `domains: ["all"]` applies to every team; `domains: ["ai"]`
  is AI-only; an optional `teams: ["utokyo"]` makes it team-specific. Each option has `effects` mapping any of the
  12 stat keys to deltas.
- `actions_international.json` — international action templates (cooperation / coercion / covert), with consent and
  covert flags, effect blocks, and success/discovery chances.
- `events_global.json` — global events with `base` effects for all, per-`domainEffects`, and conditional
  `modifiers` (`statBelow` / `statAbove`).
- `domains.json` — the ten technology domains.

The **eight** valid stat keys: `treasury, energy, politicalSupport, publicUtility, techProgress, environment,
talent, supplyChain`. (Treasury can go negative into debt; the others clamp 0–100.) After editing, restart the
server. Between teams the engine also tracks a hidden **trust matrix** that powers the diplomacy score and the
cooperation-network graph.

**Content provided out of the box:** 87 domestic cards (domain-specific + 12 generic + 5 per team), 21 international
action templates, 16 global events, 10 domains.

## Exporting logs

- **In-app:** Admin → *Export JSON* / *Export CSV* (also `GET /api/export/json` and `/api/export/csv`).
- The CSV is a flat decision log (timestamp, round, phase, type, team, message, choice, rationale, effects).
- The JSON is the complete game state including every decision, rationale, stat change, proposal, global event and
  admin note. The same state auto-persists to `data/save/game.json`.

## Deploy as a public website (recommended for remote teams)

So that teams, the projector and the admin can all join **without being on the same Wi-Fi**, host the app once and
share its public URL. Everyone then just opens the site and logs in with their PIN. The Socket.IO server and client
are same-origin, so no extra WebSocket config is needed.

### Render (free, one-click — easiest)

1. Push this repo to GitHub (see below).
2. Go to [render.com](https://render.com) → **New +** → **Blueprint** → connect the repo. Render reads the included
   `render.yaml`, runs `npm install`, and starts the app.
3. When it's live you get a URL like `https://tech-race.onrender.com`. Share it:
   - Teams → `…/team.html`, Admin → `…/admin.html`, Projector → `…/screen.html`.
4. Set/confirm `ADMIN_PIN` in the Render dashboard (Environment tab). It defaults to `STEM_Selene_Admin`.

> Render free instances **spin down after ~15 min idle** (the first hit then takes ~30s to wake) and have an
> **ephemeral disk** (the `data/save/game.json` auto-save is wiped on redeploy/restart). For a live 2-hour session
> this is fine — traffic keeps it awake, and you can **Export JSON/CSV** at any time as your durable record. For a
> guaranteed-on instance with a persistent disk, use a paid plan or a small VPS.

### Other hosts

Railway, Fly.io, a VPS, etc. all work the same way: `npm install && npm start`, expose `PORT` (the app already reads
`process.env.PORT`), set `ADMIN_PIN`. A `Procfile` is included for Heroku-style platforms.

### Local-network mode (still supported)

If everyone *is* in one room on one Wi-Fi, you don't need to deploy at all — just `npm start` and share the printed
LAN URL.

## Known limitations

- Auth is lightweight PIN-based (appropriate for a trusted room, **not** hardened for the public internet).
- Single in-memory game session per server process (auto-saved to disk). Run multiple ports for parallel sessions.
- Proposal responses are **Accept / Decline** (no multi-round counter-offer workflow).
- Phase timers are a visual aid; they do not auto-advance the game (deliberate, to keep the facilitator in control).
- On free hosting the auto-save disk is ephemeral — use Export JSON/CSV for a durable record.
- The trust matrix drives the diplomacy score and the network graph but does not yet hard-block low-trust treaties.

## Suggested next improvements

- Counter-offer / renegotiation threads for proposals.
- Hard trust thresholds that can cause treaties to fail.
- Per-domain victory badges and an end-game "cooperation network" graph on the debrief.
- Optional timers per phase to keep live pacing tight.
- Multi-session lobby so one server can host several parallel games.

## Project layout

```
server/
  index.js                  Express + Socket.IO, flow control, persistence, exports
  engine.js                 state variables, effects, thresholds, scoring (pure logic)
  data/
    domains.json            10 technology domains
    teams.json              5 teams + starting modifiers + PINs
    cards_domestic.json     87 domestic policy cards
    actions_international.json  21 international action templates
    events_global.json      16 global events
public/
  index.html                landing / role chooser
  team.html  + js/team.js   team console
  admin.html + js/admin.js  facilitator control room
  screen.html+ js/screen.js projector / public screen
  gamebook.html             full printable rule book
  css/styles.css            shared dashboard styling
  js/common.js              shared socket + render helpers
data/save/game.json         auto-saved game state (git-ignored)
```

## License

MIT.
