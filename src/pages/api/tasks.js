const baseURL = '/assets/img'
const talent = [
  {
    name: 'Forsaken Rift',
    type: 'Talent Domain',
    day: 'Wednesday/Saturday/Sunday',
    cost: 20,
    rewards: [
      [
        {
          img: `${baseURL}/talent-materials/Item_Teachings_of_Ballad.webp`,
          min: 1,
          max: 3
        }
      ],
      [
        {
          img: `${baseURL}/talent-materials/Item_Teachings_of_Ballad.webp`,
          min: 1,
          max: 3
        },
        {
          img: `${baseURL}/talent-materials/Item_Guide_to_Ballad.webp`,
          min: 1,
          max: 2
        }
      ],
      [
        {
          img: `${baseURL}/talent-materials/Item_Teachings_of_Ballad.webp`,
          min: 1,
          max: 3
        },
        {
          img: `${baseURL}/talent-materials/Item_Guide_to_Ballad.webp`,
          min: 1,
          max: 3
        }
      ],
      [
        {
          img: `${baseURL}/talent-materials/Item_Teachings_of_Ballad.webp`,
          min: 2,
          max: 3
        },
        {
          img: `${baseURL}/talent-materials/Item_Guide_to_Ballad.webp`,
          min: 0,
          max: 3
        },
        {
          img: `${baseURL}/talent-materials/Item_Philosophies_of_Ballad.webp`,
          min: 0,
          max: 3
        }
      ],
    ]
  },
  {
    name: 'Taishan Mansion',
    type: 'Talent Domain',
    cost: 20,
    day: 'Wednesday/Saturday/Sunday',
    rewards: [
      [
        {
          img: `${baseURL}/talent-materials/Item_Teachings_of_Gold.webp`,
          min: 1,
          max: 3
        }
      ],
      [
        {
          img: `${baseURL}/talent-materials/Item_Teachings_of_Gold.webp`,
          min: 1,
          max: 3
        },
        {
          img: `${baseURL}/talent-materials/Item_Guide_to_Gold.webp`,
          min: 1,
          max: 2
        }
      ],
      [
        {
          img: `${baseURL}/talent-materials/Item_Teachings_of_Gold.webp`,
          min: 1,
          max: 3
        },
        {
          img: `${baseURL}/talent-materials/Item_Guide_to_Gold.webp`,
          min: 1,
          max: 3
        }
      ],
      [
        {
          img: `${baseURL}/talent-materials/Item_Teachings_of_Gold.webp`,
          min: 2,
          max: 3
        },
        {
          img: `${baseURL}/talent-materials/Item_Guide_to_Gold.webp`,
          min: 0,
          max: 3
        },
        {
          img: `${baseURL}/talent-materials/Item_Philosophies_of_Gold.webp`,
          min: 0,
          max: 3
        }
      ],
    ]
  }
]
const weapon = [
  {
    name: 'Cecilia Garden',
    type: 'Weapon Domain',
    cost: 20,
    day: 'Wednesday/Saturday/Sunday',
    rewards: [
      [
        {
          img: `${baseURL}/weapon-materials/Item_Fetters_of_the_Dandelion_Gladiator.webp`,
          min: 4,
          max: 6
        }
      ],
      [
        {
          img: `${baseURL}/weapon-materials/Item_Fetters_of_the_Dandelion_Gladiator.webp`,
          min: 2,
          max: 3
        },
        {
          img: `${baseURL}/weapon-materials/Item_Chains_of_the_Dandelion_Gladiator.webp`,
          min: 1,
          max: 3
        }
      ],
      [
        {
          img: `${baseURL}/weapon-materials/Item_Fetters_of_the_Dandelion_Gladiator.webp`,
          min: 0,
          max: 3
        },
        {
          img: `${baseURL}/weapon-materials/Item_Chains_of_the_Dandelion_Gladiator.webp`,
          min: 1,
          max: 3
        },
        {
          img: `${baseURL}/weapon-materials/Item_Shackles_of_the_Dandelion_Gladiator.webp`,
          min: 0,
          max: 2
        }
      ],
      [
        {
          img: `${baseURL}/weapon-materials/Item_Fetters_of_the_Dandelion_Gladiator.webp`,
          min: 2,
          max: 3
        },
        {
          img: `${baseURL}/weapon-materials/Item_Chains_of_the_Dandelion_Gladiator.webp`,
          min: 0,
          max: 4
        },
        {
          img: `${baseURL}/weapon-materials/Item_Shackles_of_the_Dandelion_Gladiator.webp`,
          min: 0,
          max: 3
        },
        {
          img: `${baseURL}/weapon-materials/Item_Dream_of_the_Dandelion_Gladiator.webp`,
          min: 0,
          max: 1
        }
      ],
    ]
  },
  {
    name: 'Hidden Palace',
    type: 'Weapon Domain',
    cost: 20,
    day: 'Wednesday/Saturday/Sunday',
    rewards: [
      [
        {
          img: `${baseURL}/weapon-materials/Item_Grain_of_Aerosiderite.webp`,
          min: 4,
          max: 6
        }
      ],
      [
        {
          img: `${baseURL}/weapon-materials/Item_Grain_of_Aerosiderite.webp`,
          min: 2,
          max: 3
        },
        {
          img: `${baseURL}/weapon-materials/Item_Piece_of_Aerosiderite.webp`,
          min: 1,
          max: 3
        }
      ],
      [
        {
          img: `${baseURL}/weapon-materials/Item_Grain_of_Aerosiderite.webp`,
          min: 0,
          max: 3
        },
        {
          img: `${baseURL}/weapon-materials/Item_Piece_of_Aerosiderite.webp`,
          min: 1,
          max: 3
        },
        {
          img: `${baseURL}/weapon-materials/Item_Bit_of_Aerosiderite.webp`,
          min: 0,
          max: 2
        }
      ],
      [
        {
          img: `${baseURL}/weapon-materials/Item_Grain_of_Aerosiderite.webp`,
          min: 2,
          max: 3
        },
        {
          img: `${baseURL}/weapon-materials/Item_Piece_of_Aerosiderite.webp`,
          min: 0,
          max: 4
        },
        {
          img: `${baseURL}/weapon-materials/Item_Bit_of_Aerosiderite.webp`,
          min: 0,
          max: 3
        },
        {
          img: `${baseURL}/weapon-materials/Item_Chunk_of_Aerosiderite.webp`,
          min: 0,
          max: 1
        }
      ],
    ]
  },
]
const outcrops = [
  {
    name: 'Blossom of Revelation',
    type: 'Ley Line Outcrops',
    cost: 20,
    rewards: [
      [
        {
          img: `${baseURL}/other-materials/Item_Wanderer's_Advice.webp`,
          min: 7,
          max: 8 
        },
        {
          img: `${baseURL}/other-materials/Item_Adventurer's_Experience.webp`,
          min: 3,
          max: 4 
        }
      ],
      [
        {
          img: `${baseURL}/other-materials/Item_Wanderer's_Advice.webp`,
          min: 10,
          max: 12 
        },
        {
          img: `${baseURL}/other-materials/Item_Adventurer's_Experience.webp`,
          min: 5,
          max: 6 
        }
      ],
      [
        {
          img: `${baseURL}/other-materials/Item_Adventurer's_Experience.webp`,
          min: 10,
          max: 11
        }
      ],
      [
        {
          img: `${baseURL}/other-materials/Item_Adventurer's_Experience.webp`,
          min: 13,
          max: 14
        }
      ],
      [
        {
          img: `${baseURL}/other-materials/Item_Adventurer's_Experience.webp`,
          min: 6,
          max: 7
        },
        {
          img: `${baseURL}/other-materials/Item_Hero's_Wit.webp`,
          min: 2,
          max: 3
        }
      ],
      [
        {
          img: `${baseURL}/other-materials/Item_Adventurer's_Experience.webp`,
          min: 6,
          max: 7
        },
        {
          img: `${baseURL}/other-materials/Item_Hero's_Wit.webp`,
          min: 3,
          max: 4
        }
      ],
      [
        {
          img: `${baseURL}/other-materials/Item_Adventurer's_Experience.webp`,
          min: 6,
          max: 7
        },
        {
          img: `${baseURL}/other-materials/Item_Hero's_Wit.webp`,
          min: 4,
          max: 5
        }
      ],
      [
        {
          img: `${baseURL}/other-materials/Item_Adventurer's_Experience.webp`,
          min: 6,
          max: 7
        },
        {
          img: `${baseURL}/other-materials/Item_Hero's_Wit.webp`,
          min: 4,
          max: 5
        }
      ],
      [
        {
          img: `${baseURL}/other-materials/Item_Adventurer's_Experience.webp`,
          min: 6,
          max: 7
        },
        {
          img: `${baseURL}/other-materials/Item_Hero's_Wit.webp`,
          min: 4,
          max: 5
        }
      ],
    ]
  },
  {
    name: 'Blossom of Wealth',
    type: 'Ley Line Outcrops',
    cost: 20,
    rewards: [
      [
        {
          img: `${baseURL}/other-materials/Icon_Mora.webp`,
          min: 12000,
          max: 12000
        }
      ],
      [
        {
          img: `${baseURL}/other-materials/Icon_Mora.webp`,
          min: 20000,
          max: 20000
        }
      ],
      [
        {
          img: `${baseURL}/other-materials/Icon_Mora.webp`,
          min: 28000,
          max: 28000
        }
      ],
      [
        {
          img: `${baseURL}/other-materials/Icon_Mora.webp`,
          min: 36000,
          max: 36000
        }
      ],
      [
        {
          img: `${baseURL}/other-materials/Icon_Mora.webp`,
          min: 44000,
          max: 44000
        }
      ],
      [
        {
          img: `${baseURL}/other-materials/Icon_Mora.webp`,
          min: 52000,
          max: 52000
        }
      ],
      [
        {
          img: `${baseURL}/other-materials/Icon_Mora.webp`,
          min: 60000,
          max: 60000
        }
      ],
      [
        {
          img: `${baseURL}/other-materials/Icon_Mora.webp`,
          min: 60000,
          max: 60000
        }
      ],
      [
        {
          img: `${baseURL}/other-materials/Icon_Mora.webp`,
          min: 60000,
          max: 60000
        }
      ],
    ]
  }
]

