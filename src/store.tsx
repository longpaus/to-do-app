import {create} from 'zustand'
import {SortStrategyTypes} from "./types/SortStrategyTypes";
import {defaultDueDate} from "./utils/date.js";
import {GroupStrategyTypes} from "./types/GroupStrategyTypes";

interface StoreState {
  //sorting tasks method
  sortTask: SortStrategyTypes; // State variable
  upDateSortTask: (sortTask: SortStrategyTypes) => void; // State update function

  // grouping tasks method
  groupTask: GroupStrategyTypes;
  upDateGroupTask: (upDateSortTask: GroupStrategyTypes) => void;

  // default due date of tasks
  defaultDueDate: Date;
  upDateDefaultDueDate: (date: Date) => void;
}

// Create the store
export const useStore = create<StoreState>(set => ({
  sortTask: 'Date',
  upDateSortTask: (sortTask: SortStrategyTypes) => set({sortTask}), // Update the sortTask state
  groupTask: 'List',
  upDateGroupTask: (groupTask: GroupStrategyTypes) => set({groupTask}),
  defaultDueDate: defaultDueDate(),
  upDateDefaultDueDate: (date: Date) => set({defaultDueDate: date}),
}));
