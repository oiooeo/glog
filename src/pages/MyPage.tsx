import React, { useEffect, useState } from 'react';
import { useSessionStore } from '../zustand/store';
import { getMyPosts } from '../api/supabaseDatabase';
import Globe from '../components/globe/Globe';
import { Tables } from '../types/supabase';

const MyPage = () => {
  const initialCenter: [number, number] = [126.958692133901, 37.5175237576854];
  const zoom = 1;
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

  return <Globe initialCenter={initialCenter} zoom={zoom} postsData={myData} />;
};

export default MyPage;
