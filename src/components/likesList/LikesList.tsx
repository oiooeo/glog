import { useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';

import * as Styled from './style';
import { getPostLikes } from '../../api/supabaseDatabase';
import { useSessionStore } from '../../zustand/useSessionStore';
import PostItem from '../common/postItem/PostItem';

import type { Tables } from '../../types/supabase';

export const PAGE_COUNT = 5;

const LikesList = () => {
  const session = useSessionStore(state => state.session);
  const [likedPosts, setLikedPosts] = useState<Array<Tables<'posts'>>>([]);
  const [page, setPage] = useState<number>(0);

  const loadMoreLikedPosts = async () => {
    if (session) {
      try {
        const postData = await getPostLikes(session.user.id, page);
        setLikedPosts(prevPosts => [...prevPosts, ...postData]);
      } catch (error) {
        console.error('Error fetching liked posts:', error);
      } finally {
        setPage(prev => prev + PAGE_COUNT);
      }
    }
  };

  useEffect(() => {
    loadMoreLikedPosts();
  }, []);

  const { ref } = useInView({
    threshold: 1,
    triggerOnce: true,
    onChange: inView => {
      if (!inView) return;
      loadMoreLikedPosts();
    },
  });

  return (
    <>
      <Styled.ScrollDiv>
        {likedPosts.map((post, index) => {
          return <PostItem key={post.id} data={post} ref={likedPosts.length - 1 === index ? ref : null} />;
        })}
      </Styled.ScrollDiv>
    </>
  );
};

export default LikesList;
