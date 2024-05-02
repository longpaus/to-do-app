import React, {ChangeEvent, FormEvent} from "react";

interface AddTaskFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  task: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AddTaskForm({onSubmit, task, onChange}: AddTaskFormProps) {

  return (
    <form onSubmit={onSubmit}>
      <div className="relative">
        <input type="text" id="newTask"
               className="block w-full p-4 ps-5 text-sm text-onSurface border rounded-lg bg-surface focus:ring-blue-500 focus:border-blue-500"
               placeholder="Add New Task"
               required
               value={task}
               onChange={onChange}
        />
        <button type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </div>
    </form>
  )
}