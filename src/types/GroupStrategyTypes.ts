import {Task} from "./TaskTypes";

export type GroupStrategyTypes = 'List' | 'Date';


// export type ListGroups = {
//   type: 'List';
//   groups: Record<string, Task[]>;
// };
//
// export type DateGroups = {
//   type: 'Date';
//   groups: Record<DateGroupKey, Task[]>;
// };

export type TasksGroups = Record<string, Task[]>
