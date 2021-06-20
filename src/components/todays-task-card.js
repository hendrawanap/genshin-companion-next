import { useRef, useState } from "react";
import Image from "next/image";
import { CSSTransition } from "react-transition-group";

export default function TodaysTaskCard(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialCardHeight = 78;
  const [expandedHeight, setExpandedHeight] = useState(0);
  const [cardHeight, setCardHeight] = useState();

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
            src={reward}
            width="100%"
            height="auto"
            layout="responsive"
          />
        </div>
      );
    });
  };

  const calculateHeight = (el) => {
    expandedHeight === 0
      ? setExpandedHeight(cardRef.current.offsetHeight)
      : null;
    setCardHeight(
      expandedHeight === 0 ? cardRef.current.offsetHeight : expandedHeight
    );
  };
  const setDefaultHeight = () => {
    setCardHeight(initialCardHeight);
  };

  const cardRef = useRef();

  return (
    <div
      className={`flex flex-col py-2 px-3 border border-white border-opacity-10 rounded-md mb-3 text-white text-opacity-60 transition-height`}
      style={{ height: cardHeight }}
      ref={cardRef}
    >
      <div className="flex items-center mb-2">
        <div className="border-r-2 border-primary h-3 mr-2"></div>
        <div className="flex-1 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
          {props.name} <span className="text-xs">({props.today})</span>
        </div>
        <button className="material-icons" onClick={handleClick}>
          expand_more
        </button>
      </div>
      <div className="ml-2">
        <div>
          <div className={`text-xs mb-1 ${isExpanded ? "block" : "hidden"}`}>
            Possible rewards:
          </div>
          <div className="flex">{rewardsContent()}</div>
        </div>
        <CSSTransition
          in={isExpanded}
          classNames="card-expand"
          timeout={100}
          unmountOnExit
          onEnter={calculateHeight}
          onExit={setDefaultHeight}
        >
          <div>
            <div className={`mt-2 ${isExpanded ? "block" : "hidden"}`}>
            <div className="text-xs mb-1">Required by:</div>
            <div className="flex overflow-x-auto scrollbar-hide">
              {props.avatars.map((avatar, index) => {
                return (
                  <div className="relative flex-shrink-0 w-9 h-9 rounded-full border border-white border-opacity-10 bg-white bg-opacity-5 mr-1" key={`avatar-${index}`}>
                    <Image
                      className="rounded-full"
                      src={"/" + avatar}
                      alt={props.requiredBy[index]}
                      layout="responsive"
                      width="36px"
                      height="36px"
                    />
                  </div>
                );
              })}
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
        </CSSTransition>
      </div>
    </div>
  );
}
