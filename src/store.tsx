import {create} from 'zustand'
import {SortStrategy} from "./types/SortStrategy";

interface StoreState {
  sortTask: SortStrategy; // State variable
  upDateSortTask: (sortTask: SortStrategy) => void; // State update function
}

// Create the store
export const useStore = create<StoreState>(set => ({
  sortTask: 'Date',
  upDateSortTask: (sortTask: SortStrategy) => set({sortTask}), // Update the sortTask state
}));
