import { create } from 'zustand';

interface SearchType {
  key: string;
  setKey: (newKey: string) => void;
  isSearchListOpened: boolean;
  setIsSearchListOpened: (newIsSearchListOpened: boolean) => void;
}

export const useSearchStore = create<SearchType>(set => ({
  key: '',
  setKey: newKey => {
    set({ key: newKey });
  },
  isSearchListOpened: false,
  setIsSearchListOpened: newIsSearchListOpened => {
    set({ isSearchListOpened: newIsSearchListOpened });
  },
}));
