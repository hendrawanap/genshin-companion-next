import Tabs from "@/components/tabs";
import TodaysTaskCard from "@/components/todays-task-card";
import { UserContext } from "@/contexts/UserContext";
import { useContext, useEffect, useReducer, useState } from "react";

export default function TodaysDomains() {
  const reducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
      case 'fetchTalentDomains':
        return { ...state, talentDomains: payload };
      case 'fetchWeaponDomains':
        return { ...state, weaponDomains: payload };
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
    allTasks: [],
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  const tabs = [
    {
      name: "All",
      component: () => <TodaysTasks tasks={state.allTasks} today={today}/>
    },
    {
      name: "Weapon",
      component: () => <TodaysTasks tasks={state.weaponDomains} today={today}/>
    },
    {
      name: "Talent",
      component: () => <TodaysTasks tasks={state.talentDomains} today={today}/>
    },
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
  const date = new Date();
  const today = days[date.getDay()];
  const { ar } = useContext(UserContext);

  useEffect(async() => {
    if (!state.talentDomains) {
      const res = await fetch(`/api/tasks/talent-domains?ar=${ar}&day=${today}`);
      const json = await res.json();
      dispatch({ type: 'fetchTalentDomains', payload: json });
      dispatch({ type: 'addToAllTasks', payload: json});
    }
  },[]);

  useEffect(async() => {
    if (!state.weaponDomains) {
      const res = await fetch(`/api/tasks/weapon-domains?ar=${ar}&day=${today}`);
      const json = await res.json();
      dispatch({ type: 'fetchWeaponDomains', payload: json });
      dispatch({ type: 'addToAllTasks', payload: json});
    }
  },[]);

  return (
    <div className="px-4">
      <h3 className="mb-2 text-white text-opacity-high text-lg font-medium tracking-wide">
        Today's Domains
      </h3>
      <Tabs tabs={tabs} activeTab={tabs[0].name}/>
    </div>
  );
}

function TodaysTasks({tasks, today}) {

  return (
    <div className={`tracking-wider`}>
      { !tasks && <div>Loading...</div> }
      { tasks && tasks.map((task, index) => <TodaysTaskCard task={task} today={today} name={task.domainName} rewards={task.possibleRewards} requiredBy={task.requiredBy} avatars={task.avatars} key={`task-${index}`} />) }
    </div>
  );
}