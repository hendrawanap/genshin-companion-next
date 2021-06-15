const talentMaterials = require('../../json/talentMaterials.json');
const domains = require('../../json/domains.json');
const characters = require('../../json/characters.json');

const talentDomains = domains.filter((domain) => domain.type == 'Domains of Mastery');
let tasks = [];
let initialLevel = 1;
let initialRuns = 1;
let initialLevels = ["Level 1", "Level 2", "Level 3", "Level 4"];
const rewards = [
  [
    {
      rarity: 2,
      min: 1,
      max: 3
    }
  ],
  [
    {
      rarity: 2,
      min: 1,
      max: 3
    },
    {
      rarity: 3,
      min: 1,
      max: 2
    },
  ],
  [
    {
      rarity: 2,
      min: 1,
      max: 3
    },
    {
      rarity: 3,
      min: 1,
      max: 3
    },
  ],
  [
    {
      rarity: 2,
      min: 2,
      max: 3
    },
    {
      rarity: 3,
      min: 0,
      max: 3
    },
    {
      rarity: 4,
      min: 0,
      max: 3
    },
  ]
]

function makeTasks(domain) {
  const tasks = [];
  for (const sub in domain.subDomains) {
    const talents = talentMaterials.filter(talent => talent.series == domain.subDomains[sub].series);
    const requiredBy = characters.filter(character => character.talentMaterial == domain.subDomains[sub].series);
    tasks.push({
      domainName: domain.name,
      subDomainName: domain.subDomains[sub].name,
      name: domain.subDomains[sub].name,
      days: domain.subDomains[sub].days,
      cost: domain.cost,
      level: initialLevel,
      levels: initialLevels,
      runs: initialRuns,
      type: domain.type,
      rewards: rewards.map(level => {
        return level.map(reward => {
          return {
            img: talents.filter(talent => talent.rarity == reward.rarity)[0].img,
            min: reward.min,
            max: reward.max
          }
        })
      }),
      requiredBy: requiredBy.map(character => character.name),
      avatars: requiredBy.map(character => character.avatar)
    })
  }
  return tasks;
}



function filterTasksByDay(day) {
  return tasks.filter(task => task.days.includes(day));
}

function filterTasksByCharacter(name) {
  return tasks.filter(task => task.requiredBy.includes(name));
}

function setInitialLevelRuns(user) {
  if (user.ar < 28) {
    initialLevel = 1;
  } else if (user.ar < 36) {
    initialLevel = 2;
  } else if (user.ar < 45) {
    initialLevel = 3;
  } else {
    initialLevel = 4;
  }
}

export default (req, res) => {
  const user = {
    name: "Baps",
    ar: 36
  }
  setInitialLevelRuns(user);
  talentDomains.forEach(domain => {
    tasks = tasks.concat(makeTasks(domain));
  });
  const { day, name } = req.query;
  const response = filterTasksByCharacter(name);
  res.status(200).json(tasks);
}