import { fetchTalentDomains } from "../talent-domains";
import { fetchWeaponDomains } from "../weapon-domains";

export default async(req, res) => {
  // let talentDomains = await fetch("/api/tasks/talent-domains");
  // talentDomains = await talentDomains.json();
  // let weeklyBosses = await fetch("/api/tasks/weekly-bosses");
  // weeklyBosses = await weeklyBosses.json();

  const talentDomains = fetchTalentDomains();
  const weaponDomains = fetchWeaponDomains();
  // console.log(talentDomains);
  res.status(200).json(talentDomains.concat(weaponDomains));
} 