import { create } from 'zustand';

interface MarkerInvisibleInitState {
  isMarkerInvisible: boolean | null;
}

const initState: MarkerInvisibleInitState = {
  isMarkerInvisible: false,
};

interface MarkerInvisibleStore extends MarkerInvisibleInitState {
  setIsMarkerInvisible: (nowIsMarkerInvisible: boolean) => void;
}

export const useMarkerInvisible = create<MarkerInvisibleStore>(set => ({
  ...initState,
  setIsMarkerInvisible: nowIsMarkerInvisible => {
    set({ isMarkerInvisible: nowIsMarkerInvisible });
  },
}));
