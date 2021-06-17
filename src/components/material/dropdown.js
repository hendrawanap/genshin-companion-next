import { useState } from "react";

export default function Dropdown(props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

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
          <div className="flex border-b border-dark-25" key={`divider-${i}`}></div>
        );
    }
    return (
      <div className="relative z-10 mt-1 bg-navbar rounded-md border border-dark-25 text-sm flex flex-col justify-between overflow-auto max-h-48 scrollbar-hide">
        {elements}
      </div>
    );
  };
  return (
    <div style={{minWidth: `${props.minWidth}px`}}>
      <div
        className={`flex items-center justify-between rounded-md bg-primary bg-opacity-15 pl-4 pr-2 py-2 font-medium tracking-wide whitespace-nowrap ${
          expanded ? "bg-opacity-20 text-white text-opacity-high" : "text-primary text-opacity-high"
        }`}
        onClick={ toggleExpand }
      >
        <span className="text-sm mr-2">{props.activeMenu}</span>
        <span className="text-lg material-icons">arrow_drop_down</span>
      </div>
      {expanded ? menus() : ""}
    </div>
  );
}