import React from "react";

interface TaskCardProps {
  taskName: string;
  onChange: (newTask: string) => void;
  onClickCheckBox: (completed: boolean) => void;
  checked: boolean;
  id: string;

}

export default function TaskCard({taskName, onChange, onClickCheckBox, checked}: Readonly<TaskCardProps>) {
  const [focus, setFocus] = React.useState(false);

  const focusStyle = focus ? 'bg-surface' : ''
  const checkedStyle = checked ? 'opacity-50' : ''
  return (
    <li
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className={`hover:bg-surface p-2 rounded group-hover:bg-surface ${focusStyle} ${checkedStyle}`}
    >

      <div className="flex justify-between items-center text-onSurface">
        <input type="checkbox"
               className=" h-5 w-5 cursor-pointer appearance-none  border checked:bg-gray-600 checked:hover:bg-gray-400"
               checked={checked}
               onClick={() => onClickCheckBox(!checked)}
        />
        <input type="text"
               className="block ms-2 bg-inherit w-full text-onSurface border-none outline-none focus:bg-surface"
               value={taskName}
               onChange={(e) => onChange(e.target.value)}
        />
        <div className="ms-2 text-sm">{}</div>
      </div>
    </li>
  )
}