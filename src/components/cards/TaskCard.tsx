import React, {useState} from "react";
import {Task} from "../../types/TaskTypes";
import {formatDate} from "../../utils/date.js";
import {DueDate} from "../../types/Dates";
import {Modal} from "@mui/material";
import Calendar from "../calendar/Calendar";

interface TaskCardProps {
  task: Task
  onChange: (newTask: string) => void;
  onClickCheckBox: (completed: boolean) => void;
  updateTask: (updatedTask: Task) => void;
}

export default function TaskCard({task, onChange, onClickCheckBox, updateTask}: Readonly<TaskCardProps>) {
  const [focus, setFocus] = useState(false);
  const focusStyle = focus ? 'bg-surface' : ''
  const checkedStyle = task.completed ? 'opacity-50' : ''
  const [modalOpen, setModalOpen] = useState(false);

  const resetDueDateHandler = () => {
    const newTask = {...task, dueDate: undefined};
    updateTask(newTask);
  }
  const updateDueDateHandler = (newDueDate: DueDate) => {
    updateTask({...task, dueDate: newDueDate});
  }
  return (
    <>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div style={{transform: 'translate(-50%, -50%)'}} className=" absolute top-1/2 left-1/2 ">
          <Calendar onResetHandler={() => resetDueDateHandler()}
                    onOkayHandler={(dueDate) => updateDueDateHandler(dueDate)} dueDate={task.dueDate}/>
        </div>

      </Modal>
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
          <div
            className="text-sm cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            {formatDate(task.dueDate)}
          </div>
        </div>
      </li>
    </>
  )
}