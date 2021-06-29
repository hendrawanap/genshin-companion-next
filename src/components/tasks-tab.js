import TaskCard from "@/components/task-card";

export default function TasksTab({tasks, day, changeHandler}) {
  return (
    <div className={`flex flex-col gap-y-2`}>
      { !tasks && <div>Loading...</div> }
      { tasks && tasks.map(task => <TaskCard task={task} key={`task-${task.name}`} day={day} onChange={changeHandler}/>) }
      { tasks && tasks.length === 0 && <div>No Tasks</div> }
    </div>
  );
}