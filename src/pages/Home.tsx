import React from 'react';
import Globe from '../components/globe/Globe';
import { getPosts } from '../api/supabaseDatabase';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const initialCenter: [number, number] = [126.958692133901, 37.5175237576854];
  const zoom = 1;
  const { data: postData } = useQuery(['getPosts'], getPosts);
  return <Globe initialCenter={initialCenter} zoom={zoom} postsData={postData} />;
};

export default Home;
