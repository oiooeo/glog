import { create } from 'zustand';

import type { Session } from '@supabase/supabase-js';

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
  setSession: newSession => {
    set({ session: newSession });
  },
}));
