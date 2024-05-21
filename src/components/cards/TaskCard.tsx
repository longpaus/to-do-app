import React from "react";
import {Task} from "../../types/TaskTypes";
import {formatDate} from "../../utils/date.js";

interface TaskCardProps {
  task: Task
  onChange: (newTask: string) => void;
  onClickCheckBox: (completed: boolean) => void;
}

export default function TaskCard({task, onChange, onClickCheckBox}: Readonly<TaskCardProps>) {
  const [focus, setFocus] = React.useState(false);

  const focusStyle = focus ? 'bg-surface' : ''
  const checkedStyle = task.completed ? 'opacity-50' : ''
  return (
    <li
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className={`hover:bg-surface p-2 rounded group-hover:bg-surface ${focusStyle} ${checkedStyle}`}
    >

      <div className="flex justify-between items-center text-onSurface">
        <input type="checkbox"
               className=" h-5 w-5 cursor-pointer appearance-none  border checked:bg-gray-600 checked:hover:bg-gray-400"
               checked={task.completed}
               onClick={() => onClickCheckBox(!task.completed)}
        />
        <input type="text"
               className="block ms-2 bg-inherit w-full text-onSurface border-none outline-none focus:bg-surface"
               value={task.name}
               onChange={(e) => onChange(e.target.value)}
        />
        <div className="ms-2 text-sm">{formatDate(task.dueDate)}</div>
      </div>
    </li>
  )
}