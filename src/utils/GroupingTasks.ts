import {GroupStrategyTypes, TasksGroups} from "../types/GroupStrategyTypes";
import {Task} from "../types/TaskTypes";
import {isSameDay} from "./date.js";


export function groupTasks(groupStrategyType: GroupStrategyTypes, tasks: Task[]): TasksGroups {
  switch (groupStrategyType) {
    case "List":
      return groupTasksByList(tasks);
    case "Date":
      return groupTasksByDate(tasks);
  }
}

/**
 * return the initial tasks list object depending on the grouping strategy that is being used
 * @param groupStrategy - the grouping strategy that is being selected
 */
export function getListTypeObject(groupStrategy: GroupStrategyTypes): TasksGroups {
  switch (groupStrategy) {
    case "List":
      return {
        Inbox: [],
        Completed: [],
      }
    case "Date":
      return {
        Today: [],
        Later: [],
        Overdue: [],
        Completed: []
      }
  }
}

/**
 * given a group strategy returns an array of string that contains all the group name in the strategy
 * @param groupStrategy
 */
export function getGroupKeys(groupStrategy: GroupStrategyTypes): string[] {
  switch (groupStrategy) {
    case "List":
      return ['Inbox', 'Completed'];
    case "Date":
      return ['Today', 'Later', 'Overdue', 'Completed'];
  }
}

export function groupTasksByList(tasks: Task[]): TasksGroups {
  const groups = getListTypeObject('List')
  for (const task of tasks) {
    if (task.completed) {
      groups.Completed.push(task);
    } else {
      groups.Inbox.push(task);
    }
  }
  return groups;
}


export function groupTasksByDate(tasks: Task[]) {
  const groups = getListTypeObject('Date');
  for (const task of tasks) {
    groups[getGroupByDateKey(task)].push(task);
  }
  return groups;
}

export function getGroupByListKey(task: Task) {
  return task.completed ? "Completed" : "Inbox";
}

/**
 * given a task object return what group by date key it belongs to.
 * @param task - the task that we want to know what key group by date key it belongs to.
 */
export function getGroupByDateKey(task: Task) {
  const currDate = new Date();
  if (task.completed) {
    return "Completed";
  } else if (currDate > task.dueDate) {
    return "Overdue";
  } else if (isSameDay(currDate, task.dueDate)) {
    return "Today";
  } else {
    return "Later";
  }
}

export function getGroupKey(task: Task, groupStrategy: GroupStrategyTypes) {
  switch (groupStrategy) {
    case "List":
      return getGroupByListKey(task);
    case "Date":
      return getGroupByDateKey(task);
  }
}