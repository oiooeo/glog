import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import * as Styled from './style';
import { useModal } from '../common/overlay/modal/Modal.hooks';
import { Tables } from '../../types/supabase';
import { pickImageMarker, pickLocationWithMarker } from './globe.util';
import { globeCluster } from './GlobeCluster';
import { useLocationStore } from '../../zustand/useLocationStore';
import { useMapLocationStore } from '../../zustand/useMapLocationStore';
import { usePostStore } from '../../zustand/usePostStore';
import { useClickedPostStore } from '../../zustand/useClickedPostStore';
import { INITIAL_CENTER, ZOOM } from './Globe.content';

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
  const clickedPostLocation = useClickedPostStore(state => state.clickedPostLocation);
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
    if (postsData && postsData.length !== 0 && !isPostModalOpened) {
      const sortedData = [...postsData].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      const markerCount = Math.min(sortedData.length, 6);
      handleImageMarkers(sortedData, markerCount);
    } else if (isPostModalOpened || postsData?.length === 0) {
      handleImageMarkers([], 0);
    }
  }, [mount, postsData, isPostModalOpened]);

  useEffect(() => {
    if (clickedPostLocation) {
      pickLocationWithMarker(map, clickedPostLocation);
    }
  }, [clickedPostLocation]);

  useEffect(() => {
    if (isPostModalOpened) {
      globeCluster({ mapLocation, postsData, mount, isPostModalOpened, flyToLocation });
    } else {
      globeCluster({ mapLocation, postsData, mount, isPostModalOpened, flyToLocation });
    }
  }, [postsData, isPostModalOpened]);

  return <Styled.GlobeLayout ref={mapContainerRef} className="globeScroll" />;
};

export default Globe;
