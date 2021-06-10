import React, { useState, useContext } from "react";
import {
  MaterialDropDown,
  MaterialCounter,
  MaterialButton
} from "../../components/material/Material";
import { Modal } from "../../components/Modal";
import Image from "next/image";
import { ResinContext } from "../../contexts/ResinContext";
import { tasks } from "../../models/Tasks";

function TasksTab(props) {
  const tasksList = tasks;

  return (
    <div className={`flex flex-col`}>
      {tasksList.map((task, index) => (
        <TaskCard task={task} key={`task-${index}`}/>
      ))}
    </div>
  );
}



export function TaskCard(props) {
  const calculateRewards = (rewards, runs) => {
    return rewards.map((reward) => {
      return {
        img: reward.img,
        count: `${reward.min * runs}~${reward.max * runs}`,
      };
    });
  };
  const [openModal, setOpenModal] = useState(false);

  const task = props.task;
  const [expanded, setExpanded] = useState(false);
  const [rewards, setRewards] = useState(
    calculateRewards(task.rewards[task.level], task.runs)
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
    setRewards(calculateRewards(task.rewards[level], runs));
  };

  const handleLevel = (level) => {
    let index = parseInt(level.split(" ")[1]);
    task.type.includes("Domain") ? index-- : index;
    setLevel(index);
    setRewards(calculateRewards(task.rewards[index], runs));
  };

  const resetContent = () => {
    setRuns(task.runs);
    setLevel(task.level);
    setTotalCosts(task.runs * task.cost);
    setRewards(calculateRewards(task.rewards[task.level], task.runs))
  }

  const CardHeader = () => (
    <div className="flex items-center h-12">
      { props.isAdd ? 
        <button
          className="w-5 h-5 rounded-full mr-2 material-icons text-sm leading-tight text-black bg-primary"
          onClick={() => setOpenModal(true)}
        >add</button>
        :
        <div
          className="w-4 h-4 border border-primary rounded-full mr-2"
          onClick={() => setOpenModal(true)}
        ></div>
      }
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
      <div className="flex items-center" key={`reward-${index}`}>
        <div className="mr-1 relative w-8" style={{ height: "32px" }}>
          <Image
            src={reward.img}
            alt="reward"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {reward.count}
      </div>
  ));

  const ExpandedMenu = (props) => (
    <div
      className={`pl-7 pr-2 pb-3 text-xs text-white text-opacity-60 ${
        props.expanded ? "" : "hidden"
      }`}
    >
      <div className="flex">
        <div className="mr-8">
          <div className="h-16" style={{ maxWidth: "100px" }}>
            {task.type.includes("Domain") ? "Domain" : "World"} Level:
            <div className="mt-1">
              <MaterialDropDown
                activeMenu={`Level ${level + 1}`}
                menus={task.levels}
                onChange={handleLevel}
              />
            </div>
          </div>
          <div className="mt-2">
            Cost per run:
            <div className="flex items-center font-medium text-base text-primary mt-1">
              <div className="relative w-4 h-4 mr-1">
                <Image
                  src="/assets/img/Item_Fragile_Resin.png"
                  alt="resin"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              {task.cost}
            </div>
          </div>
        </div>
        <div className="overflow-hidden" style={{ maxWidth: "57%" }}>
        <div className="h-16">
          <div>Rewards:</div>
          <div
            className="mt-1 flex overflow-auto text-primary gap-x-2 justify-start scrollbar-hide"
            style={{ minWidth: "100px" }}
          >
            <RewardsContent />
          </div>
        </div>
        <div className="mt-2">
          Runs:
          <div className="mt-1">
            <MaterialCounter
              count={runs}
              min={props.isAdd ? 1 : 0}
              max={100}
              onChange={handleRuns}
            />
          </div>
        </div>
      </div>
      </div>
      <div className={`flex-row-reverse mt-7 mb-1 gap-x-8 ${(isChanged() && !props.isAdd) ? 'flex' : 'hidden'}`}>
        <MaterialButton variant="primary" type="text" icon="save" title="Save" noPadding={true}/>
        <MaterialButton variant="danger" type="text" icon="clear" title="Cancel" noPadding={true} onClick={() => resetContent()}/>
      </div>
    </div>
  );

  const isChanged = () => (task.runs != runs || task.level != level);

  const ConsumeResinModal = (props) => {
    const [originalResin, setOriginalResin, condensedResin, setCondensedResin] = useContext(ResinContext);
    const resinSource = [
      {
        name: "Original",
        value: originalResin,
      },
      {
        name: "Condensed",
        value: condensedResin,
      },
    ];
  
    const [costs, setCosts] = useState(props.cost);
    const [done, setDone] = useState(1);
    const [insufficient, setInsufficient] = useState(false);
    const handleDone = (done) => {
      setDone(done);
      setCosts(props.cost * done);
    };
  
    const handleContinue = () => originalResin < props.cost * done ? setInsufficient(true) : setOpenModal(false);

    const handleCancel = () => insufficient ? setInsufficient(false) : setOpenModal(false);
  
    return (
      <div className="bg-navbar px-6 py-5 rounded-md">
        <div className="mb-4 text-white text-opacity-80">
          {insufficient ? "Consume Fragile Resin" : "Consume Resin?"}
        </div>
        <div
          className={`text-white text-opacity-60 text-sm justify-between ${
            insufficient ? "hidden" : "flex"
          }`}
        >
          <div>
            <div className="h-20">
              Resin Source:
              <div className="mt-1">
                <MaterialDropDown
                  activeMenu={resinSource[0].name}
                  menus={resinSource.map((source) => source.name)}
                />
              </div>
            </div>
            <div>
              Done:
              <div className="mt-1">
                <MaterialCounter
                  count={done}
                  min={1}
                  max={props.runs}
                  onChange={handleDone}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="h-20">
              Original Resin:
              <div className="mt-1">
                <span className="font-semibold text-3xl text-primary">
                  {resinSource[0].value}
                </span>{" "}
                <span className="text-danger">{`(-${costs})`}</span>
              </div>
            </div>
            <div className="">
              Condensed Resin:
              <div className="mt-1 font-semibold text-3xl text-primary">
                {resinSource[1].value}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`text-opacity-80 text-white mt-2 ${
            insufficient ? "hidden" : "block"
          }`}
        >
          <span className="text-primary">{costs} Original Resin </span>will be
          consumed. Continue?
        </div>
        <div
          className={`text-opacity-80 text-white mt-2 ${
            insufficient ? "block" : "hidden"
          }`}
        >
          Insufficient Original Resin.
          <span className="text-primary">{1} Fragile Resin </span>will be
          consumed. Continue?
        </div>
        <div className="flex flex-row-reverse text-white gap-x-8 mt-7">
          <MaterialButton variant="primary" type="text" title="Continue" noPadding={true} onClick={ handleContinue }/>
          <MaterialButton variant="danger" type="text" title="Cancel" noPadding={true} onClick={ handleCancel }/>
        </div>
      </div>
    );
  }
  
  const AddTaskModal = (props) => {
    return (
      <div className="bg-navbar px-6 py-5 rounded-md">
        <div className="mb-4 text-white text-opacity-80">
          Add Task?
        </div>
        <div className="text-opacity-80 text-white mt-2">
          <span className="text-primary">{`${props.task.name} (x${props.task.runs})`}</span> will be
          added to the task list. Continue?
        </div>
        <div className="flex flex-row-reverse text-white gap-x-8 mt-7">
          <MaterialButton variant="primary" type="text" title="Continue" noPadding={true}/>
          <MaterialButton variant="danger" type="text" title="Cancel" noPadding={true}/>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border border-white border-opacity-10 rounded-md px-3 mb-2`}
    >
      <CardHeader/>
      <ExpandedMenu expanded={expanded}/>
      <Modal
        isFull={false}
        isOpen={openModal}
        closeHandler={() => setOpenModal(false)}
        stack={props.isAdd ? true : false}
      >
        { props.isAdd ? 
          <AddTaskModal
            task={ { name: task.name, runs: runs } }
          />
          :
          <ConsumeResinModal
            cost={task.cost}
            runs={task.runs}
            closeHandler={() => setOpenModal(false)}
          />
        }
      </Modal>
    </div>
  );
}

export default TasksTab;
