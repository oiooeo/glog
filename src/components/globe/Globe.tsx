import React, { useEffect, useRef } from 'react';

import mapboxgl from 'mapbox-gl';

import { INITIAL_CENTER, ZOOM } from './Globe.content';
import { pickImageMarker } from './globe.util';
import * as St from './style';
import { useLikeStore } from '../../zustand/useLikeStore';
import { useLocationStore } from '../../zustand/useLocationStore';
import { useMapLocationStore } from '../../zustand/useMapLocationStore';
import { useMarkerInvisible } from '../../zustand/useMarkerInvisible';
import { usePostStore } from '../../zustand/usePostStore';
import { useSearchStore } from '../../zustand/useSearchStore';
import { useModal } from '../common/overlay/modal/Modal.hooks';
import { globeCluster } from '../globeCluster/GlobeCluster';

import type { Tables } from '../../types/supabase';

interface MapProps {
  postsData: Array<Tables<'posts'>> | undefined;
}

const Globe = ({ postsData }: MapProps) => {
  mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN ? process.env.REACT_APP_ACCESS_TOKEN : '';
  const { mount } = useModal();
  const { key, isSearchListOpened } = useSearchStore();
  const { likedPostsId } = useLikeStore();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const mapLocation = useMapLocationStore(state => state.mapLocation);
  const isPostModalOpened = usePostStore(state => state.isPosting);
  const isRightModalOpened = useMarkerInvisible(state => state.isMarkerInvisible);
  let clusterData = postsData?.slice(5);
  let vh = 0;

  useEffect(() => {
    const setVh = () => {
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', setVh);
    setVh();
  }, []);

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

  const handleImageMarkers = (postData: Array<Tables<'posts'>>, count: number) => {
    const imageMarkers = document.querySelectorAll('.image-marker');
    imageMarkers.forEach(marker => {
      marker.remove();
    });

    for (let i = 0; i < count; i++) {
      const data = postData[i];
      if (!data) return;
      pickImageMarker(map, mount, flyToLocation, data);
    }
  };

  useEffect(() => {
    const markerCount = Math.min(postsData?.length || 0, 6);
    const clusterSearchData = postsData?.slice(5).filter(item => item.countryId?.includes(key) || item.regionId?.includes(key) || item.address?.includes(key));
    const clusterLikedPostsData = postsData?.slice(5)?.filter(item => likedPostsId.includes(item.id));
    if (postsData && postsData.length > 0 && !isPostModalOpened && !isRightModalOpened) {
      const sortedData = [...postsData].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      handleImageMarkers(sortedData, markerCount);
    } else if (postsData && isRightModalOpened) {
      const imageSearchData = postsData.slice(0, markerCount).filter(item => item.countryId?.includes(key) || item.regionId?.includes(key) || item.address?.includes(key));
      const imageLikedPostsData = postsData.slice(0, markerCount).filter(item => likedPostsId.includes(item.id));
      handleImageMarkers(isSearchListOpened ? imageSearchData : imageLikedPostsData, markerCount);
      clusterData = isSearchListOpened ? clusterSearchData : clusterLikedPostsData;
    } else {
      handleImageMarkers([], 0);
    }
    globeCluster({ clusterData, mapLocation, postsData, mount, flyToLocation, isPostModalOpened });
  }, [clusterData, mount, postsData, isPostModalOpened, isRightModalOpened, isSearchListOpened]);
  return <St.GlobeLayout ref={mapContainerRef} className="globeScroll" />;
};

export default Globe;
