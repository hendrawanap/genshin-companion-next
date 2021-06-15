import TaskCard from "@/components/task-card";

export default function TasksTab({tasks}) {
  return (
    <div className={`flex flex-col gap-y-2`}>
      {tasks.map((task, index) => (
        <TaskCard task={task} key={`task-${index}`}/>
      ))}
    </div>
  );
}