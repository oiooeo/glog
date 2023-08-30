import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

interface SessionInitState {
  session: Session | null;
}

const initState: SessionInitState = {
  session: null,
};

interface SessionStore extends SessionInitState {
  setSession: (newSession: Session | null) => void;
}

export const useSessionStore = create<SessionStore>(set => ({
  ...initState,
  setSession: newSession => set({ session: newSession }),
}));
