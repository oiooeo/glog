import React, { useEffect, useState } from 'react';
import PostItem from '../common/postItem/PostItem';
import { useSessionStore } from '../../zustand/store';
import { getLikes } from '../../api/supabaseDatabase';
import Post from '../post/Post';
import { Tables } from '../../types/supabase';

type LikesListProps = { data: Tables<'posts'>; postId: string };

const LikesList = () => {
  const session = useSessionStore(state => state.session);
  const [likedPosts, setLikedPosts] = useState<Tables<'posts'>[]>();

  useEffect(() => {
    async function fetchLikedPosts() {
      try {
        if (session) {
          const likes = await getLikes(session.user.id);
          const likedPostIds = likes.map(like => like.postId);
          console.log(likes);
          // setLikedPosts(likes);
        }
      } catch (error) {
        console.error('Error fetching liked posts:', error);
      }
    }

    fetchLikedPosts();
  }, [session]);

  return (
    <>
      {/* {likedPosts.map(postId => (
        <PostItem key={postId} data={likedPosts} />
      ))} */}
      {/* <PostItem images={'https://i.pinimg.com/564x/d5/93/63/d5936358022426e729ceaceb607a57a6.jpg'} countryId={'나라'} regionId={'지역'} /> */}
    </>
  );
};

export default LikesList;
