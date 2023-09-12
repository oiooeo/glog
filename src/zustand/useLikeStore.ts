import { create } from 'zustand';

interface likeType {
  likedPostsId: string[];
  setLikedPostsId: (newlikedPostsId: string[]) => void;
}

export const useLikeStore = create<likeType>(set => ({
  likedPostsId: [],
  setLikedPostsId: newlikedPostsId => {
    set({ likedPostsId: newlikedPostsId });
  },
}));
