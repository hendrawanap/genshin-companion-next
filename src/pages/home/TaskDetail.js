import { useState } from "react";
import Image from "next/image";

function TaskDetailList(props) {
  return (
    <div className={`tracking-wider`}>
      {props.tasks.map((task, index) => (
        <TaskDetail name={task.name} day={task.day} rewards={task.rewards} key={`task-${index}`} />
      ))}
    </div>
  );
}

function TaskDetail(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => setIsExpanded(!isExpanded);

  const rewardsContent = () => {
    return props.rewards.map((reward, index) => {
      return (
        <div
          className={`rounded-full border border-white border-opacity-10 bg-white bg-opacity-5 mr-1 ${
            isExpanded ? "w-9" : "w-7"
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
    <div
      className={`flex flex-col py-2 px-3 border border-white border-opacity-10 rounded-md mb-3 text-white text-opacity-60`}
    >
      <div className="flex items-center mb-2">
        <div className="border-r-2 border-primary h-3 mr-2"></div>
        <div className="flex-1 text-sm">
          {props.name} <span className="text-xs">({props.day})</span>
        </div>
        <button className="material-icons" onClick={handleClick}>
          expand_more
        </button>
      </div>
      <div className="ml-2">
        <div className="">
          <div className={`text-xs mb-1 ${isExpanded ? "block" : "hidden"}`}>
            Possible rewards:
          </div>
          <div className="flex">{rewardsContent()}</div>
        </div>
        <div className={`mt-2 ${isExpanded ? "block" : "hidden"}`}>
          <div className="text-xs mb-1">Required by:</div>
          <div className="flex">
            <div
              className={`rounded-full border border-white border-opacity-10 bg-white bg-opacity-5 mr-1 ${
                isExpanded ? "w-9" : "w-7"
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
                isExpanded ? "w-9" : "w-7"
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
                isExpanded ? "w-9" : "w-7"
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
        <button
          className={`text-primary text-sm py-2 ${
            isExpanded ? "block" : "hidden"
          }`}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default TaskDetailList;
