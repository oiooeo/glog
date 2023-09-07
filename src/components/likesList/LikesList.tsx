import { useEffect, useRef, useState } from 'react';

import * as Styled from './style';
import { getLikes, getPosts } from '../../api/supabaseDatabase';
import { useSessionStore } from '../../zustand/useSessionStore';
import Loader from '../common/loader/Loader';
import PostItem from '../common/postItem/PostItem';

import type { Tables } from '../../types/supabase';

const LikesList = () => {
  const session = useSessionStore(state => state.session);
  const [likedPosts, setLikedPosts] = useState<Array<Tables<'posts'>>>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

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
  }, [session, page, likedPosts]);

  const handleScroll = () => {
    setLoading(true);
    if (scrollRef.current) {
      const isAtBottom = scrollRef.current.scrollHeight - scrollRef.current.scrollTop === scrollRef.current.clientHeight;
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
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <>
      <Styled.ScrollDiv ref={scrollRef}>
        {likedPosts.map(post => (
          <PostItem key={post.id} data={post} />
        ))}
      </Styled.ScrollDiv>
      {loading && (
        <Styled.LoadingDiv>
          <Loader />
        </Styled.LoadingDiv>
      )}
    </>
  );
};

export default LikesList;
