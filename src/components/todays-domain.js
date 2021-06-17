import { todaysDomain } from "../models/Tasks";
import Tabs from "@/components/tabs";
import TodaysTaskCard from "@/components/todays-task-card";

export default function TodaysDomains() {
  const talents = todaysDomain.talent;
  const weapon = todaysDomain.weapon;
  const tabs = [
    {
      name: "All",
      component: () => <TodaysTasks tasks={[...weapon, ...talents]}/>
    },
    {
      name: "Weapon",
      component: () => <TodaysTasks tasks={weapon}/>
    },
    {
      name: "Talent",
      component: () => <TodaysTasks tasks={talents}/> 
    },
  ];
  const activeTab = "Talent";
  return (
    <div className="px-4">
      <h3 className="mb-2 text-white text-opacity-high text-lg font-medium tracking-wide">
        Today's Domains
      </h3>
      <Tabs tabs={tabs} activeTab={activeTab}/>
    </div>
  );
}

function TodaysTasks(props) {
  return (
    <div className={`tracking-wider`}>
      {props.tasks.map((task, index) => (
        <TodaysTaskCard name={task.name} day={task.day} rewards={task.rewards} key={`task-${index}`} />
      ))}
    </div>
  );
}