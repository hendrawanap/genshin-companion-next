import { useReducer, useState, useContext, useRef, useEffect } from "react";
import { ResinContext } from "@/contexts/ResinContext";
import Dropdown from "@/material/dropdown";
import Button from "@/material/button";
import Counter from "@/material/counter";
import Modal from "@/components/utility/modal";
import Image from "next/image";
import { CSSTransition } from "react-transition-group";

export default function TaskCard(props) {
  const task = props.task;

  const initialCardHeight = 50;
  const [cardHeight, setCardHeight] = useState(initialCardHeight);
  const cardRef = useRef(null);
  const calculateHeight = (el) => {
    const height = el.offsetHeight + initialCardHeight;
    setCardHeight(height);
  };
  const setDefaultHeight = () => {
    setCardHeight(initialCardHeight);
  }

  const reducer = (state, action) => {
    switch(action.type) {
      case 'openModal':
        return { ...state, openModal: true };
      case 'closeModal':
        return { ...state, openModal: false };
      case 'toggleExpand':
        return { ...state, expanded: !state.expanded };
      case 'setRuns':
        return { ...state, runs: action.runs, totalCosts: action.totalCosts, rewards: action.rewards };
      case 'setLevel':
        return { ...state, level: action.level, rewards: action.rewards };
      case 'reset':
        return { ...state, level: initialState.level, rewards: initialState.rewards, runs: initialState.runs, totalCosts: initialState.totalCosts };
      default:
        throw new Error();
    }
  };

  const calculateRewards = (level, runs) => {
    return task.rewards[level].map((reward) => {
      return {
        img: reward.img,
        count: reward.max && `${reward.min * runs}~${reward.max * runs}`,
      };
    });
  };

  const initialState = {
    openModal: false,
    expanded: false,
    rewards: calculateRewards(task.level, task.runs),
    runs: task.runs,
    totalCosts: task.runs * task.cost,
    level: task.level
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    menuRef ? (menuRef.current ? setCardHeight(initialCardHeight + menuRef.current.offsetHeight) : null) : null;
  }, [state.runs, state.level]);
  

  const setRuns = (runs) => {
    dispatch({
      type: 'setRuns',
      runs: runs,
      totalCosts: runs * task.cost,
      rewards: calculateRewards(state.level, runs)
    });
  };

  const setLevel = (level) => {
    let index = parseInt(level.split(" ")[1]);
    task.type.includes("Domain") ? index-- : index;
    dispatch({
      type: 'setLevel',
      level: index,
      rewards: calculateRewards(index, state.runs)
    });
  };

  const isChanged = () => (task.runs !== state.runs || task.level !== state.level);

  return (
    <div className={`border border-dark-15 rounded-md px-3 transition-height duration-300`} style={{height: cardHeight}} ref={cardRef}>
      <CardHeader
        isAdd={props.isAdd}
        openModal={() => dispatch({ type: 'openModal' })}
        name={task.name}
        totalCosts={state.totalCosts}
        toggleExpand={() => dispatch({ type: 'toggleExpand' })}
      />
      <CSSTransition
        in={state.expanded}
        classNames="card-expand"
        timeout={100}
        unmountOnExit
        onEnter={calculateHeight}
        onExit={setDefaultHeight}
      >
        <ExpandedMenu
          expanded={state.expanded}
          level={state.level}
          runs={state.runs}
          task={task}
          rewards={state.rewards}
          isAdd={props.isAdd}
          setLevel={setLevel}
          setRuns={setRuns}
          reset={() => dispatch({ type: 'reset' })}
          setCardHeight={setCardHeight}
          isChanged={isChanged()}
        />
      </CSSTransition>
      <Modal
        isFull={false}
        isOpen={state.openModal}
        closeHandler={() => dispatch({ type: 'closeModal' })}
        stack={props.isAdd ? true : false}
      >
        { props.isAdd ? 
          <AddTaskModal
            task={ { name: task.name, runs: task.runs } }
          />
          :
          <ConsumeResinModal
            cost={task.cost}
            runs={task.runs}
            closeModal={() => dispatch({ type: 'closeModal' })}
          />
        }
      </Modal>
    </div>
  );
}

