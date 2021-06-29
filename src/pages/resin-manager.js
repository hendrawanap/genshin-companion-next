import React, { useContext, useEffect, useReducer, useState } from 'react';
import ResinCard from "@/components/resin-card";
import { ResinContext } from '../contexts/ResinContext';
import Counter from "@/material/counter";
import Dropdown from "@/material/dropdown";
import Image from 'next/image';
import TasksTab from "@/components/tasks-tab";
import AddTask from "@/components/add-task";
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
  const [tasks, setTasks] = useState(null);
  const [totalCosts, setTotalCosts] = useState(0);
  const userId = 1;
  
  const dayHandler = (day) => {
    setDay(day);
  }

  useEffect(async() => {
    const res = await fetch(`/api/user-tasks?userId=${userId}&day=${day}`);
    const json = await res.json();
    setTasks(json);
    setTotalCosts(json.length && json.map(task => task.cost * task.runs).reduce((acc, curr) => acc + curr));
  }, [day]);

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
            <div className="text-primary">{ totalCosts }</div>
          </div>
        </div>
        <TasksTab
          tasks={tasks}
          day={day}
          changeHandler={ async() => {
            const res = await fetch(`/api/user-tasks?userId=${userId}&day=${day}`);
            const json = await res.json();
            setTasks(json);
            setTotalCosts(json.length && json.map(task => task.cost * task.runs).reduce((acc, curr) => acc + curr));
          }}
        />
        <div className="mt-2">
          <Button variant="primary" type="text" icon="add" onClick={() => setOpenSlide(true)}>Add Task</Button>
        </div>
      </div>
      <BottomSlideOver isOpen={openSlide} close={() => setOpenSlide(false)}>
        <AddTask
          closeHandler={ async() => {
            setOpenSlide(false);
            const res = await fetch(`/api/user-tasks?userId=${userId}&day=${day}`);
            const json = await res.json();
            setTasks(json);
            setTotalCosts(json.length && json.map(task => task.cost * task.runs).reduce((acc, curr) => acc + curr));
          }}
        />
      </BottomSlideOver>
    </AppLayout>
  );
}

function Resin(props) {
  const { intOriResin, condensedResin } = useContext(ResinContext);
  return(
    <div className="px-4 py-3 border border-dark-15 rounded-xl mr-8">
      <ResinCard originalResin={ intOriResin } condensedResin={ condensedResin }/>
    </div>
  );
}

function ResinSetter(props) {
  const calculateMaxCondensedResin = (currentOriResin, currentCondensedResin) => {
    const LIMIT = 5;
    const max = parseInt(currentOriResin / 40) + currentCondensedResin;
    return max > LIMIT ? LIMIT : max;
  };

  const ORI_RESIN_PER_CONDENSED = 40;

  const { intOriResin, condensedResin, incrementCondensedResin, incrementOriginalResin } = useContext(ResinContext);
  const [maxCondensedResin, setMaxCondensedResin] = useState(calculateMaxCondensedResin(intOriResin, condensedResin));

  return (
    <div>
      <div className="mb-1 text-white text-opacity-medium">Set Current Resin</div>
      <Counter count={intOriResin} min={0} max={1000} onChange={(payload) => incrementOriginalResin(payload - intOriResin)} />
      <div className="mb-1 mt-2 text-white text-opacity-medium">Condensed Resin</div>
      <Counter
        count={condensedResin}
        min={0}
        max={maxCondensedResin}
        onChange={(payload) => {
          incrementCondensedResin(payload - condensedResin);
          incrementOriginalResin((payload - condensedResin) * -1 * ORI_RESIN_PER_CONDENSED);
        }}
      />
    </div>
  );
}