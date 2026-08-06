// 27 common international/global events (shock, boost, mixed, condition-change).
// Hand-tuned for Tech Race single-screen edition.
window.GAME_DATA = window.GAME_DATA || {};
window.GAME_DATA.events = [
  {
    "id": "financial_crisis",
    "title": "Global Financial Crisis",
    "severity": 3,
    "situation": "Credit markets seize up worldwide. Capital flees risky tech bets and treasuries strain.",
    "tags": [
      "economy"
    ],
    "discussionPrompt": "Who is most exposed when global capital suddenly retreats?",
    "educationalNote": "Financial shocks hit highly leveraged, trade-dependent innovation systems hardest.",
    "base": {
      "treasury": -8,
      "techProgress": -2
    },
    "domainEffects": {},
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "security",
        "value": 40,
        "effects": {
          "treasury": -4
        }
      },
      {
        "when": "statAbove",
        "stat": "politicalSupport",
        "value": 60,
        "effects": {
          "treasury": 4
        }
      }
    ],
    "type": "shock"
  },
  {
    "id": "ai_breakthrough",
    "title": "Sudden AI Breakthrough",
    "severity": 2,
    "situation": "A leap in model efficiency resets expectations overnight. The race intensifies for everyone.",
    "tags": [
      "ai",
      "technology"
    ],
    "discussionPrompt": "Does a breakthrough lift all boats or widen the gap to the leader?",
    "educationalNote": "General-purpose breakthroughs reshape every adjacent domain, not just their own.",
    "base": {
      "techProgress": 2
    },
    "domainEffects": {
      "ai": {
        "techProgress": 8,
        "energy": -4
      },
      "robotics": {
        "techProgress": 4
      }
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "energy",
        "value": 25,
        "effects": {
          "techProgress": -4
        }
      }
    ],
    "type": "mixed"
  },
  {
    "id": "military_escalation",
    "title": "Regional Military Escalation",
    "severity": 3,
    "situation": "A flashpoint erupts into open military confrontation, rattling markets and alliances.",
    "tags": [
      "security"
    ],
    "discussionPrompt": "Does crisis pull nations toward cooperation or toward armed self-reliance?",
    "educationalNote": "Security shocks reward prior alliance-building and punish isolation.",
    "base": {
      "security": -4,
      "treasury": -3,
      "publicWelfare": -3
    },
    "domainEffects": {},
    "modifiers": [
      {
        "when": "statAbove",
        "stat": "security",
        "value": 65,
        "effects": {
          "security": 3,
          "politicalSupport": 3
        }
      },
      {
        "when": "statBelow",
        "stat": "politicalSupport",
        "value": 30,
        "effects": {
          "security": -4
        }
      }
    ],
    "type": "shock"
  },
  {
    "id": "regime_change",
    "title": "Regime Change in a Major Power",
    "severity": 2,
    "situation": "Leadership upheaval in a major power scrambles existing technology agreements and norms.",
    "tags": [
      "politics"
    ],
    "discussionPrompt": "How fragile are technology agreements that depend on specific leaders?",
    "educationalNote": "Tech policy continuity is hostage to political cycles in partner states.",
    "base": {
      "politicalSupport": -5
    },
    "domainEffects": {},
    "modifiers": [
      {
        "when": "statAbove",
        "stat": "politicalSupport",
        "value": 60,
        "effects": {
          "politicalSupport": 4
        }
      },
      {
        "when": "statBelow",
        "stat": "publicWelfare",
        "value": 30,
        "effects": {
          "politicalSupport": -4
        }
      }
    ],
    "type": "condition_change"
  },
  {
    "id": "energy_shock",
    "title": "Global Energy Price Shock",
    "severity": 3,
    "situation": "Energy prices spike sharply. Importers scramble while energy-secure states gain leverage.",
    "tags": [
      "energy"
    ],
    "discussionPrompt": "How does energy dependence translate into strategic vulnerability?",
    "educationalNote": "Energy shocks reprice every energy-intensive technology overnight.",
    "base": {
      "energy": -5,
      "treasury": -4
    },
    "domainEffects": {
      "energy": {
        "treasury": 6,
        "politicalSupport": 4
      }
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "energy",
        "value": 30,
        "effects": {
          "techProgress": -5,
          "publicWelfare": -4
        }
      },
      {
        "when": "statAbove",
        "stat": "energy",
        "value": 65,
        "effects": {
          "treasury": 5
        }
      }
    ],
    "type": "shock"
  },
  {
    "id": "climate_disaster",
    "title": "Major Climate Disaster",
    "severity": 3,
    "situation": "An extreme climate event devastates infrastructure and forces emergency spending across regions.",
    "tags": [
      "climate"
    ],
    "discussionPrompt": "Did environmental neglect in earlier rounds raise the bill now?",
    "educationalNote": "Environmental shocks expose the delayed cost of prior environmental tradeoffs.",
    "base": {
      "publicWelfare": -5,
      "treasury": -4,
      "sustainability": -2
    },
    "domainEffects": {
      "climate": {
        "politicalSupport": 6,
        "techProgress": 4
      }
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "sustainability",
        "value": 35,
        "effects": {
          "publicWelfare": -5,
          "politicalSupport": -4
        }
      },
      {
        "when": "statAbove",
        "stat": "sustainability",
        "value": 65,
        "effects": {
          "politicalSupport": 4
        }
      }
    ],
    "type": "shock"
  },
  {
    "id": "semi_collapse",
    "title": "Semiconductor Supply-Chain Collapse",
    "severity": 3,
    "situation": "A chokepoint failure halts advanced-chip supply, freezing production lines worldwide.",
    "tags": [
      "semiconductors",
      "supply"
    ],
    "discussionPrompt": "How concentrated did the world let this chokepoint become?",
    "educationalNote": "Extreme supply concentration turns one failure into a systemic crisis.",
    "base": {
      "security": -6,
      "techProgress": -3
    },
    "domainEffects": {
      "semiconductors": {
        "treasury": 6,
        "politicalSupport": 5,
        "security": 4
      },
      "materials": {
        "security": 3
      }
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "security",
        "value": 35,
        "effects": {
          "techProgress": -4,
          "treasury": -3
        }
      }
    ],
    "type": "shock"
  },
  {
    "id": "fusion_breakthrough",
    "title": "Fusion / Storage Breakthrough",
    "severity": 1,
    "situation": "A breakthrough in fusion or grid-scale storage promises abundant clean power within a decade.",
    "tags": [
      "energy",
      "technology"
    ],
    "discussionPrompt": "Who captures the gains of a breakthrough — the inventor or the fast adopter?",
    "educationalNote": "Energy abundance would loosen the binding constraint on AI, space and industry.",
    "base": {
      "energy": 4,
      "sustainability": 2
    },
    "domainEffects": {
      "energy": {
        "techProgress": 8,
        "politicalSupport": 6,
        "treasury": 5
      },
      "ai": {
        "energy": 4
      },
      "climate": {
        "sustainability": 5
      }
    },
    "modifiers": [],
    "type": "boost"
  },
  {
    "id": "cyberattack",
    "title": "Massive Cyberattack Wave",
    "severity": 3,
    "situation": "A coordinated cyberattack cascades across critical infrastructure globally.",
    "tags": [
      "cyber",
      "security"
    ],
    "discussionPrompt": "Did prior openness or neglect leave you exposed today?",
    "educationalNote": "Cyber resilience is invisible until the moment it fails publicly.",
    "base": {
      "security": -5,
      "publicWelfare": -3,
      "treasury": -2
    },
    "domainEffects": {},
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "security",
        "value": 35,
        "effects": {
          "security": -5,
          "publicWelfare": -4,
          "treasury": -4
        }
      },
      {
        "when": "statAbove",
        "stat": "security",
        "value": 65,
        "effects": {
          "politicalSupport": 4
        }
      }
    ],
    "type": "shock"
  },
  {
    "id": "debris_cascade",
    "title": "Space Debris Cascade",
    "severity": 2,
    "situation": "A collision triggers a debris cascade, threatening satellites and orbital access for all.",
    "tags": [
      "space"
    ],
    "discussionPrompt": "Who pays to clean an orbit everyone polluted?",
    "educationalNote": "The Kessler cascade is the canonical commons failure of the space age.",
    "base": {
      "techProgress": -2,
      "security": -2
    },
    "domainEffects": {
      "space": {
        "techProgress": -6,
        "treasury": -4,
        "politicalSupport": 4
      }
    },
    "modifiers": [
      {
        "when": "statAbove",
        "stat": "sustainability",
        "value": 60,
        "effects": {
          "politicalSupport": 3
        }
      }
    ],
    "type": "shock"
  },
  {
    "id": "new_treaty",
    "title": "New International Technology Treaty",
    "severity": 1,
    "situation": "A landmark treaty offers rule-of-the-road governance for frontier technology. Open systems benefit; closed ones feel pressure.",
    "tags": [
      "governance"
    ],
    "discussionPrompt": "Do shared rules constrain the strong or empower the rule-followers?",
    "educationalNote": "International regimes reward states already aligned with openness and reputation.",
    "base": {
      "politicalSupport": 2
    },
    "domainEffects": {},
    "modifiers": [
      {
        "when": "statAbove",
        "stat": "reputation",
        "value": 55,
        "effects": {
          "politicalSupport": 5,
          "techProgress": 3
        }
      },
      {
        "when": "statBelow",
        "stat": "reputation",
        "value": 30,
        "effects": {
          "politicalSupport": -5,
          "treasury": -3
        }
      }
    ],
    "type": "boost"
  },
  {
    "id": "tech_backlash",
    "title": "Public Backlash Against Dangerous Tech",
    "severity": 2,
    "situation": "A high-profile incident triggers global public fear of frontier technology and its builders.",
    "tags": [
      "society"
    ],
    "discussionPrompt": "Did the race for progress outrun public consent?",
    "educationalNote": "When technical progress outpaces public understanding, legitimacy collapses fast.",
    "base": {
      "publicWelfare": -4
    },
    "domainEffects": {},
    "modifiers": [
      {
        "when": "statAbove",
        "stat": "techProgress",
        "value": 70,
        "effects": {
          "publicWelfare": -5,
          "politicalSupport": -4
        }
      },
      {
        "when": "statAbove",
        "stat": "publicWelfare",
        "value": 60,
        "effects": {
          "publicWelfare": 3
        }
      }
    ],
    "type": "shock"
  },
  {
    "id": "talent_wave",
    "title": "Global Talent Migration Wave",
    "severity": 1,
    "situation": "A wave of skilled researchers seeks new homes. Open, attractive systems gain; closed ones bleed.",
    "tags": [
      "talent"
    ],
    "discussionPrompt": "What makes a place where the world's best want to work?",
    "educationalNote": "Talent flows toward openness, opportunity and trust — and away from coercion.",
    "base": {},
    "domainEffects": {},
    "modifiers": [
      {
        "when": "statAbove",
        "stat": "reputation",
        "value": 55,
        "effects": {
          "reputation": 6,
          "techProgress": 3
        }
      },
      {
        "when": "statBelow",
        "stat": "reputation",
        "value": 30,
        "effects": {
          "reputation": -6
        }
      },
      {
        "when": "statBelow",
        "stat": "publicWelfare",
        "value": 30,
        "effects": {
          "reputation": -3
        }
      }
    ],
    "type": "mixed"
  },
  {
    "id": "pandemic",
    "title": "Global Health Emergency",
    "severity": 3,
    "situation": "A fast-spreading pathogen strains health systems and economies everywhere.",
    "tags": [
      "biotech",
      "society"
    ],
    "discussionPrompt": "Does crisis reward those who invested in resilience and trust beforehand?",
    "educationalNote": "Health emergencies test public trust, biotech capacity and welfare investment at once.",
    "base": {
      "publicWelfare": -5,
      "treasury": -4
    },
    "domainEffects": {
      "biotech": {
        "politicalSupport": 6,
        "techProgress": 5,
        "treasury": 4
      }
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "publicWelfare",
        "value": 30,
        "effects": {
          "publicWelfare": -4,
          "politicalSupport": -4
        }
      },
      {
        "when": "statAbove",
        "stat": "publicWelfare",
        "value": 60,
        "effects": {
          "politicalSupport": 3
        }
      }
    ],
    "type": "shock"
  },
  {
    "id": "resource_nationalism",
    "title": "Critical-Materials Resource War",
    "severity": 2,
    "situation": "Major suppliers weaponize critical minerals, fracturing global materials markets.",
    "tags": [
      "materials",
      "supply"
    ],
    "discussionPrompt": "How quickly can dependence be unwound once it is weaponized?",
    "educationalNote": "Resource nationalism rewards stockpiles and diversified, resilient supply chains.",
    "base": {
      "security": -5,
      "treasury": -3
    },
    "domainEffects": {
      "materials": {
        "treasury": 6,
        "politicalSupport": 4,
        "security": 3
      }
    },
    "modifiers": [
      {
        "when": "statAbove",
        "stat": "security",
        "value": 65,
        "effects": {
          "treasury": 5,
          "politicalSupport": 3
        }
      },
      {
        "when": "statBelow",
        "stat": "security",
        "value": 30,
        "effects": {
          "techProgress": -4
        }
      }
    ],
    "type": "shock"
  },
  {
    "id": "quantum_break",
    "title": "Quantum Cryptography Break",
    "severity": 3,
    "situation": "A quantum advance renders legacy encryption breakable. Secrets everywhere are suddenly at risk.",
    "tags": [
      "quantum",
      "cyber"
    ],
    "discussionPrompt": "Who prepared for the day the math stopped protecting them?",
    "educationalNote": "Cryptographic transitions punish the unprepared and reward early migrators.",
    "base": {
      "security": -5
    },
    "domainEffects": {
      "quantum": {
        "techProgress": 8,
        "politicalSupport": 5,
        "security": 4
      }
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "security",
        "value": 35,
        "effects": {
          "security": -5,
          "treasury": -4
        }
      },
      {
        "when": "statAbove",
        "stat": "security",
        "value": 65,
        "effects": {
          "politicalSupport": 3
        }
      }
    ],
    "type": "mixed"
  },
  {
    "id": "compute_rationing",
    "title": "AI Compute Rationing",
    "type": "condition_change",
    "severity": 2,
    "situation": "A sudden squeeze on data-center capacity forces every AI-adjacent program to ration compute. The rules for what counts as \"affordable progress\" just changed.",
    "tags": [
      "ai",
      "compute",
      "energy"
    ],
    "discussionPrompt": "Should scarce compute be rationed by price, by national priority, or by public-interest value?",
    "educationalNote": "Compute scarcity reshapes strategy for months at a time — it is now a standing constraint, not a one-off shock.",
    "base": {
      "energy": -3
    },
    "domainEffects": {
      "ai": {
        "techProgress": -4,
        "energy": -3
      },
      "quantum": {
        "energy": -2
      }
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "energy",
        "value": 30,
        "effects": {
          "techProgress": -4
        }
      },
      {
        "when": "statAbove",
        "stat": "energy",
        "value": 65,
        "effects": {
          "techProgress": 2
        }
      }
    ]
  },
  {
    "id": "export_controls",
    "title": "Coordinated Semiconductor Export Controls",
    "type": "shock",
    "severity": 3,
    "situation": "A bloc of major economies imposes sweeping export controls on advanced chips and chipmaking tools, fracturing global semiconductor trade overnight.",
    "tags": [
      "semiconductors",
      "trade",
      "export-control"
    ],
    "discussionPrompt": "Do export controls protect national security, or just accelerate a rival’s push for self-sufficiency?",
    "educationalNote": "Export controls reliably provoke the targeted country to invest heavily in domestic alternatives within a few years.",
    "base": {
      "treasury": -2
    },
    "domainEffects": {
      "semiconductors": {
        "techProgress": -6,
        "security": 3,
        "treasury": -4
      },
      "quantum": {
        "techProgress": -2
      }
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "security",
        "value": 35,
        "effects": {
          "techProgress": -3
        }
      }
    ]
  },
  {
    "id": "automation_backlash",
    "title": "Public Backlash Against Automation",
    "type": "shock",
    "severity": 2,
    "situation": "Viral footage of an automated layoff wave sparks nationwide protests. \"Whose progress is this?\" becomes the week’s dominant headline.",
    "tags": [
      "automation",
      "labor",
      "society"
    ],
    "discussionPrompt": "Who bears the cost when automation raises productivity but destroys jobs faster than new ones appear?",
    "educationalNote": "Automation backlash rarely stops technology adoption — but it reliably reshapes the politics around it.",
    "base": {
      "publicWelfare": -4,
      "politicalSupport": -2
    },
    "domainEffects": {
      "robotics": {
        "publicWelfare": -5,
        "politicalSupport": -3
      },
      "ai": {
        "publicWelfare": -3
      }
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "publicWelfare",
        "value": 35,
        "effects": {
          "politicalSupport": -4
        }
      }
    ]
  },
  {
    "id": "subsidy_race",
    "title": "Global Industrial Subsidy Race",
    "type": "mixed",
    "severity": 2,
    "situation": "Major economies unveil enormous subsidy packages for strategic industries. Falling behind on incentives now risks losing the next factory, lab, or fab.",
    "tags": [
      "industrial-policy",
      "subsidies",
      "competitiveness"
    ],
    "discussionPrompt": "Is a subsidy race a race to the top for capability, or a race to the bottom for public finances?",
    "educationalNote": "Subsidy competition can crowd in real investment — or just bid up costs while public treasuries absorb the risk.",
    "base": {},
    "domainEffects": {
      "semiconductors": {
        "techProgress": 5,
        "treasury": -5
      },
      "energy": {
        "techProgress": 4,
        "treasury": -4
      },
      "materials": {
        "techProgress": 4,
        "treasury": -4
      }
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "treasury",
        "value": 30,
        "effects": {
          "politicalSupport": -3
        }
      }
    ]
  },
  {
    "id": "standards_race",
    "title": "International Technical Standard Competition",
    "type": "mixed",
    "severity": 2,
    "situation": "Rival blocs each push their own technical standard as \"the\" global standard. Whoever sets the standard shapes the market for a generation.",
    "tags": [
      "standards",
      "governance",
      "competitiveness"
    ],
    "discussionPrompt": "Do technical standards reward the best technology, or just the biggest market and the loudest lobbying?",
    "educationalNote": "Standards races compound existing leads: whoever is already ahead is best placed to have their approach adopted globally.",
    "base": {},
    "modifiers": [
      {
        "when": "statAbove",
        "stat": "techProgress",
        "value": 60,
        "effects": {
          "reputation": 5,
          "treasury": 3
        }
      },
      {
        "when": "statBelow",
        "stat": "techProgress",
        "value": 40,
        "effects": {
          "reputation": -3,
          "techProgress": -2
        }
      }
    ]
  },
  {
    "id": "privacy_backlash",
    "title": "Global Data-Privacy Backlash",
    "type": "shock",
    "severity": 2,
    "situation": "A cross-border data-broker leak exposes how casually personal data has been traded for AI training and biometric research. Regulators everywhere take notice.",
    "tags": [
      "privacy",
      "data",
      "trust"
    ],
    "discussionPrompt": "Can meaningful consent exist at the scale modern data collection actually operates?",
    "educationalNote": "Privacy scandals tend to hit hardest wherever data collection outran public understanding of how it was used.",
    "base": {
      "publicWelfare": -3,
      "reputation": -2
    },
    "domainEffects": {
      "ai": {
        "publicWelfare": -4,
        "reputation": -3
      },
      "biotech": {
        "publicWelfare": -3
      }
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "reputation",
        "value": 30,
        "effects": {
          "publicWelfare": -3
        }
      }
    ]
  },
  {
    "id": "dual_use_controversy",
    "title": "Dual-Use Research Controversy",
    "type": "condition_change",
    "severity": 2,
    "situation": "Investigative journalists reveal that \"civilian\" research at several national labs has quietly fed military applications. Oversight regimes tighten worldwide.",
    "tags": [
      "dual-use",
      "security",
      "ethics"
    ],
    "discussionPrompt": "Where should the line sit between legitimate national-security research and dangerous militarization of civilian science?",
    "educationalNote": "Dual-use ambiguity is often the point — it lets programs claim civilian legitimacy while retaining military value.",
    "base": {},
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "security",
        "value": 35,
        "effects": {
          "reputation": -4
        }
      },
      {
        "when": "statAbove",
        "stat": "security",
        "value": 65,
        "effects": {
          "politicalSupport": 3,
          "reputation": -2
        }
      }
    ]
  },
  {
    "id": "environmental_regulation",
    "title": "Sweeping Environmental Regulation",
    "type": "mixed",
    "severity": 2,
    "situation": "A landmark international accord imposes strict emissions and waste rules on frontier industries. Clean systems get a tailwind; heavy industry gets a bill.",
    "tags": [
      "environment",
      "regulation",
      "climate"
    ],
    "discussionPrompt": "Should environmental rules apply equally to every industry, or scale with how much damage each one actually causes?",
    "educationalNote": "Environmental regulation reliably favors whoever already invested in clean processes before the rules changed.",
    "base": {},
    "domainEffects": {
      "climate": {
        "reputation": 5,
        "politicalSupport": 3
      },
      "energy": {
        "reputation": 3,
        "sustainability": 3
      },
      "semiconductors": {
        "treasury": -4,
        "sustainability": -2
      },
      "space": {
        "treasury": -3
      }
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "sustainability",
        "value": 30,
        "effects": {
          "treasury": -3,
          "politicalSupport": -2
        }
      }
    ]
  },
  {
    "id": "reproducibility_crisis",
    "title": "Research Reproducibility Crisis",
    "type": "shock",
    "severity": 2,
    "situation": "A wave of high-profile retractions reveals that key results across several national flagship programs cannot be reproduced. Public and scientific trust both take a hit.",
    "tags": [
      "fraud",
      "reproducibility",
      "science"
    ],
    "discussionPrompt": "Does the pressure to publish breakthroughs first make fraud and sloppy science more likely?",
    "educationalNote": "Reproducibility crises are usually a symptom of incentive structures that reward speed and novelty over rigor.",
    "base": {
      "reputation": -3,
      "politicalSupport": -2
    },
    "domainEffects": {
      "biotech": {
        "reputation": -4
      },
      "ai": {
        "reputation": -3
      },
      "quantum": {
        "reputation": -3
      }
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "reputation",
        "value": 30,
        "effects": {
          "politicalSupport": -3
        }
      }
    ]
  },
  {
    "id": "university_industry_conflict",
    "title": "University–Industry Funding Conflict",
    "type": "condition_change",
    "severity": 1,
    "situation": "Corporate funding now dominates university research budgets, and faculty revolt over control of publication rights and research direction.",
    "tags": [
      "university",
      "funding",
      "academia"
    ],
    "discussionPrompt": "When industry funds most of the research, who does the researcher actually answer to?",
    "educationalNote": "Funding dependency quietly shapes which questions get asked long before anyone chooses which answers to publish.",
    "base": {},
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "treasury",
        "value": 30,
        "effects": {
          "politicalSupport": -3,
          "techProgress": -2
        }
      },
      {
        "when": "statAbove",
        "stat": "treasury",
        "value": 65,
        "effects": {
          "reputation": 2
        }
      }
    ]
  },
  {
    "id": "research_consortium",
    "title": "Breakthrough International Research Consortium",
    "type": "boost",
    "severity": 1,
    "situation": "A rare moment of alignment: several nations agree to fund an open, shared research consortium on frontier science, pooling cost and risk.",
    "tags": [
      "cooperation",
      "governance",
      "science"
    ],
    "discussionPrompt": "What makes a shared research consortium durable once the political momentum that created it fades?",
    "educationalNote": "Multilateral science consortia are rare precisely because they require durable trust, not just a good founding moment.",
    "base": {
      "reputation": 3,
      "techProgress": 2
    },
    "modifiers": [
      {
        "when": "statAbove",
        "stat": "reputation",
        "value": 55,
        "effects": {
          "techProgress": 3,
          "reputation": 2
        }
      }
    ]
  }
];
