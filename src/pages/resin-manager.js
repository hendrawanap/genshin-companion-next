import React, { useContext, useEffect, useState } from 'react';
import ResinCard from "@/components/resin-card";
import { ResinContext } from '../contexts/ResinContext';
import Counter from "@/material/counter";
import Dropdown from "@/material/dropdown";
import Image from 'next/image';
import TasksTab from "@/components/tasks-tab";
import AddTask from "@/components/add-task";
import { tasks } from "../models/Tasks";
import AppLayout from '@/components/layouts/app';
import BottomSlideOver from '@/components/utility/bottom-slide-over';
import Button from '@/components/material/button';

export default function ResinManager(props) {
  const [openSlide, setOpenSlide] = useState(false);
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const date = new Date();
  const today = days[date.getDay()];
  const [day, setDay] = useState(today);

  const dayHandler = (day) => {
    setDay(day);
  }

  return(
    <AppLayout>
      <h1 className="text-4xl text-primary px-4 mt-4 mb-6">Resin <span className="text-white">Manager</span></h1>
      <div className="flex px-4 mb-8 items-start">
        <Resin/>
        <ResinSetter/>
      </div>
      <div className="px-4">
        <div className="mb-2 text-lg text-white text-opacity-high">Tasks</div>
        <div className="flex justify-between mb-2">
          <div className="" style={{maxHeight: "44px"}}>
            <Dropdown activeMenu={day} menus={days} minWidth={150} onChange={dayHandler}/>
          </div>
          <div className="flex items-center">
            <div className="text-white text-opacity-60 mr-2">Required:</div>
            <div className="relative h-4 w-4 mr-1"><Image src="/assets/img/other-materials/Item_Fragile_Resin.png" layout="fill" objectFit="contain"></Image></div>
            <div className="text-primary">100</div>
          </div>
        </div>
        <TasksTab tasks={tasks} day={day}/>
        <div className="mt-2">
          <Button variant="primary" type="text" icon="add" onClick={() => setOpenSlide(true)}>Add Task</Button>
        </div>
      </div>
      <BottomSlideOver isOpen={openSlide} close={() => setOpenSlide(false)}>
        <AddTask closeHandler={() => setOpenSlide(false)}/>
      </BottomSlideOver>
    </AppLayout>
  );
}

function Resin(props) {
  const [originalResin, setOriginalResin, condensedResin, setCondensedResin] = useContext(ResinContext);
  return(
    <div className="px-4 py-3 border border-dark-15 rounded-xl mr-8">
      <ResinCard originalResin={ originalResin } condensedResin={ condensedResin }/>
    </div>
  );
}

function ResinSetter(props) {
  const [originalResin, setOriginalResin, condensedResin, setCondensedResin] = useContext(ResinContext);
  return (
    <div>
      <div className="mb-1 text-white text-opacity-medium">Set Current Resin</div>
      <Counter count={originalResin} min={0} max={1000} onChange={setOriginalResin}/>
      <div className="mb-1 mt-2 text-white text-opacity-medium">Condensed Resin</div>
      <Counter count={condensedResin} min={0} max={5} onChange={setCondensedResin}/>
    </div>
  );
}