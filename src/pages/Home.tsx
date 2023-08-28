import React, { useEffect, useState } from 'react';
import Globe from '../components/globe/Globe';
import { getMyPosts, getPosts } from '../api/supabaseDatabase';
import { useQuery } from '@tanstack/react-query';
import { useSessionStore, useTabStore } from '../zustand/store';
import { Tables } from '../types/supabase';

const Home = () => {
  const initialCenter: [number, number] = [126.958692133901, 37.5175237576854];
  const zoom = 1;
  const [data, setData] = useState<Tables<'posts'>[]>();
  const { data: postsData } = useQuery(['getPosts'], getPosts);
  const session = useSessionStore(state => state.session);
  const [myData, setMyData] = useState<Tables<'posts'>[]>();

  useEffect(() => {
    async function fetchMyPosts() {
      try {
        if (session) {
          const data = await getMyPosts(session.user.id);
          setMyData(data);
        }
      } catch (error) {
        console.error('Error fetching liked posts:', error);
      }
    }

    fetchMyPosts();
  }, [session]);
  const tab = useTabStore(state => state.tab);

  useEffect(() => {
    if (tab === 'explore') {
      setData(postsData);
    } else if (tab === 'my') {
      setData(myData);
    }
  }, [tab, postsData, myData]);

  return <Globe initialCenter={initialCenter} zoom={zoom} postsData={data} />;
};

export default Home;
