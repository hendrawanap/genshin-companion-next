import Tabs from "@/components/tabs";
import ResinTab from "@/components/resin-tab";
import TasksTab from "@/components/tasks-tab";
// import { Link } from "react-router-dom";
import Link from "next/link";
import { tasks } from "../models/Tasks";

export default function ResinTask(props) {
  const tabs = [
    {
      name: "Resin",
      component: () => <ResinTab/>
    },
    {
      name: "Tasks",
      component: () => <TasksTab modalHandler={props.modalHandler} tasks={tasks}/>
    },
  ];
  const activeTab = "Tasks";
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
      <Tabs tabs={tabs} activeTab={activeTab} addOn={linkToResinManager()}/>
    </div>
  );
}