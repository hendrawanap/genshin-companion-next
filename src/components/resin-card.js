import Image from 'next/image';

export default function ResinCard(props) {
  const resinPercentage = props.originalResin * 100 / 160;

  return (
    <div className="flex flex-col w-min">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm text-white text-opacity-medium font-medium">Current</h4>
          <div>
            <span className="text-3xl font-bold text-primary text-opacity-high">{ props.originalResin }</span><span className="text-xs text-white text-opacity-30 font-medium">/160</span>
          </div>
          <div className="text-xs text-white text-opacity-disabled whitespace-nowrap">
            Condensed:<span className="text-primary text-opacity-high font-medium"> {props.condensedResin}</span>
          </div>
        </div>
        <div className="ml-2 w-12"><Image src="/assets/img/Item_Fragile_Resin.png" width={54} height={54} /></div>
      </div>
      <div className="mt-2">
        <div className="w-full h-4 bg-primary bg-opacity-10 rounded-full">
          <div className="h-4 bg-primary rounded-full" style={{width: `${resinPercentage}%`}}></div>
        </div>
      </div>
    </div>
  );
}