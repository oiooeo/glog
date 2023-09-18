import React from 'react';

import { BsHeart, BsHeartFill } from 'react-icons/bs';

import { useLike } from './Like.hooks';
import * as St from './style';

import type { Tables } from '../../types/supabase';
export interface LikeProps {
  data: Tables<'posts'>;
  fetchLikedPosts?: () => Promise<void>;
}

const Like = ({ data, fetchLikedPosts }: LikeProps) => {
  const { pressLike, isLiked, likesData } = useLike({ data, fetchLikedPosts });
  const stopTwiceClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <St.LikeLayout onClick={stopTwiceClick}>
      <St.LikeButton
        onClick={() => {
          pressLike(fetchLikedPosts);
        }}
      >
        {isLiked ? <BsHeartFill size={'18px'} className="like" /> : <BsHeart size={'18px'} className="like" />}
      </St.LikeButton>
      <St.LikeParagraph>{likesData?.length}</St.LikeParagraph>
    </St.LikeLayout>
  );
};

export default Like;
