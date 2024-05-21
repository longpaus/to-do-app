import {Task} from "../types/TaskTypes";

export function sortByDate(tasks: Task[]): Task[] {
  return tasks.sort(
    (a: Task, b: Task) => b.creationTime.getTime() - a.creationTime.getTime(),
  );
}

export function sortByTitle(tasks: Task[]): Task[] {
  return tasks.sort(
    (a, b) => a.name.localeCompare(b.name),
  );
}