import {DueDate} from "./DateTypes";

export type TaskId = string
export type Task = {
  name: string,
  id: TaskId
  completed: boolean
  creationTime: Date
  dueDate: DueDate
}


