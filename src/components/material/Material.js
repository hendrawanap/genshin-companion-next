import React, { useEffect, useState } from "react";

function MaterialDropDown(props) {
  const [expanded, setExpanded] = useState(false);
  const [activeMenu, setActiveMenu] = useState(props.activeMenu);

  const handleExpand = () => setExpanded(!expanded);

  const handleSelect = (event) => {
    setActiveMenu(event.target.id);
    setExpanded(!expanded);
  };

  const menus = () => {
    const elements = [];
    for (let i = 0; i < props.menus.length; i++) {
      let menu = props.menus[i];
      elements.push(
        <div
          key={menu}
          className={`px-4 py-3 ${
            menu === activeMenu ? "text-primary bg-primary bg-opacity-5" : ""
          }`}
          id={menu}
          onClick={handleSelect}
        >
          {menu}
        </div>
      );
      if (i !== props.menus.length - 1)
        elements.push(
          <div className="flex border-b border-white border-opacity-10"></div>
        );
    }
    return (
      <div className="relative z-10 mt-1 bg-navbar rounded-md border border-white border-opacity-10 text-sm flex flex-col justify-between overflow-auto max-h-48">
        {elements}
      </div>
    );
  };
  return (
    <div>
      <div
        className={`flex items-center justify-between rounded-md bg-primary bg-opacity-10 pl-4 pr-2 py-2 font-medium tracking-wide whitespace-nowrap ${
          expanded ? "bg-opacity-20 text-white text-opacity-80" : "text-primary"
        }`}
        onClick={handleExpand}
      >
        <span className="text-sm mr-2">{activeMenu}</span>
        <span className="text-lg material-icons">arrow_drop_down</span>
      </div>
      {expanded ? menus() : ""}
    </div>
  );
}

function MaterialCounter(props) {
  const [isMin, setIsMin] = useState(
    props.initialCount === props.min ? true : false
  );
  const [isMax, setIsMax] = useState(
    props.initialCount === props.max ? true : false
  );
  const [counter, setCounter] = useState(props.initialCount);
  const onCountsChange = props.onCountsChange;
  useEffect(() => {
    if (onCountsChange != null) onCountsChange(counter);
  }, [counter]);

  const handleDecrement = () => {
    if (counter > props.min) setCounter(counter - 1);
    if (counter === props.min + 1) setIsMin(true);
    setIsMax(false);
  };

  const handleIncrement = () => {
    if (counter < props.max) setCounter(counter + 1);
    if (counter === props.max - 1) setIsMax(true);
    setIsMin(false);
  };

  return (
    <div className="flex items-center">
      <button
        className={`bg-primary text-primary text-sm leading-none rounded-full p-3 material-icons ${
          isMin
            ? "bg-opacity-disable text-opacity-30"
            : "bg-opacity-10 text-opacity-80"
        }`}
        onClick={handleDecrement}
      >
        remove
      </button>
      <div className="mx-4 font-medium text-primary text-base">{counter}</div>
      <button
        className={`bg-primary text-primary text-sm leading-none rounded-full p-3 material-icons ${
          isMax
            ? "bg-opacity-disable text-opacity-30"
            : "bg-opacity-10 text-opacity-80"
        }`}
        onClick={handleIncrement}
      >
        add
      </button>
    </div>
  );
}

function MaterialChip(props) {
  const handleClick = (event) => {
    props.handleClick(event);
  };
  return (
    <div
      className={`cursor-default leading-none border rounded-full px-3 py-2 mr-2 text-sm tracking-wider ${
        props.isActive
          ? "text-primary text-opacity-100 border-primary border-opacity-100 bg-primary bg-opacity-10"
          : "border-white border-opacity-10 text-white text-opacity-60"
      }`}
      id={props.id}
      onClick={handleClick}
    >
      {props.title}
    </div>
  );
}

export { MaterialDropDown, MaterialCounter, MaterialChip };
