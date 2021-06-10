import React, { useEffect, useState } from "react";

function MaterialDropDown(props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => setExpanded(!expanded);

  const onChange = (event) => {
    setExpanded(!expanded);
    if (props.onChange != null) {
      props.onChange(event.target.id);
    }
  };

  const menus = () => {
    const elements = [];
    for (let i = 0; i < props.menus.length; i++) {
      let menu = props.menus[i];
      elements.push(
        <div
          key={menu}
          className={`px-4 py-3 ${
            menu === props.activeMenu ? "text-primary bg-primary bg-opacity-5" : ""
          }`}
          id={menu}
          onClick={onChange}
        >
          {menu}
        </div>
      );
      if (i !== props.menus.length - 1)
        elements.push(
          <div className="flex border-b border-white border-opacity-10" key={`divider-${i}`}></div>
        );
    }
    return (
      <div className="relative z-10 mt-1 bg-navbar rounded-md border border-white border-opacity-10 text-sm flex flex-col justify-between overflow-auto max-h-48 scrollbar-hide">
        {elements}
      </div>
    );
  };
  return (
    <div style={{minWidth: `${props.minWidth}px`}}>
      <div
        className={`flex items-center justify-between rounded-md bg-primary bg-opacity-10 pl-4 pr-2 py-2 font-medium tracking-wide whitespace-nowrap ${
          expanded ? "bg-opacity-20 text-white text-opacity-80" : "text-primary"
        }`}
        onClick={handleExpand}
      >
        <span className="text-sm mr-2">{props.activeMenu}</span>
        <span className="text-lg material-icons">arrow_drop_down</span>
      </div>
      {expanded ? menus() : ""}
    </div>
  );
}

function MaterialCounter(props) {
  const [isMin, setIsMin] = useState(
    props.count === props.min ? true : false
  );
  const [isMax, setIsMax] = useState(
    props.count === props.max ? true : false
  );
  const onChange = props.onChange;

  const handleDecrement = () => {
    if (props.count > props.min) {
      onChange(props.count - 1);
    };
    if (props.count === props.min + 1) setIsMin(true);
    setIsMax(false);
  };

  const handleIncrement = () => {
    if (props.count < props.max) {
      onChange(props.count + 1);
    };
    if (props.count === props.max - 1) setIsMax(true);
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
      <div className="mx-4 font-medium text-primary text-base">{props.count}</div>
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
      className={`cursor-default leading-none border rounded-full px-3 py-2 mr-2 text-sm tracking-wider whitespace-nowrap ${
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

function MaterialButton(props) {
  const makeStyle = () => {
    let textColor;
    let bgColor;
    let borderColor;
    let padding;
    switch(props.variant) {
      case 'primary': bgColor="#89CAFF"; textColor="black"; borderColor=bgColor; break;
      case 'danger': bgColor="#FF8989"; textColor="black"; borderColor=bgColor; break;
      case 'disabled': bgColor="#2F2F2F"; textColor="#7E7E7E"; borderColor=bgColor; break;
    }
    switch(props.type) {
      case 'default': break;
      case 'outlined': textColor=bgColor; bgColor="transparent"; borderColor="#383838"; break;
      case 'text': textColor=bgColor; bgColor="transparent"; borderColor="transparent"; break;
    }
    switch(Boolean(props.icon)) {
      case true: padding = { padding: '8px 16px 8px 10px'}; break;
      default: padding = { padding: '8px 16px'}; break;
    }
    switch(props.noPadding) {
      case true: padding = { padding: '0' }; break;
      default: break;
    }
    return {
      color: textColor,
      backgroundColor: bgColor,
      border: `1px solid ${borderColor}`,
      borderRadius: "4px",
      fontSize: '14px',
      ...padding
    };
  }

  return (
    <button className="flex items-center" style={makeStyle()} onClick={props.onClick}>
      <span className="material-icons mr-2 text-lg leading-none">{props.icon}</span>{props.title}
    </button>
  );
}

export { MaterialDropDown, MaterialCounter, MaterialChip, MaterialButton };
