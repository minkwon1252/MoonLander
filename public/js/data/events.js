// 38 international/global events (shock, boost, mixed, condition-change).
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
      "rdCapacity": -2
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
    "type": "shock",
    "effectGuide": "Money gets tight everywhere. Expensive strategies are riskier, and low-treasury teams suffer most."
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
      "rdCapacity": 2
    },
    "domainEffects": {
      "ai": {
        "rdCapacity": 8,
        "energy": -4
      },
      "robotics": {
        "rdCapacity": 4
      }
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "energy",
        "value": 25,
        "effects": {
          "rdCapacity": -4
        }
      }
    ],
    "type": "mixed",
    "effectGuide": "A shared leap forward. AI-adjacent programmes gain most; energy-poor teams struggle to keep up."
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
    "type": "shock",
    "effectGuide": "Security becomes the dominant concern. Weakly defended, isolated teams are most exposed."
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
    "type": "condition_change",
    "effectGuide": "Political ground shifts under existing agreements. Politically unstable teams are hit hardest."
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
          "rdCapacity": -5,
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
    "type": "shock",
    "effectGuide": "Energy-heavy strategies become riskier this round. Energy-secure teams gain relative advantage."
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
      "environment": -2
    },
    "domainEffects": {
      "climate": {
        "politicalSupport": 6,
        "rdCapacity": 4
      }
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "environment",
        "value": 35,
        "effects": {
          "publicWelfare": -5,
          "politicalSupport": -4
        }
      },
      {
        "when": "statAbove",
        "stat": "environment",
        "value": 65,
        "effects": {
          "politicalSupport": 4
        }
      }
    ],
    "type": "shock",
    "effectGuide": "Everyone pays for the damage. Teams that neglected the environment pay considerably more."
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
      "rdCapacity": -3
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
          "rdCapacity": -4,
          "treasury": -3
        }
      }
    ],
    "type": "shock",
    "effectGuide": "Chip-dependent work stalls. Semiconductor programmes gain leverage; supply-insecure teams suffer."
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
      "environment": 2
    },
    "domainEffects": {
      "energy": {
        "rdCapacity": 8,
        "politicalSupport": 6,
        "treasury": 5
      },
      "ai": {
        "energy": 4
      },
      "climate": {
        "environment": 5
      }
    },
    "modifiers": [],
    "type": "boost",
    "effectGuide": "A shared opportunity — cheap clean power is suddenly plausible. Energy programmes gain most."
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
    "type": "shock",
    "effectGuide": "Security-weak teams lose research and public confidence. Well-defended teams mostly hold."
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
      "rdCapacity": -2,
      "security": -2
    },
    "domainEffects": {
      "space": {
        "rdCapacity": -6,
        "treasury": -4,
        "politicalSupport": 4
      }
    },
    "modifiers": [
      {
        "when": "statAbove",
        "stat": "environment",
        "value": 60,
        "effects": {
          "politicalSupport": 3
        }
      }
    ],
    "type": "shock",
    "effectGuide": "Orbit becomes hazardous for everyone. Space programmes take the direct hit."
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
          "rdCapacity": 3
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
    "type": "boost",
    "effectGuide": "Shared rules reward the open and well-regarded, and put pressure on the isolated."
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
        "stat": "rdCapacity",
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
    "type": "shock",
    "effectGuide": "Welfare and political-support penalties become more dangerous, especially for fast-moving teams."
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
          "rdCapacity": 3
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
    "type": "mixed",
    "effectGuide": "Researchers are on the move. Attractive countries gain capacity; closed ones bleed it."
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
        "rdCapacity": 5,
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
    "type": "shock",
    "effectGuide": "A health emergency strains everyone. Biotech programmes gain relevance; low-welfare teams suffer most."
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
          "rdCapacity": -4
        }
      }
    ],
    "type": "shock",
    "effectGuide": "Critical materials get weaponized. Supply-secure teams gain leverage; dependent ones pay."
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
        "rdCapacity": 8,
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
    "type": "mixed",
    "effectGuide": "Encryption everywhere is suddenly suspect. Quantum programmes gain; the unprepared are exposed."
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
        "rdCapacity": -4,
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
          "rdCapacity": -4
        }
      },
      {
        "when": "statAbove",
        "stat": "energy",
        "value": 65,
        "effects": {
          "rdCapacity": 2
        }
      }
    ],
    "effectGuide": "Compute becomes scarce and expensive. AI-heavy strategies are constrained until it eases."
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
        "rdCapacity": -6,
        "security": 3,
        "treasury": -4
      },
      "quantum": {
        "rdCapacity": -2
      }
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "security",
        "value": 35,
        "effects": {
          "rdCapacity": -3
        }
      }
    ],
    "effectGuide": "Trade in advanced technology fragments. Cooperation is harder; self-sufficiency gains value."
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
    ],
    "effectGuide": "Welfare and political-support penalties become more dangerous, especially for automation-heavy teams."
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
        "rdCapacity": 5,
        "treasury": -5
      },
      "energy": {
        "rdCapacity": 4,
        "treasury": -4
      },
      "materials": {
        "rdCapacity": 4,
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
    ],
    "effectGuide": "Everyone can buy progress this round — but it is expensive, and treasuries will notice."
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
        "stat": "rdCapacity",
        "value": 60,
        "effects": {
          "reputation": 5,
          "treasury": 3
        }
      },
      {
        "when": "statBelow",
        "stat": "rdCapacity",
        "value": 40,
        "effects": {
          "reputation": -3,
          "rdCapacity": -2
        }
      }
    ],
    "domainEffects": {},
    "effectGuide": "Teams already ahead can set the rules and profit. Teams behind risk being locked out."
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
    ],
    "effectGuide": "Data-hungry strategies become politically costly. Public trust is the stat under pressure."
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
    ],
    "domainEffects": {},
    "effectGuide": "Military-adjacent research draws scrutiny. Security gains have a reputational price this round."
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
        "environment": 3
      },
      "semiconductors": {
        "treasury": -4,
        "environment": -2
      },
      "space": {
        "treasury": -3
      }
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "environment",
        "value": 30,
        "effects": {
          "treasury": -3,
          "politicalSupport": -2
        }
      }
    ],
    "effectGuide": "Clean strategies are rewarded; heavy industry pays. Low-environment teams face extra costs."
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
    ],
    "effectGuide": "Scientific credibility takes a hit everywhere; low-reputation teams find no goodwill left."
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
          "rdCapacity": -2
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
    ],
    "domainEffects": {},
    "effectGuide": "Research independence is under strain. Well-funded teams cope; cash-poor ones lose capacity."
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
      "rdCapacity": 2
    },
    "modifiers": [
      {
        "when": "statAbove",
        "stat": "reputation",
        "value": 55,
        "effects": {
          "rdCapacity": 3,
          "reputation": 2
        }
      }
    ],
    "domainEffects": {},
    "effectGuide": "A shared opportunity — pooled research pays off, and cooperative teams gain the most."
  },
  {
    "id": "gen_recession",
    "title": "Global Recession",
    "type": "shock",
    "severity": 3,
    "situation": "Demand collapses worldwide. Budgets are cut everywhere and long-horizon research is the first thing finance ministries look at.",
    "effectGuide": "Money gets tight for everyone. Expensive strategies are riskier this round, and teams already short of treasury will feel it worst.",
    "tags": [
      "economy",
      "general"
    ],
    "discussionPrompt": "Should research budgets be protected during a downturn, or is that a luxury?",
    "educationalNote": "R&D spending is historically pro-cyclical — it gets cut exactly when long-term investment matters most.",
    "base": {
      "treasury": -7,
      "rdCapacity": -2
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "treasury",
        "value": 35,
        "effects": {
          "rdCapacity": -4,
          "politicalSupport": -3
        }
      },
      {
        "when": "statAbove",
        "stat": "treasury",
        "value": 65,
        "effects": {
          "treasury": 3
        }
      }
    ]
  },
  {
    "id": "gen_energy_shock",
    "title": "Global Energy Shock",
    "type": "shock",
    "severity": 3,
    "situation": "Energy prices spike worldwide overnight. Anything that runs hot — factories, data centres, laboratories — suddenly costs far more to operate.",
    "effectGuide": "Energy-heavy strategies become riskier this round. Teams with weak energy reserves are exposed; energy-secure teams gain relative advantage.",
    "tags": [
      "energy",
      "general"
    ],
    "discussionPrompt": "How quickly can an economy actually reduce its energy intensity when prices spike?",
    "educationalNote": "Energy price shocks reprice every energy-intensive technology at once, with no warning.",
    "base": {
      "energy": -6,
      "treasury": -4
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "energy",
        "value": 35,
        "effects": {
          "rdCapacity": -4,
          "publicWelfare": -4
        }
      },
      {
        "when": "statAbove",
        "stat": "energy",
        "value": 65,
        "effects": {
          "treasury": 4,
          "reputation": 2
        }
      }
    ]
  },
  {
    "id": "gen_distrust",
    "title": "Public Distrust of Technology",
    "type": "shock",
    "severity": 2,
    "situation": "A wave of documentaries and viral posts convinces much of the public that the national technology programme serves elites, not them.",
    "effectGuide": "Welfare and political-support penalties become more dangerous this round. Teams that have been ignoring their public will pay for it.",
    "tags": [
      "society",
      "trust",
      "general"
    ],
    "discussionPrompt": "Is public distrust of technology irrational, or a reasonable response to how it has been deployed?",
    "educationalNote": "Legitimacy is a precondition for technology policy, not a consequence of it.",
    "base": {
      "publicWelfare": -5,
      "politicalSupport": -4
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "publicWelfare",
        "value": 35,
        "effects": {
          "politicalSupport": -5
        }
      },
      {
        "when": "statAbove",
        "stat": "publicWelfare",
        "value": 65,
        "effects": {
          "politicalSupport": 3,
          "reputation": 2
        }
      }
    ]
  },
  {
    "id": "gen_talent_migration",
    "title": "Global Talent Migration",
    "type": "mixed",
    "severity": 2,
    "situation": "A generation of researchers is on the move, chasing better funding, freer institutions and somewhere they actually want to live.",
    "effectGuide": "Open, well-regarded countries attract talent and gain research capacity. Isolated or low-reputation countries lose people.",
    "tags": [
      "talent",
      "migration",
      "general"
    ],
    "discussionPrompt": "What actually makes researchers stay somewhere — money, freedom, or belonging?",
    "educationalNote": "Talent flows toward openness and opportunity; coercive retention accelerates the exodus it tries to stop.",
    "base": {},
    "modifiers": [
      {
        "when": "statAbove",
        "stat": "reputation",
        "value": 60,
        "effects": {
          "rdCapacity": 6,
          "reputation": 2
        }
      },
      {
        "when": "statBelow",
        "stat": "reputation",
        "value": 35,
        "effects": {
          "rdCapacity": -6
        }
      },
      {
        "when": "statBelow",
        "stat": "publicWelfare",
        "value": 30,
        "effects": {
          "rdCapacity": -3
        }
      }
    ]
  },
  {
    "id": "gen_supply_disruption",
    "title": "Supply-Chain Disruption",
    "type": "shock",
    "severity": 3,
    "situation": "A chokepoint closes — a strait, a port, a single supplier — and physical goods stop moving. Everyone discovers what they cannot make themselves.",
    "effectGuide": "Import-dependent strategies suffer. Security and self-sufficiency become more valuable; teams with weak security are hit hardest.",
    "tags": [
      "supply-chain",
      "trade",
      "general"
    ],
    "discussionPrompt": "How much redundancy should a country pay for in normal times?",
    "educationalNote": "Just-in-time supply chains optimize for cost, and cost efficiency is the opposite of resilience.",
    "base": {
      "treasury": -4,
      "rdCapacity": -3
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "security",
        "value": 35,
        "effects": {
          "rdCapacity": -4,
          "treasury": -3
        }
      },
      {
        "when": "statAbove",
        "stat": "security",
        "value": 65,
        "effects": {
          "treasury": 3,
          "reputation": 3
        }
      }
    ]
  },
  {
    "id": "gen_cyberattack",
    "title": "Coordinated Cyberattack",
    "type": "shock",
    "severity": 3,
    "situation": "A coordinated intrusion campaign hits research institutions, utilities and ministries across every participating country at once.",
    "effectGuide": "Security-weak countries lose research work and public confidence. Well-defended countries mostly hold, and look competent doing it.",
    "tags": [
      "cyber",
      "security",
      "general"
    ],
    "discussionPrompt": "Should stolen research be treated as a security failure or an inevitability?",
    "educationalNote": "Cyber resilience is invisible until the moment it fails publicly.",
    "base": {
      "security": -5,
      "rdCapacity": -3
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "security",
        "value": 35,
        "effects": {
          "rdCapacity": -5,
          "publicWelfare": -4,
          "treasury": -3
        }
      },
      {
        "when": "statAbove",
        "stat": "security",
        "value": 65,
        "effects": {
          "reputation": 4,
          "politicalSupport": 3
        }
      }
    ]
  },
  {
    "id": "gen_climate_disaster",
    "title": "Major Climate Disaster",
    "type": "shock",
    "severity": 3,
    "situation": "An extreme weather event destroys infrastructure and displaces thousands. Emergency spending is not optional.",
    "effectGuide": "Everyone pays for the damage. Countries that neglected their environment pay considerably more, and their public notices.",
    "tags": [
      "climate",
      "disaster",
      "general"
    ],
    "discussionPrompt": "Did earlier environmental shortcuts raise the bill that just arrived?",
    "educationalNote": "Environmental shocks expose the deferred cost of prior environmental tradeoffs.",
    "base": {
      "treasury": -5,
      "publicWelfare": -5,
      "environment": -3
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "environment",
        "value": 35,
        "effects": {
          "publicWelfare": -5,
          "politicalSupport": -4
        }
      },
      {
        "when": "statAbove",
        "stat": "environment",
        "value": 65,
        "effects": {
          "politicalSupport": 4,
          "reputation": 3
        }
      }
    ]
  },
  {
    "id": "gen_export_tension",
    "title": "Export-Control Tension",
    "type": "condition_change",
    "severity": 2,
    "situation": "Blocs begin screening technology transfers aggressively. Every collaboration now comes with a licence, a lawyer and a political calculation.",
    "effectGuide": "Cooperation becomes harder and less rewarding this round, while security-focused choices gain value. Isolated teams suffer least — and gain least.",
    "tags": [
      "export-control",
      "trade",
      "general"
    ],
    "discussionPrompt": "Do export controls protect security, or just fragment the research system everyone depends on?",
    "educationalNote": "Controls reliably push the targeted country toward domestic substitution within a few years.",
    "base": {
      "rdCapacity": -2
    },
    "modifiers": [
      {
        "when": "statAbove",
        "stat": "security",
        "value": 60,
        "effects": {
          "security": 3,
          "politicalSupport": 2
        }
      },
      {
        "when": "statBelow",
        "stat": "security",
        "value": 35,
        "effects": {
          "rdCapacity": -3,
          "treasury": -3
        }
      },
      {
        "when": "statAbove",
        "stat": "reputation",
        "value": 65,
        "effects": {
          "reputation": -3
        }
      }
    ]
  },
  {
    "id": "gen_fraud_scandal",
    "title": "Research Fraud Scandal",
    "type": "shock",
    "severity": 2,
    "situation": "A landmark result turns out to be fabricated. The retraction cascade reaches every country that built on it.",
    "effectGuide": "Reputation and research capacity take a hit everywhere. Countries already low on reputation find nobody willing to give them benefit of the doubt.",
    "tags": [
      "fraud",
      "reproducibility",
      "general"
    ],
    "discussionPrompt": "Does the pressure to publish breakthroughs first make fraud structurally likely?",
    "educationalNote": "Fraud is usually a symptom of incentives that reward speed and novelty over rigour.",
    "base": {
      "reputation": -4,
      "rdCapacity": -3
    },
    "modifiers": [
      {
        "when": "statBelow",
        "stat": "reputation",
        "value": 35,
        "effects": {
          "politicalSupport": -4,
          "rdCapacity": -2
        }
      },
      {
        "when": "statAbove",
        "stat": "reputation",
        "value": 65,
        "effects": {
          "reputation": 2
        }
      }
    ]
  },
  {
    "id": "gen_standards_dispute",
    "title": "Global Standards Dispute",
    "type": "mixed",
    "severity": 2,
    "situation": "Two incompatible standards fight to become the global default. Committees, markets and diplomats all pick sides at once.",
    "effectGuide": "Countries already ahead in research or reputation can shape the outcome and profit. Countries behind risk being locked into someone else’s rules.",
    "tags": [
      "standards",
      "governance",
      "general"
    ],
    "discussionPrompt": "Are technical standards chosen on merit, or on market power?",
    "educationalNote": "Standards races compound existing advantage: whoever is ahead is best placed to set the rules.",
    "base": {},
    "modifiers": [
      {
        "when": "statAbove",
        "stat": "rdCapacity",
        "value": 60,
        "effects": {
          "reputation": 5,
          "treasury": 3
        }
      },
      {
        "when": "statBelow",
        "stat": "rdCapacity",
        "value": 40,
        "effects": {
          "reputation": -4,
          "rdCapacity": -2
        }
      },
      {
        "when": "statAbove",
        "stat": "reputation",
        "value": 65,
        "effects": {
          "politicalSupport": 3
        }
      }
    ]
  },
  {
    "id": "gen_open_science",
    "title": "Open Science Movement",
    "type": "boost",
    "severity": 1,
    "situation": "A global push makes publicly funded research free to read, reuse and build on. Journals resist; researchers do not.",
    "effectGuide": "A shared opportunity: research capacity rises for everyone, and open, well-regarded countries benefit the most.",
    "tags": [
      "openness",
      "science",
      "general"
    ],
    "discussionPrompt": "Who loses when publicly funded research becomes genuinely public?",
    "educationalNote": "Open access measurably widens participation in research beyond wealthy institutions.",
    "base": {
      "rdCapacity": 3,
      "reputation": 2
    },
    "modifiers": [
      {
        "when": "statAbove",
        "stat": "reputation",
        "value": 55,
        "effects": {
          "rdCapacity": 3,
          "reputation": 2
        }
      },
      {
        "when": "statBelow",
        "stat": "security",
        "value": 30,
        "effects": {
          "security": -3
        }
      }
    ]
  }
];
