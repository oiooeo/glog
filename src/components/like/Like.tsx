import React from 'react';
import * as Styled from './style';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Tables } from '../../types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../api/supabaseClient';
import { getIsLike } from '../../api/supabaseDatabase';
import { useSessionStore } from '../../zustand/useSessionStore';

type LikeProps = { data: Tables<'posts'> };

const Like: React.FC<LikeProps> = ({ data }) => {
  const queryClient = useQueryClient();
  const session = useSessionStore(state => state.session);

  const { data: likesData } = useQuery(['getIsLike', data.id], () => getIsLike(data.id));
  const isLiked = likesData?.some(like => like.userId === session?.user.id);
  const myLikedData = likesData?.filter(like => like.userId === session?.user.id)[0];

  const { mutate: plusLikesMutate } = useMutation({
    mutationFn: async () => {
      await supabase.from('likes').insert({
        postId: data.id,
        userId: session?.user.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getIsLike']);
    },
  });

  const { mutate: plusPostsMutate } = useMutation({
    mutationFn: async () => {
      await supabase
        .from('posts')
        .update({
          likes: data.likes + 1,
        })
        .eq('id', data.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getPosts']);
    },
  });

  const { mutate: minusLikesMutate } = useMutation({
    mutationFn: async () => {
      await supabase.from('likes').delete().eq('id', myLikedData?.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getIsLike']);
    },
  });

  const { mutate: minusPostsMutate } = useMutation({
    mutationFn: async () => {
      await supabase
        .from('posts')
        .update({
          likes: data.likes - 1,
        })
        .eq('id', data.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getPosts']);
    },
  });

  const pressLike = () => {
    if (session && isLiked) {
      minusLikesMutate();
      minusPostsMutate();
    } else if (session && !isLiked) {
      plusLikesMutate();
      plusPostsMutate();
    } else {
      console.log('로그인하세요!');
    }
  };

  return (
    <Styled.LikeLayout>
      <Styled.LikeButton onClick={pressLike}>{isLiked ? <BsHeartFill size={'18px'} className="like" /> : <BsHeart size={'18px'} className="like" />}</Styled.LikeButton>
      <Styled.LikeParagraph>{data.likes}</Styled.LikeParagraph>
    </Styled.LikeLayout>
  );
};

export default Like;
