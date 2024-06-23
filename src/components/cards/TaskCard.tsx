import React, {useState} from "react";
import {Task} from "../../types/TaskTypes";
import {formatDate} from "../../utils/date.js";
import {DueDate} from "../../types/DateTypes";
import {Modal} from "@mui/material";
import SmallCalendar from "../SmallCalendar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface TaskCardProps {
    task: Task
    updateTask: (updatedTask: Task, changeTaskGroup?: boolean) => void;
}

export default function TaskCard({task, updateTask}: Readonly<TaskCardProps>) {
    const [focus, setFocus] = useState(false);
    const focusStyle = focus ? 'bg-lightSurface dark:bg-darkSurface' : ''
    const checkedStyle = task.completed ? 'opacity-50' : ''
    const [modalOpen, setModalOpen] = useState(false);

    const resetDueDateHandler = () => {
        updateTask({...task, dueDate: undefined});
        setModalOpen(false);
    }
    const updateDueDateHandler = (newDueDate: DueDate) => {
        updateTask({...task, dueDate: newDueDate}, true);
        setModalOpen(false);
    }
    const onCheckedHandler = () => {
        updateTask({...task, completed: !task.completed}, true);
    }
    const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateTask({...task, name: e.target.value});
    }
    return (
        <>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <div style={{transform: 'translate(-50%, -50%)'}} className=" absolute top-1/2 left-1/2 ">
                    <SmallCalendar resetDueDateHandler={() => resetDueDateHandler()}
                                   changeDueDateHandler={(dueDate) => updateDueDateHandler(dueDate)}
                                   dueDate={task.dueDate}/>
                </div>

            </Modal>
            <li
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className={`hover:bg-lightSurface dark:hover:bg-darkSurface p-2 rounded group-hover:bg-lightSurface dark:group-hover:bg-darkSurface ${focusStyle} ${checkedStyle}`}
            >

                <div className="flex justify-between items-center text-lightOnSurface dark:text-darkOnSurface">
                    <input type="checkbox"
                           className=" h-5 w-5 cursor-pointer appearance-none  border border-gray-500 checked:bg-gray-600 checked:hover:bg-gray-400"
                           checked={task.completed}
                           onClick={() => onCheckedHandler()}
                    />
                    <input type="text"
                           className="block ms-2 bg-inherit w-full text-onSurface border-none outline-none focus:bg-surface"
                           value={task.name}
                           onChange={(e) => onChangeNameHandler(e)}
                    />
                    <div
                        className="text-sm cursor-pointer"
                        onClick={() => setModalOpen(true)}
                    >
                        {task.dueDate ? formatDate(task.dueDate) : <CalendarMonthIcon/>}
                    </div>
                </div>
            </li>
        </>
    )
}