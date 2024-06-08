import React, {ChangeEvent, FormEvent} from "react";
import Dropdown from "./menus/Dropdown";
import {defaultStates, useStore} from "../store";
import Calendar from './calendar/Calendar';
import {formatDate} from "../utils/date.js";

interface AddTaskFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  task: string;
  onChangeTaskName: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AddTaskForm({onSubmit, task, onChangeTaskName}: Readonly<AddTaskFormProps>) {
  const [calenderOpen, setCalenderOpen] = React.useState(false);
  const store = useStore();

  return (
    <form onSubmit={onSubmit}>
      <div className="relative">
        <input type="text" id="newTask"
               className="block w-full p-4 ps-5 text-sm dark:text-darkOnSurface text-lightOnSurface border rounded-lg bg-lightSurface dark:bg-darkSurface focus:ring-blue-500 focus:border-blue-500"
               placeholder="Add New Task"
               required
               value={task}
               onChange={onChangeTaskName}
        />
        <div className="absolute bottom-3 end-20  ">
          <Dropdown
            title={
              <div className="text-blue-500 p-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                {formatDate(store.globalDueDate)}
              </div>
            }
            open={calenderOpen}
            setOpenFunc={open => setCalenderOpen(open)}
            detectOutsideClick
          >
            <div className="absolute mt-4">
              <Calendar
                onResetHandler={() => store.upDateGlobalDueDate(defaultStates.globalDueDate)}
                onOkayHandler={(dueDate) => store.upDateGlobalDueDate(dueDate)}
                dueDate={store.globalDueDate}
              />
            </div>
          </Dropdown>
        </div>

        <button type="submit"
                className="absolute end-3 bottom-2.5 text-onPrimary bg-primary h-9 hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-500 focus:border-purple-500 font-medium rounded-lg px-4 py-2 text-sm"
        >
          Add
        </button>
      </div>
    </form>
  )
}