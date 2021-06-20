import { todaysDomain } from "../models/Tasks";
import Tabs from "@/components/tabs";
import TodaysTaskCard from "@/components/todays-task-card";
import { useEffect, useState } from "react";

export default function TodaysDomains() {
  const talents = todaysDomain.talent;
  const weapon = todaysDomain.weapon;
  const tabs = [
    {
      name: "All",
      component: () => <TodaysTasks url="/api/tasks/weapon-domains"/>
    },
    {
      name: "Weapon",
      component: () => <TodaysTasks url="/api/tasks/weapon-domains"/>
    },
    {
      name: "Talent",
      component: () => <TodaysTasks url="/api/tasks/talent-domains"/>
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
  const today = "Saturday";
  const url = `${props.url}?day=${today}`;
  useEffect( async() => {
    const res = await fetch(url);
    const json = await res.json();
    setTasks(json);
  },[])
  const [tasks, setTasks] = useState(null);

  return (
    <div className={`tracking-wider`}>
      {tasks && tasks.map((task, index) => (
        <TodaysTaskCard today={today} name={task.domainName} rewards={task.possibleRewards} requiredBy={task.requiredBy} avatars={task.avatars} key={`task-${index}`} />
      ))}
    </div>
  );
}