import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMapLocationStore } from '../../zustand/store';

const Geo = () => {
  mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN ? process.env.REACT_APP_ACCESS_TOKEN : '';
  const globeuseRef = useRef(null);
  const mapLocation = useMapLocationStore(state => state.mapLocation);
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

  useEffect(() => {
    const { current } = globeuseRef;
    current.addEventListener('retrieve', e => {
      console.log(e.detail);
      const { coordinates } = e.detail.features[0].geometry;
      console.log(coordinates);
      // mapLocation.flyTo({ center: coordinates, zoom: 10 });
    });
  }, []);

  return (
    <div>
      <mapbox-search-box ref={globeuseRef} access-token={accessToken} proximity="0,0"></mapbox-search-box>
    </div>
  );
};

export default Geo;
