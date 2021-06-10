import React, { lazy, useState } from "react";
import ResinTab from "./ResinTab";
import TasksTab from "./TasksTab";
import TaskDetailList from "./TaskDetail";
import { MaterialChip } from "../../components/material/Material";
import { Link } from "react-router-dom";
import Image from 'next/image';
import { todaysDomain } from "../../models/Tasks";

function Home() {
  return (
    <div className="pt-14 py-2">
      <Welcome name="Tabibito" />
      <ResinTask/>
      <TodaysDomain />
    </div>
  );
}

function Welcome(props) {
  return (
    <div className="pt-8 px-4 flex">
      <div className="font-poppins flex-1">
        <h1 className="text-4xl text-white text-opacity-90">Hello,</h1>
        <h1 className="text-5xl text-primary font-medium text-opacity-90 py-2 tracking-tight">
          {props.name}
        </h1>
      </div>
      <div className="w-2/5">
        <Image src="/assets/img/paimon_edited.png" width="100%" height="auto" layout="responsive" objectFit="contain" />
      </div>
    </div>
  );
}

function ResinTask(props) {
  const tabs = [
    { name: "Resin", component: (props) => ResinTab(props), props: {} },
    {
      name: "Tasks",
      component: (props) => TasksTab(props),
      props: { modalHandler: props.modalHandler },
    },
  ];
  const activeTab = "Tasks";
  const linkToResinManager = () => (
    <Link
      to="./resin-manager"
      className="flex items-center text-primary text-opacity-60 text-sm"
    >
      <span>Resin Manager </span>
      <span className=" text-xl material-icons">chevron_right</span>
    </Link>
  );
  return (
    <div className="px-4 mb-8">
      <Tabs tabs={tabs} activeTab={activeTab} addOn={linkToResinManager()} />
    </div>
  );
}
export function Tabs(props) {
  const [activeTab, setActiveTab] = useState(props.activeTab);
  const handleTabClick = (event) => {
    setActiveTab(event.target.id);
  };

  return (
    <div className="Tabs">
      <div className="flex justify-between mb-3">
        <div className="flex overflow-x-auto scrollbar-hide">
          { props.tabs.map((tab) => (
            <MaterialChip
              title={tab.name}
              isActive={activeTab === tab.name}
              handleClick={handleTabClick}
              key={tab.name}
              id={tab.name}
            />
          ))}
        </div>
        {props.addOn}
      </div>
      { props.tabs.map((tab, index) => {
        let tabProps = {
          ...tab.props,
          // ...{ isActive: activeTab === tab.name ? true : false }
        };
        return (
          <div key={`tab-${index}`} className={`${activeTab === tab.name ? 'block' : 'hidden'}`}>
            {tab.component(tabProps)}
          </div>
        );
      })}
    </div>
  );
}

function TodaysDomain() {
  const talents = todaysDomain.talent;
  const weapon = todaysDomain.weapon;
  const tabs = [
    {
      name: "All",
      component: (props) => TaskDetailList(props),
      props: { tasks: [...weapon, ...talents] },
    },
    {
      name: "Weapon",
      component: (props) => TaskDetailList(props),
      props: { tasks: weapon },
    },
    {
      name: "Talent",
      component: (props) => TaskDetailList(props),
      props: { tasks: talents },
    },
  ];
  const activeTab = "Talent";
  return (
    <div className="px-4">
      <h3 className="mb-2 text-white text-opacity-80 text-lg font-medium tracking-wide">
        Today's Domain
      </h3>
      <Tabs tabs={tabs} activeTab={activeTab} />
    </div>
  );
}
export default Home;
