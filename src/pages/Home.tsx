import React, {useState} from "react";
import AddTaskForm from "../components/AddTaskForm";
import TaskCard from "../components/cards/TaskCard";

export default function Home() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  const changeTaskHandler = (index: number) => {
    return (newTask: string) => {
      const newTasks = [...tasks];
      newTasks[index] = newTask;
      setTasks(newTasks);
    }
  }
  const handleSubmitTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.length !== 0) {
      setTasks((prevTasks: string[]) => [...prevTasks, task]);
      setTask('');
    }
  }
  return (
    <div className="flex justify-center items-center h-screen  flex-col ">
      <div className="max-w-110 min-w-80 w-1/2 h-1/2 p-4">
        <AddTaskForm
          onSubmit={handleSubmitTask} task={task}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
        />
        <ul className="max-w divide-y divide-gray-200 dark:divide-gray-700 mt-12">
          {tasks.map((t, index
          ) => (
            <TaskCard key={index} task={t} onChange={changeTaskHandler(index)}/>
          ))}
        </ul>
      </div>
    </div>
  )
}