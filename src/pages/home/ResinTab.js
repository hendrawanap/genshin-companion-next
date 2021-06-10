import React, { useContext } from 'react';
import Image from 'next/image';
import { ResinContext } from '../../contexts/ResinContext';

function ResinTab(props) {
  const [originalResin, setOriginalResin, condensedResin, setCondensedResin] = useContext(ResinContext);
  return (
    <div className={`border border-white border-opacity-10 rounded-xl flex items-center p-4 tracking-wider`}>
      <ResinCard originalResin={ originalResin } condensedResin= { condensedResin }/>
      <div className="mx-2 border-l border-white border-opacity-10 h-20"></div>
      <div className="flex flex-col justify-between w-full self-stretch">
        <div className="row-1">
          <h4 className="text-sm text-white text-opacity-60 font-medium">Required</h4>
          <div className="angka">
            <span className="text-3xl font-bold text-danger">{ originalResin }</span><span className="text-xs text-white text-opacity-30 font-medium">/100</span>
          </div>
        </div>
        <div className="text-xs text-white text-opacity-30 font-medium">
          (0h 13m)
        </div>
      </div>
      <div className="mx-2 border-l border-white border-opacity-10 h-20"></div>
      <div className="flex flex-col justify-between w-full self-stretch">
        <div className="row-1">
          <h4 className="text-sm text-white text-opacity-60 font-medium">Full at</h4>
          <div className="angka">
            <h2 className="text-3xl font-bold text-primary">12:33</h2>
          </div>
        </div>
        <div className="text-xs text-white text-opacity-30 font-medium">
          (0h 13m)
        </div>
      </div>
    </div>
  );
}

export function ResinCard(props) {
  return (
    <div className="flex flex-col w-min">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm text-white text-opacity-60 font-medium">Current</h4>
          <div>
            <span className="text-3xl font-bold text-primary">{ props.originalResin }</span><span className="text-xs text-white text-opacity-30 font-medium">/160</span>
          </div>
          <div className="text-xs text-white text-opacity-30 whitespace-nowrap">
            Condensed:<span className="text-primary font-medium"> {props.condensedResin}</span>
          </div>
        </div>
        <div className="ml-2 w-12"><Image src="/assets/img/Item_Fragile_Resin.png" width={54} height={54} /></div>
      </div>
      <div className="mt-2">
        <div className="w-full h-4 bg-primary bg-opacity-10 rounded-full">
          <div className="w-7/12 h-4 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default ResinTab;