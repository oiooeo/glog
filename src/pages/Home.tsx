import { useEffect, useState } from 'react';
import Globe from '../components/globe/Globe';
import { getMyPosts, getPosts } from '../api/supabaseDatabase';
import { useSessionStore } from '../zustand/useSessionStore';
import { useTabStore } from '../zustand/useTabStore';
import { useQuery } from '@tanstack/react-query';

import { Tables } from '../types/supabase';

const Home = () => {
  const session = useSessionStore(state => state.session);
  const tab = useTabStore(state => state.tab);
  const [data, setData] = useState<Tables<'posts'>[]>();
  const [myData, setMyData] = useState<Tables<'posts'>[]>();
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
    if (session) {
      fetchMyPosts(session?.user.id);
    }
  }, [session]);

  useEffect(() => {
    setData(tab === 'explore' ? posts : myData);
  }, [tab, posts, data]);

  return <Globe postsData={data} />;
};

export default Home;
