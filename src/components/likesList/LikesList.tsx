import React, { useEffect, useState } from 'react';
import PostItem from '../common/postItem/PostItem';
import { useSessionStore } from '../../zustand/store';
import { getLikes, getPosts } from '../../api/supabaseDatabase';
import { Tables } from '../../types/supabase';

const LikesList = () => {
  const session = useSessionStore(state => state.session);
  const [likedPosts, setLikedPosts] = useState<Tables<'posts'>[]>([]);

  useEffect(() => {
    async function fetchLikedPosts() {
      try {
        if (session) {
          const likes = await getLikes(session.user.id);
          const likedPostIds = likes.map(like => like.postId);

          const posts = await getPosts();
          const filteredPosts = posts.filter(post => likedPostIds.includes(post.id));

          setLikedPosts(filteredPosts);
        }
      } catch (error) {
        console.error('Error fetching liked posts:', error);
      }
    }

    fetchLikedPosts();
  }, [session]);

  return (
    <>
      {likedPosts.map(post => (
        <PostItem key={post.id} data={post} />
      ))}
    </>
  );
};

export default LikesList;
