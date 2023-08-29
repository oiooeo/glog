import React from 'react';
import { Tables } from '../../types/supabase';
import LargePin from '../../assets/pin/LargePin.png';
import mediumPin from '../../assets/pin/mideumPin.png';
import smallPin from '../../assets/pin/smallPin.png';
import Detail from '../detail/Detail';

interface Props {
  mapLocation: any;
  postsData: Tables<'posts'>[] | undefined;
  mount: (name: string, element: React.ReactNode) => void;
  flyToLocation: (lng: number, lat: number) => void;
  postModalOpen: boolean;
}
interface Error {
  error: Error | undefined;
}

export const globeCluster = ({ mapLocation, postsData, mount, flyToLocation, postModalOpen }: Props) => {
  console.log(postsData);
  const clusterData = postsData?.slice(5);
  console.log(clusterData);
  if (clusterData) {
    const getValue = mapLocation.getSource('pinPoint');
    if (getValue) {
      mapLocation.removeLayer('unclustered-point');
      mapLocation.removeLayer('cluster-pin');
      mapLocation.removeSource('pinPoint');
    }
    mapLocation?.loadImage(`${LargePin}`, (error: Error | undefined, image: any) => {
      if (error) throw error;
      if (!mapLocation?.hasImage('LargePin')) {
        mapLocation?.addImage('LargePin', image);
      }
    });
    mapLocation?.loadImage(`${mediumPin}`, (error: Error | undefined, image: any) => {
      if (error) throw error;
      if (!mapLocation?.hasImage('mediumPin')) {
        mapLocation?.addImage('mediumPin', image);
      }
    });
    mapLocation?.loadImage(`${smallPin}`, (error: Error | undefined, image: any) => {
      if (error) throw error;
      if (!mapLocation?.hasImage('smallPin')) {
        mapLocation?.addImage('smallPin', image);
      }
    });
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

    mapLocation.on('click', 'unclustered-point', async (e: any) => {
      if (postsData) {
        const postId = e.features[0].properties.cluster;
        const unclusteredData = postsData.filter(item => item.id === postId);
        mount('detail', <Detail data={unclusteredData[0]} />);
        flyToLocation(unclusteredData[0].longitude, unclusteredData[0].latitude);
      }
    });
  }
  if (postModalOpen) {
    mapLocation.removeLayer('unclustered-point');
    mapLocation.removeLayer('cluster-pin');
    mapLocation.removeSource('pinPoint');
  }
};
