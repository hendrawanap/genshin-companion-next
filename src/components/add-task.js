import React, { useState } from "react";
import Tabs from "@/components/tabs";
import TaskCard from "@/components/task-card";
import { talentTasks, weaponTasks, outcropsTasks } from "../models/Tasks";
import Image from "next/image";

export default function AddTask(props) {
  const tabs = [
    {
      name: "All",
      component: () => <TasksTab tasks={talentTasks}/>
    },
    {
      name: "Artefact",
      component: () => <TasksTab tasks={talentTasks}/>
    },
    {
      name: "Boss",
      component: () => <TasksTab tasks={talentTasks}/>
    },
    {
      name: "Talent",
      component: () => <TasksTab tasks={talentTasks}/>
    },
    {
      name: "Outcrops",
      component: () => <TasksTab tasks={outcropsTasks}/>
    },
    {
      name: "Weapon",
      component: () => <TasksTab tasks={weaponTasks}/>
    },
    {
      name: "Weekly Boss",
      component: () => <TasksTab tasks={talentTasks}/>
    },
  ];
  const activeTab = "Talent";

  return (
    <div className="bg-navbar h-screen px-4 overflow-y-auto scrollbar-hide">
      <div className="flex items-center py-4 text-white text-opacity-80">
        <span
          className="material-icons mr-4"
          onClick={props.closeHandler}
        >
          clear
        </span>
        Add Task
      </div>
      <div className="flex justify-between mb-4">
        <div className="py-2 pl-4 pr-2 border border-white border-opacity-10 rounded-md flex items-center">
          <input className="bg-transparent text-sm" placeholder="Search..."></input>
          <div className="material-icons text-white text-opacity-60 text-lg leading-none">
            search
          </div>
        </div>
        <button className="text-white text-opacity-60 py-2 pl-2 pr-3 flex border border-white border-opacity-10 rounded-md items-center">
          <span className="material-icons mr-2 text-lg leading-none">filter_list</span><span className="text-sm">Filters</span>
        </button>
      </div>
      <Tabs tabs={tabs} activeTab={activeTab} />
    </div>
  );
  function TaskCardContent(props) {
    const [expanded, setExpanded] = useState(false);
    const rewardsContent = (rewards) => {
      return rewards.map((reward, index) => {
        return (
          <div
            className={`rounded-full border border-white border-opacity-10 bg-white bg-opacity-5 mr-1 ${
              expanded ? "w-9" : "w-7"
            }`}
            key={`reward-${index}`}
          >
            <Image
              src={reward.img}
              width="100%"
              height="auto"
              layout="responsive"
            />
          </div>
        );
      });
    };
    return (
      <div className="flex flex-col py-2 px-3 border border-white border-opacity-10 rounded-md mb-3 text-white text-opacity-60">
        <div className="flex items-center mb-2">
          <div className="border-r-2 border-primary h-3 mr-2"></div>
          <div className="flex-1 text-sm">
            {props.task.name} <span className="text-xs">(Saturday)</span>
          </div>
          <button
            className="material-icons"
            onClick={() => setExpanded(!expanded)}
          >
            expand_more
          </button>
        </div>
        <div className={`ml-2 ${expanded ? "block" : "hidden"}`}>
          <div className={`text-xs mb-1 ${expanded ? "block" : "hidden"}`}>
            Tasks:
          </div>
          <TaskCard isAdd={true} task={props.task}/>
        </div>
        <div className="ml-2">
          <div className="">
            <div className={`text-xs mb-1 ${expanded ? "block" : "hidden"}`}>
              Possible rewards:
            </div>
            <div className="flex">{rewardsContent(props.task.rewards[3])}</div>
          </div>
          <div className={`mt-2 ${expanded ? "block" : "hidden"}`}>
            <div className="text-xs mb-1">Required by:</div>
            <div className="flex">
              <div
                className={`rounded-full border border-white border-opacity-10 bg-white bg-opacity-5 mr-1 ${
                  expanded ? "w-9" : "w-7"
                }`}
              >
                <Image
                  src="/assets/img/Item_Philosophies_of_Ballad.webp"
                  width="100%"
                  height="auto"
                  layout="responsive"
                />
              </div>
              <div
                className={`rounded-full border border-white border-opacity-10 bg-white bg-opacity-5 mr-1 ${
                  expanded ? "w-9" : "w-7"
                }`}
              >
                <Image
                  src="/assets/img/Item_Philosophies_of_Ballad.webp"
                  width="100%"
                  height="auto"
                  layout="responsive"
                />
              </div>
              <div
                className={`rounded-full border border-white border-opacity-10 bg-white bg-opacity-5 mr-1 ${
                  expanded ? "w-9" : "w-7"
                }`}
              >
                <Image
                  src="/assets/img/Item_Philosophies_of_Ballad.webp"
                  width="100%"
                  height="auto"
                  layout="responsive"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function TasksTab(props) {
    return (
      <div className={`flex flex-col`}>
        {props.tasks.map((task, index) => <TaskCardContent task={task} key={`task-${index}`}/>)}
      </div>
    );
  }
}