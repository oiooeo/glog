import { create } from 'zustand';

interface MapInitState {
  mapLocation: any | null;
}

const initState: MapInitState = {
  mapLocation: null,
};

interface MapStore extends MapInitState {
  setMapLocation: (newMapLocation: any | null) => void;
}

export const useMapLocationStore = create<MapStore>(set => ({
  ...initState,
  setMapLocation: newMapLocation => {
    set({ mapLocation: newMapLocation });
  },
}));
