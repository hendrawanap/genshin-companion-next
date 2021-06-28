import TaskCard from "@/components/task-card";
import { useEffect, useState } from "react";

export default function TasksTab({tasks, day}) {
  return (
    <div className={`flex flex-col gap-y-2`}>
      {/* { !tasks && <div>Loading...</div> } */}
      { tasks && tasks.map((task, index) => {
        // setTotalCosts(totalCosts + task.cost);
        return <TaskCard task={task} key={`task-${index}`} day={day}/>
      })}
    </div>
  );
}