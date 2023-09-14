import { create } from 'zustand';

export interface Location {
  latitude: number;
  longitude: number;
}

const initState: Location = {
  latitude: 0,
  longitude: 0,
};

interface LocationStore {
  clickedLocation: Location;
  setClickedLocation: (newLocation: Location) => void;
}

export const useLocationStore = create<LocationStore>(set => ({
  clickedLocation: initState,
  setClickedLocation: newLocation => {
    set({ clickedLocation: newLocation });
  },
}));
