export type TaskListType = 'ongoing' | 'complete';

export type TaskId = string
export type Task = {
  name: string,
  id: TaskId
  creationTime: Date
}

export type TasksList = {
  [listName in TaskListType]: Task[];
};

