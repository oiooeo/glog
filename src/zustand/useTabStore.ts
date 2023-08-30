import { create } from 'zustand';

interface TabInitState {
  tab: string;
}

const initState: TabInitState = {
  tab: 'explore',
};

interface TabState extends TabInitState {
  setTab: (now: string) => void;
}

export const useTabStore = create<TabState>(set => ({
  ...initState,
  setTab: now => set({ tab: now }),
}));
