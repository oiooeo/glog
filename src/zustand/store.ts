import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

interface SessionStore {
  session: Session | null;
  setSession: (newSession: Session | null) => void;
}

export const useSessionStore = create<SessionStore>(set => ({
  session: null,
  setSession: newSession => set({ session: newSession }),
}));

interface LocationStore {
  clickedLocation: {
    latitude: number;
    longitude: number;
    regionId: string;
    countryId: string;
  } | null;
  setClickedLocation: (location: LocationStore['clickedLocation']) => void;
}

export const useLocationStore = create<LocationStore>(set => ({
  clickedLocation: null,
  setClickedLocation: location => set({ clickedLocation: location }),
}));

interface useMapProps {
  mapLocation: any | null;
  setMapLocation: (newMapLocation: any | null) => void;
}

export const useMapLocationStore = create<useMapProps>(set => ({
  mapLocation: null,
  setMapLocation: newMapLocation => set({ mapLocation: newMapLocation }),
}));
