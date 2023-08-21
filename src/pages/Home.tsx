import React from 'react';
import Globe from '../components/globe/Globe';

const Home = () => {
  const initialCenter: [number, number] = [-74.006, 40.7128];
  const zoom = 1;
  return <Globe initialCenter={initialCenter} zoom={zoom} />;
};

export default Home;
