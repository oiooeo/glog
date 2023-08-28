import React, { useEffect, useState } from 'react';
import PostItem from '../common/postItem/PostItem';
import { useSessionStore } from '../../zustand/store';
import { getLikes, getPosts } from '../../api/supabaseDatabase';
import { Tables } from '../../types/supabase';
import * as Styled from './style';

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
        }, 1000); // 1초 후에 페이지 번호 증가 및 로딩 종료
      } else {
        setLoading(false); // 맨 아래로 스크롤하지 않았을 때는 로딩 종료
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
      <Styled.scrollDiv className="scrollLike">
        {likedPosts.map(post => (
          <PostItem key={post.id} data={post} />
        ))}
      </Styled.scrollDiv>
      {loading && <Styled.loadingDiv>Loading..</Styled.loadingDiv>}
    </>
  );
};

export default LikesList;
