import { useState, useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import Dropdown from "@/material/dropdown";
import Button from "@/material/button";
import { addUserTask } from "pages/api/user-tasks";
import Counter from "./material/counter";

export default function AddTaskModal({task, runs, level, closeModal}) {
  const { userId } = useContext(UserContext);
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
  const [otherRuns, setRuns] = useState(runs);

  const addTask = async () => {
    const taskInfo = {
      name: task.name,
      type: task.type,
      level: level ? level : task.level,
      runs: otherRuns ? otherRuns : 1,
      day: day
    }
    addUserTask(userId, taskInfo);
    closeModal();
  }


  return (
    <div className="bg-navbar px-6 py-5 rounded-md">
      <div className="mb-4 text-white text-opacity-80">
        Add Task?
      </div>
      <div className="flex justify-between text-white text-sm text-opacity-medium">
        <div>
          Day:
          <div className="mt-1" style={{maxHeight: "44px"}}>
            <Dropdown activeMenu={day} menus={days} minWidth={150} onChange={(day) => setDay(day)}/>
          </div>
        </div>
        <div>
          Runs:
          <div className="mt-1">
            <Counter count={otherRuns} min={1} max={100} onChange={(runs) => setRuns(runs)}/>
          </div>
        </div>
      </div>
      <div className="text-opacity-80 text-white mt-2">
        <span className="text-primary">{`${task.name} (x${otherRuns})`}</span> will be
        added to the task list. Continue?
      </div>
      <div className="flex flex-row-reverse text-white gap-x-8 mt-7">
        <Button variant="primary" type="text" noPadding={true} onClick={addTask}>Continue</Button>
        <Button variant="danger" type="text" noPadding={true} onClick={closeModal}>Cancel</Button>
      </div>
    </div>
  );
}