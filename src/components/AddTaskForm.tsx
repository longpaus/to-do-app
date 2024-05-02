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
                className="absolute text-onPrimary bg-primary end-2.5 bottom-2.5 hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-500 focus:border-purple-500 font-medium rounded-lg px-4 py-2 text-sm"
        >
          Add
        </button>
      </div>
    </form>
  )
}