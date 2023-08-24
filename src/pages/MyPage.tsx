import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSessionStore } from '../zustand/store';
import { getPosts } from '../api/supabaseDatabase';
import Globe from '../components/globe/Globe';

const MyPage = () => {
  const initialCenter: [number, number] = [-74.006, 40.7128];
  const zoom = 1;
  const { data: postData } = useQuery(['getPosts'], getPosts);
  const session = useSessionStore(state => state.session);
  const userId = session?.user.id;
  const userData = postData?.filter(item => item.userId === userId);

  return <Globe initialCenter={initialCenter} zoom={zoom} postData={userData} />;
};

export default MyPage;
