import * as Styled from './style';
import { useEffect, useState } from 'react';
import { useSessionStore } from '../../zustand/useSessionStore';
import { getLikes, getPosts } from '../../api/supabaseDatabase';
import ReactLoading from 'react-loading';
import PostItem from '../common/postItem/PostItem';

import type { Tables } from '../../types/supabase';

const LikesList = () => {
  const session = useSessionStore(state => state.session);
  const [likedPosts, setLikedPosts] = useState<Tables<'posts'>[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchLikedPosts() {
      try {
        if (session) {
          const likes = await getLikes(session.user.id);
          const likedPostIds = likes.map(like => like.postId);
          const posts = await getPosts();
          const filteredPosts = posts.filter(post => likedPostIds.includes(post.id));
          const filteredPostsData = filteredPosts.slice(0, page * 5);
          setLikedPosts(filteredPostsData);
        }
      } catch (error) {
        console.error('Error fetching liked posts:', error);
      }
    }
    fetchLikedPosts();
  }, [session, page]);

  const handleScroll = () => {
    setLoading(true);
    const scrollLike = document.querySelector('.scrollLike');
    if (scrollLike) {
      const isAtBottom = scrollLike.scrollHeight - scrollLike.scrollTop === scrollLike.clientHeight;
      if (isAtBottom) {
        setTimeout(() => {
          setPage(prev => prev + 1);
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const scrollLike = document.querySelector('.scrollLike');
    scrollLike?.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Styled.ScrollDiv className="scrollLike">
        {likedPosts.map(post => (
          <PostItem key={post.id} data={post} />
        ))}
      </Styled.ScrollDiv>
      {loading && (
        <Styled.LoadingDiv>
          <ReactLoading type="spin" color="#ffffff" width={'50px'} />
        </Styled.LoadingDiv>
      )}
    </>
  );
};

export default LikesList;
