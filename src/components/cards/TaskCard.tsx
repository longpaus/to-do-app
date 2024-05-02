import React from "react";

interface TaskCardProps {
  task: string;
  onChange: (newTask: string) => void;
}

export default function TaskCard({task, onChange}: TaskCardProps) {

  return (
    <li className="hover:bg-surface p-4 rounded group-hover:bg-surface ">
      <div className="flex justify-between items-center text-onSurface">
        <input type="checkbox"
               className="h-4 w-4 cursor-pointer appearance-none border checked:bg-gray-700 "
        />
        <input type="text"
               className="block ms-2 bg-inherit w-full text-onSurface border-none outline-none focus:bg-surface"
               value={task}
               onChange={(e) => onChange(e.target.value)}
        />
        <div className="ms-2 text-sm">inbox</div>
      </div>
    </li>
  )
}