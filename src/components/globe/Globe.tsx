import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import * as Styled from './style';
import { useModal } from '../common/overlay/modal/Modal.hooks';
import { Tables } from '../../types/supabase';
import { pickImageMarker } from './globe.util';
import { globeCluster } from './GlobeCluster';
import { useLocationStore } from '../../zustand/useLocationStore';
import { useMapLocationStore } from '../../zustand/useMapLocationStore';
import { usePostStore } from '../../zustand/usePostStore';
import { INITIAL_CENTER, ZOOM } from './Globe.content';
import { useMarkerInvisible } from '../../zustand/useMarkerInvisible';

interface MapProps {
  postsData: Tables<'posts'>[] | undefined;
}

const Globe = ({ postsData }: MapProps) => {
  mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN ? process.env.REACT_APP_ACCESS_TOKEN : '';
  const { mount } = useModal();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const mapLocation = useMapLocationStore(state => state.mapLocation);
  const isPostModalOpened = usePostStore(state => state.isPosting);
  const isRightModalOpened = useMarkerInvisible(state => state.isMarkerInvisible);

  useEffect(() => {
    if (!map.current && mapContainerRef.current) {
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/yoon1103/cllpvs4xd002s01rfflaa66x3',
        center: INITIAL_CENTER,
        zoom: ZOOM,
      });
    }

    map.current?.on('moveend', () => {
      const watchingLat = map.current?.getCenter().lat;
      const watchingLng = map.current?.getCenter().lng;

      const clickedLocation = {
        latitude: watchingLat || 0,
        longitude: watchingLng || 0,
      };

      useLocationStore.getState().setClickedLocation(clickedLocation);
    });

    useMapLocationStore.getState().setMapLocation(map.current);
  }, []);

  const flyToLocation = (lng: number, lat: number) => {
    const zoomSize = map.current?.getZoom();
    map.current?.flyTo({
      center: [lng, lat],
      speed: 8,
      zoom: zoomSize && zoomSize <= 2.4 ? 2.4 : zoomSize,
    });
  };

  const handleImageMarkers = (postData: Tables<'posts'>[], count: number) => {
    const imageMarkers = document.querySelectorAll('.image-marker');
    imageMarkers.forEach(marker => marker.remove());

    for (let i = 0; i < count; i++) {
      const data = postData[i];
      if (!data) return;
      pickImageMarker(map, mount, flyToLocation, data);
    }
  };

  useEffect(() => {
    if (postsData && postsData.length !== 0 && !isPostModalOpened && !isRightModalOpened) {
      const sortedData = [...postsData].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      const markerCount = Math.min(sortedData.length, 6);
      handleImageMarkers(sortedData, markerCount);
    } else if (isPostModalOpened || postsData?.length === 0 || isRightModalOpened) {
      handleImageMarkers([], 0);
    }

    globeCluster({ mapLocation, postsData, mount, isPostModalOpened, isRightModalOpened, flyToLocation });
  }, [mount, postsData, isPostModalOpened, isRightModalOpened, handleImageMarkers]);

  return <Styled.GlobeLayout ref={mapContainerRef} className="globeScroll" />;
};

export default Globe;
