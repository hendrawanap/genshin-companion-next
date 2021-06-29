const talentMaterials = require('../../json/talentMaterials.json');
const domains = require('../../json/domains.json');
const characters = require('../../json/characters.json');

const talentDomains = domains.filter((domain) => domain.type == 'Domains of Mastery');
let tasks;
let initialLevel = 1;
let initialRuns = 1;
let initialLevels = ["Level 1", "Level 2", "Level 3", "Level 4"];
let savedAr;
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

function makeTasks(ar = 55) {
  setInitialLevelRuns(ar);
  const tasks = [];
  talentDomains.forEach(domain => {
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
        avatars: requiredBy.map(character => character.avatar),
        possibleRewards: talents.map(talent => talent.img)
      })
    }
  });
  return tasks;
}

function setInitialLevelRuns(ar) {
  if (ar < 28) {
    initialLevel = 1;
  } else if (ar < 36) {
    initialLevel = 2;
  } else if (ar < 45) {
    initialLevel = 3;
  } else {
    initialLevel = 4;
  }
}

export function fetchTalentDomains(name, day, requiredBy) {
  if (!tasks) {
    tasks = makeTasks();
  }
  return filterTasks(day, requiredBy, name);
}

function filterTasks(day, requiredBy, name) {
  if (day && requiredBy) {
    return tasks.filter(task => task.days.includes(day) && task.requiredBy.includes(requiredBy));
  } else if (day) {
    return tasks.filter(task => task.days.includes(day));
  } else if (requiredBy) {
    return tasks.filter(task => task.requiredBy.includes(requiredBy));
  } else if (name) {
    return tasks.find(task => task.subDomainName === name);
  } else {
    return tasks;
  }
}

export default async function handler(req, res) {
  const { day, requiredBy, name, ar, wl } = req.query;
  if (!tasks) {
    console.log(`fetch talent domains`);
    savedAr = ar;
    tasks = makeTasks(ar);
  } else {
    console.log(`not first time, saved ar: ${savedAr}`);
  }
  const response = filterTasks(day, requiredBy, name);
  res.status(200).json(response);
}
