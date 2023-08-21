import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

interface MapProps {
  initialCenter: [number, number];
  zoom: number;
}

const Globe: React.FC<MapProps> = ({ initialCenter, zoom }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN ? process.env.REACT_APP_ACCESS_TOKEN : '';

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        image: 'https://a.cdn-hotels.com/gdcs/production123/d477/f88c6cdb-3e47-45f5-bfd7-d3775d1f3bcc.jpg?impolicy=fcrop&w=800&h=533&q=medium',
        coordinates: {
          latitude: 21.0090571,
          longitude: 105.8607507,
        },
      },
      {
        image: 'https://a.cdn-hotels.com/gdcs/production123/d477/f88c6cdb-3e47-45f5-bfd7-d3775d1f3bcc.jpg?impolicy=fcrop&w=800&h=533&q=medium',
        coordinates: {
          latitude: 39.904211,
          longitude: 116.407395,
        },
      },
      {
        image: 'https://a.cdn-hotels.com/gdcs/production123/d477/f88c6cdb-3e47-45f5-bfd7-d3775d1f3bcc.jpg?impolicy=fcrop&w=800&h=533&q=medium',
        coordinates: {
          latitude: 37.6173,
          longitude: 55.755826,
        },
      },
      {
        image: 'https://a.cdn-hotels.com/gdcs/production123/d477/f88c6cdb-3e47-45f5-bfd7-d3775d1f3bcc.jpg?impolicy=fcrop&w=800&h=533&q=medium',
        coordinates: {
          latitude: 37.566535,
          longitude: 126.9779692,
        },
      },
      {
        image: 'https://ak-d.tripcdn.com/images/01013120008k3ku5pCF85_C_500_280.jpg?proc=source%2ftrip',
        coordinates: {
          latitude: 33.5903547,
          longitude: 130.4017155,
        },
      },
      {
        image: 'https://ak-d.tripcdn.com/images/01013120008k3ku5pCF85_C_500_280.jpg?proc=source%2ftrip',
        coordinates: {
          latitude: 37.6173,
          longitude: 55.755826,
        },
      },
      {
        image: 'https://ak-d.tripcdn.com/images/01013120008k3ku5pCF85_C_500_280.jpg?proc=source%2ftrip',
        coordinates: {
          latitude: 21.521757,
          longitude: -77.781167,
        },
      },
    ],
  };

  return <div>Globe</div>;
};

export default Globe;
