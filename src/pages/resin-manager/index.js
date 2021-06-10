import React, { useContext, useState } from 'react';
import { ResinCard } from '../home/ResinTab';
import { ResinContext, ResinProvider } from '../../contexts/ResinContext';
import { MaterialCounter, MaterialDropDown } from '../../components/material/Material';
import Image from 'next/image';
import TasksTab from '../home/TasksTab';
import { Link } from 'react-router-dom';
import AddTask from './AddTask';
import { Modal } from '../../components/Modal';

export default function ResinManager(props) {
  const [openModal, setOpenModal] = useState(false);
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  const [day, setDay] = useState(days[6]);

  const dayHandler = (day) => {
    setDay(day);
  }


  return(
    <>
      <div className="pt-14 pb-2">
        <ResinProvider>
          <h1 className="text-4xl text-primary px-4 mt-4 mb-6">Resin <span className="text-white">Manager</span></h1>
          <div className="flex px-4 mb-8">
            <Resin/>
            <ResinSetter/>
          </div>
          <div className="px-4">
            <div className="mb-2 text-lg">Tasks</div>
            <div className="flex justify-between mb-2">
              <div className="" style={{maxHeight: "44px"}}>
                <MaterialDropDown activeMenu={day} menus={days} minWidth={150} onChange={dayHandler}/>
              </div>
              <div className="flex items-center">
                <div className="text-white text-opacity-60 mr-2">Required:</div>
                <div className="relative h-4 w-4 mr-1"><Image src="/assets/img/other-materials/Item_Fragile_Resin.png" layout="fill" objectFit="contain"></Image></div>
                <div className="text-primary">100</div>
              </div>
            </div>
            <TasksTab isActive={true}/>
            <button className="text-primary py-3 pl-1 pr-3 flex items-center" onClick={() => setOpenModal(true)}><span className="material-icons mr-2">add</span>Add Task</button>
          </div>
        </ResinProvider>
      </div>
      <Modal isFull={true} isOpen={openModal} closeHandler={() => setOpenModal(false)}>
        <AddTask closeHandler={() => setOpenModal(false)}/>
      </Modal>
    </>
  );
}

function Resin(props) {
  const [originalResin, setOriginalResin, condensedResin, setCondensedResin] = useContext(ResinContext);
  return(
    <div className="px-4 py-3 border border-white border-opacity-10 rounded-xl mr-8">
      <ResinCard originalResin={ originalResin } condensedResin={ condensedResin }/>
    </div>
  );
}

function ResinSetter(props) {
  const [originalResin, setOriginalResin, condensedResin, setCondensedResin] = useContext(ResinContext);
  return (
    <div>
      <div>Set Current Resin</div>
      <MaterialCounter count={originalResin} min={0} max={1000} onChange={setOriginalResin}/>
      <div>Condensed Resin</div>
      <MaterialCounter count={condensedResin} min={0} max={5} onChange={setCondensedResin}/>
    </div>
  );
}