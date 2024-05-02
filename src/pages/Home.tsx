import React, {useState} from "react";
import AddTaskForm from "../components/AddTaskForm";

export default function Home() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

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
          <li className="hover:bg-surface p-4 rounded group-hover:bg-surface ">
            <div className="flex justify-between items-center text-onSurface">
              <input type="checkbox"
                     className="before:content[''] peer h-4 w-4 cursor-pointer appearance-none border checked:bg-surface "
              />
              <input type="text"
                     className="block ms-2 bg-inherit w-full text-onSurface border-none outline-none focus:bg-surface"
              />
              <div className="ms-2 text-sm">inbox</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}