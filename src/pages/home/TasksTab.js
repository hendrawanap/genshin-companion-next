import React, { useState } from "react";
import {
  MaterialDropDown,
  MaterialCounter,
} from "../../components/material/Material";
import { Modal, modalHandler } from "../../components/Modal";
import Image from "next/image";

function TasksTab(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(() => null);
  const modal = modalHandler(setModalContent, setModalOpen);

  const tasksList = [
    {
      name: "Cecilia Garden",
      type: "Domain",
      level: "Level 4",
      levels: ["Level 1", "Level 2", "Level 3", "Level 4"],
      cost: 20,
      rewards: [
        { img: "/assets/img/Item_Philosophies_of_Ballad.webp", min: 2, max: 3 },
        { img: "/assets/img/Item_Philosophies_of_Ballad.webp", min: 0, max: 3 },
        { img: "/assets/img/Item_Philosophies_of_Ballad.webp", min: 0, max: 3 },
      ],
      runs: 3,
    },
    {
      name: "Hidden Palace",
      type: "Domain",
      level: "Level 4",
      levels: ["Level 1", "Level 2", "Level 3", "Level 4"],
      cost: 20,
      rewards: [
        { img: "/assets/img/Item_Philosophies_of_Ballad.webp", min: 2, max: 3 },
        { img: "/assets/img/Item_Philosophies_of_Ballad.webp", min: 0, max: 3 },
        { img: "/assets/img/Item_Philosophies_of_Ballad.webp", min: 0, max: 3 },
      ],
      runs: 2,
    },
    {
      name: "Cryo Hypostasis",
      type: "World Boss",
      level: "Level 8",
      levels: [
        "Level 0",
        "Level 1",
        "Level 2",
        "Level 3",
        "Level 4",
        "Level 5",
        "Level 6",
        "Level 7",
        "Level 8",
      ],
      cost: 40,
      rewards: [
        { img: "/assets/img/Item_Philosophies_of_Ballad.webp", min: 2, max: 3 },
        { img: "/assets/img/Item_Philosophies_of_Ballad.webp", min: 0, max: 3 },
        { img: "/assets/img/Item_Philosophies_of_Ballad.webp", min: 0, max: 3 },
      ],
      runs: 2,
    },
  ];

  return [
    <div className={`flex flex-col${props.isActive ? "" : " hidden"}`}>
      {tasksList.map((task) => (
        <TaskCard task={task} modalHandler={modal} />
      ))}
    </div>,
    <Modal isActive={modalOpen} closeHandler={modal.close}>
      {modalContent}
    </Modal>,
  ];
}

function ConsumeResinModal(props) {
  const resinSource = [
    {
      name: "Original",
      value: 98,
    },
    {
      name: "Condensed",
      value: 2,
    },
  ];

  const [costs, setCosts] = useState(props.cost);
  const [done, setDone] = useState(1);
  const handleDone = (done) => {
    setDone(done);
    setCosts(props.cost * done);
  };

  return (
    <div className="bg-navbar px-6 py-5 rounded-md">
      <div className="mb-4">Consume Resin?</div>
      <div className="flex text-white text-opacity-60 text-sm justify-between">
        <div className="">
          <div className="h-20">
            Resin Source:
            <div className="mt-1">
              <MaterialDropDown
                activeMenu={resinSource[0].name}
                menus={resinSource.map((source) => source.name)}
              />
            </div>
          </div>
          <div className="">
            Done:
            <div className="mt-1">
              <MaterialCounter
                initialCount={done}
                min={1}
                max={props.runs}
                onCountsChange={handleDone}
              />
            </div>
          </div>
        </div>
        <div className="">
          <div className="h-20">
            Original Resin:
            <div className="mt-1">
              <span className="font-semibold text-3xl text-primary">{resinSource[0].value}</span>{" "}
              <span className="text-danger">{`(-${costs})`}</span>
            </div>
          </div>
          <div className="">
            Condensed Resin:
            <div className="mt-1 font-semibold text-3xl text-primary">{resinSource[1].value}</div>
          </div>
        </div>
      </div>
      <div className="text-opacity-80 text-white mt-2"><span className="text-primary">{costs} Original Resin </span>will be consumed. Continue?</div>
    </div>
  );
}

function TaskCard(props) {
  const calculateRewards = (rewards, runs) => {
    return rewards.map((reward) => {
      return {
        img: reward.img,
        count: `${reward.min * runs}~${reward.max * runs}`,
      };
    });
  };
  const modalHandler = props.modalHandler;

  const task = props.task;
  const [expanded, setExpanded] = useState(false);
  const [rewards, setRewards] = useState(
    calculateRewards(task.rewards, task.runs)
  );
  const [runs, setRuns] = useState(task.runs);
  const [totalCosts, setTotalCosts] = useState(task.runs * task.cost);
  const [level, setLevel] = useState(task.level);

  const handleExpand = (event) => {
    setExpanded(!expanded);
  };

  const handleRuns = (runs) => {
    setRuns(runs);
    setTotalCosts(runs * task.cost);
    setRewards(calculateRewards(task.rewards, runs));
  };

  const CardHeader = () => (
    <div className="flex items-center h-12">
      <div
        className="w-4 h-4 border border-primary rounded-full mr-2"
        onClick={() =>
          modalHandler.open(
            <ConsumeResinModal cost={task.cost} runs={task.runs} />
          )
        }
      ></div>
      <div className="flex whitespace-nowrap overflow-auto flex-1 text-white text-opacity-60 mr-2 text-sm font-medium tracking-wide">
        {task.name}
      </div>
      <div className="flex mr-2 items-center text-primary font-medium">
        <div className="w-4 mr-1">
          <Image
            src="/assets/img/Item_Fragile_Resin.png"
            width="100%"
            height="auto"
            layout="responsive"
          />
        </div>
        {totalCosts}
      </div>
      <div
        className="text-white text-opacity-60 cursor-default material-icons"
        onClick={handleExpand}
      >
        expand_more
      </div>
    </div>
  );

  const RewardsContent = () =>
    rewards.map((reward, index) => (
      <div className="flex items-center mr-2"
      key={`reward-${index}`}>
        <Image
          className="mr-1"
          src={reward.img}
          width={32}
          height={32}
        />
        {reward.count}
      </div>
    ));

  const ExpandedMenu = (expanded) => (
    <div
      className={`pl-7 pb-3 text-xs text-white text-opacity-60 ${
        expanded ? "flex" : "hidden"
      }`}
    >
      <div className="flex flex-col mr-8">
        <div className="h-16">
          {task.type === "Domain" ? "Domain" : "World"} Level:
          <div className="mt-1">
            <MaterialDropDown activeMenu={level} menus={task.levels} />
          </div>
        </div>
        <div className="mt-2">
          Cost per run:
          <div className="flex items-center font-medium text-base text-primary mt-1">
            <div className="w-4 mr-1">
              <Image
                src="/assets/img/Item_Fragile_Resin.png"
                width="100%"
                height="auto"
                layout="responsive"
                objectFit="contain"
              />
            </div>
            {task.cost}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col h-16">
          Rewards:
          <div className="mt-1 flex overflow-auto text-primary">
            <RewardsContent />
          </div>
        </div>
        <div className="mt-2">
          Runs:
          <div className="mt-1">
            <MaterialCounter
              initialCount={runs}
              min={0}
              max={100}
              onCountsChange={handleRuns}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`border border-white border-opacity-10 rounded-md px-3 mb-2`}
    >
      {CardHeader()}
      {ExpandedMenu(expanded)}
    </div>
  );
}

export default TasksTab;
