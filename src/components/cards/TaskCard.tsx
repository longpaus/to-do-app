import React from "react";

interface TaskCardProps {
  taskName: string;
  onChange: (newTask: string) => void;
  onClickCheckBox: () => void;
}

export default function TaskCard({taskName, onChange, onClickCheckBox}: TaskCardProps) {
  const [focus, setFocus] = React.useState(false);
  return (
    <li
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className={`hover:bg-surface p-2 rounded group-hover:bg-surface ${focus ? 'bg-surface' : ''}`}
    >

      <div className="flex justify-between items-center text-onSurface">
        <input type="checkbox"
               className="h-4 w-4 cursor-pointer appearance-none border checked:bg-gray-700 "
               checked={true}
               onClick={onClickCheckBox}
        />
        <input type="text"
               className="block ms-2 bg-inherit w-full text-onSurface border-none outline-none focus:bg-surface"
               value={taskName}
               onChange={(e) => onChange(e.target.value)}
        />
        <div className="ms-2 text-sm">inbox</div>
      </div>
    </li>
  )
}