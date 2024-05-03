export type TaskListType = 'ongoing' | 'complete';

export type TaskId = string
export type Task = {
  name: string,
  id: TaskId
}

export type TasksList = {
  [listName in TaskListType]: Task[];
};

