import React, { lazy, useState } from "react";
import ResinTab from "./ResinTab";
import TasksTab from "./TasksTab";
import TaskDetailList from "./TaskDetail";
import { MaterialChip } from "../../components/material/Material";
import { Link } from "react-router-dom";
import Image from 'next/image';

function Home() {
  return (
    <div className="pt-14">
      <Welcome name="Tabibito" />
      <ResinTask />
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
function Tabs(props) {
  const [activeTab, setActiveTab] = useState(props.activeTab);
  const handleTabClick = (event) => {
    setActiveTab(event.target.id);
  };

  return (
    <div className="Tabs">
      <div className="flex justify-between mb-3">
        <div className="flex">
          {props.tabs.map((tab) => (
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
      {props.tabs.map((tab) =>
        tab.component({
          ...tab.props,
          ...{ isActive: activeTab === tab.name ? true : false },
        })
      )}
    </div>
  );
}

function TodaysDomain() {
  const talents = [
    { name: "Forsaken Rift", day: "Saturday" },
    { name: "Taishan Mansion", day: "Saturday" },
  ];
  const weapon = [
    { name: "Cecilia Garden", day: "Saturday" },
    { name: "Hidden Palace", day: "Saturday" },
  ];
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

function ComponentWithModal(component, modalHandler) {}
export default Home;
