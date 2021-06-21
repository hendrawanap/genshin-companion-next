import { fetchTalentDomains } from "../tasks/talent-domains";
import { fetchWeaponDomains } from "../tasks/weapon-domains";

const userTasks = require("@/json/userTasks.json");

export default async(req, res) => {
  const { userId, day } = req.query;
  const filtered = userTasks.filter(task => task.userId === parseInt(userId) && task.day === day);
  const response = [];
  filtered.forEach((task, index) => {
    if (task.type === "Talent Domains") {
      response.push(fetchTalentDomains(task.name));
    } else if (task.type === "Weapon Domains") {
      response.push(fetchWeaponDomains(task.name));
    }
    response[index].level = task.level;
    response[index].runs = task.runs;
  });
  res.status(200).json(response);
}