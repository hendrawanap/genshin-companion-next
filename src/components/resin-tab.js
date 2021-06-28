import { useContext } from "react";
import { ResinContext } from "@/contexts/ResinContext";
import ResinCard from "@/components/resin-card";

export default function ResinTab(props) {
  const { intOriResin, condensedResin, fullAt, timeRemaining } = useContext(ResinContext);
  return (
    <div className={`border border-dark-15 rounded-xl flex items-center p-4 tracking-wider`}>
      <ResinCard originalResin={ intOriResin } condensedResin= { condensedResin }/>
      <div className="mx-2 border-l border-dark-15 h-20"></div>
      <div className="flex flex-col justify-between w-full self-stretch">
        <div className="row-1">
          <h4 className="text-sm text-white text-opacity-medium font-medium">Required</h4>
          <div className="angka">
            <span className="text-3xl font-bold text-danger text-opacity-high">{ intOriResin }</span><span className="text-xs text-white text-opacity-30 font-medium">/100</span>
          </div>
        </div>
        <div className="text-xs text-white text-opacity-30 font-medium">
          (0h 13m)
        </div>
      </div>
      <div className="mx-2 border-l border-dark-15 h-20"></div>
      <div className="flex flex-col justify-between w-full self-stretch">
        <div className="row-1">
          <h4 className="text-sm text-white text-opacity-medium font-medium">Full at</h4>
          <div className="angka">
            <h2 className="text-3xl font-bold text-primary text-opacity-high">{ fullAt }</h2>
          </div>
        </div>
        <div className="text-xs text-white text-opacity-30 font-medium">
          ({ `${timeRemaining.hours}h ${timeRemaining.minutes}m` })
        </div>
      </div>
    </div>
  );
}