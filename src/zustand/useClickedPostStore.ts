import { create } from 'zustand';

interface ClickedPostLocationInitState {
  clickedPostLocation: {
    latitude: number;
    longitude: number;
  } | null;
}

const initState: ClickedPostLocationInitState = {
  clickedPostLocation: null,
};

interface ClickedPostLocationStore extends ClickedPostLocationInitState {
  setClickedPostLocation: (location: ClickedPostLocationStore['clickedPostLocation']) => void;
}

export const useClickedPostStore = create<ClickedPostLocationStore>(set => ({
  ...initState,
  setClickedPostLocation: location => set({ clickedPostLocation: location }),
}));