function CardHeader(props) {
  return (
    <div className="flex items-center h-12">
      { props.isAdd ? 
        <button
          className="w-5 h-5 rounded-full mr-2 material-icons text-sm leading-tight text-black bg-primary"
          onClick={props.openModal}
        >add</button>
        :
        <div
          className="w-4 h-4 border border-primary rounded-full mr-2"
          onClick={props.openModal}
        ></div>
      }
      <div className="flex whitespace-nowrap overflow-auto flex-1 text-white text-opacity-medium mr-2 text-sm font-medium tracking-wide">
        {props.name}
      </div>
      <div className="flex mr-2 items-center text-primary text-opacity-high font-medium">
        <div className="w-4 mr-1">
          <Image
            src="/assets/img/Item_Fragile_Resin.png"
            width="100%"
            height="auto"
            layout="responsive"
          />
        </div>
        {props.totalCosts}
      </div>
      <div
        className="text-white text-opacity-medium cursor-default material-icons"
        onClick={props.toggleExpand}
      >
        expand_more
      </div>
    </div>
  );
}

let menuRef;

function ExpandedMenu(props) {
  menuRef = useRef();
  return (
    <div
      className={`pl-7 pr-2 pb-3 text-xs text-white text-opacity-medium`}
      ref={menuRef}
    >
      <div className="flex">
        <div className="mr-8">
          <div className="h-16" style={{ maxWidth: "100px" }}>
            { props.task.type.includes("Domains") ? "Domain" : "World" } Level:
            <div className="mt-1">
              <Dropdown
                activeMenu={ `Level ${props.level + 1}` }
                menus={ props.task.levels }
                onChange={ props.setLevel }
              />
            </div>
          </div>
          <div className="mt-2">
            Cost per run:
            <div className="flex items-center font-medium text-base text-primary text-opacity-high mt-1">
              <div className="relative w-4 h-4 mr-1">
                <Image
                  src="/assets/img/Item_Fragile_Resin.png"
                  alt="resin"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              { props.task.cost }
            </div>
          </div>
        </div>
        <div className="overflow-hidden" style={{ maxWidth: "57%" }}>
        <div className="h-16">
          <div>Rewards:</div>
          <div
            className="mt-1 flex overflow-auto text-primary text-opacity-high gap-x-2 justify-start scrollbar-hide"
            style={{ minWidth: "100px" }}
          >
            <Rewards rewards={props.rewards}/>
          </div>
        </div>
        <div className="mt-2">
          Runs:
          <div className="mt-1">
            <Counter
              count={props.runs}
              min={props.isAdd ? 1 : 0}
              max={100}
              onChange={props.setRuns}
            />
          </div>
        </div>
      </div>
      </div>
      <div className={`flex-row-reverse mt-7 mb-1 gap-x-8 ${(props.isChanged && !props.isAdd) ? 'flex' : 'hidden'}`}>
        <Button variant="primary" type="text" icon="save" noPadding={true}>Save</Button>
        <Button variant="danger" type="text" icon="clear" noPadding={true} onClick={props.reset}>Cancel</Button>
      </div>
    </div>
  );
}

function Rewards({rewards}) {
  return rewards.map((reward, index) => (
    <div className="flex items-center" key={`reward-${index}`}>
      <div className="mr-1 relative w-8" style={{ height: "32px" }}>
        <Image
          src={reward.img}
          alt="reward"
          layout="fill"
          objectFit="contain"
        />
      </div>
      {reward.count && reward.count}
    </div>
  ));
}

function ConsumeResinModal(props) {
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

  const handleContinue = () => originalResin < props.cost * done ? setInsufficient(true) : props.closeModal();

  const handleCancel = () => insufficient ? setInsufficient(false) : props.closeModal();

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
              <Dropdown
                activeMenu={resinSource[0].name}
                menus={resinSource.map((source) => source.name)}
              />
            </div>
          </div>
          <div>
            Done:
            <div className="mt-1">
              <Counter
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
        <Button variant="primary" type="text" noPadding={true} onClick={handleContinue}>Continue</Button>
        <Button variant="danger" type="text" noPadding={true} onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
}

function AddTaskModal({task}) {
  return (
    <div className="bg-navbar px-6 py-5 rounded-md">
      <div className="mb-4 text-white text-opacity-80">
        Add Task?
      </div>
      <div className="text-opacity-80 text-white mt-2">
        <span className="text-primary">{`${task.name} (x${task.runs})`}</span> will be
        added to the task list. Continue?
      </div>
      <div className="flex flex-row-reverse text-white gap-x-8 mt-7">
        <Button variant="primary" type="text" title="Continue" noPadding={true}/>
        <Button variant="danger" type="text" title="Cancel" noPadding={true}/>
      </div>
    </div>
  );
}