// 152 policy cards (stage-specific + general fallback).
window.GAME_DATA = window.GAME_DATA || {};
window.GAME_DATA.cards = [
  {
    "id": "ai-e1",
    "domain": "ai",
    "stage": "early",
    "title": "The National Data Trust",
    "situation": "Your labs need a decade of citizens’ health and education records to train a national model. Consent was never given for this.",
    "question": "Open public records for model training?",
    "left": {
      "label": "Open the records",
      "effects": {
        "rdCapacity": 8,
        "publicWelfare": -7,
        "reputation": -3
      },
      "stance": null
    },
    "right": {
      "label": "Opt-in only",
      "effects": {
        "publicWelfare": 5,
        "reputation": 3,
        "rdCapacity": -4
      },
      "stance": "open"
    },
    "tags": [
      "privacy",
      "data",
      "consent"
    ],
    "severity": 3,
    "discussionPrompt": "Can consent be meaningful when the data was collected for something else entirely?",
    "educationalNote": "Model performance scales with data, which puts constant pressure on privacy norms."
  },
  {
    "id": "ai-e2",
    "domain": "ai",
    "stage": "early",
    "title": "Compute at What Cost",
    "situation": "The fastest route to a national compute cluster runs on cheap coal power. The clean option costs double and takes two more years.",
    "question": "Build the cluster on dirty power?",
    "left": {
      "label": "Build it fast",
      "effects": {
        "energy": 8,
        "rdCapacity": 5,
        "environment": -8
      },
      "stance": null
    },
    "right": {
      "label": "Wait for clean power",
      "effects": {
        "environment": 5,
        "treasury": -6,
        "rdCapacity": -3
      },
      "stance": null
    },
    "tags": [
      "energy",
      "environment",
      "compute"
    ],
    "severity": 2,
    "discussionPrompt": "Is it defensible to pollute now to build the tools that might fix pollution later?",
    "educationalNote": "AI infrastructure decisions are increasingly energy-policy decisions."
  },
  {
    "id": "ai-m1",
    "domain": "ai",
    "stage": "mid",
    "title": "Ship or Align",
    "situation": "Your model is ahead of the world today. Safety testing would cost six months — and the lead.",
    "question": "Ship now or finish alignment work?",
    "left": {
      "label": "Ship now",
      "effects": {
        "rdCapacity": 7,
        "security": -6,
        "publicWelfare": -4
      },
      "stance": "compete"
    },
    "right": {
      "label": "Finish alignment",
      "effects": {
        "security": 5,
        "reputation": 5,
        "rdCapacity": -5
      },
      "stance": null
    },
    "tags": [
      "safety",
      "speed",
      "ethics"
    ],
    "severity": 3,
    "discussionPrompt": "Who bears the risk when a safety margin is traded for a competitive lead?",
    "educationalNote": "Safety work is invisible when it succeeds and catastrophic when it is skipped."
  },
  {
    "id": "ai-m2",
    "domain": "ai",
    "stage": "mid",
    "title": "The Defense Contract",
    "situation": "The defense ministry offers to fund your entire training run — if targeting research gets priority access.",
    "question": "Take military funding for the lab?",
    "left": {
      "label": "Take the funding",
      "effects": {
        "treasury": 9,
        "security": 6,
        "reputation": -5,
        "publicWelfare": -2
      },
      "stance": null
    },
    "right": {
      "label": "Stay independent",
      "effects": {
        "reputation": 5,
        "rdCapacity": -3,
        "treasury": -6
      },
      "stance": null
    },
    "tags": [
      "dual-use",
      "military",
      "research-freedom"
    ],
    "severity": 3,
    "discussionPrompt": "Does accepting military money change what questions a lab is able to ask?",
    "educationalNote": "Funding source shapes research agendas long before it shapes any single result."
  },
  {
    "id": "ai-l1",
    "domain": "ai",
    "stage": "late",
    "title": "The Automation Dividend",
    "situation": "National deployment would raise output sharply and make roughly a fifth of clerical jobs redundant within a year.",
    "question": "Deploy nationally at full speed?",
    "left": {
      "label": "Deploy at full speed",
      "effects": {
        "treasury": 7,
        "rdCapacity": 5,
        "publicWelfare": -9,
        "politicalSupport": -5
      },
      "stance": null
    },
    "right": {
      "label": "Phase in with retraining",
      "effects": {
        "publicWelfare": 5,
        "politicalSupport": 3,
        "treasury": -6
      },
      "stance": null
    },
    "tags": [
      "automation",
      "labor",
      "welfare"
    ],
    "severity": 3,
    "discussionPrompt": "Who captures the gains of automation, and who absorbs the losses?",
    "educationalNote": "Productivity gains and job losses rarely land on the same people."
  },
  {
    "id": "ai-l2",
    "domain": "ai",
    "stage": "late",
    "title": "Open the Model",
    "situation": "Releasing weights openly would win global goodwill and adoption. Your security services say it hands capability to everyone, including adversaries.",
    "question": "Release the model openly?",
    "left": {
      "label": "Release openly",
      "effects": {
        "reputation": 8,
        "rdCapacity": 3,
        "security": -8
      },
      "stance": "open"
    },
    "right": {
      "label": "Restrict access",
      "effects": {
        "security": 7,
        "reputation": -5
      },
      "stance": "protect"
    },
    "tags": [
      "openness",
      "export-control",
      "security"
    ],
    "severity": 3,
    "discussionPrompt": "Is open release democratization, proliferation, or both at once?",
    "educationalNote": "Open weights cannot be recalled — the decision is effectively permanent."
  },
  {
    "id": "space-e1",
    "domain": "space",
    "stage": "early",
    "title": "The Launch Site",
    "situation": "The best launch corridor sits over a fishing village of four thousand people. They do not want to move.",
    "question": "Compulsorily acquire the land?",
    "left": {
      "label": "Take the land",
      "effects": {
        "rdCapacity": 6,
        "publicWelfare": -8,
        "politicalSupport": -4
      },
      "stance": null
    },
    "right": {
      "label": "Move the site",
      "effects": {
        "treasury": -8,
        "publicWelfare": 4,
        "rdCapacity": -2
      },
      "stance": null
    },
    "tags": [
      "justice",
      "infrastructure",
      "welfare"
    ],
    "severity": 2,
    "discussionPrompt": "Whose land is expendable when a national programme needs it?",
    "educationalNote": "Large infrastructure repeatedly displaces communities with the least political power."
  },
  {
    "id": "space-e2",
    "domain": "space",
    "stage": "early",
    "title": "Dual-Use Launcher",
    "situation": "Defense will pay for your launcher development — the same vehicle can deliver a warhead.",
    "question": "Accept defense co-funding?",
    "left": {
      "label": "Accept co-funding",
      "effects": {
        "treasury": 8,
        "security": 6,
        "reputation": -5
      },
      "stance": null
    },
    "right": {
      "label": "Keep it civilian",
      "effects": {
        "reputation": 5,
        "treasury": -6,
        "rdCapacity": -2
      },
      "stance": "open"
    },
    "tags": [
      "dual-use",
      "military",
      "space"
    ],
    "severity": 3,
    "discussionPrompt": "Can a launch vehicle ever really be civilian-only?",
    "educationalNote": "Launch and missile technology are physically almost the same problem."
  },
  {
    "id": "space-m1",
    "domain": "space",
    "stage": "mid",
    "title": "Who Owns the Regolith",
    "situation": "Your lander found extractable water ice. No treaty clearly says who may keep it.",
    "question": "Stake a unilateral claim?",
    "left": {
      "label": "Stake the claim",
      "effects": {
        "rdCapacity": 6,
        "security": 5,
        "reputation": -8
      },
      "stance": "compete"
    },
    "right": {
      "label": "Push for a treaty",
      "effects": {
        "reputation": 8,
        "rdCapacity": -4
      },
      "stance": "cooperate"
    },
    "tags": [
      "space-law",
      "resources",
      "governance"
    ],
    "severity": 3,
    "discussionPrompt": "Should the first nation able to extract a space resource be the one that owns it?",
    "educationalNote": "The Outer Space Treaty bars appropriation of territory but is ambiguous on extracted resources."
  },
  {
    "id": "space-m2",
    "domain": "space",
    "stage": "mid",
    "title": "The Risk Margin",
    "situation": "A sensor fault gives the crewed lander a small but real failure probability. Standing down costs a launch window and enormous prestige.",
    "question": "Fly on schedule?",
    "left": {
      "label": "Fly on schedule",
      "effects": {
        "rdCapacity": 7,
        "publicWelfare": -5,
        "politicalSupport": -4
      },
      "stance": null
    },
    "right": {
      "label": "Stand down",
      "effects": {
        "treasury": -7,
        "publicWelfare": 4,
        "reputation": 3
      },
      "stance": null
    },
    "tags": [
      "safety",
      "risk",
      "ethics"
    ],
    "severity": 3,
    "discussionPrompt": "How much risk may a state ask an astronaut to accept for national prestige?",
    "educationalNote": "Both Shuttle losses followed known, normalized technical risks."
  },
  {
    "id": "space-l1",
    "domain": "space",
    "stage": "late",
    "title": "Debris Liability",
    "situation": "Your constellation caused a fifth of last year’s near-misses. An international cleanup fund wants your proportional share.",
    "question": "Pay into the cleanup fund?",
    "left": {
      "label": "Pay your share",
      "effects": {
        "treasury": -7,
        "environment": 5,
        "reputation": 5
      },
      "stance": "cooperate"
    },
    "right": {
      "label": "Dispute the bill",
      "effects": {
        "treasury": 3,
        "reputation": -7,
        "environment": -3
      },
      "stance": "protect"
    },
    "tags": [
      "debris",
      "commons",
      "responsibility"
    ],
    "severity": 2,
    "discussionPrompt": "Who pays to clean a commons that everybody polluted a little?",
    "educationalNote": "Orbital debris is the textbook modern tragedy of the commons."
  },
  {
    "id": "space-l2",
    "domain": "space",
    "stage": "late",
    "title": "Weapons in Orbit",
    "situation": "A treaty banning orbital weapons is on the table. Your new platform could host them.",
    "question": "Sign the orbital weapons ban?",
    "left": {
      "label": "Sign the ban",
      "effects": {
        "reputation": 8,
        "security": -5
      },
      "stance": "cooperate"
    },
    "right": {
      "label": "Keep the option",
      "effects": {
        "security": 8,
        "reputation": -7
      },
      "stance": "protect"
    },
    "tags": [
      "militarization",
      "treaty",
      "security"
    ],
    "severity": 3,
    "discussionPrompt": "Does giving up a capability make you safer or merely weaker?",
    "educationalNote": "Arms control depends on verification, which orbital systems make unusually hard."
  },
  {
    "id": "semi-e1",
    "domain": "semiconductors",
    "stage": "early",
    "title": "The Lithography Queue",
    "situation": "One company on Earth makes the machine you need. Getting a slot means an expensive political favour to an allied bloc.",
    "question": "Buy your way into the queue?",
    "left": {
      "label": "Pay and align",
      "effects": {
        "rdCapacity": 8,
        "treasury": -9,
        "security": -3
      },
      "stance": null
    },
    "right": {
      "label": "Build mature-node capacity",
      "effects": {
        "security": 6,
        "rdCapacity": -4,
        "treasury": -3
      },
      "stance": "protect"
    },
    "tags": [
      "chokepoints",
      "dependency",
      "sovereignty"
    ],
    "severity": 3,
    "discussionPrompt": "What does sovereignty mean when one vendor controls an entire industry’s ceiling?",
    "educationalNote": "EUV lithography is the most concentrated chokepoint in the technology stack."
  },
  {
    "id": "semi-e2",
    "domain": "semiconductors",
    "stage": "early",
    "title": "Cleanroom Water",
    "situation": "The fab needs the district’s water during a drought year. Farms and households are already rationed.",
    "question": "Give the fab priority water?",
    "left": {
      "label": "Prioritize the fab",
      "effects": {
        "rdCapacity": 6,
        "publicWelfare": -8,
        "environment": -4
      },
      "stance": null
    },
    "right": {
      "label": "Fund closed-loop recycling",
      "effects": {
        "treasury": -7,
        "environment": 5,
        "publicWelfare": 4
      },
      "stance": null
    },
    "tags": [
      "water",
      "environment",
      "welfare"
    ],
    "severity": 2,
    "discussionPrompt": "Should a water-scarce region host a water-hungry industry at all?",
    "educationalNote": "Advanced fabs consume millions of litres of ultrapure water daily."
  },
  {
    "id": "semi-m1",
    "domain": "semiconductors",
    "stage": "mid",
    "title": "Yield Secrets",
    "situation": "Allied fabs want your yield data to speed up a joint programme. It is also your only real commercial edge.",
    "question": "Share the yield data?",
    "left": {
      "label": "Share with allies",
      "effects": {
        "reputation": 6,
        "rdCapacity": 3,
        "security": -6
      },
      "stance": "cooperate"
    },
    "right": {
      "label": "Classify it",
      "effects": {
        "security": 6,
        "treasury": 3,
        "reputation": -5
      },
      "stance": "secrecy"
    },
    "tags": [
      "openness",
      "alliance",
      "competitiveness"
    ],
    "severity": 2,
    "discussionPrompt": "How much advantage should you give up to keep an alliance real?",
    "educationalNote": "Process knowledge, not design, is where fab advantage actually lives."
  },
  {
    "id": "semi-m2",
    "domain": "semiconductors",
    "stage": "mid",
    "title": "Fabs or Schools",
    "situation": "The same budget line can subsidize one more fab expansion or rebuild the technical school system that feeds it.",
    "question": "Where does the money go?",
    "left": {
      "label": "Subsidize the fab",
      "effects": {
        "rdCapacity": 7,
        "treasury": -9,
        "publicWelfare": -4
      },
      "stance": null
    },
    "right": {
      "label": "Fund the schools",
      "effects": {
        "publicWelfare": 6,
        "politicalSupport": 4,
        "rdCapacity": -4
      },
      "stance": null
    },
    "tags": [
      "subsidies",
      "education",
      "welfare"
    ],
    "severity": 2,
    "discussionPrompt": "Is industrial policy that skips human capital actually industrial policy?",
    "educationalNote": "Fab subsidies are politically visible; the workforce pipeline rarely is."
  },
  {
    "id": "semi-l1",
    "domain": "semiconductors",
    "stage": "late",
    "title": "The Export Control Demand",
    "situation": "An allied bloc demands you cut off your largest chip customer. That customer is a quarter of your export revenue.",
    "question": "Comply with the export controls?",
    "left": {
      "label": "Comply",
      "effects": {
        "security": 5,
        "reputation": 4,
        "treasury": -9
      },
      "stance": "cooperate"
    },
    "right": {
      "label": "Keep selling",
      "effects": {
        "treasury": 8,
        "reputation": -6,
        "security": -4
      },
      "stance": "compete"
    },
    "tags": [
      "export-control",
      "trade",
      "alliance"
    ],
    "severity": 3,
    "discussionPrompt": "When does export control protect security, and when is it just someone else’s trade policy?",
    "educationalNote": "Controls usually accelerate the target’s drive for self-sufficiency."
  },
  {
    "id": "semi-l2",
    "domain": "semiconductors",
    "stage": "late",
    "title": "Monopoly Pricing",
    "situation": "You are briefly the only supplier of a critical node. You can price accordingly — including to hospitals and utilities.",
    "question": "Maximize revenue from the position?",
    "left": {
      "label": "Maximize revenue",
      "effects": {
        "treasury": 9,
        "reputation": -7,
        "publicWelfare": -4
      },
      "stance": "compete"
    },
    "right": {
      "label": "Price it fairly",
      "effects": {
        "reputation": 7,
        "publicWelfare": 3,
        "treasury": -4
      },
      "stance": null
    },
    "tags": [
      "monopoly",
      "pricing",
      "ethics"
    ],
    "severity": 2,
    "discussionPrompt": "Is extracting maximum rent from a temporary monopoly simply good business?",
    "educationalNote": "Monopoly pricing in critical inputs propagates through every downstream sector."
  },
  {
    "id": "energy-e1",
    "domain": "energy",
    "stage": "early",
    "title": "Restart the Reactors",
    "situation": "Idle reactors could close your generation gap within a year. Public memory of the last accident is still raw.",
    "question": "Restart the nuclear fleet?",
    "left": {
      "label": "Restart them",
      "effects": {
        "energy": 9,
        "environment": 4,
        "publicWelfare": -6,
        "politicalSupport": -5
      },
      "stance": null
    },
    "right": {
      "label": "Keep them shut",
      "effects": {
        "politicalSupport": 4,
        "publicWelfare": 3,
        "energy": -5,
        "treasury": -4
      },
      "stance": null
    },
    "tags": [
      "nuclear",
      "acceptance",
      "energy"
    ],
    "severity": 3,
    "discussionPrompt": "How should a government weigh statistical risk against genuine public fear?",
    "educationalNote": "Nuclear acceptance is driven far more by trust in institutions than by accident statistics."
  },
  {
    "id": "energy-e2",
    "domain": "energy",
    "stage": "early",
    "title": "Who Controls the Grid",
    "situation": "The cheapest grid-control software comes from a foreign vendor. Your own security agency cannot audit the source.",
    "question": "Award the contract abroad?",
    "left": {
      "label": "Take the cheap bid",
      "effects": {
        "treasury": 7,
        "energy": 3,
        "security": -9
      },
      "stance": null
    },
    "right": {
      "label": "Pay for a domestic vendor",
      "effects": {
        "security": 7,
        "treasury": -8
      },
      "stance": "protect"
    },
    "tags": [
      "cyber",
      "sovereignty",
      "infrastructure"
    ],
    "severity": 3,
    "discussionPrompt": "Is the cheapest infrastructure bid ever cheapest once risk is priced in?",
    "educationalNote": "Grid control systems are among the highest-value targets in any national network."
  },
  {
    "id": "energy-m1",
    "domain": "energy",
    "stage": "mid",
    "title": "Blackout Triage",
    "situation": "A cold snap means you must shed load. Industry and data centres, or households and hospitals.",
    "question": "Who keeps the power?",
    "left": {
      "label": "Protect industry",
      "effects": {
        "rdCapacity": 5,
        "treasury": 4,
        "publicWelfare": -9
      },
      "stance": null
    },
    "right": {
      "label": "Protect households",
      "effects": {
        "publicWelfare": 7,
        "politicalSupport": 4,
        "rdCapacity": -5,
        "treasury": -3
      },
      "stance": null
    },
    "tags": [
      "grid",
      "welfare",
      "triage"
    ],
    "severity": 3,
    "discussionPrompt": "In a shortage, is economic output or human comfort the right priority?",
    "educationalNote": "Load-shedding rules are written long before the emergency, and they are political documents."
  },
  {
    "id": "energy-m2",
    "domain": "energy",
    "stage": "mid",
    "title": "The Transmission Corridor",
    "situation": "Modernizing the grid needs a high-voltage line through farmland and two protected valleys.",
    "question": "Force the corridor through?",
    "left": {
      "label": "Force it through",
      "effects": {
        "energy": 8,
        "publicWelfare": -5,
        "environment": -4,
        "politicalSupport": -4
      },
      "stance": null
    },
    "right": {
      "label": "Reroute and bury it",
      "effects": {
        "treasury": -9,
        "environment": 3,
        "publicWelfare": 4
      },
      "stance": null
    },
    "tags": [
      "grid",
      "land",
      "environment"
    ],
    "severity": 2,
    "discussionPrompt": "Does the energy transition justify overriding local objection?",
    "educationalNote": "Transmission, not generation, is the binding constraint on most clean-energy plans."
  },
  {
    "id": "energy-l1",
    "domain": "energy",
    "stage": "late",
    "title": "Export the Surplus",
    "situation": "Your grid finally runs a surplus. Neighbours will pay well for it; your own industry would rather keep prices low.",
    "question": "Export the surplus power?",
    "left": {
      "label": "Export it",
      "effects": {
        "treasury": 8,
        "reputation": 4,
        "energy": -5
      },
      "stance": "cooperate"
    },
    "right": {
      "label": "Keep it domestic",
      "effects": {
        "energy": 6,
        "publicWelfare": 4,
        "treasury": -3,
        "reputation": -2
      },
      "stance": "protect"
    },
    "tags": [
      "energy",
      "trade",
      "welfare"
    ],
    "severity": 1,
    "discussionPrompt": "Should a public energy surplus be sold abroad or spent on domestic prices?",
    "educationalNote": "Energy interdependence builds both resilience and leverage — in both directions."
  },
  {
    "id": "energy-l2",
    "domain": "energy",
    "stage": "late",
    "title": "The Supergrid Question",
    "situation": "Joining the regional supergrid would cut costs and stabilize supply — and make you dependent on neighbours in a crisis.",
    "question": "Join the regional supergrid?",
    "left": {
      "label": "Join the supergrid",
      "effects": {
        "energy": 7,
        "reputation": 6,
        "security": -7
      },
      "stance": "cooperate"
    },
    "right": {
      "label": "Stay islanded",
      "effects": {
        "security": 7,
        "energy": -4,
        "treasury": -5
      },
      "stance": "protect"
    },
    "tags": [
      "interdependence",
      "sovereignty",
      "grid"
    ],
    "severity": 2,
    "discussionPrompt": "Is interdependence a source of resilience or a strategic vulnerability?",
    "educationalNote": "Interconnection reduces cost and raises the political stakes of every dispute."
  },
  {
    "id": "climate-e1",
    "domain": "climate",
    "stage": "early",
    "title": "Carbon Tax Now",
    "situation": "Your monitoring network finally works, and it shows exactly who is emitting. A real carbon price is now technically possible.",
    "question": "Impose the carbon tax this term?",
    "left": {
      "label": "Impose it now",
      "effects": {
        "environment": 8,
        "treasury": 5,
        "politicalSupport": -7,
        "rdCapacity": -3
      },
      "stance": null
    },
    "right": {
      "label": "Defer it",
      "effects": {
        "politicalSupport": 5,
        "treasury": -2,
        "environment": -6
      },
      "stance": null
    },
    "tags": [
      "carbon-price",
      "politics",
      "environment"
    ],
    "severity": 2,
    "discussionPrompt": "Should a government act on a measurement its voters have not accepted yet?",
    "educationalNote": "Carbon pricing is economically straightforward and politically brutal."
  },
  {
    "id": "climate-e2",
    "domain": "climate",
    "stage": "early",
    "title": "Whose Air",
    "situation": "The new industrial-efficiency programme sites its retrofit plants in the poorest districts, where land is cheap and objection is weak.",
    "question": "Site the plants where land is cheapest?",
    "left": {
      "label": "Site them cheaply",
      "effects": {
        "treasury": 6,
        "rdCapacity": 3,
        "publicWelfare": -8
      },
      "stance": null
    },
    "right": {
      "label": "Enforce fair siting",
      "effects": {
        "publicWelfare": 6,
        "reputation": 3,
        "treasury": -6
      },
      "stance": null
    },
    "tags": [
      "environmental-justice",
      "welfare",
      "siting"
    ],
    "severity": 3,
    "discussionPrompt": "Why do environmental burdens so reliably land on the least powerful communities?",
    "educationalNote": "Environmental justice research finds siting correlates strongly with local political power."
  },
  {
    "id": "climate-m1",
    "domain": "climate",
    "stage": "mid",
    "title": "The Capture Moonshot",
    "situation": "Direct-air capture could be transformative or a decade-long dead end. The same money would deliver certain, boring efficiency gains.",
    "question": "Bet on carbon capture?",
    "left": {
      "label": "Fund the moonshot",
      "effects": {
        "rdCapacity": 7,
        "treasury": -9,
        "environment": 2
      },
      "stance": null
    },
    "right": {
      "label": "Fund proven efficiency",
      "effects": {
        "environment": 6,
        "treasury": -3,
        "rdCapacity": -3
      },
      "stance": null
    },
    "tags": [
      "carbon-removal",
      "risk",
      "funding"
    ],
    "severity": 2,
    "discussionPrompt": "When is a moonshot leadership, and when is it an excuse to delay boring work?",
    "educationalNote": "Capture at climate-relevant scale remains unproven and energy-intensive."
  },
  {
    "id": "climate-m2",
    "domain": "climate",
    "stage": "mid",
    "title": "Climate Debt",
    "situation": "Nations harmed by a century of emissions — much of it yours — demand a compensation fund.",
    "question": "Pay into the loss-and-damage fund?",
    "left": {
      "label": "Pay in full",
      "effects": {
        "treasury": -9,
        "reputation": 9
      },
      "stance": "cooperate"
    },
    "right": {
      "label": "Decline liability",
      "effects": {
        "treasury": 4,
        "reputation": -8
      },
      "stance": "protect"
    },
    "tags": [
      "burden-sharing",
      "justice",
      "diplomacy"
    ],
    "severity": 3,
    "discussionPrompt": "Do present citizens owe anything for emissions produced before they were born?",
    "educationalNote": "Loss-and-damage financing has been among the most contested items in climate diplomacy."
  },
  {
    "id": "climate-l1",
    "domain": "climate",
    "stage": "late",
    "title": "Green Steel Mandate",
    "situation": "Mandating low-carbon steel would complete your net-zero pathway and price your manufacturers out of export markets.",
    "question": "Mandate green steel now?",
    "left": {
      "label": "Mandate it",
      "effects": {
        "environment": 8,
        "reputation": 4,
        "treasury": -6,
        "politicalSupport": -5
      },
      "stance": null
    },
    "right": {
      "label": "Stay cost-competitive",
      "effects": {
        "treasury": 6,
        "environment": -7,
        "reputation": -3
      },
      "stance": "compete"
    },
    "tags": [
      "industry",
      "transition",
      "competitiveness"
    ],
    "severity": 3,
    "discussionPrompt": "Can one country decarbonize heavy industry while its competitors do not?",
    "educationalNote": "Carbon leakage — emissions relocating rather than falling — is the central design problem."
  },
  {
    "id": "climate-l2",
    "domain": "climate",
    "stage": "late",
    "title": "The Geoengineering Trial",
    "situation": "A stratospheric aerosol trial could buy the world a decade. No international body has authorized it, and effects cross every border.",
    "question": "Run the trial unilaterally?",
    "left": {
      "label": "Run it",
      "effects": {
        "rdCapacity": 7,
        "environment": 3,
        "reputation": -9,
        "security": -3
      },
      "stance": "compete"
    },
    "right": {
      "label": "Wait for consensus",
      "effects": {
        "reputation": 7,
        "rdCapacity": -4,
        "environment": -2
      },
      "stance": "cooperate"
    },
    "tags": [
      "geoengineering",
      "governance",
      "risk"
    ],
    "severity": 3,
    "discussionPrompt": "Who is entitled to consent on behalf of a planet?",
    "educationalNote": "Solar geoengineering is cheap enough that a single actor could attempt it alone."
  },
  {
    "id": "quantum-e1",
    "domain": "quantum",
    "stage": "early",
    "title": "The Talent War",
    "situation": "There are perhaps three hundred people worldwide who can build your qubit platform. You can outbid for a dozen of them.",
    "question": "Poach aggressively or grow your own?",
    "left": {
      "label": "Poach the specialists",
      "effects": {
        "rdCapacity": 8,
        "treasury": -8,
        "reputation": -4
      },
      "stance": "compete"
    },
    "right": {
      "label": "Train domestically",
      "effects": {
        "publicWelfare": 4,
        "rdCapacity": -3,
        "treasury": -5
      },
      "stance": null
    },
    "tags": [
      "talent",
      "competition",
      "education"
    ],
    "severity": 2,
    "discussionPrompt": "Is buying talent from smaller countries a fair way to compete?",
    "educationalNote": "Extreme talent concentration makes small teams strategically decisive."
  },
  {
    "id": "quantum-e2",
    "domain": "quantum",
    "stage": "early",
    "title": "The Helium Reserve",
    "situation": "Dilution refrigerators need helium-3, and global supply is tiny. You can corner enough for a decade.",
    "question": "Corner the helium supply?",
    "left": {
      "label": "Stockpile aggressively",
      "effects": {
        "security": 7,
        "rdCapacity": 4,
        "treasury": -8,
        "reputation": -4
      },
      "stance": "compete"
    },
    "right": {
      "label": "Join a shared reserve",
      "effects": {
        "reputation": 6,
        "security": 2,
        "rdCapacity": -2
      },
      "stance": "cooperate"
    },
    "tags": [
      "supply-security",
      "scarcity",
      "cooperation"
    ],
    "severity": 2,
    "discussionPrompt": "Does stockpiling a scarce input protect you or simply start the shortage?",
    "educationalNote": "Helium-3 supply is a byproduct of weapons stockpiles, making it structurally scarce."
  },
  {
    "id": "quantum-m1",
    "domain": "quantum",
    "stage": "mid",
    "title": "Publish the Algorithm",
    "situation": "Your team solved a key error-correction problem. Publishing advances the whole field — including everyone else’s codebreaking.",
    "question": "Publish or classify?",
    "left": {
      "label": "Publish openly",
      "effects": {
        "reputation": 8,
        "rdCapacity": 3,
        "security": -7
      },
      "stance": "open"
    },
    "right": {
      "label": "Classify the result",
      "effects": {
        "security": 8,
        "reputation": -6,
        "rdCapacity": -2
      },
      "stance": "secrecy"
    },
    "tags": [
      "open-science",
      "security",
      "dual-use"
    ],
    "severity": 3,
    "discussionPrompt": "Does a scientist owe more to their field or to their state?",
    "educationalNote": "Classification of mathematics has a long and contested history in cryptography."
  },
  {
    "id": "quantum-m2",
    "domain": "quantum",
    "stage": "mid",
    "title": "Quantum Sensing for Defense",
    "situation": "Your sensors can detect submarines through the seabed. Defense wants the whole programme; civilian geology loses its instrument.",
    "question": "Hand the programme to defense?",
    "left": {
      "label": "Give it to defense",
      "effects": {
        "treasury": 8,
        "security": 7,
        "reputation": -5,
        "rdCapacity": -2
      },
      "stance": "protect"
    },
    "right": {
      "label": "Keep it civilian",
      "effects": {
        "reputation": 5,
        "rdCapacity": 4,
        "treasury": -6,
        "security": -3
      },
      "stance": "open"
    },
    "tags": [
      "dual-use",
      "military",
      "sensing"
    ],
    "severity": 2,
    "discussionPrompt": "What is lost to science when a capability is absorbed by defense?",
    "educationalNote": "Quantum sensing may destabilize submarine-based nuclear deterrence."
  },
  {
    "id": "quantum-l1",
    "domain": "quantum",
    "stage": "late",
    "title": "Their Encryption Is Broken",
    "situation": "You can now read a rival’s encrypted traffic. Telling them closes the window; staying quiet leaves their hospitals exposed too.",
    "question": "Disclose the break?",
    "left": {
      "label": "Exploit it quietly",
      "effects": {
        "security": 8,
        "rdCapacity": 3,
        "reputation": -9
      },
      "stance": "secrecy"
    },
    "right": {
      "label": "Disclose and help migrate",
      "effects": {
        "reputation": 9,
        "security": -5
      },
      "stance": "open"
    },
    "tags": [
      "crypto",
      "intelligence",
      "ethics"
    ],
    "severity": 3,
    "discussionPrompt": "Is an unpatched vulnerability an intelligence asset or a public danger?",
    "educationalNote": "The equities debate — exploit or disclose — is unresolved in every major state."
  },
  {
    "id": "quantum-l2",
    "domain": "quantum",
    "stage": "late",
    "title": "The Migration Bill",
    "situation": "Every government system needs new cryptography before the technology you just built becomes widely available.",
    "question": "Fund the emergency migration?",
    "left": {
      "label": "Fund it now",
      "effects": {
        "security": 9,
        "treasury": -9
      },
      "stance": null
    },
    "right": {
      "label": "Delay the spending",
      "effects": {
        "treasury": 5,
        "security": -8
      },
      "stance": null
    },
    "tags": [
      "crypto",
      "infrastructure",
      "security"
    ],
    "severity": 3,
    "discussionPrompt": "How do you budget today against a threat that only becomes real later?",
    "educationalNote": "Harvest-now-decrypt-later attacks make migration urgent before the machines exist."
  },
  {
    "id": "biotech-e1",
    "domain": "biotech",
    "stage": "early",
    "title": "The National Biobank",
    "situation": "A mandatory genomic biobank would put your programme years ahead. Participation would not be optional.",
    "question": "Make the biobank mandatory?",
    "left": {
      "label": "Make it mandatory",
      "effects": {
        "rdCapacity": 8,
        "publicWelfare": -8,
        "reputation": -4
      },
      "stance": null
    },
    "right": {
      "label": "Keep it opt-in",
      "effects": {
        "publicWelfare": 5,
        "reputation": 4,
        "rdCapacity": -5
      },
      "stance": "open"
    },
    "tags": [
      "genomics",
      "consent",
      "privacy"
    ],
    "severity": 3,
    "discussionPrompt": "Who owns your genome — you, your family, or the state that sequenced it?",
    "educationalNote": "Genomic data is uniquely identifying and implicates relatives who never consented."
  },
  {
    "id": "biotech-e2",
    "domain": "biotech",
    "stage": "early",
    "title": "Pathogen Data",
    "situation": "Your surveillance network detected a novel pathogen sequence. Sharing it openly speeds vaccines and hands a blueprint to anyone.",
    "question": "Publish the sequence openly?",
    "left": {
      "label": "Publish openly",
      "effects": {
        "reputation": 7,
        "publicWelfare": 3,
        "security": -7
      },
      "stance": "open"
    },
    "right": {
      "label": "Restrict access",
      "effects": {
        "security": 7,
        "reputation": -5,
        "publicWelfare": -2
      },
      "stance": "protect"
    },
    "tags": [
      "biosecurity",
      "openness",
      "health"
    ],
    "severity": 3,
    "discussionPrompt": "Does open science save more lives than it endangers in biology?",
    "educationalNote": "Rapid sequence sharing enabled COVID vaccines and also lowered synthesis barriers."
  },
  {
    "id": "biotech-m1",
    "domain": "biotech",
    "stage": "mid",
    "title": "Trials Abroad",
    "situation": "Running clinical trials in a poorer country is faster, cheaper, and legal. The eventual therapy will be priced beyond that country’s reach.",
    "question": "Run the trials offshore?",
    "left": {
      "label": "Run them offshore",
      "effects": {
        "rdCapacity": 7,
        "treasury": 4,
        "reputation": -8
      },
      "stance": null
    },
    "right": {
      "label": "Trial domestically",
      "effects": {
        "reputation": 5,
        "treasury": -7,
        "rdCapacity": -3
      },
      "stance": null
    },
    "tags": [
      "ethics",
      "exploitation",
      "clinical"
    ],
    "severity": 3,
    "discussionPrompt": "Is it ethical to test on populations that will never afford the result?",
    "educationalNote": "Benefit-sharing obligations in international trial ethics are widely ignored in practice."
  },
  {
    "id": "biotech-m2",
    "domain": "biotech",
    "stage": "mid",
    "title": "Fast-Track the Therapy",
    "situation": "Dying patients are demanding access now. Full trials take three more years and would catch rare fatal side effects.",
    "question": "Grant emergency approval?",
    "left": {
      "label": "Fast-track it",
      "effects": {
        "rdCapacity": 6,
        "politicalSupport": 4,
        "publicWelfare": -7
      },
      "stance": null
    },
    "right": {
      "label": "Require full trials",
      "effects": {
        "publicWelfare": 6,
        "reputation": 3,
        "rdCapacity": -4,
        "politicalSupport": -3
      },
      "stance": null
    },
    "tags": [
      "regulation",
      "risk",
      "health"
    ],
    "severity": 3,
    "discussionPrompt": "Should desperate patients be allowed to accept unknown risks?",
    "educationalNote": "Accelerated approval trades statistical certainty for time, sometimes badly."
  },
  {
    "id": "biotech-l1",
    "domain": "biotech",
    "stage": "late",
    "title": "Price the Cure",
    "situation": "Your platform produced a one-shot cure. Pricing it high funds the next decade of research; pricing it low reaches everyone who needs it.",
    "question": "How do you price the cure?",
    "left": {
      "label": "Maximize revenue",
      "effects": {
        "treasury": 9,
        "rdCapacity": 3,
        "publicWelfare": -8,
        "reputation": -5
      },
      "stance": null
    },
    "right": {
      "label": "License it cheaply",
      "effects": {
        "reputation": 8,
        "publicWelfare": 6,
        "treasury": -6
      },
      "stance": "cooperate"
    },
    "tags": [
      "drug-access",
      "pricing",
      "ethics"
    ],
    "severity": 3,
    "discussionPrompt": "Does high pricing fund future cures or just ration present ones?",
    "educationalNote": "The access-versus-innovation tradeoff is the core unsolved problem of pharmaceutical policy."
  },
  {
    "id": "biotech-l2",
    "domain": "biotech",
    "stage": "late",
    "title": "Editing the Germline",
    "situation": "Your platform can now correct heritable disease before birth. The edits pass to every future generation.",
    "question": "Permit germline editing?",
    "left": {
      "label": "Permit with oversight",
      "effects": {
        "rdCapacity": 7,
        "publicWelfare": -4,
        "reputation": -5
      },
      "stance": null
    },
    "right": {
      "label": "Ban it outright",
      "effects": {
        "reputation": 4,
        "publicWelfare": 4,
        "rdCapacity": -6
      },
      "stance": "protect"
    },
    "tags": [
      "bioethics",
      "genomics",
      "governance"
    ],
    "severity": 3,
    "discussionPrompt": "Who consents on behalf of people not yet born?",
    "educationalNote": "Heritable editing is prohibited in most jurisdictions and technically within reach."
  },
  {
    "id": "robotics-e1",
    "domain": "robotics",
    "stage": "early",
    "title": "The Testbed Factory",
    "situation": "Converting a working public shipyard into a robotics testbed would accelerate you by years and idle its workforce meanwhile.",
    "question": "Convert the shipyard?",
    "left": {
      "label": "Convert it",
      "effects": {
        "rdCapacity": 7,
        "publicWelfare": -6,
        "politicalSupport": -3
      },
      "stance": null
    },
    "right": {
      "label": "Build a new site",
      "effects": {
        "treasury": -8,
        "publicWelfare": 3,
        "rdCapacity": -2
      },
      "stance": null
    },
    "tags": [
      "labor",
      "infrastructure",
      "industry"
    ],
    "severity": 2,
    "discussionPrompt": "Who should absorb the transition cost of building the thing that replaces them?",
    "educationalNote": "Industrial transitions concentrate cost locally while spreading benefit nationally."
  },
  {
    "id": "robotics-e2",
    "domain": "robotics",
    "stage": "early",
    "title": "Imported Actuators",
    "situation": "Cheap foreign actuators would let you build ten times as many prototypes. They also embed firmware you cannot inspect.",
    "question": "Import the components?",
    "left": {
      "label": "Import them",
      "effects": {
        "rdCapacity": 6,
        "treasury": 4,
        "security": -7
      },
      "stance": null
    },
    "right": {
      "label": "Build them domestically",
      "effects": {
        "security": 7,
        "treasury": -8,
        "rdCapacity": -2
      },
      "stance": "protect"
    },
    "tags": [
      "supply-chain",
      "sovereignty",
      "security"
    ],
    "severity": 2,
    "discussionPrompt": "How much of your hardware can you afford not to understand?",
    "educationalNote": "Firmware-level supply-chain compromise is extremely difficult to detect after deployment."
  },
  {
    "id": "robotics-m1",
    "domain": "robotics",
    "stage": "mid",
    "title": "Robots for Elders",
    "situation": "Care robots would relieve a severe carer shortage. Families say the elderly need people, not machines.",
    "question": "Deploy care robots at scale?",
    "left": {
      "label": "Deploy them",
      "effects": {
        "treasury": 7,
        "rdCapacity": 5,
        "publicWelfare": -5
      },
      "stance": null
    },
    "right": {
      "label": "Fund human carers",
      "effects": {
        "publicWelfare": 8,
        "politicalSupport": 3,
        "treasury": -8,
        "rdCapacity": -3
      },
      "stance": null
    },
    "tags": [
      "care",
      "labor",
      "welfare"
    ],
    "severity": 2,
    "discussionPrompt": "Is automated care a solution to a shortage or an acceptance of it?",
    "educationalNote": "Care robotics tends to substitute for underfunding rather than for labour itself."
  },
  {
    "id": "robotics-m2",
    "domain": "robotics",
    "stage": "mid",
    "title": "Autonomous Weapons",
    "situation": "Your control stack is good enough for lethal autonomy. Defense wants it; a treaty process wants it banned.",
    "question": "Develop autonomous weapons?",
    "left": {
      "label": "Develop them",
      "effects": {
        "security": 8,
        "treasury": 5,
        "reputation": -9
      },
      "stance": "compete"
    },
    "right": {
      "label": "Renounce the application",
      "effects": {
        "reputation": 8,
        "security": -5,
        "treasury": -3
      },
      "stance": "cooperate"
    },
    "tags": [
      "autonomous-weapons",
      "ethics",
      "treaty"
    ],
    "severity": 3,
    "discussionPrompt": "Should a machine ever be permitted to decide to kill?",
    "educationalNote": "Meaningful human control remains undefined in international law."
  },
  {
    "id": "robotics-l1",
    "domain": "robotics",
    "stage": "late",
    "title": "The Port Strike",
    "situation": "Full port automation is ready. The dockworkers’ union has shut down the harbour in response.",
    "question": "Proceed with automation?",
    "left": {
      "label": "Automate anyway",
      "effects": {
        "treasury": 8,
        "rdCapacity": 4,
        "publicWelfare": -9,
        "politicalSupport": -6
      },
      "stance": null
    },
    "right": {
      "label": "Negotiate a transition",
      "effects": {
        "publicWelfare": 6,
        "politicalSupport": 4,
        "treasury": -6,
        "rdCapacity": -3
      },
      "stance": null
    },
    "tags": [
      "automation",
      "labor",
      "politics"
    ],
    "severity": 3,
    "discussionPrompt": "Do workers have any legitimate claim to a job that a machine can now do?",
    "educationalNote": "Port automation disputes have become the sharpest labour conflicts of the automation era."
  },
  {
    "id": "robotics-l2",
    "domain": "robotics",
    "stage": "late",
    "title": "Certify the Fleet",
    "situation": "Strict safety certification for autonomous deployment would delay you by two years. Light-touch rules ship now and shift risk to the public.",
    "question": "Impose strict certification?",
    "left": {
      "label": "Certify strictly",
      "effects": {
        "publicWelfare": 6,
        "reputation": 5,
        "rdCapacity": -5
      },
      "stance": null
    },
    "right": {
      "label": "Light-touch rules",
      "effects": {
        "rdCapacity": 6,
        "treasury": 3,
        "publicWelfare": -6,
        "reputation": -4
      },
      "stance": null
    },
    "tags": [
      "safety",
      "regulation",
      "liability"
    ],
    "severity": 2,
    "discussionPrompt": "Who should carry the risk of a system that is probably safe?",
    "educationalNote": "Safety regulation usually arrives after the first well-publicized fatality."
  },
  {
    "id": "materials-e1",
    "domain": "materials",
    "stage": "early",
    "title": "Open the Mine",
    "situation": "A domestic deposit would end your import dependency. Extracting it would poison a river system for a generation.",
    "question": "Open the mine?",
    "left": {
      "label": "Open it",
      "effects": {
        "security": 7,
        "rdCapacity": 4,
        "environment": -9,
        "publicWelfare": -4
      },
      "stance": "protect"
    },
    "right": {
      "label": "Keep importing",
      "effects": {
        "environment": 4,
        "publicWelfare": 3,
        "security": -6,
        "treasury": -3
      },
      "stance": null
    },
    "tags": [
      "mining",
      "environment",
      "sovereignty"
    ],
    "severity": 3,
    "discussionPrompt": "Is domestic environmental damage preferable to foreign dependency?",
    "educationalNote": "Rare-earth refining is usually more damaging than the mining itself."
  },
  {
    "id": "materials-e2",
    "domain": "materials",
    "stage": "early",
    "title": "Simulation on Foreign Clouds",
    "situation": "Atomic simulation needs enormous compute. Renting it abroad is cheap and exposes your entire research pipeline.",
    "question": "Rent foreign compute?",
    "left": {
      "label": "Rent it abroad",
      "effects": {
        "rdCapacity": 7,
        "treasury": 3,
        "security": -6
      },
      "stance": null
    },
    "right": {
      "label": "Build a domestic cluster",
      "effects": {
        "security": 6,
        "rdCapacity": 2,
        "treasury": -9,
        "energy": -3
      },
      "stance": "protect"
    },
    "tags": [
      "compute",
      "sovereignty",
      "research"
    ],
    "severity": 2,
    "discussionPrompt": "Where does your research actually live if the machines belong to someone else?",
    "educationalNote": "Compute dependency exposes research direction, not just research output."
  },
  {
    "id": "materials-m1",
    "domain": "materials",
    "stage": "mid",
    "title": "The Byproduct Problem",
    "situation": "Scaling up your synthesis route produces a toxic byproduct. Proper treatment erases the cost advantage entirely.",
    "question": "Pay for full treatment?",
    "left": {
      "label": "Dispose cheaply",
      "effects": {
        "treasury": 6,
        "rdCapacity": 3,
        "environment": -9,
        "publicWelfare": -4
      },
      "stance": null
    },
    "right": {
      "label": "Treat it properly",
      "effects": {
        "environment": 6,
        "publicWelfare": 4,
        "treasury": -8
      },
      "stance": null
    },
    "tags": [
      "environment",
      "industry",
      "regulation"
    ],
    "severity": 2,
    "discussionPrompt": "Should a process that cannot afford its own cleanup be scaled at all?",
    "educationalNote": "Externalized disposal costs are the classic hidden subsidy in materials manufacturing."
  },
  {
    "id": "materials-m2",
    "domain": "materials",
    "stage": "mid",
    "title": "Share the Recipe",
    "situation": "Allies want your processing route to build parallel capacity. It is the only thing they cannot reproduce themselves.",
    "question": "License the process to allies?",
    "left": {
      "label": "License it",
      "effects": {
        "reputation": 7,
        "rdCapacity": 2,
        "security": -6
      },
      "stance": "cooperate"
    },
    "right": {
      "label": "Keep it proprietary",
      "effects": {
        "security": 6,
        "treasury": 4,
        "reputation": -5
      },
      "stance": "secrecy"
    },
    "tags": [
      "alliance",
      "openness",
      "competitiveness"
    ],
    "severity": 2,
    "discussionPrompt": "Is an alliance real if you keep the one thing that matters to yourself?",
    "educationalNote": "Process know-how transfers far less easily than blueprints suggest."
  },
  {
    "id": "materials-l1",
    "domain": "materials",
    "stage": "late",
    "title": "The Export Ban",
    "situation": "You now control global supply of a breakthrough material. Restricting exports would give your industry a decisive edge.",
    "question": "Ban exports of the material?",
    "left": {
      "label": "Ban exports",
      "effects": {
        "security": 8,
        "rdCapacity": 3,
        "reputation": -8,
        "treasury": -4
      },
      "stance": "protect"
    },
    "right": {
      "label": "Keep markets open",
      "effects": {
        "treasury": 8,
        "reputation": 5,
        "security": -6
      },
      "stance": "open"
    },
    "tags": [
      "resource-nationalism",
      "trade",
      "leverage"
    ],
    "severity": 3,
    "discussionPrompt": "When you finally hold the chokepoint, do you use it the way others used theirs on you?",
    "educationalNote": "Resource nationalism reliably triggers substitution research in the countries it targets."
  },
  {
    "id": "materials-l2",
    "domain": "materials",
    "stage": "late",
    "title": "Design for Recycling",
    "situation": "Mandating recyclable design would cut long-term demand sharply and raise near-term unit costs above imports.",
    "question": "Mandate recyclable design?",
    "left": {
      "label": "Mandate recycling",
      "effects": {
        "environment": 8,
        "security": 3,
        "treasury": -6,
        "rdCapacity": -3
      },
      "stance": null
    },
    "right": {
      "label": "Use the cheapest source",
      "effects": {
        "treasury": 6,
        "rdCapacity": 2,
        "environment": -7
      },
      "stance": null
    },
    "tags": [
      "circular-economy",
      "environment",
      "industry"
    ],
    "severity": 2,
    "discussionPrompt": "Should the cost of end-of-life fall on the producer or on everyone else?",
    "educationalNote": "Circular design is cheapest to impose before an industry has scaled, and rarely is."
  },
  {
    "id": "ai-d1",
    "domain": "ai",
    "title": "Student Data for National Models",
    "situation": "Your AI champions demand access to a decade of anonymized student records to train a national foundation model. Privacy groups warn anonymization can be reversed.",
    "question": "Authorize controlled access to student data for model training?",
    "left": {
      "label": "Authorize controlled access",
      "effects": {
        "rdCapacity": 9,
        "reputation": 7,
        "publicWelfare": -8
      },
      "stance": null
    },
    "right": {
      "label": "Refuse — protect privacy",
      "effects": {
        "rdCapacity": -4,
        "publicWelfare": 7,
        "politicalSupport": 3
      },
      "stance": "protect"
    },
    "tags": [
      "data",
      "privacy"
    ],
    "severity": 2,
    "discussionPrompt": "Who owns data generated by public institutions, and can consent ever be meaningful at national scale?",
    "educationalNote": "Foundation-model performance scales with data, but re-identification risk makes 'anonymized' a weak guarantee.",
    "stage": "any"
  },
  {
    "id": "ai-d2",
    "domain": "ai",
    "title": "Data Centers vs the Grid",
    "situation": "AI data centers now consume a tenth of national electricity. Utilities warn of brownouts; households face rising bills.",
    "question": "Prioritize compute expansion or household electricity stability?",
    "left": {
      "label": "Prioritize AI compute",
      "effects": {
        "rdCapacity": 8,
        "energy": -10,
        "publicWelfare": -7
      },
      "stance": null
    },
    "right": {
      "label": "Cap data-center load",
      "effects": {
        "rdCapacity": -6,
        "energy": 6,
        "publicWelfare": 5
      },
      "stance": null
    },
    "tags": [
      "energy",
      "compute"
    ],
    "severity": 3,
    "discussionPrompt": "Should compute be treated as critical infrastructure with priority access to power?",
    "educationalNote": "AI progress is increasingly an energy-policy problem, not just an algorithms problem.",
    "stage": "any"
  },
  {
    "id": "ai-d3",
    "domain": "ai",
    "title": "Open the Weights?",
    "situation": "Your flagship lab wants to release a frontier model's weights openly to win developers and goodwill. Security agencies fear misuse.",
    "question": "Release the model weights openly?",
    "left": {
      "label": "Release openly",
      "effects": {
        "reputation": 10,
        "politicalSupport": 6,
        "rdCapacity": 4,
        "security": -9
      },
      "stance": "open"
    },
    "right": {
      "label": "Keep closed / API-only",
      "effects": {
        "security": 6,
        "reputation": -6,
        "politicalSupport": -3
      },
      "stance": "protect"
    },
    "tags": [
      "openness",
      "safety"
    ],
    "severity": 3,
    "discussionPrompt": "Does openness democratize AI or hand capability to bad actors?",
    "educationalNote": "Open weights cannot be recalled; the decision is effectively irreversible.",
    "stage": "any"
  },
  {
    "id": "ai-d4",
    "domain": "ai",
    "title": "Automating the Civil Service",
    "situation": "An AI rollout could cut clerical processing costs by half, but a third of public-sector clerks would be redundant within two years.",
    "question": "Deploy automation across the civil service now?",
    "left": {
      "label": "Deploy and downsize",
      "effects": {
        "treasury": 9,
        "rdCapacity": 5,
        "publicWelfare": -8,
        "politicalSupport": -6
      },
      "stance": null
    },
    "right": {
      "label": "Phase in with retraining",
      "effects": {
        "treasury": -5,
        "reputation": 5,
        "publicWelfare": 4
      },
      "stance": null
    },
    "tags": [
      "labor",
      "automation"
    ],
    "severity": 2,
    "discussionPrompt": "Is gradual, costlier transition a moral obligation or an economic luxury?",
    "educationalNote": "Productivity gains and labor displacement are two faces of the same deployment.",
    "stage": "any"
  },
  {
    "id": "ai-d5",
    "domain": "ai",
    "title": "Predictive Policing Pilot",
    "situation": "An AI surveillance system promises to cut crime in dense districts. Civil-liberties advocates call it automated discrimination.",
    "question": "Roll out AI surveillance for public safety?",
    "left": {
      "label": "Deploy surveillance",
      "effects": {
        "security": 8,
        "politicalSupport": 0,
        "publicWelfare": -9
      },
      "stance": null
    },
    "right": {
      "label": "Halt the program",
      "effects": {
        "publicWelfare": 6,
        "politicalSupport": 3,
        "security": -4
      },
      "stance": null
    },
    "tags": [
      "surveillance",
      "rights"
    ],
    "severity": 3,
    "discussionPrompt": "When does security tooling become a tool of social control?",
    "educationalNote": "Dual-use AI blurs the line between protection and oppression depending on oversight.",
    "stage": "any"
  },
  {
    "id": "space-d1",
    "domain": "space",
    "title": "Cut-Price Reusable Launch",
    "situation": "A startup offers launch costs 40% lower by skipping a full safety-review cycle. The savings could fund three more missions.",
    "question": "Fast-track the cheaper, less-reviewed launcher?",
    "left": {
      "label": "Fast-track it",
      "effects": {
        "rdCapacity": 8,
        "treasury": 6,
        "security": -5,
        "politicalSupport": -4
      },
      "stance": null
    },
    "right": {
      "label": "Demand full review",
      "effects": {
        "treasury": -5,
        "rdCapacity": -3,
        "politicalSupport": 4
      },
      "stance": null
    },
    "tags": [
      "launch",
      "safety"
    ],
    "severity": 2,
    "discussionPrompt": "How much risk is acceptable to win a cost race in space?",
    "educationalNote": "Launch economics drive the entire space sector; one failure can erase a reputation.",
    "stage": "any"
  },
  {
    "id": "space-d2",
    "domain": "space",
    "title": "Lunar Resource Claim",
    "situation": "Your lander has located ice at a lunar pole. You could stake an extraction claim before any international framework exists.",
    "question": "Stake a unilateral lunar resource claim?",
    "left": {
      "label": "Stake the claim",
      "effects": {
        "rdCapacity": 7,
        "treasury": 5,
        "politicalSupport": -8,
        "security": 3
      },
      "stance": "compete"
    },
    "right": {
      "label": "Wait for a treaty",
      "effects": {
        "politicalSupport": 7,
        "rdCapacity": -4
      },
      "stance": "cooperate"
    },
    "tags": [
      "lunar-law",
      "resources"
    ],
    "severity": 3,
    "discussionPrompt": "Should celestial resources be first-come-first-served or a global commons?",
    "educationalNote": "The Outer Space Treaty bans sovereignty claims but is silent on private resource extraction.",
    "stage": "any"
  },
  {
    "id": "space-d3",
    "domain": "space",
    "title": "Dual-Use Constellation",
    "situation": "The defense ministry offers to fully fund your satellite constellation if it also carries military sensors.",
    "question": "Accept military funding for dual-use satellites?",
    "left": {
      "label": "Accept the funding",
      "effects": {
        "treasury": 10,
        "security": 6,
        "politicalSupport": -6,
        "publicWelfare": -4
      },
      "stance": null
    },
    "right": {
      "label": "Keep it civilian",
      "effects": {
        "treasury": -7,
        "politicalSupport": 5
      },
      "stance": null
    },
    "tags": [
      "dual-use",
      "satellites"
    ],
    "severity": 2,
    "discussionPrompt": "Can civilian space infrastructure ever be truly separated from military use?",
    "educationalNote": "Most space infrastructure is inherently dual-use, complicating arms-control norms.",
    "stage": "any"
  },
  {
    "id": "space-d4",
    "domain": "space",
    "title": "Who Cleans the Debris?",
    "situation": "A debris field threatens your satellites. A cleanup mission is expensive and mostly benefits everyone, not just you.",
    "question": "Fund an expensive debris-removal mission?",
    "left": {
      "label": "Fund the cleanup",
      "effects": {
        "treasury": -9,
        "environment": 6,
        "politicalSupport": 8
      },
      "stance": null
    },
    "right": {
      "label": "Defer the cost",
      "effects": {
        "treasury": 4,
        "environment": -6,
        "security": -4
      },
      "stance": null
    },
    "tags": [
      "debris",
      "commons"
    ],
    "severity": 2,
    "discussionPrompt": "Why do shared-commons problems get chronically underfunded?",
    "educationalNote": "Orbital debris is a classic tragedy of the commons with cascade (Kessler) risk.",
    "stage": "any"
  },
  {
    "id": "space-d5",
    "domain": "space",
    "title": "Sell Launch to a Rival Bloc",
    "situation": "A lucrative contract would launch satellites for a state aligned against your closest partners.",
    "question": "Take the contract despite diplomatic friction?",
    "left": {
      "label": "Take the money",
      "effects": {
        "treasury": 10,
        "rdCapacity": 3,
        "politicalSupport": -7
      },
      "stance": null
    },
    "right": {
      "label": "Decline to protect alliances",
      "effects": {
        "treasury": -6,
        "politicalSupport": 5
      },
      "stance": "cooperate"
    },
    "tags": [
      "dual-use",
      "diplomacy"
    ],
    "severity": 2,
    "discussionPrompt": "Is commercial neutrality in strategic sectors realistic?",
    "educationalNote": "Launch and satellite access are strategic goods, not ordinary exports.",
    "stage": "any"
  },
  {
    "id": "semi-d1",
    "domain": "semiconductors",
    "title": "The Megafab Bet",
    "situation": "A leading-edge fab would secure a generation of leadership but costs a fifth of the national tech budget.",
    "question": "Commit massive subsidies to a domestic megafab?",
    "left": {
      "label": "Build the megafab",
      "effects": {
        "rdCapacity": 11,
        "security": 8,
        "treasury": -14,
        "energy": -6
      },
      "stance": null
    },
    "right": {
      "label": "Stay fabless / import",
      "effects": {
        "treasury": 5,
        "security": -8,
        "rdCapacity": -4
      },
      "stance": null
    },
    "tags": [
      "fabs",
      "industrial-policy"
    ],
    "severity": 3,
    "discussionPrompt": "Is sovereign chip capacity worth near-bankruptcy?",
    "educationalNote": "Leading-edge fabs cost tens of billions and concentrate risk geographically.",
    "stage": "any"
  },
  {
    "id": "semi-d2",
    "domain": "semiconductors",
    "title": "Import the Engineers",
    "situation": "Your fabs are short thousands of process engineers. A visa surge could fill the gap but local graduates protest displacement.",
    "question": "Open a fast-track visa for foreign chip engineers?",
    "left": {
      "label": "Open the visa",
      "effects": {
        "reputation": 10,
        "rdCapacity": 6,
        "politicalSupport": -7
      },
      "stance": "open"
    },
    "right": {
      "label": "Train locally only",
      "effects": {
        "reputation": -3,
        "politicalSupport": 4,
        "rdCapacity": -4
      },
      "stance": "protect"
    },
    "tags": [
      "talent",
      "immigration"
    ],
    "severity": 2,
    "discussionPrompt": "Does importing talent build capacity or hollow out local opportunity?",
    "educationalNote": "Advanced fabrication is gated by scarce tacit expertise, not just capital.",
    "stage": "any"
  },
  {
    "id": "semi-d3",
    "domain": "semiconductors",
    "title": "The Forbidden Contract",
    "situation": "A restricted buyer offers a huge order for chips that allied export controls forbid selling to them.",
    "question": "Quietly fulfill the restricted contract?",
    "left": {
      "label": "Fulfill it covertly",
      "effects": {
        "treasury": 12,
        "rdCapacity": 3,
        "politicalSupport": -10,
        "security": -5
      },
      "stance": "secrecy"
    },
    "right": {
      "label": "Comply with controls",
      "effects": {
        "treasury": -6,
        "politicalSupport": 6
      },
      "stance": "cooperate"
    },
    "tags": [
      "export-control",
      "compliance"
    ],
    "severity": 3,
    "discussionPrompt": "Where is the line between sovereign trade and breaking shared rules?",
    "educationalNote": "Export-control regimes depend on members not defecting for short-term gain.",
    "stage": "any"
  },
  {
    "id": "semi-d4",
    "domain": "semiconductors",
    "title": "Espionage Crackdown",
    "situation": "Counter-intelligence wants sweeping surveillance powers over foreign-born fab staff after a suspected IP leak.",
    "question": "Grant broad counter-espionage powers?",
    "left": {
      "label": "Grant the powers",
      "effects": {
        "security": 9,
        "reputation": -13
      },
      "stance": null
    },
    "right": {
      "label": "Targeted measures only",
      "effects": {
        "security": 2,
        "reputation": 5
      },
      "stance": null
    },
    "tags": [
      "espionage",
      "openness"
    ],
    "severity": 2,
    "discussionPrompt": "Does securitizing your workforce protect or poison your talent base?",
    "educationalNote": "Industrial espionage is real, but blanket suspicion drives away the talent it aims to protect.",
    "stage": "any"
  },
  {
    "id": "semi-d5",
    "domain": "semiconductors",
    "title": "A Fab's Thirst",
    "situation": "A new fab needs vast ultra-pure water and power during a regional drought. Farmers and towns object.",
    "question": "Guarantee the fab priority water and power?",
    "left": {
      "label": "Guarantee resources",
      "effects": {
        "rdCapacity": 7,
        "security": 5,
        "environment": -7,
        "publicWelfare": -6
      },
      "stance": null
    },
    "right": {
      "label": "Share resources fairly",
      "effects": {
        "rdCapacity": -4,
        "publicWelfare": 5,
        "environment": 3
      },
      "stance": "cooperate"
    },
    "tags": [
      "chokepoints",
      "environment"
    ],
    "severity": 2,
    "discussionPrompt": "Should strategic industry override local resource rights?",
    "educationalNote": "Fabs are among the most water- and energy-intensive facilities on earth.",
    "stage": "any"
  },
  {
    "id": "energy-d1",
    "domain": "energy",
    "title": "New Nuclear, Old Fears",
    "situation": "A new reactor fleet would secure clean baseload for decades, but a vocal public still fears nuclear accidents.",
    "question": "Commit to a national nuclear build-out?",
    "left": {
      "label": "Build the reactors",
      "effects": {
        "energy": 12,
        "environment": 6,
        "rdCapacity": 4,
        "politicalSupport": -7
      },
      "stance": null
    },
    "right": {
      "label": "Shelve nuclear",
      "effects": {
        "energy": -6,
        "politicalSupport": 4,
        "environment": -3
      },
      "stance": null
    },
    "tags": [
      "nuclear",
      "acceptance"
    ],
    "severity": 3,
    "discussionPrompt": "How should leaders weigh statistical safety against public dread?",
    "educationalNote": "Nuclear has low lifecycle emissions but uniquely high public-perception costs.",
    "stage": "any"
  },
  {
    "id": "energy-d2",
    "domain": "energy",
    "title": "Keep the Coal Plants On",
    "situation": "Demand is spiking and the cheapest fix is to extend aging coal plants for five more years.",
    "question": "Extend coal to keep the lights on?",
    "left": {
      "label": "Extend coal",
      "effects": {
        "energy": 9,
        "treasury": 4,
        "environment": -11
      },
      "stance": null
    },
    "right": {
      "label": "Retire on schedule",
      "effects": {
        "energy": -7,
        "environment": 7,
        "publicWelfare": -3
      },
      "stance": null
    },
    "tags": [
      "grid",
      "climate"
    ],
    "severity": 2,
    "discussionPrompt": "Who pays for the gap between climate pledges and present demand?",
    "educationalNote": "Energy transitions stall at the moment cheap fossil capacity must be retired early.",
    "stage": "any"
  },
  {
    "id": "energy-d3",
    "domain": "energy",
    "title": "Rationing Day",
    "situation": "A cold snap forces rationing. You can protect industrial output or residential heating, not both.",
    "question": "Prioritize industry or households during the shortage?",
    "left": {
      "label": "Protect industry",
      "effects": {
        "treasury": 6,
        "rdCapacity": 4,
        "publicWelfare": -9,
        "politicalSupport": -5
      },
      "stance": "protect"
    },
    "right": {
      "label": "Protect households",
      "effects": {
        "publicWelfare": 7,
        "politicalSupport": 4,
        "treasury": -6
      },
      "stance": "protect"
    },
    "tags": [
      "grid",
      "demand"
    ],
    "severity": 3,
    "discussionPrompt": "In a shortage, whose needs count as essential?",
    "educationalNote": "Grid prioritization decisions reveal a society's real, not stated, values.",
    "stage": "any"
  },
  {
    "id": "energy-d4",
    "domain": "energy",
    "title": "The Cross-Border Cable",
    "situation": "A regional supergrid would cut costs and smooth renewables, but ties your supply security to a neighbor.",
    "question": "Join the cross-border interconnect?",
    "left": {
      "label": "Join the supergrid",
      "effects": {
        "energy": 8,
        "treasury": 4,
        "politicalSupport": 5,
        "security": -6
      },
      "stance": "cooperate"
    },
    "right": {
      "label": "Stay self-sufficient",
      "effects": {
        "security": 5,
        "energy": -4,
        "treasury": -3
      },
      "stance": "protect"
    },
    "tags": [
      "grid",
      "sovereignty"
    ],
    "severity": 2,
    "discussionPrompt": "Is interdependence a source of resilience or vulnerability?",
    "educationalNote": "Interconnection improves efficiency but turns energy into a geopolitical lever.",
    "stage": "any"
  },
  {
    "id": "energy-d5",
    "domain": "energy",
    "title": "Solar on Every Roof",
    "situation": "Generous rooftop-solar subsidies are popular but the distribution grid can't absorb the variable supply safely.",
    "question": "Expand rooftop-solar subsidies aggressively?",
    "left": {
      "label": "Expand subsidies",
      "effects": {
        "environment": 7,
        "publicWelfare": 5,
        "energy": -5,
        "treasury": -6
      },
      "stance": null
    },
    "right": {
      "label": "Slow rollout, upgrade grid first",
      "effects": {
        "energy": 5,
        "publicWelfare": -3,
        "treasury": -3
      },
      "stance": null
    },
    "tags": [
      "renewables",
      "grid"
    ],
    "severity": 2,
    "discussionPrompt": "Should popularity or grid engineering set the pace of transition?",
    "educationalNote": "Distributed generation needs grid modernization or it destabilizes the system it greens.",
    "stage": "any"
  },
  {
    "id": "climate-d1",
    "domain": "climate",
    "title": "Tax the Smokestacks",
    "situation": "A carbon tax on heavy industry would cut emissions and fund green programs but raise costs for exporters.",
    "question": "Impose a meaningful carbon tax now?",
    "left": {
      "label": "Impose the tax",
      "effects": {
        "environment": 10,
        "treasury": 6,
        "rdCapacity": -3,
        "politicalSupport": -7
      },
      "stance": null
    },
    "right": {
      "label": "Keep industry untaxed",
      "effects": {
        "environment": -6,
        "politicalSupport": 4
      },
      "stance": null
    },
    "tags": [
      "transition",
      "industry"
    ],
    "severity": 2,
    "discussionPrompt": "Can a carbon price be both effective and politically survivable?",
    "educationalNote": "Carbon pricing is economically efficient but politically fragile without visible rebates.",
    "stage": "any"
  },
  {
    "id": "climate-d2",
    "domain": "climate",
    "title": "The Carbon-Removal Moonshot",
    "situation": "A direct-air-capture megaproject could make you a climate leader but may never reach cost-effective scale.",
    "question": "Fund the unproven carbon-removal moonshot?",
    "left": {
      "label": "Fund the moonshot",
      "effects": {
        "rdCapacity": 8,
        "environment": 5,
        "treasury": -11,
        "politicalSupport": 6
      },
      "stance": null
    },
    "right": {
      "label": "Invest in proven measures",
      "effects": {
        "environment": 6,
        "treasury": -3
      },
      "stance": null
    },
    "tags": [
      "carbon-removal",
      "risk"
    ],
    "severity": 2,
    "discussionPrompt": "When is a speculative moonshot worth public money over reliable basics?",
    "educationalNote": "Carbon removal may be essential later but risks becoming a license to delay cuts now.",
    "stage": "any"
  },
  {
    "id": "climate-d3",
    "domain": "climate",
    "title": "Managed Retreat",
    "situation": "A coastal district floods repeatedly. You can fund a costly relocation now or keep rebuilding seawalls.",
    "question": "Order a managed retreat from the flood zone?",
    "left": {
      "label": "Relocate the community",
      "effects": {
        "treasury": -10,
        "publicWelfare": 4,
        "environment": 5,
        "politicalSupport": -6
      },
      "stance": null
    },
    "right": {
      "label": "Keep defending the coast",
      "effects": {
        "treasury": -5,
        "publicWelfare": -4,
        "environment": -3
      },
      "stance": null
    },
    "tags": [
      "adaptation",
      "justice"
    ],
    "severity": 3,
    "discussionPrompt": "Who decides when a place is no longer worth defending?",
    "educationalNote": "Adaptation increasingly means hard choices about abandonment, not just defense.",
    "stage": "any"
  },
  {
    "id": "climate-d4",
    "domain": "climate",
    "title": "Green-Steel Mandate",
    "situation": "Mandating hydrogen-based green steel cuts emissions but makes your steel pricier than foreign rivals'.",
    "question": "Mandate green steel despite the cost gap?",
    "left": {
      "label": "Mandate green steel",
      "effects": {
        "environment": 9,
        "rdCapacity": 5,
        "security": -4,
        "treasury": -6
      },
      "stance": null
    },
    "right": {
      "label": "Stay cost-competitive",
      "effects": {
        "security": 4,
        "environment": -6
      },
      "stance": null
    },
    "tags": [
      "transition",
      "competitiveness"
    ],
    "severity": 2,
    "discussionPrompt": "Should one country bear transition costs while rivals undercut it?",
    "educationalNote": "First-movers on green industry risk carbon leakage without border adjustments.",
    "stage": "any"
  },
  {
    "id": "climate-d5",
    "domain": "climate",
    "title": "Pay for Their Losses",
    "situation": "A vulnerable neighbor, hit by a disaster partly driven by global emissions, asks you for climate compensation.",
    "question": "Pay into a loss-and-damage fund for the neighbor?",
    "left": {
      "label": "Pay the compensation",
      "effects": {
        "treasury": -8,
        "politicalSupport": 9,
        "publicWelfare": -3
      },
      "stance": null
    },
    "right": {
      "label": "Decline responsibility",
      "effects": {
        "treasury": 3,
        "politicalSupport": -7
      },
      "stance": null
    },
    "tags": [
      "burden-sharing",
      "justice"
    ],
    "severity": 2,
    "discussionPrompt": "What does historical responsibility for emissions obligate the powerful to do?",
    "educationalNote": "Loss-and-damage finance is among the most contested issues in climate diplomacy.",
    "stage": "any"
  },
  {
    "id": "quantum-d1",
    "domain": "quantum",
    "title": "Harvest Now, Decrypt Later",
    "situation": "Intelligence wants a crash program aimed at breaking legacy encryption used by rivals — and inevitably by allies too.",
    "question": "Launch an offensive cryptanalysis program?",
    "left": {
      "label": "Launch the program",
      "effects": {
        "rdCapacity": 8,
        "security": 7,
        "politicalSupport": -7,
        "reputation": -5
      },
      "stance": null
    },
    "right": {
      "label": "Focus on defense",
      "effects": {
        "security": 4,
        "politicalSupport": 3,
        "rdCapacity": -3
      },
      "stance": null
    },
    "tags": [
      "crypto",
      "dual-use"
    ],
    "severity": 3,
    "discussionPrompt": "Does building a code-breaking capability make everyone less safe?",
    "educationalNote": "Quantum threatens current public-key cryptography, spurring a covert decrypt-later race.",
    "stage": "any"
  },
  {
    "id": "quantum-d2",
    "domain": "quantum",
    "title": "Post-Quantum Migration",
    "situation": "Migrating all national systems to post-quantum cryptography is costly and disruptive but the threat clock is ticking.",
    "question": "Mandate an immediate post-quantum migration?",
    "left": {
      "label": "Migrate now",
      "effects": {
        "security": 9,
        "treasury": -8,
        "rdCapacity": 4
      },
      "stance": null
    },
    "right": {
      "label": "Delay migration",
      "effects": {
        "treasury": 3,
        "security": -8
      },
      "stance": null
    },
    "tags": [
      "crypto",
      "infrastructure"
    ],
    "severity": 2,
    "discussionPrompt": "How do institutions act on a threat whose timing is uncertain?",
    "educationalNote": "Data stolen today can be decrypted once quantum computers mature — a present risk.",
    "stage": "any"
  },
  {
    "id": "quantum-d3",
    "domain": "quantum",
    "title": "Poach the Pioneers",
    "situation": "You can lure a rival's entire star quantum team with extraordinary packages — and the knowledge they carry.",
    "question": "Aggressively poach the rival quantum team?",
    "left": {
      "label": "Poach the team",
      "effects": {
        "reputation": 11,
        "rdCapacity": 7,
        "politicalSupport": -6,
        "treasury": -7
      },
      "stance": "compete"
    },
    "right": {
      "label": "Grow your own",
      "effects": {
        "reputation": 3,
        "treasury": -2,
        "politicalSupport": 2
      },
      "stance": "protect"
    },
    "tags": [
      "talent",
      "standards"
    ],
    "severity": 2,
    "discussionPrompt": "Is talent competition fair game or a form of theft?",
    "educationalNote": "In deep-tech fields a handful of people can embody a national capability.",
    "stage": "any"
  },
  {
    "id": "quantum-d4",
    "domain": "quantum",
    "title": "Classify the Lab",
    "situation": "Generals want your most advanced quantum research classified, cutting it off from international peer review.",
    "question": "Classify your frontier quantum research?",
    "left": {
      "label": "Classify it",
      "effects": {
        "security": 8,
        "reputation": -10,
        "politicalSupport": -4,
        "rdCapacity": -3
      },
      "stance": "protect"
    },
    "right": {
      "label": "Keep it open",
      "effects": {
        "reputation": 7,
        "politicalSupport": 4,
        "security": -6
      },
      "stance": "open"
    },
    "tags": [
      "dual-use",
      "openness"
    ],
    "severity": 2,
    "discussionPrompt": "Does secrecy accelerate or strangle frontier science?",
    "educationalNote": "Classified science loses the error-correcting power of open peer review.",
    "stage": "any"
  },
  {
    "id": "quantum-d5",
    "domain": "quantum",
    "title": "Quantum Eyes",
    "situation": "Quantum sensing could map submarines and underground sites with unprecedented precision — a strategic and destabilizing edge.",
    "question": "Field quantum sensing for military mapping?",
    "left": {
      "label": "Field the sensors",
      "effects": {
        "security": 9,
        "rdCapacity": 5,
        "politicalSupport": -5
      },
      "stance": null
    },
    "right": {
      "label": "Restrict to civilian use",
      "effects": {
        "politicalSupport": 4,
        "rdCapacity": 2,
        "security": -3
      },
      "stance": "protect"
    },
    "tags": [
      "sensing",
      "dual-use"
    ],
    "severity": 2,
    "discussionPrompt": "Can a destabilizing capability be developed responsibly?",
    "educationalNote": "Sensing breakthroughs can quietly upset strategic stability (e.g., undersea deterrence).",
    "stage": "any"
  },
  {
    "id": "bio-d1",
    "domain": "biotech",
    "title": "The National Biobank",
    "situation": "A national genomic biobank could accelerate medicine, but participation pressure on citizens raises consent concerns.",
    "question": "Build a large national genomic biobank?",
    "left": {
      "label": "Build the biobank",
      "effects": {
        "rdCapacity": 9,
        "reputation": 4,
        "publicWelfare": -7
      },
      "stance": null
    },
    "right": {
      "label": "Opt-in, small scale",
      "effects": {
        "publicWelfare": 5,
        "rdCapacity": -3
      },
      "stance": null
    },
    "tags": [
      "genomics",
      "ethics"
    ],
    "severity": 2,
    "discussionPrompt": "Can genomic consent be meaningful when benefits are collective?",
    "educationalNote": "Genomic data is uniquely identifying and implicates relatives who never consented.",
    "stage": "any"
  },
  {
    "id": "bio-d2",
    "domain": "biotech",
    "title": "Fast-Track the Cure",
    "situation": "A gene therapy shows dramatic early results. Patients demand access; regulators want years more safety data.",
    "question": "Grant emergency fast-track approval?",
    "left": {
      "label": "Fast-track approval",
      "effects": {
        "publicWelfare": 2,
        "rdCapacity": 5,
        "politicalSupport": -3
      },
      "stance": null
    },
    "right": {
      "label": "Require full trials",
      "effects": {
        "publicWelfare": 5,
        "rdCapacity": -4,
        "politicalSupport": 2
      },
      "stance": null
    },
    "tags": [
      "drug-access",
      "safety"
    ],
    "severity": 3,
    "discussionPrompt": "Whose risk tolerance should govern access to experimental therapies?",
    "educationalNote": "Compassionate access and rigorous safety are in genuine, not fake, tension.",
    "stage": "any"
  },
  {
    "id": "bio-d3",
    "domain": "biotech",
    "title": "Gain-of-Function Oversight",
    "situation": "A lab proposes enhancing a pathogen to study pandemic risk. The science is valuable; the accident risk is real.",
    "question": "Permit the gain-of-function research?",
    "left": {
      "label": "Permit with oversight",
      "effects": {
        "rdCapacity": 6,
        "security": -8,
        "politicalSupport": -4
      },
      "stance": null
    },
    "right": {
      "label": "Ban the research",
      "effects": {
        "security": 6,
        "rdCapacity": -4,
        "politicalSupport": 3
      },
      "stance": "protect"
    },
    "tags": [
      "biosecurity",
      "ethics"
    ],
    "severity": 3,
    "discussionPrompt": "Is some knowledge too dangerous to pursue?",
    "educationalNote": "Dual-use life-science research sits at the center of biosecurity governance debates.",
    "stage": "any"
  },
  {
    "id": "bio-d4",
    "domain": "biotech",
    "title": "GM Crops vs Public Fear",
    "situation": "Drought-resistant GM crops could secure food supply, but consumer groups fuel a fierce backlash.",
    "question": "Approve nationwide GM crop cultivation?",
    "left": {
      "label": "Approve GM crops",
      "effects": {
        "publicWelfare": 0,
        "security": 5,
        "environment": 2
      },
      "stance": null
    },
    "right": {
      "label": "Maintain the ban",
      "effects": {
        "publicWelfare": 0,
        "security": -3
      },
      "stance": "protect"
    },
    "tags": [
      "agri",
      "ethics"
    ],
    "severity": 2,
    "discussionPrompt": "How should policy weigh evidence against public sentiment?",
    "educationalNote": "GM debates show how risk perception can diverge sharply from scientific consensus.",
    "stage": "any"
  },
  {
    "id": "bio-d5",
    "domain": "biotech",
    "title": "Price of a Lifesaver",
    "situation": "Your firm developed a breakthrough drug. Licensing it cheaply to poorer nations builds goodwill but forfeits revenue.",
    "question": "License the lifesaving drug at low cost globally?",
    "left": {
      "label": "License cheaply",
      "effects": {
        "politicalSupport": 9,
        "treasury": -7,
        "publicWelfare": 4
      },
      "stance": null
    },
    "right": {
      "label": "Maximize revenue",
      "effects": {
        "treasury": 9,
        "politicalSupport": -7
      },
      "stance": null
    },
    "tags": [
      "drug-access",
      "justice"
    ],
    "severity": 2,
    "discussionPrompt": "Do innovators owe their breakthroughs to humanity or to investors?",
    "educationalNote": "Access-vs-incentive tension underlies most global pharmaceutical disputes.",
    "stage": "any"
  },
  {
    "id": "robo-d1",
    "domain": "robotics",
    "title": "Automate the Ports",
    "situation": "Full port automation would slash costs and boost throughput, but dockworker unions threaten a national strike.",
    "question": "Automate the major ports now?",
    "left": {
      "label": "Automate the ports",
      "effects": {
        "rdCapacity": 7,
        "security": 8,
        "publicWelfare": -7,
        "politicalSupport": -6
      },
      "stance": null
    },
    "right": {
      "label": "Negotiate slow transition",
      "effects": {
        "security": 2,
        "publicWelfare": 3,
        "treasury": -4
      },
      "stance": null
    },
    "tags": [
      "automation",
      "labor"
    ],
    "severity": 2,
    "discussionPrompt": "Who captures the gains of automation, and who bears the losses?",
    "educationalNote": "Port automation is a recurring flashpoint between efficiency and labor power.",
    "stage": "any"
  },
  {
    "id": "robo-d2",
    "domain": "robotics",
    "title": "Export the Drones",
    "situation": "A foreign buyer wants your autonomous-capable drones. Civilian on paper, easily weaponized in practice.",
    "question": "Approve the autonomous-drone export?",
    "left": {
      "label": "Approve the export",
      "effects": {
        "treasury": 9,
        "rdCapacity": 3,
        "politicalSupport": -8,
        "security": -3
      },
      "stance": "open"
    },
    "right": {
      "label": "Block the export",
      "effects": {
        "politicalSupport": 5,
        "treasury": -5
      },
      "stance": "protect"
    },
    "tags": [
      "autonomous-weapons",
      "dual-use"
    ],
    "severity": 3,
    "discussionPrompt": "Should engineers be responsible for downstream uses of what they build?",
    "educationalNote": "Autonomous-weapon norms lag far behind the technology's diffusion.",
    "stage": "any"
  },
  {
    "id": "robo-d3",
    "domain": "robotics",
    "title": "Robots for the Elderly",
    "situation": "Care robots could ease a caregiver shortage in an aging society, but critics warn of replacing human dignity with machines.",
    "question": "Subsidize care robots at national scale?",
    "left": {
      "label": "Subsidize care robots",
      "effects": {
        "publicWelfare": 3,
        "rdCapacity": 5,
        "treasury": -5
      },
      "stance": null
    },
    "right": {
      "label": "Invest in human carers",
      "effects": {
        "publicWelfare": 4,
        "reputation": 3,
        "treasury": -6
      },
      "stance": null
    },
    "tags": [
      "care",
      "ethics"
    ],
    "severity": 2,
    "discussionPrompt": "Where should automation stop short of human relationships?",
    "educationalNote": "Care robotics raises questions of dignity that pure efficiency metrics miss.",
    "stage": "any"
  },
  {
    "id": "robo-d4",
    "domain": "robotics",
    "title": "Certify or Accelerate",
    "situation": "Mandatory safety certification for industrial robots would prevent accidents but slow your fast-moving startups.",
    "question": "Impose strict robot-safety certification?",
    "left": {
      "label": "Mandate certification",
      "effects": {
        "publicWelfare": 6,
        "politicalSupport": 4,
        "rdCapacity": -5,
        "treasury": -3
      },
      "stance": null
    },
    "right": {
      "label": "Light-touch rules",
      "effects": {
        "rdCapacity": 6,
        "publicWelfare": -5
      },
      "stance": null
    },
    "tags": [
      "safety",
      "regulation"
    ],
    "severity": 2,
    "discussionPrompt": "Does regulation protect the public or entrench incumbents?",
    "educationalNote": "Safety regimes shape who can compete as much as how safe products are.",
    "stage": "any"
  },
  {
    "id": "robo-d5",
    "domain": "robotics",
    "title": "Military Robotics Pact",
    "situation": "The defense sector offers deep funding to militarize your robotics base — money and capability, at a reputational cost.",
    "question": "Enter a major military-robotics partnership?",
    "left": {
      "label": "Enter the partnership",
      "effects": {
        "treasury": 9,
        "security": 7,
        "rdCapacity": 5,
        "politicalSupport": -8
      },
      "stance": "cooperate"
    },
    "right": {
      "label": "Stay civilian-focused",
      "effects": {
        "politicalSupport": 5,
        "treasury": -4
      },
      "stance": null
    },
    "tags": [
      "autonomous-weapons",
      "dual-use"
    ],
    "severity": 2,
    "discussionPrompt": "Can a robotics ecosystem stay civilian once militarized money arrives?",
    "educationalNote": "Defense funding often becomes the dominant shaper of a tech base's direction.",
    "stage": "any"
  },
  {
    "id": "mat-d1",
    "domain": "materials",
    "title": "Open the Rare-Earth Mine",
    "situation": "A domestic rare-earth mine would end import dependence but devastate a pristine valley with toxic tailings.",
    "question": "Open the rare-earth mine?",
    "left": {
      "label": "Open the mine",
      "effects": {
        "security": 10,
        "rdCapacity": 4,
        "environment": -11,
        "publicWelfare": -4
      },
      "stance": "open"
    },
    "right": {
      "label": "Keep importing",
      "effects": {
        "environment": 4,
        "security": -7
      },
      "stance": null
    },
    "tags": [
      "rare-earths",
      "supply-security"
    ],
    "severity": 3,
    "discussionPrompt": "Is resource independence worth domestic environmental sacrifice?",
    "educationalNote": "Rare-earth processing is geographically concentrated largely due to its pollution.",
    "stage": "any"
  },
  {
    "id": "mat-d2",
    "domain": "materials",
    "title": "Strategic Stockpile",
    "situation": "Building a critical-minerals stockpile buffers future shocks but ties up capital with no immediate return.",
    "question": "Fund a large critical-minerals stockpile?",
    "left": {
      "label": "Build the stockpile",
      "effects": {
        "security": 13,
        "treasury": -8
      },
      "stance": "protect"
    },
    "right": {
      "label": "Stay lean",
      "effects": {
        "treasury": 4,
        "security": -6
      },
      "stance": null
    },
    "tags": [
      "supply-security",
      "resilience"
    ],
    "severity": 2,
    "discussionPrompt": "How much should a state pay for insurance against an uncertain shock?",
    "educationalNote": "Stockpiles trade present capital for future resilience — hard to value until a crisis.",
    "stage": "any"
  },
  {
    "id": "mat-d3",
    "domain": "materials",
    "title": "The Gigafactory",
    "situation": "A battery gigafactory promises tens of thousands of jobs but sits on a sensitive aquifer.",
    "question": "Fast-track the battery gigafactory?",
    "left": {
      "label": "Fast-track it",
      "effects": {
        "security": 8,
        "treasury": 6,
        "publicWelfare": 4,
        "environment": -9
      },
      "stance": null
    },
    "right": {
      "label": "Demand stricter siting",
      "effects": {
        "environment": 4,
        "treasury": -5,
        "security": -3
      },
      "stance": null
    },
    "tags": [
      "batteries",
      "scale-up"
    ],
    "severity": 2,
    "discussionPrompt": "How do you weigh concentrated jobs against diffuse environmental risk?",
    "educationalNote": "Battery manufacturing is central to electrification but resource- and water-intensive.",
    "stage": "any"
  },
  {
    "id": "mat-d4",
    "domain": "materials",
    "title": "Mine or Recycle",
    "situation": "A urban-mining recycling program is cleaner but currently more expensive than importing virgin material.",
    "question": "Mandate recycled-content sourcing despite higher cost?",
    "left": {
      "label": "Mandate recycling",
      "effects": {
        "environment": 8,
        "rdCapacity": 3,
        "treasury": -6,
        "security": 2
      },
      "stance": null
    },
    "right": {
      "label": "Use cheapest source",
      "effects": {
        "treasury": 4,
        "environment": -5
      },
      "stance": null
    },
    "tags": [
      "scale-up",
      "circular"
    ],
    "severity": 2,
    "discussionPrompt": "Can circular-economy mandates survive a cost disadvantage?",
    "educationalNote": "Recycling critical materials reduces dependence but rarely competes on price yet.",
    "stage": "any"
  },
  {
    "id": "mat-d5",
    "domain": "materials",
    "title": "Weaponize the Supply",
    "situation": "You dominate a key material. Cutting off a rival would hurt them badly — and invite retaliation and distrust.",
    "question": "Use your material dominance as a weapon?",
    "left": {
      "label": "Restrict the rival",
      "effects": {
        "security": 2,
        "politicalSupport": -9,
        "treasury": -4
      },
      "stance": "protect"
    },
    "right": {
      "label": "Keep markets open",
      "effects": {
        "politicalSupport": 6,
        "treasury": 4
      },
      "stance": "open"
    },
    "tags": [
      "supply-security",
      "coercion"
    ],
    "severity": 3,
    "discussionPrompt": "Does economic coercion ever pay off long-term?",
    "educationalNote": "Weaponized interdependence often accelerates rivals' drive to de-risk away from you.",
    "stage": "any"
  },
  {
    "id": "gen-d1",
    "domain": "general",
    "title": "Brain Drain",
    "situation": "Your best researchers are leaving for richer foreign labs. Some want exit restrictions; others say only openness will lure them back.",
    "question": "Restrict talent outflow or double down on openness?",
    "left": {
      "label": "Restrict outflow",
      "effects": {
        "reputation": -4,
        "politicalSupport": -5
      },
      "stance": "protect"
    },
    "right": {
      "label": "Improve openness & pay",
      "effects": {
        "reputation": 13,
        "treasury": -7
      },
      "stance": "open"
    },
    "tags": [
      "talent",
      "openness"
    ],
    "severity": 2,
    "discussionPrompt": "Can you retain talent by force, or only by being worth staying for?",
    "educationalNote": "Coercive retention tends to accelerate the very exodus it tries to stop.",
    "stage": "any"
  },
  {
    "id": "gen-d2",
    "domain": "general",
    "title": "Elite Capture?",
    "situation": "A breakthrough lab needs emergency public funding. The public sees rescuing wealthy founders with taxpayer money.",
    "question": "Bail out the strategic lab with public funds?",
    "left": {
      "label": "Fund the rescue",
      "effects": {
        "rdCapacity": 7,
        "treasury": -8,
        "publicWelfare": -6
      },
      "stance": null
    },
    "right": {
      "label": "Let it fail",
      "effects": {
        "rdCapacity": -6,
        "publicWelfare": 3,
        "treasury": 2
      },
      "stance": null
    },
    "tags": [
      "funding",
      "legitimacy"
    ],
    "severity": 2,
    "discussionPrompt": "When is strategic industry policy, and when is it elite welfare?",
    "educationalNote": "Public support for strategic sectors constantly risks being seen as capture.",
    "stage": "any"
  },
  {
    "id": "gen-d3",
    "domain": "general",
    "title": "The Engineers' Strike",
    "situation": "Skilled technical workers strike over pay and overwork as you push an aggressive tech agenda.",
    "question": "Concede to the striking engineers?",
    "left": {
      "label": "Meet their demands",
      "effects": {
        "reputation": 6,
        "publicWelfare": 4,
        "treasury": -7
      },
      "stance": null
    },
    "right": {
      "label": "Hold the line",
      "effects": {
        "treasury": 3,
        "reputation": -6,
        "rdCapacity": -3
      },
      "stance": null
    },
    "tags": [
      "labor",
      "talent"
    ],
    "severity": 2,
    "discussionPrompt": "Is your tech ambition built on sustainable working conditions?",
    "educationalNote": "Burnout in critical technical workforces is a quiet strategic vulnerability.",
    "stage": "any"
  },
  {
    "id": "gen-d4",
    "domain": "general",
    "title": "Scandal in the Flagship",
    "situation": "Auditors find funds misused in your flagship tech program. Going public costs trust now; covering up risks a worse scandal later.",
    "question": "Disclose the scandal fully?",
    "left": {
      "label": "Full transparency",
      "effects": {
        "publicWelfare": 6,
        "politicalSupport": -2
      },
      "stance": "open"
    },
    "right": {
      "label": "Quietly contain it",
      "effects": {
        "politicalSupport": -1,
        "publicWelfare": -8
      },
      "stance": "secrecy"
    },
    "tags": [
      "legitimacy",
      "governance"
    ],
    "severity": 2,
    "discussionPrompt": "Does transparency strengthen institutions even when it stings?",
    "educationalNote": "Cover-ups compound: the second scandal is usually the concealment.",
    "stage": "any"
  },
  {
    "id": "gen-d5",
    "domain": "general",
    "title": "Strings Attached",
    "situation": "A foreign sovereign fund offers huge investment in your tech sector — with board seats and data-access conditions.",
    "question": "Accept the conditional foreign investment?",
    "left": {
      "label": "Take the investment",
      "effects": {
        "treasury": 11,
        "rdCapacity": 5,
        "security": -7,
        "politicalSupport": -3
      },
      "stance": null
    },
    "right": {
      "label": "Decline the strings",
      "effects": {
        "security": 4,
        "treasury": -4
      },
      "stance": null
    },
    "tags": [
      "funding",
      "sovereignty"
    ],
    "severity": 2,
    "discussionPrompt": "What sovereignty do you trade away for capital?",
    "educationalNote": "Strategic investment can be a Trojan horse for influence and data access.",
    "stage": "any"
  },
  {
    "id": "gen-d6",
    "domain": "general",
    "title": "Referendum on Spending",
    "situation": "Citizens demand a referendum on whether so much budget should go to frontier tech instead of schools and clinics.",
    "question": "Hold the binding referendum?",
    "left": {
      "label": "Hold the referendum",
      "effects": {
        "publicWelfare": 6,
        "politicalSupport": 3,
        "rdCapacity": -5
      },
      "stance": null
    },
    "right": {
      "label": "Decide top-down",
      "effects": {
        "rdCapacity": 4,
        "publicWelfare": -6,
        "politicalSupport": -3
      },
      "stance": null
    },
    "tags": [
      "legitimacy",
      "democracy"
    ],
    "severity": 2,
    "discussionPrompt": "Should long-horizon tech bets be subject to short-horizon votes?",
    "educationalNote": "Democratic legitimacy and long-term strategy are often in tension.",
    "stage": "any"
  },
  {
    "id": "gen-d7",
    "domain": "general",
    "title": "The Whistleblower",
    "situation": "An engineer reveals your team skipped a safety step to hit a deadline. Punishing them silences others; protecting them admits fault.",
    "question": "Protect the whistleblower?",
    "left": {
      "label": "Protect and reform",
      "effects": {
        "publicWelfare": 7,
        "politicalSupport": 1
      },
      "stance": "protect"
    },
    "right": {
      "label": "Discredit them",
      "effects": {
        "politicalSupport": -3,
        "publicWelfare": -9
      },
      "stance": null
    },
    "tags": [
      "governance",
      "ethics"
    ],
    "severity": 2,
    "discussionPrompt": "What does a society's treatment of whistleblowers reveal about it?",
    "educationalNote": "Whistleblower protection is a leading indicator of genuine safety culture.",
    "stage": "any"
  },
  {
    "id": "gen-d8",
    "domain": "general",
    "title": "Direct the Universities",
    "situation": "The government wants to steer university research toward national-priority tech, overriding academic autonomy.",
    "question": "Direct university research by decree?",
    "left": {
      "label": "Direct research",
      "effects": {
        "rdCapacity": 6,
        "reputation": -10
      },
      "stance": null
    },
    "right": {
      "label": "Preserve autonomy",
      "effects": {
        "reputation": 10,
        "rdCapacity": -3
      },
      "stance": "protect"
    },
    "tags": [
      "openness",
      "governance"
    ],
    "severity": 2,
    "discussionPrompt": "Does directing science accelerate priorities or kill the curiosity that fuels it?",
    "educationalNote": "Mission-directed research and curiosity-driven science each produce different breakthroughs.",
    "stage": "any"
  },
  {
    "id": "gen-d9",
    "domain": "general",
    "title": "Misinformation Wave",
    "situation": "A viral misinformation campaign falsely claims your flagship technology is harming people. Trust is eroding fast.",
    "question": "Aggressively counter the misinformation?",
    "left": {
      "label": "Launch counter-campaign",
      "effects": {
        "publicWelfare": 5,
        "treasury": -5,
        "politicalSupport": 2
      },
      "stance": null
    },
    "right": {
      "label": "Let facts speak slowly",
      "effects": {
        "publicWelfare": -6,
        "politicalSupport": -3
      },
      "stance": null
    },
    "tags": [
      "legitimacy",
      "communication"
    ],
    "severity": 2,
    "discussionPrompt": "How should technical institutions defend truth without seeming propagandistic?",
    "educationalNote": "Public understanding lagging technology is itself a strategic vulnerability.",
    "stage": "any"
  },
  {
    "id": "gen-d10",
    "domain": "general",
    "title": "Tax Cut or R&D",
    "situation": "A budget surplus could fund popular tax cuts or a long-term research endowment. One wins votes; one builds the future.",
    "question": "Invest the surplus in long-term R&D?",
    "left": {
      "label": "Invest in R&D",
      "effects": {
        "rdCapacity": 6,
        "reputation": 4,
        "politicalSupport": -5
      },
      "stance": null
    },
    "right": {
      "label": "Cut taxes",
      "effects": {
        "politicalSupport": 6,
        "publicWelfare": 4,
        "rdCapacity": -4
      },
      "stance": null
    },
    "tags": [
      "funding",
      "democracy"
    ],
    "severity": 1,
    "discussionPrompt": "How do democracies fund things whose payoff outlasts an election cycle?",
    "educationalNote": "R&D underinvestment is a classic failure of short political time horizons.",
    "stage": "any"
  },
  {
    "id": "gen-d11",
    "domain": "general",
    "title": "Welcome the Diaspora",
    "situation": "A program to lure home expatriate scientists with grants and labs is costly and risks resentment from those who stayed.",
    "question": "Fund an aggressive diaspora-return program?",
    "left": {
      "label": "Fund the return",
      "effects": {
        "reputation": 9,
        "rdCapacity": 4,
        "treasury": -7,
        "politicalSupport": -3
      },
      "stance": null
    },
    "right": {
      "label": "Invest in those who stayed",
      "effects": {
        "reputation": 4,
        "politicalSupport": 3,
        "treasury": -4
      },
      "stance": null
    },
    "tags": [
      "talent",
      "openness"
    ],
    "severity": 1,
    "discussionPrompt": "How do you grow talent without devaluing loyalty?",
    "educationalNote": "Reverse brain-drain programs can rapidly rebuild capability if managed fairly.",
    "stage": "any"
  },
  {
    "id": "gen-d12",
    "domain": "general",
    "title": "The Sovereign Bet",
    "situation": "Advisors urge concentrating most of your sovereign fund into your chosen domain for a decisive lead — or ruin.",
    "question": "Concentrate the sovereign fund on your domain?",
    "left": {
      "label": "Go all-in",
      "effects": {
        "rdCapacity": 10,
        "treasury": -6,
        "security": -6
      },
      "stance": null
    },
    "right": {
      "label": "Diversify prudently",
      "effects": {
        "treasury": 4,
        "rdCapacity": -3,
        "security": 3
      },
      "stance": null
    },
    "tags": [
      "funding",
      "risk"
    ],
    "severity": 2,
    "discussionPrompt": "When is strategic concentration courageous and when is it reckless?",
    "educationalNote": "Concentration can win a race or magnify a single point of failure.",
    "stage": "any"
  },
  {
    "id": "utokyo-s1",
    "domain": "general",
    "title": "The Import Squeeze",
    "situation": "As an energy importer, a supplier's price hike threatens your industry. Restarting idled reactors would help but reopens old wounds.",
    "question": "Restart idled nuclear capacity to cut import dependence?",
    "left": {
      "label": "Restart reactors",
      "effects": {
        "energy": 12,
        "rdCapacity": 3,
        "politicalSupport": -7,
        "environment": 3
      },
      "stance": null
    },
    "right": {
      "label": "Pay the import premium",
      "effects": {
        "treasury": -8,
        "politicalSupport": 3
      },
      "stance": null
    },
    "tags": [
      "energy",
      "sovereignty"
    ],
    "severity": 2,
    "discussionPrompt": "How should a resource-poor democracy balance energy security and public fear?",
    "educationalNote": "Energy-import dependence shapes the strategic options of advanced manufacturing states.",
    "stage": "any"
  },
  {
    "id": "utokyo-s2",
    "domain": "general",
    "title": "Precision IP Leak",
    "situation": "A retiring master engineer is being courted by a rival to transfer decades of tacit manufacturing know-how.",
    "question": "Offer extraordinary retention terms to keep the expertise home?",
    "left": {
      "label": "Retain at high cost",
      "effects": {
        "security": 6,
        "reputation": 5,
        "treasury": -8
      },
      "stance": null
    },
    "right": {
      "label": "Let knowledge flow",
      "effects": {
        "reputation": 4,
        "security": -7,
        "politicalSupport": 2
      },
      "stance": "open"
    },
    "tags": [
      "talent",
      "supply-security"
    ],
    "severity": 2,
    "discussionPrompt": "Can tacit knowledge be owned, or does it inevitably diffuse?",
    "educationalNote": "Manufacturing edge often lives in irreplaceable tacit expertise, not patents.",
    "stage": "any"
  },
  {
    "id": "utokyo-s3",
    "domain": "general",
    "title": "The Demographic Cliff",
    "situation": "An aging workforce is shrinking your engineering base. Large-scale skilled immigration is the obvious fix but politically fraught.",
    "question": "Open the door to large-scale skilled immigration?",
    "left": {
      "label": "Open immigration",
      "effects": {
        "reputation": 10,
        "rdCapacity": 4,
        "politicalSupport": -8
      },
      "stance": "open"
    },
    "right": {
      "label": "Automate instead",
      "effects": {
        "rdCapacity": 5,
        "publicWelfare": -3,
        "treasury": -5
      },
      "stance": null
    },
    "tags": [
      "talent",
      "automation"
    ],
    "severity": 2,
    "discussionPrompt": "Demographics or machines — how should an aging society sustain its tech base?",
    "educationalNote": "Aging societies face a stark choice between migration and automation.",
    "stage": "any"
  },
  {
    "id": "utokyo-s4",
    "domain": "general",
    "title": "Disaster-Resilience Tech",
    "situation": "A disaster-prone homeland could pioneer world-leading resilience technology — at significant upfront cost.",
    "question": "Invest heavily in disaster-resilience R&D?",
    "left": {
      "label": "Lead on resilience",
      "effects": {
        "rdCapacity": 5,
        "publicWelfare": 6,
        "politicalSupport": 5,
        "treasury": -8
      },
      "stance": null
    },
    "right": {
      "label": "Defer the spending",
      "effects": {
        "treasury": 3,
        "publicWelfare": -5
      },
      "stance": null
    },
    "tags": [
      "resilience",
      "public-good"
    ],
    "severity": 1,
    "discussionPrompt": "Can vulnerability be turned into technological leadership?",
    "educationalNote": "Necessity-driven innovation can become a durable export advantage.",
    "stage": "any"
  },
  {
    "id": "utokyo-s5",
    "domain": "general",
    "title": "Robot Ethics Standard",
    "situation": "As a robotics leader you can set a strict humane-use standard that may handicap exports but builds moral authority.",
    "question": "Adopt a strict humane-robotics export standard?",
    "left": {
      "label": "Adopt the standard",
      "effects": {
        "politicalSupport": 9,
        "rdCapacity": -3,
        "treasury": -4
      },
      "stance": "cooperate"
    },
    "right": {
      "label": "Compete unconstrained",
      "effects": {
        "treasury": 6,
        "rdCapacity": 3,
        "politicalSupport": -6
      },
      "stance": "compete"
    },
    "tags": [
      "ethics",
      "standards"
    ],
    "severity": 1,
    "discussionPrompt": "Can a country lead by example when rivals won't follow?",
    "educationalNote": "Standard-setting is a form of soft power if a country has market weight.",
    "stage": "any"
  },
  {
    "id": "nus-s1",
    "domain": "general",
    "title": "Talent Visa Backlash",
    "situation": "Your open-door talent policy fuels growth but locals protest that foreigners take the best jobs.",
    "question": "Maintain the wide-open talent visa?",
    "left": {
      "label": "Keep it open",
      "effects": {
        "reputation": 8,
        "rdCapacity": 5,
        "politicalSupport": -7
      },
      "stance": "open"
    },
    "right": {
      "label": "Tighten quotas",
      "effects": {
        "politicalSupport": 5,
        "reputation": -10
      },
      "stance": "protect"
    },
    "tags": [
      "talent",
      "openness"
    ],
    "severity": 2,
    "discussionPrompt": "How does a small open hub balance growth against local belonging?",
    "educationalNote": "Openness is a small state's superpower and its political flashpoint.",
    "stage": "any"
  },
  {
    "id": "nus-s2",
    "domain": "general",
    "title": "Overexposed Fund",
    "situation": "Your sovereign fund is heavily invested in one foreign tech bloc. A downturn there would hit you hard.",
    "question": "Rebalance the sovereign fund away from concentration risk?",
    "left": {
      "label": "Rebalance",
      "effects": {
        "treasury": -4,
        "security": 9
      },
      "stance": null
    },
    "right": {
      "label": "Ride the position",
      "effects": {
        "treasury": 6,
        "security": -6
      },
      "stance": null
    },
    "tags": [
      "funding",
      "resilience"
    ],
    "severity": 1,
    "discussionPrompt": "How much return should a small state forgo for resilience?",
    "educationalNote": "Financial concentration is a quiet form of strategic dependence.",
    "stage": "any"
  },
  {
    "id": "nus-s3",
    "domain": "general",
    "title": "The Neutral Data Hub",
    "situation": "Both major blocs want your data center to host their cloud — but each demands you exclude the other.",
    "question": "Insist on staying neutral to both blocs?",
    "left": {
      "label": "Stay neutral",
      "effects": {
        "politicalSupport": 8,
        "treasury": -5,
        "reputation": 4
      },
      "stance": null
    },
    "right": {
      "label": "Pick the richer bloc",
      "effects": {
        "treasury": 9,
        "politicalSupport": -7,
        "security": -3
      },
      "stance": "cooperate"
    },
    "tags": [
      "sovereignty",
      "diplomacy"
    ],
    "severity": 2,
    "discussionPrompt": "Is neutrality sustainable when great powers demand a choice?",
    "educationalNote": "Hedging between blocs is a classic small-state strategy with shrinking room.",
    "stage": "any"
  },
  {
    "id": "nus-s4",
    "domain": "general",
    "title": "Water and Power Limits",
    "situation": "Your tech ambitions are bumping against hard physical limits of water and land in a tiny territory.",
    "question": "Invest massively in desalination and offshore energy?",
    "left": {
      "label": "Build hard infrastructure",
      "effects": {
        "energy": 7,
        "environment": -3,
        "treasury": -9
      },
      "stance": null
    },
    "right": {
      "label": "Cap tech growth",
      "effects": {
        "rdCapacity": -5,
        "environment": 4,
        "treasury": 3
      },
      "stance": null
    },
    "tags": [
      "resource",
      "scale-up"
    ],
    "severity": 2,
    "discussionPrompt": "Can ingenuity indefinitely outrun physical constraints?",
    "educationalNote": "Small states substitute engineering and capital for scarce natural endowments.",
    "stage": "any"
  },
  {
    "id": "nus-s5",
    "domain": "general",
    "title": "The Contested Lab",
    "situation": "A world-class but ethically controversial research lab wants to relocate to your hub, bringing prestige and scrutiny.",
    "question": "Host the controversial frontier lab?",
    "left": {
      "label": "Host it",
      "effects": {
        "rdCapacity": 8,
        "reputation": 5,
        "politicalSupport": -5,
        "publicWelfare": -4
      },
      "stance": "cooperate"
    },
    "right": {
      "label": "Decline politely",
      "effects": {
        "politicalSupport": 4,
        "rdCapacity": -3
      },
      "stance": null
    },
    "tags": [
      "openness",
      "ethics"
    ],
    "severity": 2,
    "discussionPrompt": "Does hosting frontier work make you a leader or a liability?",
    "educationalNote": "Research hubs attract both breakthroughs and the controversies that follow them.",
    "stage": "any"
  },
  {
    "id": "hkust-s1",
    "domain": "general",
    "title": "Capital Flight Warning",
    "situation": "Geopolitical jitters trigger early signs of capital leaving your financial-tech gateway.",
    "question": "Impose stabilizing capital controls?",
    "left": {
      "label": "Impose controls",
      "effects": {
        "treasury": 5,
        "security": 4,
        "politicalSupport": -7,
        "reputation": -4
      },
      "stance": "protect"
    },
    "right": {
      "label": "Keep markets free",
      "effects": {
        "politicalSupport": 5,
        "treasury": -7
      },
      "stance": "open"
    },
    "tags": [
      "funding",
      "sovereignty"
    ],
    "severity": 2,
    "discussionPrompt": "Does stability bought with controls preserve or undermine a financial hub?",
    "educationalNote": "Capital controls protect short-term stability at long-term reputational cost.",
    "stage": "any"
  },
  {
    "id": "hkust-s2",
    "domain": "general",
    "title": "Caught in the Crossfire",
    "situation": "Rival blocs' export controls put your re-export business in the middle. Complying with one angers the other.",
    "question": "Align your export regime with the larger market?",
    "left": {
      "label": "Align with the bloc",
      "effects": {
        "treasury": 7,
        "politicalSupport": -4,
        "security": 3
      },
      "stance": "cooperate"
    },
    "right": {
      "label": "Stay a neutral entrepôt",
      "effects": {
        "politicalSupport": 4,
        "treasury": -6,
        "security": -4
      },
      "stance": "protect"
    },
    "tags": [
      "export-control",
      "diplomacy"
    ],
    "severity": 3,
    "discussionPrompt": "Can a trading hub stay neutral in a technology cold war?",
    "educationalNote": "Entrepôt economies are uniquely exposed when global trade fractures into blocs.",
    "stage": "any"
  },
  {
    "id": "hkust-s3",
    "domain": "general",
    "title": "Autonomy vs Alignment",
    "situation": "Pressure mounts to align your tech governance with a larger power's framework, trading some autonomy for protection.",
    "question": "Trade governance autonomy for strategic protection?",
    "left": {
      "label": "Accept alignment",
      "effects": {
        "security": 7,
        "treasury": 4,
        "reputation": -6,
        "politicalSupport": -3
      },
      "stance": "cooperate"
    },
    "right": {
      "label": "Guard autonomy",
      "effects": {
        "reputation": 6,
        "politicalSupport": 4,
        "security": -7
      },
      "stance": "protect"
    },
    "tags": [
      "sovereignty",
      "governance"
    ],
    "severity": 2,
    "discussionPrompt": "What is autonomy worth when you cannot defend it alone?",
    "educationalNote": "Smaller jurisdictions constantly negotiate autonomy against protection.",
    "stage": "any"
  },
  {
    "id": "hkust-s4",
    "domain": "general",
    "title": "Prime Cyber Target",
    "situation": "As a dense financial-logistics hub, you are a top cyberattack target. A major defensive overhaul is expensive.",
    "question": "Fund a sweeping critical-infrastructure cyber overhaul?",
    "left": {
      "label": "Fund the overhaul",
      "effects": {
        "security": 9,
        "treasury": -8,
        "politicalSupport": 3
      },
      "stance": null
    },
    "right": {
      "label": "Patch incrementally",
      "effects": {
        "treasury": 3,
        "security": -6
      },
      "stance": null
    },
    "tags": [
      "infrastructure",
      "resilience"
    ],
    "severity": 2,
    "discussionPrompt": "How do you price the cost of an attack that hasn't happened yet?",
    "educationalNote": "Concentrated digital infrastructure offers efficiency but a fat single target.",
    "stage": "any"
  },
  {
    "id": "hkust-s5",
    "domain": "general",
    "title": "Divided Loyalties",
    "situation": "Your top researchers hold deep ties to multiple powers. Loyalty screening would reassure partners but alienate talent.",
    "question": "Introduce loyalty screening for sensitive research roles?",
    "left": {
      "label": "Screen for loyalty",
      "effects": {
        "security": 6,
        "reputation": -12
      },
      "stance": "protect"
    },
    "right": {
      "label": "Trust your people",
      "effects": {
        "reputation": 9,
        "security": -5
      },
      "stance": "open"
    },
    "tags": [
      "espionage",
      "talent"
    ],
    "severity": 2,
    "discussionPrompt": "Does loyalty screening protect security or manufacture distrust?",
    "educationalNote": "Hubs thrive on cosmopolitan talent that securitization can drive away.",
    "stage": "any"
  },
  {
    "id": "snu1-s1",
    "domain": "general",
    "title": "Giants and Garages",
    "situation": "Your economy leans on a few tech conglomerates. Backing scrappy startups could broaden innovation but threatens the giants.",
    "question": "Redirect support from conglomerates to startups?",
    "left": {
      "label": "Back the startups",
      "effects": {
        "rdCapacity": 6,
        "reputation": 5,
        "politicalSupport": -6,
        "treasury": -4
      },
      "stance": null
    },
    "right": {
      "label": "Protect the champions",
      "effects": {
        "security": 6,
        "treasury": 4,
        "rdCapacity": -3
      },
      "stance": "protect"
    },
    "tags": [
      "industrial-policy",
      "talent"
    ],
    "severity": 2,
    "discussionPrompt": "Do national champions drive or crowd out broad innovation?",
    "educationalNote": "Concentration in a few firms boosts scale but narrows the innovation base.",
    "stage": "any"
  },
  {
    "id": "snu1-s2",
    "domain": "general",
    "title": "Heavy-Industry Backlash",
    "situation": "Communities near your heavy-industry clusters protest pollution as you push for more export capacity.",
    "question": "Mandate costly emissions retrofits on heavy industry?",
    "left": {
      "label": "Mandate retrofits",
      "effects": {
        "environment": 9,
        "publicWelfare": 5,
        "treasury": -7,
        "security": -3
      },
      "stance": null
    },
    "right": {
      "label": "Prioritize output",
      "effects": {
        "security": 5,
        "treasury": 4,
        "environment": -8
      },
      "stance": null
    },
    "tags": [
      "environment",
      "industry"
    ],
    "severity": 2,
    "discussionPrompt": "How long can export growth outrun environmental cost?",
    "educationalNote": "Export-led heavy industry concentrates both prosperity and pollution locally.",
    "stage": "any"
  },
  {
    "id": "snu1-s3",
    "domain": "general",
    "title": "Conscript or Create",
    "situation": "Mandatory service pulls young engineers from labs at a critical time. A research-exemption track would help tech but stir fairness debates.",
    "question": "Create a research-service exemption for top engineers?",
    "left": {
      "label": "Exempt key researchers",
      "effects": {
        "rdCapacity": 6,
        "reputation": 5,
        "politicalSupport": -6
      },
      "stance": null
    },
    "right": {
      "label": "No exemptions",
      "effects": {
        "politicalSupport": 4,
        "reputation": -5,
        "rdCapacity": -3
      },
      "stance": null
    },
    "tags": [
      "talent",
      "fairness"
    ],
    "severity": 1,
    "discussionPrompt": "Should national security duties bend for technological priority?",
    "educationalNote": "Allocating scarce talent between defense and research is a real policy dilemma.",
    "stage": "any"
  },
  {
    "id": "snu1-s4",
    "domain": "general",
    "title": "One Big Buyer",
    "situation": "A single foreign market absorbs most of your key exports. Diversifying is costly; dependence is dangerous.",
    "question": "Subsidize export diversification away from the dominant buyer?",
    "left": {
      "label": "Diversify markets",
      "effects": {
        "security": 12,
        "treasury": -8
      },
      "stance": null
    },
    "right": {
      "label": "Keep the lucrative buyer",
      "effects": {
        "treasury": 7,
        "security": -6
      },
      "stance": null
    },
    "tags": [
      "supply-security",
      "diplomacy"
    ],
    "severity": 2,
    "discussionPrompt": "Is a profitable dependence still a dependence?",
    "educationalNote": "Export concentration is a strategic vulnerability disguised as efficiency.",
    "stage": "any"
  },
  {
    "id": "snu1-s5",
    "domain": "general",
    "title": "Where the Waste Goes",
    "situation": "Your nuclear-backed energy strategy needs a long-term waste repository. Every candidate region refuses to host it.",
    "question": "Impose a national nuclear-waste site over local objection?",
    "left": {
      "label": "Impose the site",
      "effects": {
        "energy": 6,
        "rdCapacity": 3,
        "publicWelfare": -7,
        "politicalSupport": -6
      },
      "stance": null
    },
    "right": {
      "label": "Keep interim storage",
      "effects": {
        "publicWelfare": 3,
        "environment": -5,
        "security": -3
      },
      "stance": null
    },
    "tags": [
      "nuclear",
      "acceptance"
    ],
    "severity": 2,
    "discussionPrompt": "Who should bear the local burden of a national benefit?",
    "educationalNote": "Nuclear waste siting is a textbook not-in-my-backyard governance problem.",
    "stage": "any"
  },
  {
    "id": "snu2-s1",
    "domain": "general",
    "title": "Compute Self-Reliance",
    "situation": "Cut off from advanced imports, your closed system must build inferior chips at home or fall behind entirely.",
    "question": "Pour resources into self-reliant domestic compute?",
    "left": {
      "label": "Build it ourselves",
      "effects": {
        "rdCapacity": 6,
        "security": 6,
        "treasury": -9,
        "energy": -4
      },
      "stance": null
    },
    "right": {
      "label": "Ration scarce imports",
      "effects": {
        "treasury": 3,
        "rdCapacity": -5
      },
      "stance": null
    },
    "tags": [
      "chokepoints",
      "sovereignty"
    ],
    "severity": 2,
    "discussionPrompt": "Can autarky ever match an open, networked innovation system?",
    "educationalNote": "Closed systems gain control but pay a steep efficiency and access penalty.",
    "stage": "any"
  },
  {
    "id": "snu2-s2",
    "domain": "general",
    "title": "Quiet Departures",
    "situation": "Several skilled researchers have slipped abroad. Tighter controls would stem the loss but deepen isolation and resentment.",
    "question": "Tighten internal controls to stop the outflow?",
    "left": {
      "label": "Tighten control",
      "effects": {
        "security": 7,
        "reputation": 3,
        "publicWelfare": -8,
        "politicalSupport": -4
      },
      "stance": "protect"
    },
    "right": {
      "label": "Ease conditions to retain",
      "effects": {
        "reputation": 6,
        "publicWelfare": 4,
        "security": -5,
        "treasury": -5
      },
      "stance": null
    },
    "tags": [
      "talent",
      "control"
    ],
    "severity": 2,
    "discussionPrompt": "Does control retain people or only their bodies, not their loyalty?",
    "educationalNote": "Coercive retention preserves headcount while corroding morale and trust.",
    "stage": "any"
  },
  {
    "id": "snu2-s3",
    "domain": "general",
    "title": "Around the Sanctions",
    "situation": "Engineers devise clever workarounds to acquire restricted technology. Effective, but discovery would deepen your isolation.",
    "question": "Authorize sanctions-evading technology acquisition?",
    "left": {
      "label": "Authorize workarounds",
      "effects": {
        "rdCapacity": 8,
        "security": 2,
        "politicalSupport": -9
      },
      "stance": "secrecy"
    },
    "right": {
      "label": "Stay within limits",
      "effects": {
        "politicalSupport": 3,
        "rdCapacity": -5
      },
      "stance": "protect"
    },
    "tags": [
      "sovereignty",
      "espionage"
    ],
    "severity": 3,
    "discussionPrompt": "When restrictions feel unjust, does evasion become legitimate?",
    "educationalNote": "Sanctions create persistent incentives for covert procurement networks.",
    "stage": "any"
  },
  {
    "id": "snu2-s4",
    "domain": "general",
    "title": "The Special Zone",
    "situation": "A walled special research zone could attract limited foreign collaboration and capital without opening the whole system.",
    "question": "Open a controlled special research zone?",
    "left": {
      "label": "Open the zone",
      "effects": {
        "reputation": 7,
        "treasury": 6,
        "politicalSupport": 0
      },
      "stance": "open"
    },
    "right": {
      "label": "Keep the system sealed",
      "effects": {
        "politicalSupport": 4,
        "security": 3,
        "reputation": -4
      },
      "stance": "protect"
    },
    "tags": [
      "openness",
      "reform"
    ],
    "severity": 2,
    "discussionPrompt": "Can a closed system open a window without losing control of the room?",
    "educationalNote": "Special economic/research zones are a classic controlled-opening experiment.",
    "stage": "any"
  },
  {
    "id": "snu2-s5",
    "domain": "general",
    "title": "Watchful Eyes",
    "situation": "Pervasive monitoring keeps tight control but the limited public trust you have is fraying under constant surveillance.",
    "question": "Relax pervasive surveillance to rebuild some trust?",
    "left": {
      "label": "Relax surveillance",
      "effects": {
        "publicWelfare": 11,
        "security": -7
      },
      "stance": "open"
    },
    "right": {
      "label": "Maintain tight watch",
      "effects": {
        "security": 6,
        "politicalSupport": 3,
        "publicWelfare": -6
      },
      "stance": "protect"
    },
    "tags": [
      "surveillance",
      "control"
    ],
    "severity": 2,
    "discussionPrompt": "Is control without trust a stable foundation for a tech society?",
    "educationalNote": "Surveillance can secure order while hollowing out the trust innovation needs.",
    "stage": "any"
  },
  {
    "id": "gen-fraud1",
    "domain": "general",
    "title": "The Retraction",
    "situation": "An internal audit finds that a flagship result underpinning your national research program cannot be reproduced. The original authors are under pressure to explain — or resign.",
    "question": "Publicly retract and investigate, or quietly correct the record?",
    "left": {
      "label": "Retract publicly & investigate",
      "effects": {
        "reputation": 4,
        "politicalSupport": -5,
        "treasury": -3
      },
      "stance": "open"
    },
    "right": {
      "label": "Quietly correct the record",
      "effects": {
        "politicalSupport": 3,
        "reputation": -6
      },
      "stance": "secrecy"
    },
    "tags": [
      "fraud",
      "reproducibility",
      "science",
      "governance"
    ],
    "severity": 3,
    "discussionPrompt": "Does covering up a mistake protect an institution, or just delay a bigger collapse in trust?",
    "educationalNote": "Reproducibility failures compound: each unaddressed one makes the next harder to trust and easier to hide.",
    "stage": "any"
  },
  {
    "id": "gen-univ1",
    "domain": "general",
    "title": "Whose Lab Is It?",
    "situation": "A major corporate sponsor wants exclusive rights to any invention from a jointly funded university lab — including the right to block publication for two years.",
    "question": "Accept the corporate terms or protect academic freedom?",
    "left": {
      "label": "Accept corporate terms",
      "effects": {
        "treasury": 9,
        "rdCapacity": 4,
        "reputation": -5
      },
      "stance": null
    },
    "right": {
      "label": "Protect academic freedom",
      "effects": {
        "reputation": 4,
        "treasury": -6,
        "politicalSupport": 2
      },
      "stance": "open"
    },
    "tags": [
      "university",
      "funding",
      "academia",
      "openness"
    ],
    "severity": 2,
    "discussionPrompt": "When industry funds the lab, who does the research actually belong to?",
    "educationalNote": "Publication restrictions can quietly slow an entire field’s progress by delaying peer review.",
    "stage": "any"
  },
  {
    "id": "semi-subsidy1",
    "domain": "semiconductors",
    "title": "The Subsidy Bidding War",
    "situation": "A global chipmaker is shopping for a new megafab site and playing governments against each other for the biggest subsidy package.",
    "question": "Match the highest bid or let the fab go elsewhere?",
    "left": {
      "label": "Match the highest bid",
      "effects": {
        "rdCapacity": 7,
        "security": 3,
        "treasury": -12
      },
      "stance": "compete"
    },
    "right": {
      "label": "Let the fab go elsewhere",
      "effects": {
        "treasury": 4,
        "rdCapacity": -5,
        "politicalSupport": -2
      },
      "stance": null
    },
    "tags": [
      "subsidies",
      "industrial-policy",
      "fabs"
    ],
    "severity": 2,
    "discussionPrompt": "Does subsidy competition build real capability, or just transfer public money to already-profitable firms?",
    "educationalNote": "Subsidy auctions between governments tend to escalate faster than the underlying capability actually grows.",
    "stage": "any"
  },
  {
    "id": "ai-standards1",
    "domain": "ai",
    "title": "Whose Standard Wins?",
    "situation": "Two incompatible technical standards for AI model safety testing are competing for global adoption. Committing early could shape the market — or bet wrong.",
    "question": "Champion your own national standard, or adopt the emerging international one?",
    "left": {
      "label": "Champion a national standard",
      "effects": {
        "reputation": -3,
        "security": 4,
        "rdCapacity": 3
      },
      "stance": "protect"
    },
    "right": {
      "label": "Adopt the international standard",
      "effects": {
        "reputation": 5,
        "rdCapacity": -2,
        "security": -2
      },
      "stance": "cooperate"
    },
    "tags": [
      "standards",
      "governance",
      "safety"
    ],
    "severity": 2,
    "discussionPrompt": "Do technical standards get chosen on merit, or on whoever has the most market power?",
    "educationalNote": "Whoever sets the standard shapes years of downstream compliance costs for everyone else.",
    "stage": "any"
  },
  {
    "id": "gen-privacy2",
    "domain": "general",
    "title": "The Leaked Dataset",
    "situation": "A researcher accidentally publishes a supposedly anonymized health dataset. Journalists re-identify several individuals within hours.",
    "question": "Fully disclose the breach or contain it quietly while you fix it?",
    "left": {
      "label": "Disclose immediately",
      "effects": {
        "reputation": 3,
        "publicWelfare": -3,
        "politicalSupport": -3
      },
      "stance": "open"
    },
    "right": {
      "label": "Contain it quietly",
      "effects": {
        "politicalSupport": 2,
        "reputation": -7,
        "publicWelfare": -2
      },
      "stance": "secrecy"
    },
    "tags": [
      "privacy",
      "data",
      "trust"
    ],
    "severity": 3,
    "discussionPrompt": "Does delaying disclosure of a data breach ever protect the people affected by it?",
    "educationalNote": "Delayed breach disclosure is now illegal in many jurisdictions precisely because containment rarely works.",
    "stage": "any"
  },
  {
    "id": "space-dualuse1",
    "domain": "space",
    "title": "The Satellite That Watches Too Much",
    "situation": "Your new Earth-observation constellation has resolution good enough for both disaster response and military targeting. A defense ministry wants priority tasking rights.",
    "question": "Grant the military priority tasking, or keep the constellation civilian-only?",
    "left": {
      "label": "Grant military tasking rights",
      "effects": {
        "security": 7,
        "treasury": 3,
        "reputation": -5
      },
      "stance": "protect"
    },
    "right": {
      "label": "Keep it civilian-only",
      "effects": {
        "reputation": 4,
        "security": -4,
        "treasury": -2
      },
      "stance": "open"
    },
    "tags": [
      "dual-use",
      "space",
      "security",
      "ethics"
    ],
    "severity": 3,
    "discussionPrompt": "Once a civilian system proves militarily useful, can it ever really stay civilian?",
    "educationalNote": "Dual-use ambiguity is often deliberate — it preserves funding flexibility and diplomatic cover simultaneously.",
    "stage": "any"
  },
  {
    "id": "materials-env1",
    "domain": "materials",
    "title": "The Mine No One Wants Nearby",
    "situation": "A new domestic rare-earth mine could cut import dependency in half — but a court challenge over environmental damage could delay it for years.",
    "question": "Fast-track the mine or accept the delay for environmental review?",
    "left": {
      "label": "Fast-track the mine",
      "effects": {
        "security": 6,
        "treasury": 2,
        "environment": -7
      },
      "stance": null
    },
    "right": {
      "label": "Accept the environmental review",
      "effects": {
        "environment": 4,
        "security": -3,
        "treasury": -3
      },
      "stance": null
    },
    "tags": [
      "environment",
      "regulation",
      "rare-earths"
    ],
    "severity": 2,
    "discussionPrompt": "Is trading environmental damage for supply-chain independence ever a fair swap?",
    "educationalNote": "Rare-earth processing is often more environmentally damaging than the mining itself.",
    "stage": "any"
  },
  {
    "id": "biotech-security1",
    "domain": "biotech",
    "title": "The Gain-of-Function Question",
    "situation": "Your top virology lab wants to continue gain-of-function research to get ahead of the next pandemic. International biosecurity experts call it reckless.",
    "question": "Continue the research under tighter controls, or halt it entirely?",
    "left": {
      "label": "Continue under tighter controls",
      "effects": {
        "rdCapacity": 6,
        "security": -4,
        "reputation": -3
      },
      "stance": null
    },
    "right": {
      "label": "Halt the research",
      "effects": {
        "reputation": 4,
        "security": 3,
        "rdCapacity": -6
      },
      "stance": "protect"
    },
    "tags": [
      "biosecurity",
      "dual-use",
      "ethics"
    ],
    "severity": 3,
    "discussionPrompt": "Does preparing for the next pandemic justify the risk of accidentally causing one?",
    "educationalNote": "Gain-of-function research sits at the center of an unresolved international biosecurity debate.",
    "stage": "any"
  },
  {
    "id": "gen-distrust1",
    "domain": "general",
    "title": "\"Trust Us\"",
    "situation": "A national survey finds most citizens believe your flagship technology program benefits corporations more than ordinary people. Approval is sliding fast.",
    "question": "Launch a public-trust campaign, or let results speak for themselves over time?",
    "left": {
      "label": "Launch a trust campaign",
      "effects": {
        "politicalSupport": 5,
        "publicWelfare": 2,
        "treasury": -4
      },
      "stance": null
    },
    "right": {
      "label": "Let results speak for themselves",
      "effects": {
        "treasury": 2,
        "politicalSupport": -5,
        "publicWelfare": -1
      },
      "stance": null
    },
    "tags": [
      "trust",
      "communication",
      "legitimacy"
    ],
    "severity": 1,
    "discussionPrompt": "Can a PR campaign fix a trust problem that policy substance actually caused?",
    "educationalNote": "Public trust in technology programs erodes fast and rebuilds slowly — communication rarely substitutes for policy change.",
    "stage": "any"
  },
  {
    "id": "quantum-crypto1",
    "domain": "quantum",
    "title": "Harvest Now, Decrypt Later",
    "situation": "Intelligence agencies warn that adversaries are already stockpiling encrypted data, betting that future quantum computers will crack it. Your critical infrastructure still runs on old encryption.",
    "question": "Fund an emergency migration to quantum-safe encryption, or wait for cheaper, more mature standards?",
    "left": {
      "label": "Fund emergency migration",
      "effects": {
        "security": 7,
        "treasury": -8,
        "rdCapacity": 2
      },
      "stance": null
    },
    "right": {
      "label": "Wait for mature standards",
      "effects": {
        "treasury": 4,
        "security": -6
      },
      "stance": null
    },
    "tags": [
      "crypto",
      "security",
      "standards"
    ],
    "severity": 2,
    "discussionPrompt": "How do you budget today for a threat that only becomes real once a future technology matures?",
    "educationalNote": "\"Harvest now, decrypt later\" attacks make encryption migration urgent well before quantum computers are actually useful.",
    "stage": "any"
  },
  {
    "id": "robotics-automation1",
    "domain": "robotics",
    "title": "The Warehouse Floor",
    "situation": "A fully automated logistics center could triple throughput — and eliminate nine in ten warehouse jobs in the region overnight.",
    "question": "Approve the automation rollout, or require a phased transition with retraining?",
    "left": {
      "label": "Approve full automation",
      "effects": {
        "rdCapacity": 7,
        "treasury": 4,
        "publicWelfare": -7,
        "politicalSupport": -3
      },
      "stance": null
    },
    "right": {
      "label": "Require phased transition",
      "effects": {
        "publicWelfare": 3,
        "politicalSupport": 2,
        "rdCapacity": -3,
        "treasury": -3
      },
      "stance": null
    },
    "tags": [
      "automation",
      "labor",
      "robotics"
    ],
    "severity": 2,
    "discussionPrompt": "Who owes displaced workers something when automation is more efficient but not humane on its own?",
    "educationalNote": "The efficiency gains from automation are real — so is the concentrated, immediate harm to displaced workers.",
    "stage": "any"
  },
  {
    "id": "energy-cyber1",
    "domain": "energy",
    "title": "The Blackout Contract",
    "situation": "Your smart grid operator wants to outsource control systems to a low-cost foreign vendor. Security researchers warn the contract creates a single point of catastrophic failure.",
    "question": "Award the contract for cost savings, or pay more for a trusted domestic vendor?",
    "left": {
      "label": "Award to the low-cost vendor",
      "effects": {
        "treasury": 6,
        "security": -7
      },
      "stance": null
    },
    "right": {
      "label": "Pay more for a trusted vendor",
      "effects": {
        "security": 6,
        "treasury": -6
      },
      "stance": "protect"
    },
    "tags": [
      "cyber",
      "infrastructure",
      "security",
      "grid"
    ],
    "severity": 3,
    "discussionPrompt": "Is the cheapest infrastructure vendor ever really the cheapest option once risk is priced in?",
    "educationalNote": "Critical infrastructure vendor selection is a security decision wearing a procurement disguise.",
    "stage": "any"
  },
  {
    "id": "climate-adapt1",
    "domain": "climate",
    "title": "The Adaptation Bill",
    "situation": "Coastal infrastructure damage from rising seas is now a recurring annual cost. Treasury wants to cap disaster spending; coastal communities want a permanent adaptation fund.",
    "question": "Create a permanent adaptation fund, or cap disaster spending year to year?",
    "left": {
      "label": "Create a permanent fund",
      "effects": {
        "environment": 4,
        "publicWelfare": 4,
        "treasury": -7
      },
      "stance": null
    },
    "right": {
      "label": "Cap disaster spending",
      "effects": {
        "treasury": 5,
        "publicWelfare": -5,
        "politicalSupport": -3
      },
      "stance": null
    },
    "tags": [
      "climate",
      "adaptation",
      "justice"
    ],
    "severity": 2,
    "discussionPrompt": "Is capping disaster spending fiscal discipline, or just deferring the cost onto the people least able to absorb it?",
    "educationalNote": "Adaptation costs compound: deferred resilience spending usually costs more later, after the next disaster.",
    "stage": "any"
  },
  {
    "id": "gen-stockpile1",
    "domain": "general",
    "title": "Strategic Stockpile",
    "situation": "Analysts warn your country holds almost no reserve of a critical input used across every strategic industry. Building a stockpile is expensive and politically invisible — until it isn’t.",
    "question": "Fund a strategic stockpile now, or rely on markets to supply what’s needed when it’s needed?",
    "left": {
      "label": "Fund a strategic stockpile",
      "effects": {
        "security": 6,
        "treasury": -6
      },
      "stance": "protect"
    },
    "right": {
      "label": "Rely on markets",
      "effects": {
        "treasury": 3,
        "security": -5
      },
      "stance": null
    },
    "tags": [
      "resource",
      "supply-security",
      "resilience"
    ],
    "severity": 2,
    "discussionPrompt": "Why is prevention spending so much harder to justify politically than crisis spending?",
    "educationalNote": "Stockpiles are a classic case of prevention being invisible right up until the moment it is desperately needed.",
    "stage": "any"
  },
  {
    "id": "semi-chokepoint1",
    "domain": "semiconductors",
    "title": "When the Chokepoint Breaks",
    "situation": "A single-supplier failure halts advanced-chip production worldwide overnight. Your industry has weeks of inventory left.",
    "question": "Activate emergency rationing for domestic industry, or buy your way to the front of the global queue?",
    "left": {
      "label": "Ration domestic supply",
      "effects": {
        "publicWelfare": 2,
        "rdCapacity": -5,
        "politicalSupport": 2
      },
      "stance": null
    },
    "right": {
      "label": "Buy to the front of the queue",
      "effects": {
        "rdCapacity": 5,
        "treasury": -9,
        "reputation": -3
      },
      "stance": "compete"
    },
    "tags": [
      "supply-security",
      "chokepoints",
      "resilience"
    ],
    "severity": 3,
    "discussionPrompt": "Should emergency access to a broken supply chain go to whoever pays most, or whoever needs it most?",
    "educationalNote": "Single-supplier chokepoints turn ordinary supply disruptions into systemic emergencies.",
    "stage": "any"
  },
  {
    "id": "space-debris1",
    "domain": "space",
    "title": "Who Cleans Up the Orbit?",
    "situation": "Your constellation contributed a fifth of last year’s near-miss orbital incidents. An international debris-removal fund is proposed, but everyone wants someone else to pay more.",
    "question": "Pay your proportional share into the cleanup fund, or dispute the assessment?",
    "left": {
      "label": "Pay your share",
      "effects": {
        "reputation": 4,
        "treasury": -5,
        "environment": 2
      },
      "stance": "cooperate"
    },
    "right": {
      "label": "Dispute the assessment",
      "effects": {
        "treasury": 3,
        "reputation": -5
      },
      "stance": "protect"
    },
    "tags": [
      "debris",
      "commons",
      "space",
      "governance"
    ],
    "severity": 2,
    "discussionPrompt": "Who should pay to clean up a shared commons that everyone contributed to polluting?",
    "educationalNote": "Orbital debris is a textbook tragedy of the commons: no single actor caused it, and no single actor can fix it.",
    "stage": "any"
  }
];
