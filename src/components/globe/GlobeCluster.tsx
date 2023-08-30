import React from 'react';
import Detail from '../detail/Detail';
import { loadPinImage, pinImages, removeMapLayersAndSource } from './GlobeCluster.util';

import type { Tables } from '../../types/supabase';

interface Props {
  mapLocation: any;
  postsData: Tables<'posts'>[] | undefined;
  mount: (name: string, element: React.ReactNode) => void;
  flyToLocation: (lng: number, lat: number) => void;
  postModalOpen: boolean;
}

export const globeCluster = ({ mapLocation, postsData, mount, flyToLocation, postModalOpen }: Props) => {
  const clusterData = postsData?.slice(5);

  pinImages.forEach(({ name, url }) => loadPinImage(mapLocation, name, url));

  if (clusterData) {
    const getValue = mapLocation.getSource('pinPoint');
    if (getValue) {
      removeMapLayersAndSource(mapLocation);
    }

    mapLocation?.addSource('pinPoint', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: clusterData.map(post => ({
          type: 'Feature',
          properties: {
            cluster: `${post.id}`, // Adjust this based on your data
          },
          geometry: {
            type: 'Point',
            coordinates: [post.longitude || 0, post.latitude || 0],
          },
        })),
      },
      cluster: true,
      clusterRadius: 50,
    });
    mapLocation?.addLayer({
      id: 'cluster-pin',
      type: 'symbol',
      source: 'pinPoint',
      filter: ['has', 'point_count'],
      layout: {
        // 'icon-image': 'smallPin',
        'icon-image': ['step', ['get', 'point_count'], 'mediumPin', 3, 'smallPin', 5, 'LargePin'],
        'icon-size': 1,
      },
    });
    mapLocation?.addLayer({
      id: 'unclustered-point',
      type: 'symbol',
      source: 'pinPoint',
      filter: ['!', ['has', 'point_count']],
      layout: {
        'icon-image': 'smallPin',
        'icon-size': 0.5,
      },
    });

    mapLocation.on('click', 'unclustered-point', handleUnclusteredPointClick);
  }

  if (postModalOpen) {
    removeMapLayersAndSource(mapLocation);
  }

  function handleUnclusteredPointClick(e: any) {
    if (postsData) {
      const postId = e.features[0].properties.cluster;
      const unclusteredData = postsData.filter(item => item.id === postId);
      mount('detail', <Detail data={unclusteredData[0]} />);
      flyToLocation(unclusteredData[0].longitude, unclusteredData[0].latitude);
    }
  }
};
