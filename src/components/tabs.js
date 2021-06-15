import { useState } from "react";
import Chip from "@/material/chip";

export default function Tabs(props) {
  const [activeTab, setActiveTab] = useState(props.activeTab);
  const handleTabClick = (event) => {
    setActiveTab(event.target.id);
  };

  return (
    <div>
      <div className="flex justify-between mb-3">
        <div className="flex overflow-x-auto scrollbar-hide">
          { props.tabs.map((tab) => (
            <Chip
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
        return (
          <div key={`tab-${index}`} className={`${activeTab === tab.name ? 'block' : 'hidden'}`}>
            {tab.component()}
          </div>
        );
      })}
    </div>
  );
}