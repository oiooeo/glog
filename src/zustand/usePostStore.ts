import { create } from 'zustand';

interface PostInitState {
  isPosting: boolean | null;
}

const initState: PostInitState = {
  isPosting: null,
};

interface PostStore extends PostInitState {
  setIsPosting: (nowIsPosting: boolean) => void;
}

export const usePostStore = create<PostStore>(set => ({
  ...initState,
  setIsPosting: nowIsPosting => set({ isPosting: nowIsPosting }),
}));
