import { useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';

import * as St from './style';
import { getFetchPostLikes, getLikes, getPostLikes } from '../../api/supabaseDatabase';
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
        const postData = await getFetchPostLikes(session.user.id, likedPostIds, page - PAGE_COUNT);
        setLikedPosts(postData as Array<Tables<'posts'>>);
        setLikedPostsId(likedPostIds);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const addLikedPosts = async (page: number) => {
    if (session) {
      try {
        const likes = await getLikes(session.user.id);
        const likedPostIds = likes.map(like => like.postId);
        const postData = await getPostLikes(session.user.id, likedPostIds, page);
        if (postData && postData.length !== 0) {
          const uniquePostData = postData.filter(item => !likedPosts.some(likedPost => likedPost.id === item?.id));
          setLikedPosts(prevPosts => [...prevPosts, ...uniquePostData] as Array<Tables<'posts'>>);
          setLikedPostsId(likedPostIds);
          setPage(prev => prev + PAGE_COUNT);
        }
      } catch (error) {
        console.error('Error fetching liked posts:', error);
      }
    }
  };

  useEffect(() => {
    addLikedPosts(page);
  }, []);

  const { ref } = useInView({
    threshold: 1,
    triggerOnce: true,
    onChange: inView => {
      if (!inView) return;
      addLikedPosts(page);
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
