import React from 'react';

import { BsHeart, BsHeartFill } from 'react-icons/bs';

import { useLike } from './Like.hooks';
import * as Styled from './style';

import type { Tables } from '../../types/supabase';
export interface LikeProps {
  data: Tables<'posts'>;
}

const Like = ({ data }: LikeProps) => {
  const { pressLike, isLiked, likesData } = useLike({ data });

  return (
    <Styled.LikeLayout>
      <Styled.LikeButton onClick={pressLike}>{isLiked ? <BsHeartFill size={'18px'} className="like" /> : <BsHeart size={'18px'} className="like" />}</Styled.LikeButton>
      <Styled.LikeParagraph>{likesData?.length}</Styled.LikeParagraph>
    </Styled.LikeLayout>
  );
};

export default Like;
