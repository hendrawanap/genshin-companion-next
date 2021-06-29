const weeklyBosses = require("@/json/weeklyBosses.json");
const weeklyBossMaterials = require("@/json/weeklyBossMaterials.json");
const ascensionGems = require("@/json/ascensionGems.json");
const characters = require("@/json/characters.json");
let tasks;
let initialLevel = 1;
let initialRuns = 1;

function makeTask(boss, isDiscounted, ar, wl) {
  const gems = ascensionGems.filter(gem => boss.ascensionGems.includes(gem.series));
  const bossMaterials = weeklyBossMaterials.filter(material => material.droppedBy === boss.name);
  const levels = [];
  const rewards = [];
  const isDomain = boss.type.includes("Domain");
  const requiredBy = characters.filter(character => bossMaterials.map(material => material.name).includes(character.weeklyBossMaterial));
  let i = 1;
  for (const level in boss.rewards) {
    const split = level.split("_");
    const res = {}
    res['level'] = i++;
    res[split[0]] = parseInt(split[1]);
    levels.push(res);
    const rewardsRes = []
    if (isDomain && res[split[0]] >= 40) {
      bossMaterials.forEach(material => {
        rewardsRes.push({ img: material.img });
      })
    } else if (!isDomain && res[split[0]] >= 5) {
      bossMaterials.forEach(material => {
        rewardsRes.push({ img: material.img });
      })
    }
    boss.rewards[level].forEach(reward => {
      const filter = gems.filter(gem => gem.name.includes(reward));
      filter.forEach(gem => {
        rewardsRes.push({ img: gem.img })
      });
    });
    rewards.push(rewardsRes);
  }
  const task = {
    domainName: boss.domainName,
    name: boss.name,
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    cost: isDiscounted ? 30 : 60,
    level: setInitialLevel(isDomain ? ar : wl, levels, isDomain),
    levels: levels.map(level => `Level ${level.level}`),
    runs: initialRuns,
    type: boss.type,
    rewards: rewards,
    requiredBy: requiredBy.map(character => character.name),
    avatars: requiredBy.map(character => character.avatar),
    possibleRewards: []
  };
  bossMaterials.forEach(material => {
    task.possibleRewards.push(material.img);
  });
  gems.forEach((gem, index) => {
    index % 4 == 3 && task.possibleRewards.push(gem.img);
  });
  return task;
}

function setInitialLevel(rank, levels, isDomain) {
  const res = levels.reverse().find(level => level[isDomain ? "ar" : "wl"] <= rank);
  levels.reverse();
  if (res.length != 0)
    return res.level;
  else
    return 1;
}

export default async function handler(req, res) {
  const { ar, wl } = req.query;
  if (!tasks) {
    tasks = weeklyBosses.map(boss => makeTask(boss, false, ar, wl));
  } else {
    console.log(`not first time`);
  }
  res.status(200).json(tasks);
}