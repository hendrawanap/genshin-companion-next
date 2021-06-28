import Tabs from "@/components/tabs";
import ResinTab from "@/components/resin-tab";
import TasksTab from "@/components/tasks-tab";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ResinTask(props) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const date = new Date();
  const today = days[date.getDay()];
  const userId = 1;
  const tabs = [
    {
      name: "Resin",
      component: () => <ResinTab/>
    },
    {
      name: "Tasks",
      component: () => <TasksTab tasks={tasks} day={today}/>
    },
  ];
  const [tasks, setTasks] = useState(null);
  
  useEffect( async() => {
    const res = await fetch(`/api/user-tasks?userId=${userId}&day=${today}`);
    const json = await res.json();
    setTasks(json);
  }, []);

  const linkToResinManager = () => (
    <Link
      href="/resin-manager"
    >
      <div className="flex items-center text-primary text-opacity-60 text-sm">
        <span>Resin Manager </span>
        <span className=" text-xl material-icons">chevron_right</span>
      </div>
    </Link>
  );
  return (
    <div className="px-4 mb-8">
      <Tabs tabs={tabs} activeTab={tabs[0].name} addOn={linkToResinManager()}/>
    </div>
  );
}