const domainLevels = ["Level 1", "Level 2", "Level 3", "Level 4"];
const worldLevels = ["Level 0", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6", "Level 7", "Level 8"]
export const tasks = [
  {
    name: talent[0].name,
    type: talent[0].type,
    level: 3,
    levels: domainLevels,
    cost: 20,
    rewards: talent[0].rewards,
    runs: 3,
  },
  {
    name: talent[1].name,
    type: talent[1].type,
    level: 3,
    levels: domainLevels,
    cost: 20,
    rewards: talent[1].rewards,
    runs: 2,
  },
  {
    name: weapon[0].name,
    type: weapon[0].type,
    level: 3,
    levels: domainLevels,
    cost: 20,
    rewards: weapon[0].rewards,
    runs: 1,
  },
  {
    name: weapon[1].name,
    type: weapon[1].type,
    level: 3,
    levels: domainLevels,
    cost: 20,
    rewards: weapon[1].rewards,
    runs: 4,
  },
  {
    name: outcrops[0].name,
    type: outcrops[0].type,
    level: 7,
    levels: worldLevels,
    cost: 20,
    rewards: outcrops[0].rewards,
    runs: 1,
  },
  {
    name: outcrops[1].name,
    type: outcrops[1].type,
    level: 7,
    levels: worldLevels,
    cost: 20,
    rewards: outcrops[1].rewards,
    runs: 4,
  },
]
export const todaysDomain = {
  talent: [
    {
      name: talent[0].name,
      rewards: talent[0].rewards[3],
      day: talent[0].day
    },
    {
      name: talent[1].name,
      rewards: talent[1].rewards[3],
      day: talent[1].day
    }
  ],
  weapon: [
    {
      name: weapon[0].name,
      rewards: weapon[0].rewards[3],
      day: weapon[0].day
    },
    {
      name: weapon[1].name,
      rewards: weapon[1].rewards[3],
      day: weapon[1].day
    }
  ]
}

export const weaponTasks = [
  {
    name: weapon[0].name,
    type: weapon[0].type,
    level: 3,
    levels: domainLevels,
    cost: 20,
    rewards: weapon[0].rewards,
    runs: 1,
  },
  {
    name: weapon[1].name,
    type: weapon[1].type,
    level: 3,
    levels: domainLevels,
    cost: 20,
    rewards: weapon[1].rewards,
    runs: 1,
  }
]
export const outcropsTasks = [
  {
    name: outcrops[0].name,
    type: outcrops[0].type,
    level: 8,
    levels: worldLevels,
    cost: 20,
    rewards: outcrops[0].rewards,
    runs: 1,
  },
  {
    name: outcrops[1].name,
    type: outcrops[1].type,
    level: 8,
    levels: worldLevels,
    cost: 20,
    rewards: outcrops[1].rewards,
    runs: 1,
  }
]
export const talentTasks = [
  {
    name: talent[0].name,
    type: talent[0].type,
    level: 3,
    levels: domainLevels,
    cost: 20,
    rewards: talent[0].rewards,
    runs: 1,
  },
  {
    name: talent[1].name,
    type: talent[1].type,
    level: 3,
    levels: domainLevels,
    cost: 20,
    rewards: talent[1].rewards,
    runs: 1,
  }
]

export default (req, res) => {
  res.status(200).json(tasks)
}