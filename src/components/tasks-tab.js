import TaskCard from "@/components/task-card";
import { useEffect, useState } from "react";

export default function TasksTab(props) {
  const [tasks, setTasks] = useState(null);
  const users = require("@/json/users.json");
  const user = users[0];
  useEffect( async() => {
    const res = await fetch(`/api/user-tasks?userId=${user.id}`);
    const json = await res.json();
    setTasks(json);
  }, [])
  return (
    <div className={`flex flex-col gap-y-2`}>
      {tasks && tasks.map((task, index) => (
        <TaskCard task={task} key={`task-${index}`}/>
      ))}
    </div>
  );
}