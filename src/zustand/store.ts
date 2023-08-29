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
  };
  setClickedLocation: (location: LocationStore['clickedLocation']) => void;
}

export const useLocationStore = create<LocationStore>(set => ({
  clickedLocation: {
    latitude: 0,
    longitude: 0,
  },
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

interface usePostProps {
  isPosting: boolean | null;
  setIsPosting: (nowIsPosting: boolean) => void;
}

export const usePostStore = create<usePostProps>(set => ({
  isPosting: null,
  setIsPosting: nowIsPosting => set({ isPosting: nowIsPosting }),
}));

interface clickedPostLocationStore {
  clickedPostLocation: {
    latitude: number;
    longitude: number;
  } | null;
  setClickedPostLocation: (location: clickedPostLocationStore['clickedPostLocation']) => void;
}

export const useClickedPostStore = create<clickedPostLocationStore>(set => ({
  clickedPostLocation: null,
  setClickedPostLocation: location => set({ clickedPostLocation: location }),
}));

interface useTabProps {
  tab: string;
  setTab: (nowTab: string) => void;
}

export const useTabStore = create<useTabProps>(set => ({
  tab: 'explore',
  setTab: now => set({ tab: now }),
}));
