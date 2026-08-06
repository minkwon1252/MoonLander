// 12 shared scarce resource crises (type: resource_conflict).
// Each team picks compete/cooperate/conserve/diversify; 2+ "compete" picks resolve via on-stage Rock-Paper-Scissors.
window.GAME_DATA = window.GAME_DATA || {};
window.GAME_DATA.resources = [
  {
    "id": "oil",
    "resource": "Oil",
    "icon": "🛢️",
    "situation": "A supply-route disruption sends crude oil prices sharply higher just as every economy needs cheap energy to keep factories and data centers running.",
    "discussionPrompt": "Does fighting for a fossil resource make sense for countries also racing toward clean-tech leadership?",
    "educationalNote": "Legacy energy dependence still shapes strategic behavior even in \"post-oil\" industries like AI and semiconductors.",
    "relevantDomains": [
      "energy",
      "semiconductors",
      "materials"
    ],
    "choices": {
      "compete": {
        "label": "Compete for supply contracts",
        "winEffects": {
          "energy": 10,
          "treasury": 4
        },
        "loseEffects": {
          "treasury": -8,
          "energy": -3
        },
        "soloEffects": {
          "energy": 9,
          "treasury": 3
        }
      },
      "cooperate": {
        "label": "Join a buyers’ pool",
        "effects": {
          "energy": 4,
          "reputation": 3,
          "treasury": -1
        }
      },
      "conserve": {
        "label": "Ration domestic use",
        "effects": {
          "energy": 2,
          "sustainability": 4,
          "publicWelfare": -2
        }
      },
      "diversify": {
        "label": "Accelerate alternative energy",
        "effects": {
          "energy": 1,
          "sustainability": 5,
          "treasury": -4
        }
      }
    },
    "type": "resource_conflict",
    "title": "Oil",
    "severity": 2
  },
  {
    "id": "electricity",
    "resource": "Electricity",
    "icon": "⚡",
    "situation": "A heatwave and a boom in AI data centers push national grids to their limits at the same moment. Brownouts loom for whoever runs short.",
    "discussionPrompt": "Should compute infrastructure get priority power access over households during a shortage?",
    "educationalNote": "AI’s energy appetite is now large enough to compete directly with residential and industrial demand.",
    "relevantDomains": [
      "ai",
      "energy",
      "semiconductors"
    ],
    "choices": {
      "compete": {
        "label": "Requisition grid capacity for priority industries",
        "winEffects": {
          "techProgress": 8,
          "energy": 5
        },
        "loseEffects": {
          "publicWelfare": -7,
          "politicalSupport": -4
        },
        "soloEffects": {
          "techProgress": 7,
          "publicWelfare": -3
        }
      },
      "cooperate": {
        "label": "Coordinate a regional load-sharing pact",
        "effects": {
          "energy": 4,
          "reputation": 4
        }
      },
      "conserve": {
        "label": "Mandate efficiency & rolling curbs",
        "effects": {
          "publicWelfare": 3,
          "sustainability": 3,
          "techProgress": -2
        }
      },
      "diversify": {
        "label": "Fast-track storage & renewables",
        "effects": {
          "energy": 2,
          "sustainability": 4,
          "treasury": -3
        }
      }
    },
    "type": "resource_conflict",
    "title": "Electricity",
    "severity": 2
  },
  {
    "id": "fab_capacity",
    "resource": "Semiconductor Manufacturing Capacity",
    "icon": "🏭",
    "situation": "Advanced-node fab capacity worldwide cannot meet demand. Every AI lab, automaker, and defense program wants the same production slots.",
    "discussionPrompt": "When capacity is fixed, does bidding for it just transfer wealth to whoever already has the fabs?",
    "educationalNote": "Leading-edge fabrication is one of the most concentrated chokepoints in the entire technology stack.",
    "relevantDomains": [
      "semiconductors",
      "ai",
      "robotics"
    ],
    "choices": {
      "compete": {
        "label": "Outbid rivals for production slots",
        "winEffects": {
          "techProgress": 9,
          "security": 3
        },
        "loseEffects": {
          "treasury": -6,
          "techProgress": -3
        },
        "soloEffects": {
          "techProgress": 8,
          "treasury": -3
        }
      },
      "cooperate": {
        "label": "Pool orders into a joint procurement bloc",
        "effects": {
          "techProgress": 3,
          "reputation": 4,
          "treasury": -2
        }
      },
      "conserve": {
        "label": "Redesign products to need fewer advanced chips",
        "effects": {
          "treasury": 2,
          "sustainability": 2,
          "techProgress": -1
        }
      },
      "diversify": {
        "label": "Fund a domestic legacy-node line instead",
        "effects": {
          "security": 4,
          "techProgress": 1,
          "treasury": -4
        }
      }
    },
    "type": "resource_conflict",
    "title": "Semiconductor Manufacturing Capacity",
    "severity": 2
  },
  {
    "id": "rare_earths",
    "resource": "Rare Earth Metals",
    "icon": "⛏️",
    "situation": "A dominant exporter restricts rare-earth shipments used in motors, wind turbines, and precision electronics. Everyone downstream feels it at once.",
    "discussionPrompt": "How did the world let a handful of mines control inputs to so many strategic industries?",
    "educationalNote": "Extraction is only part of the chokepoint — refining capacity is even more concentrated than mining.",
    "relevantDomains": [
      "materials",
      "robotics",
      "energy"
    ],
    "choices": {
      "compete": {
        "label": "Secure exclusive supply deals",
        "winEffects": {
          "security": 8,
          "techProgress": 4
        },
        "loseEffects": {
          "security": -5,
          "treasury": -4
        },
        "soloEffects": {
          "security": 7,
          "treasury": -3
        }
      },
      "cooperate": {
        "label": "Form a stockpile-sharing agreement",
        "effects": {
          "security": 3,
          "reputation": 4
        }
      },
      "conserve": {
        "label": "Redesign to reduce rare-earth intensity",
        "effects": {
          "sustainability": 3,
          "techProgress": -1
        }
      },
      "diversify": {
        "label": "Fund recycling & alternative-source R&D",
        "effects": {
          "sustainability": 4,
          "security": 2,
          "treasury": -3
        }
      }
    },
    "type": "resource_conflict",
    "title": "Rare Earth Metals",
    "severity": 2
  },
  {
    "id": "lithium",
    "resource": "Lithium",
    "icon": "🔋",
    "situation": "Battery demand from EVs, grid storage, and consumer electronics outstrips lithium supply. Prices spike and contracts get aggressive.",
    "discussionPrompt": "Does the clean-energy transition create its own new set of resource dependencies?",
    "educationalNote": "Decarbonization shifts strategic dependence from oil to a new set of battery-metal chokepoints.",
    "relevantDomains": [
      "energy",
      "materials",
      "climate"
    ],
    "choices": {
      "compete": {
        "label": "Lock in long-term mining contracts",
        "winEffects": {
          "sustainability": 5,
          "treasury": 4
        },
        "loseEffects": {
          "treasury": -6,
          "sustainability": -2
        },
        "soloEffects": {
          "sustainability": 4,
          "treasury": -3
        }
      },
      "cooperate": {
        "label": "Co-invest in a shared extraction venture",
        "effects": {
          "sustainability": 3,
          "reputation": 4,
          "treasury": -2
        }
      },
      "conserve": {
        "label": "Prioritize grid storage over consumer batteries",
        "effects": {
          "sustainability": 2,
          "publicWelfare": -1
        }
      },
      "diversify": {
        "label": "Invest in sodium-ion alternatives",
        "effects": {
          "techProgress": 3,
          "sustainability": 2,
          "treasury": -4
        }
      }
    },
    "type": "resource_conflict",
    "title": "Lithium",
    "severity": 2
  },
  {
    "id": "cobalt",
    "resource": "Cobalt",
    "icon": "⛓️",
    "situation": "Cobalt supply, concentrated in a few politically volatile regions, is disrupted — and human-rights concerns over artisanal mining intensify scrutiny of every buyer.",
    "discussionPrompt": "Is it possible to secure a resource ethically when its supply chain has serious labor abuses?",
    "educationalNote": "Strategic sourcing decisions carry human-rights and reputational stakes, not just price risk.",
    "relevantDomains": [
      "materials",
      "energy",
      "robotics"
    ],
    "choices": {
      "compete": {
        "label": "Sign directly with incumbent suppliers",
        "winEffects": {
          "treasury": 5,
          "techProgress": 4
        },
        "loseEffects": {
          "reputation": -5,
          "treasury": -3
        },
        "soloEffects": {
          "treasury": 4,
          "reputation": -3
        }
      },
      "cooperate": {
        "label": "Back an audited, ethical-sourcing consortium",
        "effects": {
          "reputation": 5,
          "treasury": -3
        }
      },
      "conserve": {
        "label": "Redesign batteries to be cobalt-free",
        "effects": {
          "sustainability": 3,
          "techProgress": -2
        }
      },
      "diversify": {
        "label": "Fund alternative deep-sea or synthetic sources",
        "effects": {
          "techProgress": 2,
          "sustainability": -2,
          "treasury": -4
        }
      }
    },
    "type": "resource_conflict",
    "title": "Cobalt",
    "severity": 2
  },
  {
    "id": "gpus",
    "resource": "High-End GPUs",
    "icon": "🖥️",
    "situation": "Frontier-AI GPU allocation is the year’s tightest bottleneck. Cloud providers, militaries, and universities all want the same limited chip supply.",
    "discussionPrompt": "Should scarce compute be allocated by price, by national priority, or by public-interest research value?",
    "educationalNote": "Compute governance — who gets access to how much — is becoming a form of AI policy in itself.",
    "relevantDomains": [
      "ai",
      "semiconductors",
      "quantum"
    ],
    "choices": {
      "compete": {
        "label": "Pay premium prices for priority allocation",
        "winEffects": {
          "techProgress": 10
        },
        "loseEffects": {
          "treasury": -7,
          "techProgress": -3
        },
        "soloEffects": {
          "techProgress": 9,
          "treasury": -4
        }
      },
      "cooperate": {
        "label": "Join a shared academic compute cluster",
        "effects": {
          "techProgress": 4,
          "reputation": 4
        }
      },
      "conserve": {
        "label": "Optimize models to use less compute",
        "effects": {
          "techProgress": 2,
          "sustainability": 2
        }
      },
      "diversify": {
        "label": "Invest in domestic chip alternatives",
        "effects": {
          "security": 4,
          "techProgress": 1,
          "treasury": -4
        }
      }
    },
    "type": "resource_conflict",
    "title": "High-End GPUs",
    "severity": 2
  },
  {
    "id": "launch_windows",
    "resource": "Launch Windows",
    "icon": "🚀",
    "situation": "Orbital launch slots at the few facilities capable of heavy-lift missions are booked solid. Everyone with a payload wants the same dates.",
    "discussionPrompt": "Who should get priority when launch infrastructure is scarce — the highest bidder or the most scientifically valuable mission?",
    "educationalNote": "Physical infrastructure bottlenecks (launch pads, range safety windows) constrain space programs as much as budgets do.",
    "relevantDomains": [
      "space"
    ],
    "choices": {
      "compete": {
        "label": "Pay premium for priority slots",
        "winEffects": {
          "techProgress": 9,
          "reputation": 2
        },
        "loseEffects": {
          "techProgress": -4,
          "treasury": -5
        },
        "soloEffects": {
          "techProgress": 8,
          "treasury": -4
        }
      },
      "cooperate": {
        "label": "Co-manifest payloads with partners",
        "effects": {
          "techProgress": 3,
          "reputation": 4,
          "treasury": -2
        }
      },
      "conserve": {
        "label": "Delay non-critical missions",
        "effects": {
          "treasury": 2,
          "techProgress": -1
        }
      },
      "diversify": {
        "label": "Invest in a domestic launch capability",
        "effects": {
          "security": 4,
          "techProgress": 1,
          "treasury": -5
        }
      }
    },
    "type": "resource_conflict",
    "title": "Launch Windows",
    "severity": 2
  },
  {
    "id": "spectrum",
    "resource": "Satellite Spectrum",
    "icon": "📡",
    "situation": "Usable satellite spectrum bands are nearly exhausted as mega-constellations multiply. Regulators scramble to referee overlapping claims.",
    "discussionPrompt": "Is orbital spectrum a commons to be shared, or a resource to be claimed by whoever files first?",
    "educationalNote": "Spectrum and orbital slots are governed by first-come international filing rules — a real-world \"race to register.\"",
    "relevantDomains": [
      "space",
      "ai"
    ],
    "choices": {
      "compete": {
        "label": "Rush to file exclusive claims",
        "winEffects": {
          "security": 6,
          "techProgress": 4
        },
        "loseEffects": {
          "reputation": -4,
          "techProgress": -3
        },
        "soloEffects": {
          "security": 5,
          "techProgress": 3
        }
      },
      "cooperate": {
        "label": "Negotiate a shared allocation framework",
        "effects": {
          "reputation": 5,
          "security": 2
        }
      },
      "conserve": {
        "label": "Limit constellation size to reduce congestion",
        "effects": {
          "sustainability": 3,
          "techProgress": -1
        }
      },
      "diversify": {
        "label": "Invest in laser/optical inter-satellite links",
        "effects": {
          "techProgress": 3,
          "treasury": -3
        }
      }
    },
    "type": "resource_conflict",
    "title": "Satellite Spectrum",
    "severity": 2
  },
  {
    "id": "water",
    "resource": "Clean Water",
    "icon": "💧",
    "situation": "Drought collides with surging industrial and data-center water demand for cooling. Cities and factories compete for the same shrinking supply.",
    "discussionPrompt": "Should thirsty industries (chip fabs, AI data centers) be sited where water is scarce at all?",
    "educationalNote": "Semiconductor and AI infrastructure are extremely water-intensive — a hidden environmental cost of the digital economy.",
    "relevantDomains": [
      "semiconductors",
      "ai",
      "climate"
    ],
    "choices": {
      "compete": {
        "label": "Requisition water for strategic industry",
        "winEffects": {
          "techProgress": 7,
          "security": 2
        },
        "loseEffects": {
          "publicWelfare": -8,
          "politicalSupport": -4
        },
        "soloEffects": {
          "techProgress": 5,
          "publicWelfare": -4
        }
      },
      "cooperate": {
        "label": "Share desalination infrastructure regionally",
        "effects": {
          "publicWelfare": 3,
          "reputation": 4,
          "treasury": -2
        }
      },
      "conserve": {
        "label": "Mandate closed-loop industrial cooling",
        "effects": {
          "sustainability": 4,
          "publicWelfare": 2,
          "techProgress": -1
        }
      },
      "diversify": {
        "label": "Invest in desalination capacity",
        "effects": {
          "sustainability": 2,
          "publicWelfare": 2,
          "treasury": -4
        }
      }
    },
    "type": "resource_conflict",
    "title": "Clean Water",
    "severity": 2
  },
  {
    "id": "talent",
    "resource": "Research Talent",
    "icon": "🧠",
    "situation": "A small global pool of top researchers in the frontier field is being courted by every lab and university at once. Salaries and visas become weapons.",
    "discussionPrompt": "Can talent be \"won\" long-term through money alone, or does it require building somewhere people actually want to stay?",
    "educationalNote": "Research talent is famously mobile — coercive retention tends to accelerate departures rather than prevent them.",
    "relevantDomains": [
      "ai",
      "biotech",
      "quantum"
    ],
    "choices": {
      "compete": {
        "label": "Launch an aggressive poaching campaign",
        "winEffects": {
          "reputation": 5,
          "techProgress": 5
        },
        "loseEffects": {
          "treasury": -5,
          "reputation": -3
        },
        "soloEffects": {
          "reputation": 4,
          "techProgress": 4
        }
      },
      "cooperate": {
        "label": "Join an international exchange program",
        "effects": {
          "reputation": 4,
          "techProgress": 2
        }
      },
      "conserve": {
        "label": "Invest in growing talent domestically",
        "effects": {
          "publicWelfare": 2,
          "techProgress": 1,
          "treasury": -3
        }
      },
      "diversify": {
        "label": "Build fully remote/distributed research teams",
        "effects": {
          "techProgress": 2,
          "security": -1
        }
      }
    },
    "type": "resource_conflict",
    "title": "Research Talent",
    "severity": 2
  },
  {
    "id": "lithography",
    "resource": "Advanced Lithography Equipment",
    "icon": "🔬",
    "situation": "Only a handful of machines on Earth can print the smallest chip features, made by a single company. Export licenses become a geopolitical weapon.",
    "discussionPrompt": "What happens to an industry whose entire future depends on one supplier of one machine?",
    "educationalNote": "Extreme-ultraviolet lithography is arguably the single most concentrated chokepoint in the global technology stack.",
    "relevantDomains": [
      "semiconductors",
      "quantum",
      "materials"
    ],
    "choices": {
      "compete": {
        "label": "Lobby hard for a scarce export license",
        "winEffects": {
          "techProgress": 10,
          "security": 3
        },
        "loseEffects": {
          "techProgress": -5,
          "reputation": -3
        },
        "soloEffects": {
          "techProgress": 8,
          "security": 2
        }
      },
      "cooperate": {
        "label": "Join an allied technology-sharing framework",
        "effects": {
          "techProgress": 4,
          "reputation": 4
        }
      },
      "conserve": {
        "label": "Focus on mature-node self-sufficiency",
        "effects": {
          "security": 3,
          "techProgress": -1
        }
      },
      "diversify": {
        "label": "Fund a long-shot domestic lithography program",
        "effects": {
          "security": 2,
          "techProgress": 1,
          "treasury": -5
        }
      }
    },
    "type": "resource_conflict",
    "title": "Advanced Lithography Equipment",
    "severity": 2
  }
];
