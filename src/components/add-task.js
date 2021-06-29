import React, { useContext, useEffect, useReducer, useState } from "react";
import Tabs from "@/components/tabs";
import TaskCard from "@/components/task-card";
import { talentTasks, weaponTasks, outcropsTasks } from "../models/Tasks";
import Image from "next/image";
import { UserContext } from "@/contexts/UserContext";

export default function AddTask(props) {
  const { ar, wl } = useContext(UserContext);
  const reducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
      case 'fetchTalentDomains':
        return { ...state, talentDomains: payload };
      case 'fetchWeaponDomains':
        return { ...state, weaponDomains: payload };
      case 'fetchWeeklyBosses':
        return { ...state, weeklyBosses: payload };
      case 'addToAllTasks':
        return { ...state, allTasks: [...state.allTasks, ...payload]}
      default:
        console.log(`No such command exists: "${type}"`);
        return state;
    }
  }
  const initialState = {
    talentDomains: null,
    weaponDomains: null,
    weeklyBosses: null,
    allTasks: [],
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];

  const tabs = [
    {
      name: "All",
      component: () => <TasksTab tasks={state.allTasks}/>
    },
    {
      name: "Artefact",
      component: () => <TasksTab tasks={state.talentDomains}/>
    },
    {
      name: "Boss",
      component: () => <TasksTab tasks={state.talentDomains}/>
    },
    {
      name: "Talent",
      component: () => <TasksTab tasks={state.talentDomains}/>
    },
    {
      name: "Outcrops",
      component: () => <TasksTab tasks={state.talentDomains}/>
    },
    {
      name: "Weapon",
      component: () => <TasksTab tasks={state.weaponDomains}/>
    },
    {
      name: "Weekly Boss",
      component: () => <TasksTab tasks={state.weeklyBosses}/>
    },
  ];

  useEffect(async() => {
    if (!state.talentDomains) {
      const res = await fetch(`/api/tasks/talent-domains?ar=${ar}`);
      const json = await res.json();
      dispatch({ type: 'fetchTalentDomains', payload: json });
      dispatch({ type: 'addToAllTasks', payload: json});
    }
  },[]);

  useEffect(async() => {
    if (!state.weaponDomains) {
      const res = await fetch(`/api/tasks/weapon-domains?ar=${ar}`);
      const json = await res.json();
      dispatch({ type: 'fetchWeaponDomains', payload: json });
      dispatch({ type: 'addToAllTasks', payload: json});
    }
  },[]);

  useEffect(async() => {
    if (!state.weeklyBosses) {
      const res = await fetch(`/api/tasks/weekly-bosses?ar=${ar}&wl=${wl}`);
      const json = await res.json();
      dispatch({ type: 'fetchWeeklyBosses', payload: json });
      dispatch({ type: 'addToAllTasks', payload: json});
    }
  },[]);

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
            className={`relative flex-shrink-0  rounded-full border border-white border-opacity-10 bg-white bg-opacity-5 mr-1 ${
              expanded ? "w-9 h-9" : "w-7 h-7"
            }`}
            key={`reward-${index}`}
          >
            <Image
              className="rounded-full"
              src={reward}
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
          <div className="flex-1 text-sm overflow-x-auto scrollbar-hide whitespace-nowrap">
            {props.task.domainName} <span className="text-xs">{props.task.days.length !== 7 && `(${props.task.days.join('/')})`}</span>
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
            <div className="flex overflow-x-auto scrollbar-hide">{rewardsContent(props.task.possibleRewards)}</div>
          </div>
          <div className={`mt-2 ${expanded ? "block" : "hidden"}`}>
            <div className="text-xs mb-1">Required by:</div>
            <div className="flex overflow-x-auto scrollbar-hide">
              {props.task.avatars.map((avatar, index) => {
                return (
                  <div className="relative flex-shrink-0 w-9 h-9 rounded-full border border-white border-opacity-10 bg-white bg-opacity-5 mr-1" key={`avatar-${index}`}>
                    <Image
                      className="rounded-full"
                      src={avatar}
                      alt={props.task.requiredBy[index]}
                      layout="responsive"
                      width="36px"
                      height="36px"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  function TasksTab({tasks}) {
    return (
      <div className={`flex flex-col`}>
        {tasks && tasks.map((task, index) => <TaskCardContent task={task} key={`task-${index}`}/>)}
      </div>
    );
  }
}