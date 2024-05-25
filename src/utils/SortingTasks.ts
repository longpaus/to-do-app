import {Task} from "../types/TaskTypes";
import {SortStrategyTypes} from "../types/SortStrategyTypes";

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

export function sortTasks(sortingStrategy: SortStrategyTypes, tasks: Task[]): Task[] {
  switch (sortingStrategy) {
    case "Date":
      return sortByDate(tasks);
    case "Title":
      return sortByTitle(tasks);
  }
}