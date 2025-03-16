import { SearchItem } from '@/types/item';
import { create } from 'zustand';

interface SearchItemStore {
  searchItem: SearchItem | null;
  setSearchItem: (searchItem: SearchItem | null) => void;
  clearSearchItem: () => void;
}

export const useSearchItemStore = create<SearchItemStore>((set) => ({
  searchItem: null,
  setSearchItem: (searchItem) => set({ searchItem }),
  clearSearchItem: () => set({ searchItem: null }),
}));
