import React from 'react';

import clusterFive from '../assets/pin/clusterFive.png';
import clusterTen from '../assets/pin/clusterTen.png';
import clusterTwenty from '../assets/pin/clusterTwenty.png';
import unclusterPin from '../assets/pin/unclusterPin.png';
import Detail from '../components/detail/Detail';

import type { Tables } from '../types/supabase';

interface Props {
  mapLocation: any;
  clusterData: Array<Tables<'posts'>> | undefined;
  postsData: Array<Tables<'posts'>> | undefined;
  mount: (name: string, element: React.ReactNode) => void;
  flyToLocation: (lng: number, lat: number) => void;
  isPostModalOpened: boolean | null;
}

export const globeCluster = ({ clusterData, mapLocation, postsData, mount, flyToLocation, isPostModalOpened }: Props) => {
  if (isPostModalOpened) {
    removeMapLayersAndSource(mapLocation);
    clusterData = [];
  }
  pinImages.forEach(({ name, url }) => {
    loadPinImage(mapLocation, name, url);
  });

  if (clusterData) {
    const getValue = mapLocation.getSource('pinPoint');

    if (getValue) {
      removeMapLayersAndSource(mapLocation);
    }

    const handleClusterPointClick = (e: any) => {
      const features = mapLocation.queryRenderedFeatures(e.point, {
        layers: ['cluster-pin'],
      });

      const clusterId = features[0].properties.cluster_id;
      mapLocation.getSource('pinPoint').getClusterExpansionZoom(clusterId, (error: Error, zoom: number) => {
        if (error) return;
        mapLocation.easeTo({
          center: features[0].geometry.coordinates,
          zoom,
        });
      });
    };

    const handleUnclusteredPointClick = async (e: any) => {
      if (postsData) {
        const postId = await e.features[0].properties.cluster;
        const unclusteredData = postsData.filter(item => item.id === postId);
        if (unclusteredData.length === 1) {
          mount('detail', <Detail data={unclusteredData[0]} />);
          flyToLocation(unclusteredData[0].longitude, unclusteredData[0].latitude);
        }
      }
    };

    mapLocation?.addSource('pinPoint', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: clusterData.map(post => ({
          type: 'Feature',
          properties: {
            cluster: `${post.id}`,
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
        'icon-image': ['step', ['get', 'point_count'], 'clusterFive', 5, 'clusterTen', 10, 'clusterTwenty'],
        'icon-size': 2,
      },
    });

    mapLocation?.addLayer({
      id: 'unclustered-point',
      type: 'symbol',
      source: 'pinPoint',
      filter: ['!', ['has', 'point_count']],
      layout: {
        'icon-image': 'unclusterPin',
        'icon-size': 0.5,
      },
    });

    mapLocation.on('click', 'cluster-pin', handleClusterPointClick);
    mapLocation.on('click', 'unclustered-point', handleUnclusteredPointClick);
  }
};

export const pinImages = [
  { name: 'unclusterPin', url: unclusterPin },
  { name: 'clusterFive', url: clusterFive },
  { name: 'clusterTen', url: clusterTen },
  { name: 'clusterTwenty', url: clusterTwenty },
];

export const loadPinImage = (mapLocation: any, imageName: string, imageUrl: string) => {
  mapLocation?.loadImage(imageUrl, (error: Error | undefined, image: any) => {
    if (error) throw error;
    if (!mapLocation?.hasImage(imageName)) {
      mapLocation?.addImage(imageName, image);
    }
  });
};

export const removeMapLayersAndSource = (map: any) => {
  map.removeLayer('unclustered-point');
  map.removeLayer('cluster-pin');
  map.removeSource('pinPoint');
};
