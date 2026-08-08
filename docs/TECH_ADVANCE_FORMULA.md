# How Technology Advance Is Calculated

**Facilitator reference.** Everything here is taken directly from
`public/js/engine.js` → `_applyRoadmapAdvance()`, and every number below was produced by running
the real engine. If someone in the room asks *"so how is the score actually calculated?"*, this is
the answer.

The last section, [Hints to give players](#hints-to-give-players), is written to be read *aloud* —
use it during the game without giving the whole formula away.

---

## 1. The one-line answer

> Each round, your roadmap gains **R&D Capacity ÷ 5** — but only if none of your eight stats is in
> danger. One stat in danger freezes it. Two or more push it backwards.

That is the honest short version and it is usually enough.

---

## 2. The full equation

Run once per team, at the end of every round, **after** all event effects, card effects and
interaction effects have been applied.

### Step 0 — Definitions

```
S       = the eight stats {treasury, energy, politicalSupport, publicWelfare,
                           rdCapacity, reputation, security, environment}
T(k)    = danger threshold of stat k          (see table in §3)
D       = |{ k ∈ S : stat(k) <  T(k)     }|   "danger count"
N       = |{ k ∈ S : stat(k) <  T(k) + 5 }|   "near-miss count" (only used when D = 0)
spread  = max(stat) − min(stat)  over all eight stats
P       = current roadmap progress (0–100)
```

> **Note:** all eight stats have a threshold — **R&D Capacity included**. Letting R&D itself fall
> below 20 both freezes the roadmap *and* shrinks the base rate.

### Step 1 — Base rate

```
A ← rdCapacity / 5
```

### Step 2 — The balance gate (this is the important one)

```
if      D = 1        →  A ← 0                 status = BLOCKED
else if D ≥ 2        →  A ← −(D − 1) × 5      status = REGRESSING
else if D = 0 and N > 0 →  A ← A / 2          status = STRAINED
else                 →  A unchanged           status = STABLE
```

### Step 3 — Imbalance penalty

```
if spread > 45  →  A ← A − 3
```

Applies in **every** status, including REGRESSING (making it worse). It is the one penalty that
can bite while all eight stats are still technically safe.

### Step 4 — Round, then enforce the freeze

```
A ← round(A)                  ← the only rounding; everything above is exact arithmetic
if status = BLOCKED  →  A ← 0 ← so "blocked" means frozen, never negative
```

This ordering matters: a blocked team with a huge spread still moves **0**, not −3.

### Step 5 — Apply

```
P ← clamp(P + A, 0, 100)
```

### Step 6 — Development upkeep (only if A > 0)

```
treasury ← treasury − round(A / 2.0)
energy   ← energy   − round(A / 2.8)
```

Building is not free. This is usually what eventually drags a fast-moving team into the danger
zone in step 2 — the mechanism is self-limiting by design.

### The whole thing as one expression

For the common case (`D = 0`, no near-miss, `spread ≤ 45`):

```
ΔP = round( rdCapacity / 5 )
cost = ( −round(ΔP / 2.0) treasury , −round(ΔP / 2.8) energy )
```

Full form:

```
                ⎧ 0                          if D = 1
ΔP = round(  A  ⎨ −(D−1)×5                   if D ≥ 2      ) − (3 if spread > 45 else 0)
                ⎪ (rdCapacity/5) / 2         if D = 0, N > 0
                ⎩ rdCapacity/5               otherwise
```
…then forced to 0 if the status is BLOCKED.

---

## 3. Reference tables

### Danger thresholds

| Stat | In danger below | Warning shown |
|---|---|---|
| 💰 Treasury | **20** | Fiscal crisis |
| ⚡ Energy / Compute | **20** | Power / compute shortage |
| 🔬 R&D Capacity | **20** | Research capacity collapse |
| 🏛️ Political Support | **25** | Political instability |
| ❤️ Public Welfare | **25** | Social unrest |
| 🌐 International Reputation | **25** | Diplomatically isolated |
| 🛡️ Security / Sovereignty | **25** | Sovereignty at risk |
| 🌱 Environment | **25** | Environmental backlash |

"Near-miss" = within **5** points above the threshold (so 20–24 for a 20-threshold stat,
25–29 for a 25-threshold stat).

### What each status does

| Stats in danger | Badge | Effect on roadmap |
|---|---|---|
| 0, all clear by 5+ | 🟢 **Stable** | Full rate |
| 0, but ≥1 within 5 of a threshold | 🟡 **Strained** | **Halved** |
| 1 | 🟠 **Blocked** | **Frozen at 0** |
| 2 | 🔴 **Regressing** | **−5** |
| 3 | 🔴 **Regressing** | **−10** |
| 4 | 🔴 **Regressing** | **−15** |

### Base rate by R&D Capacity *(verified output)*

| R&D Capacity | Advance / round | Upkeep cost |
|---|---|---|
| 30 | +6 | −3 treasury, −2 energy |
| 40 | +8 | −4 treasury, −3 energy |
| 50 | +10 | −5 treasury, −4 energy |
| 60 | +12 | −6 treasury, −4 energy |
| 70 | +14 | −7 treasury, −5 energy |
| 80 | +16 | −8 treasury, −6 energy |
| 90 | +18 | −9 treasury, −6 energy |

### Roadmap progress → stage and card difficulty

| Progress | Stage shown | Policy cards drawn from |
|---|---|---|
| 0–19% | 1 / 5 | early |
| 20–39% | 2 / 5 | early |
| 40–59% | 3 / 5 | **mid** |
| 60–79% | 4 / 5 | **late** |
| 80–100% | 5 / 5 | **late** |

---

## 4. Worked examples

All figures below are actual engine output.

**A — Healthy team, R&D 60, everything clear**
```
A = 60/5 = 12 ,  D=0 , N=0 , spread 6
→ +12 progress  (40% → 52%)
→ upkeep: −6 treasury, −4 energy
```

**B — Same team, but Public Welfare has slipped to 27** *(threshold 25, so within 5 → near-miss)*
```
A = 12 → halved → 6
→ +6 progress  (40% → 46%)
→ upkeep: −3 treasury, −2 energy
```

**C — Public Welfare falls to 20** *(now genuinely below threshold)*
```
D = 1 → BLOCKED
→ +0 progress  (stays 40%)
→ no upkeep charged
```

**D — Welfare 20 *and* Treasury 15**
```
D = 2 → A = −(2−1)×5 = −5
→ −5 progress  (40% → 35%)
```

**E — Three stats down (Welfare 20, Treasury 15, Energy 15)**
```
D = 3 → A = −(3−1)×5 = −10
→ −10 progress  (40% → 30%)
```

**F — Imbalance alone, nothing in danger** (R&D 60, Treasury 40, Energy 86)
```
A = 12 , D = 0 , spread = 48 > 45 → −3
→ +9 progress
```

**G — Regressing *and* badly unbalanced** (D=2, spread 80)
```
A = −5 , then −3 for spread
→ −8 progress  (40% → 32%)
```

---

## 5. Edge cases worth knowing

- **Blocked never goes negative.** A blocked team with a 75-point spread still moves exactly 0 —
  the freeze is applied *after* the spread penalty.
- **Upkeep is charged on the advance, not on the progress actually gained.** A team at 96% that
  earns +12 is clamped to 100% (gaining only 4) but still pays the full −6 / −4 upkeep. Finishing
  the roadmap is expensive.
- **No upkeep when frozen or regressing.** Upkeep only applies when `A > 0`.
- **Rounding happens once**, at the very end of step 4 — not at each intermediate step. So R&D 61
  strained with a spread penalty is `61/5 = 12.2 → 6.1 → 3.1 → round → 3`.
- **Every stat is clamped to 0–100** and rounded whenever it changes.
- **R&D Capacity is itself gate-able.** Below 20 it is a danger stat *and* the base rate is ≤4.
  This is the one genuine death spiral in the game.

---

## 6. How the final ranking uses this

```
balance = mean of all eight stats
SCORE   = roadmapProgress × 0.5  +  balance × 0.5
```

Example: roadmap 80%, all stats at 50 → `80×0.5 + 50×0.5 = 65`.

Half the score is what you built; half is the state you left the country in. A team that races to
90% on a wrecked country and a team that keeps a perfect country at 20% both score badly.

---

## 7. Hints to give players

Ordered from gentlest to most explicit. Give them out as the room needs them — the discovery is
part of the exercise.

### Round 1–2: nudges (no numbers)
- *"Progress comes from R&D Capacity — but only your country lets it."*
- *"Watch the badge on your panel. Green is not the only state it has."*
- *"Nothing on this board is free. Look at what your last decision cost you."*

### Round 3–4: mechanics (still no formula)
- *"A single stat in the danger zone stops your roadmap completely. Not slows — stops."*
- *"Two stats down and you start losing work you already did."*
- *"Being just barely safe is not safe. Sitting near the line already halves your speed."*
- *"Your R&D Capacity is a stat like any other. It can collapse too — and if it does, you're stuck twice over."*

### Round 5+: full transparency (if they ask, tell them)
- *"You gain R&D ÷ 5 per round. At R&D 60 that's 12 points."*
- *"Every point of progress costs you about half a point of treasury and a third of a point of energy."*
- *"If your best and worst stat are more than 45 apart, you lose 3 more on top."*
- *"Blocked is 0. Regressing is minus 5 for the second danger stat, minus 5 again for each one after."*

### Strategic hints (the useful ones)
- **Repair before you build.** A round spent fixing one stat is worth more than a round of
  blocked progress. Blocked rounds are the single biggest source of lost progress.
- **Aim for a 5-point buffer**, not a 0-point one. The near-miss rule means "just above the line"
  still costs you half your speed.
- **Keep your stats close together.** Two teams with the same average can differ by 3 progress a
  round purely on spread.
- **The faster you build, the harder upkeep bites.** High R&D drains treasury and energy fastest —
  the strongest team is usually the one that trips first.
- **Gamble cards can undo three good rounds in one bad roll.** Bet when you're behind, not when
  you're ahead.

### The line that usually lands
> *"You can't sprint out of a collapsing country. Fix it first — then run."*

---

## 8. Where this lives in the code

| What | Where |
|---|---|
| The formula | `public/js/engine.js` → `_applyRoadmapAdvance()` |
| Thresholds | `public/js/engine.js` → `THRESHOLDS` |
| Danger / near-miss counting | `dangerCount()`, `balanceStatus()` |
| Stage bands | `STAGE_BANDS`, `getRoadmapStage()`, `stageBand()` |
| Final score | `_computeDebrief()` |

If you change any constant in the engine, update this file — the two are meant to agree, and the
worked examples above were generated from the code as it stands.
