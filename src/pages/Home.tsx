import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getMyPosts, getPosts } from '../api/supabaseDatabase';
import Globe from '../components/globe/Globe';
import Landing from '../components/landing/Landing';
import { usePostStore } from '../zustand/usePostStore';
import { useSessionStore } from '../zustand/useSessionStore';
import { useTabStore } from '../zustand/useTabStore';

import type { Tables } from '../types/supabase';

const Home = () => {
  const session = useSessionStore(state => state.session);
  const tab = useTabStore(state => state.tab);
  const post = usePostStore(state => state.isPosting);
  const [data, setData] = useState<Array<Tables<'posts'>>>();
  const [myData, setMyData] = useState<Array<Tables<'posts'>>>();
  const { data: posts } = useQuery(['getPosts'], getPosts);

  const fetchMyPosts = async (id: string) => {
    try {
      const myPosts = await getMyPosts(id);
      setMyData(myPosts);
    } catch (error) {
      console.error('Error fetching my posts:', error);
    }
  };

  useEffect(() => {
    if (session !== null) {
      fetchMyPosts(session?.user.id);
    }
  }, [tab, posts, post]);

  useEffect(() => {
    setData(tab === 'explore' ? posts : myData);
  }, [tab, posts, myData]);

  return (
    <>
      <Globe postsData={data} />
      <Landing />
    </>
  );
};

export default Home;
