import {create} from 'zustand'
import {SortStrategy} from "./types/SortStrategy";
import {defaultDueDate} from "./utils/date.js";

interface StoreState {
  sortTask: SortStrategy; // State variable
  upDateSortTask: (sortTask: SortStrategy) => void; // State update function
  defaultDueDate: Date;
  upDateDefaultDueDate: (date: Date) => void;
}

// Create the store
export const useStore = create<StoreState>(set => ({
  sortTask: 'Date',
  upDateSortTask: (sortTask: SortStrategy) => set({sortTask}), // Update the sortTask state
  defaultDueDate: defaultDueDate(),
  upDateDefaultDueDate: (date: Date) => set({defaultDueDate: date}),
}));
