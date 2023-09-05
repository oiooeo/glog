import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

import { useLikeMutation } from './Like.hooks';
import * as Styled from './style';
import { AuthError, signin } from '../../api/supabaseAuth';
import { getIsLike } from '../../api/supabaseDatabase';
import { useSessionStore } from '../../zustand/useSessionStore';

import type { Tables } from '../../types/supabase';

interface LikeProps {
  data: Tables<'posts'>;
}

const Like = ({ data }: LikeProps) => {
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
      deleteLikeMutation.mutateAsync(myLikedData?.id);
    } else {
      addLikeMutation.mutateAsync({ postId: data.id, userId: session.user.id });
    }
  };

  return (
    <Styled.LikeLayout>
      <Styled.LikeButton onClick={pressLike}>{isLiked ? <BsHeartFill size={'18px'} className="like" /> : <BsHeart size={'18px'} className="like" />}</Styled.LikeButton>
      <Styled.LikeParagraph>{likesData?.length}</Styled.LikeParagraph>
    </Styled.LikeLayout>
  );
};

export default Like;
