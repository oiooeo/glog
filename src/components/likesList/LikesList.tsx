import { useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';

import * as St from './style';
import { getLikes, getPostLikes } from '../../api/supabaseDatabase';
import { useLikeStore } from '../../zustand/useLikeStore';
import { useSessionStore } from '../../zustand/useSessionStore';
import PostItem from '../common/postItem/PostItem';

import type { Tables } from '../../types/supabase';

export const PAGE_COUNT = 5;

const LikesList = () => {
  const session = useSessionStore(state => state.session);
  const [likedPosts, setLikedPosts] = useState<Array<Tables<'posts'>>>([]);
  const { setLikedPostsId } = useLikeStore();
  const [page, setPage] = useState<number>(0);

  const fetchLikedPosts = async () => {
    if (session) {
      try {
        const likes = await getLikes(session.user.id);
        const likedPostIds = likes.map(like => like.postId);
        const postData = await getPostLikes(likedPostIds, page);
        setLikedPosts(postData);
        setLikedPostsId(likedPostIds);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const loadMoreLikedPosts = async () => {
    if (session) {
      try {
        const likes = await getLikes(session.user.id);
        const likedPostIds = likes.map(like => like.postId);
        const postData = await getPostLikes(session.user.id, likedPostIds, page);
        if (postData) {
          setLikedPosts(prevPosts => [...prevPosts, ...postData] as Array<Tables<'posts'>>);
          setLikedPostsId(likedPostIds);
        }
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
      <St.ScrollDiv>
        {likedPosts.map((post, index) => {
          return <PostItem key={post.id} data={post} ref={likedPosts.length - 1 === index ? ref : null} fetchLikedPosts={fetchLikedPosts} />;
        })}
      </St.ScrollDiv>
    </>
  );
};

export default LikesList;
