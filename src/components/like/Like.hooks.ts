import { useQuery } from '@tanstack/react-query';

import { AuthError, signin } from '../../api/supabaseAuth';
import { getIsLike } from '../../api/supabaseDatabase';
import { useLikeMutation } from '../../zustand/mutations/useLikeMutation';
import { useSessionStore } from '../../zustand/useSessionStore';

import type { LikeProps } from './Like';

export const useLike = ({ data }: LikeProps) => {
  const session = useSessionStore(state => state.session);
  const { data: likesData } = useQuery(['getIsLike', data.id], async () => await getIsLike(data.id));
  const isLiked = likesData?.some(like => like.userId === session?.user.id);
  const myLikedData = likesData?.find(like => like.userId === session?.user.id);
  const { deleteLikeMutation, addLikeMutation } = useLikeMutation();

  const signinHandler = async () => {
    try {
      await signin();
    } catch (error) {
      if (error instanceof AuthError) {
        alert({ type: 'alert', title: '로그인 실패', content: error.message });
      }
    }
  };

  const pressLike = () => {
    if (!session) {
      signinHandler();
      return;
    }

    if (isLiked) {
      if (!myLikedData) return;
      deleteLikeMutation.mutate(myLikedData?.id);
    } else {
      addLikeMutation.mutate({ postId: data.id, userId: session.user.id });
    }
  };

  return { pressLike, isLiked, likesData };
};
