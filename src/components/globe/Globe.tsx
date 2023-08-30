import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import * as Styled from './style';
import { useModal } from '../common/overlay/modal/Modal.hooks';
import Detail from '../detail/Detail';
import { Tables } from '../../types/supabase';
import pinFocus from '../../assets/pin/pinFocus.svg';
import { CustomMarker, getHTMLElement } from './globe.util';
import { globeCluster } from './GlobeCluster';
import { useLocationStore } from '../../zustand/useLocationStore';
import { useMapLocationStore } from '../../zustand/useMapLocationStore';
import { usePostStore } from '../../zustand/usePostStore';
import { useClickedPostStore } from '../../zustand/useClickedPostStore';

interface MapProps {
  initialCenter: [number, number];
  zoom: number;
  postsData: Tables<'posts'>[] | undefined;
}

const Globe: React.FC<MapProps> = ({ initialCenter, zoom, postsData }) => {
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
        center: initialCenter,
        zoom: zoom,
      });
    }
  }, [initialCenter, zoom]);

  useEffect(() => {
    map.current?.on('moveend', () => {
      const watchingLat = map.current?.getCenter().lat;
      const watchingLng = map.current?.getCenter().lng;

      const clickedLocation = {
        latitude: watchingLat || 0,
        longitude: watchingLng || 0,
      };

      useLocationStore.getState().setClickedLocation(clickedLocation);
    });

    if (map) {
      useMapLocationStore.getState().setMapLocation(map.current);
    }
  }, [map]);

  const flyToLocation = (lng: number, lat: number) => {
    const zoomSize = map.current?.getZoom();
    map.current?.flyTo({
      center: [lng, lat],
      speed: 8,
      zoom: zoomSize && zoomSize <= 2.4 ? 2.4 : zoomSize,
    });
  };

  const pickImageMarker = (postData: Tables<'posts'>) => {
    const marker = getHTMLElement({ type: CustomMarker.Image, imgSrc: postData.images });
    const markerInstance = new mapboxgl.Marker(marker).setLngLat([postData.longitude, postData.latitude]);
    markerInstance.addTo(map.current!);

    marker.addEventListener('click', async () => {
      mount('detail', <Detail data={postData} />);
      flyToLocation(postData.longitude, postData.latitude);
    });
  };

  useEffect(() => {
    if (postsData && postsData.length !== 0 && !isPostModalOpened) {
      const sortedData = [...postsData].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      if (sortedData.length > 6) {
        const imageMarkers = document.querySelectorAll('.image-marker');
        imageMarkers.forEach(marker => marker.remove());

        for (let i = 0; i < 6; i++) {
          const postData = sortedData[i];
          if (!postData) return;
          pickImageMarker(postData);
        }
      } else {
        const imageMarkers = document.querySelectorAll('.image-marker');
        imageMarkers.forEach(marker => marker.remove());

        for (let i = 0; i < sortedData.length; i++) {
          const postData = sortedData[i];
          if (!postData) return;
          pickImageMarker(postData);
        }
      }
    } else if (isPostModalOpened) {
      const imageMarkers = document.querySelectorAll('.image-marker');
      imageMarkers.forEach(marker => marker.remove());
    }
  }, [mount, postsData, isPostModalOpened]);

  const pickLocationWithMarker = (clickedPostLocation: { latitude: number; longitude: number }) => {
    const OrangePinMarker = document.querySelector('.orange-pin-marker');
    if (OrangePinMarker) OrangePinMarker.remove();

    const marker = getHTMLElement({ type: CustomMarker.Orange, imgSrc: pinFocus });
    const markerInstance = new mapboxgl.Marker(marker).setLngLat([clickedPostLocation.longitude, clickedPostLocation.latitude]);
    markerInstance.addTo(map.current!);
    map.current?.flyTo({
      center: [clickedPostLocation.longitude, clickedPostLocation.latitude],
      speed: 8,
    });
  };

  useEffect(() => {
    if (!clickedPostLocation) {
      return;
    }
    pickLocationWithMarker(clickedPostLocation);
  }, [clickedPostLocation]);

  useEffect(() => {
    if (!isPostModalOpened) {
      const postModalOpen = false;
      globeCluster({ mapLocation, postsData, mount, postModalOpen, flyToLocation });
    } else {
      const postModalOpen = true;
      globeCluster({ mapLocation, postsData, mount, postModalOpen, flyToLocation });
    }
  }, [postsData, isPostModalOpened]);

  return <Styled.GlobeLayout ref={mapContainerRef} className="globeScroll" />;
};

export default Globe;
