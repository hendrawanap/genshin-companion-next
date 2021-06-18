import React, { useEffect, useState } from "react";
import Tabs from "@/components/tabs";
import TaskCard from "@/components/task-card";
import { talentTasks, weaponTasks, outcropsTasks } from "../models/Tasks";
import Image from "next/image";

export default function AddTask(props) {
  

  const [tabs, setTabs] = useState([
    {
      name: "All",
      component: () => <TasksTab/>
    },
    {
      name: "Artefact",
      component: () => <TasksTab/>
    },
    {
      name: "Boss",
      component: () => <TasksTab/>
    },
    {
      name: "Talent",
      component: () => <TasksTab/>
    },
    {
      name: "Outcrops",
      component: () => <TasksTab/>
    },
    {
      name: "Weapon",
      component: () => <TasksTab/>
    },
    {
      name: "Weekly Boss",
      component: () => <TasksTab/>
    },
  ]);

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
      <Tabs tabs={tabs} activeTab={tabs[0].name} />
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
            {props.task.domainName} <span className="text-xs">({props.task.days.join('/')})</span>
          </div>
          <button
            className="material-icons"
            onClick={() => setExpanded(!expanded)}
          >
            expand_more
          </button>
        </div>
        <div className={`ml-2 mb-2 ${expanded ? "block" : "hidden"}`}>
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
              {props.task.avatars.map((avatar, index) => {
                return (
                  <img
                    src={"/" + avatar}
                    alt={props.task.requiredBy[index]}
                    className={`rounded-full border border-white border-opacity-10 bg-white bg-opacity-5 mr-1 relative ${
                      expanded ? "w-9 h-9" : "w-7 h-7"
                    }`}
                  />
                  // <div
                  //   className={`rounded-full border border-white bg-white bg-opacity-5 mr-1 relative ${
                  //     expanded ? "w-9 h-9" : "w-7 h-7"
                  //   }`}
                  // >
                  //   {/* <Image
                  //     src={"/" + avatar}
                  //     alt={props.task.requiredBy[index]}
                  //     layout="fill"
                  //     objectFit="contain"
                  //   /> */}
                    
                  // </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  function TasksTab(props) {
    useEffect( async() => {
      const res = await fetch("/api/tasks/talent-domains");
      const json = await res.json();
      console.log(json);
      setTasks(json);
    },[])

    const [tasks, setTasks] = useState(null);

    return (
      <div className={`flex flex-col`}>
        {tasks && tasks.map((task, index) => <TaskCardContent task={task} key={`task-${index}`}/>)}
      </div>
    );
  }
}