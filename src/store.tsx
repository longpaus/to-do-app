import {create} from 'zustand'
import {SortStrategyTypes} from "./types/SortStrategyTypes";
import {GroupStrategyTypes} from "./types/GroupStrategyTypes";
import {DueDate} from "./types/Dates";

interface StoreState {
  //sorting tasks method
  sortTask: SortStrategyTypes; // State variable
  upDateSortTask: (sortTask: SortStrategyTypes) => void; // State update function

  // grouping tasks method
  groupTask: GroupStrategyTypes;
  upDateGroupTask: (upDateSortTask: GroupStrategyTypes) => void;

  // default due date of tasks
  globalDueDate: DueDate;
  upDateGlobalDueDate: (date: DueDate) => void;
}

export const defaultStates: Pick<StoreState, 'sortTask' | 'groupTask' | 'globalDueDate'> = {
  sortTask: 'Date',
  groupTask: 'List',
  globalDueDate: undefined,
};

// Create the store
export const useStore = create<StoreState>(set => ({
  sortTask: defaultStates.sortTask,
  upDateSortTask: (sortTask: SortStrategyTypes) => set({sortTask}), // Update the sortTask state
  groupTask: defaultStates.groupTask,
  upDateGroupTask: (groupTask: GroupStrategyTypes) => set({groupTask}),
  globalDueDate: defaultStates.globalDueDate,
  upDateGlobalDueDate: (date: DueDate) => set({globalDueDate: date}),
}));
