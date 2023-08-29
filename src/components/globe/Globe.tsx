import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import * as Styled from './style';
import { useClickedPostStore, useLocationStore, useMapLocationStore, usePostStore } from '../../zustand/store';
import { useModal } from '../common/overlay/modal/Modal.hooks';
import Detail from '../detail/Detail';
import { Tables } from '../../types/supabase';
import pinSmall from '../../assets/pin/pinSmall.svg';
import Supercluster from 'supercluster';
import pinFocus from '../../assets/pin/pinFocus.svg';
import { CustomMarker, getHTMLElement } from './globe.util';
import { globeCluster } from './globeCluster';

interface MapProps {
  initialCenter: [number, number];
  zoom: number;
  postsData: Tables<'posts'>[] | undefined;
}

const Globe: React.FC<MapProps> = ({ initialCenter, zoom, postsData }) => {
  mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN ? process.env.REACT_APP_ACCESS_TOKEN : '';
  const { mount, unmount } = useModal();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const mapLocation = useMapLocationStore(state => state.mapLocation);
  let marker: any;
  let zoomSize: number | undefined = map.current?.getZoom();
  const isPostModalOpened = usePostStore(state => state.isPosting);
  const clickedPostLocation = useClickedPostStore(state => state.clickedPostLocation);

  useEffect(() => {
    const placeLocation = async (location: { lng: number; lat: number }) => {
      try {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location.lng},${location.lat}.json?access_token=${mapboxgl.accessToken}&language=ko`);
        const data = await response.json();
        const dataFeatures = data.features;
        const placeName = dataFeatures[dataFeatures.length - 2].place_name_ko || dataFeatures[dataFeatures.length - 2].place_name;
        const placeComponents = placeName.split(', ');
        const city = placeComponents[placeComponents.length - 2];
        const country = placeComponents[placeComponents.length - 1];
        const address = dataFeatures[0].place_name_ko !== undefined ? dataFeatures[0].place_name_ko : dataFeatures[0].place_name;

        const clickedLocation = {
          latitude: location.lat,
          longitude: location.lng,
          regionId: city,
          countryId: country,
          address: address,
        };

        useLocationStore.getState().setClickedLocation(clickedLocation);
      } catch (error) {}
    };
    if (!map.current && mapContainerRef.current) {
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/yoon1103/cllpvs4xd002s01rfflaa66x3',
        center: initialCenter,
        zoom: zoom,
      });

      // mapPost 기능때 사용
      map.current.on('click', e => {
        const coordinates = e.lngLat;
        zoomSize = map.current?.getZoom();

        map.current?.on('zoom', async () => {
          if (zoomSize && zoomSize <= 9) {
            const oldMarker = document.querySelector('.new-marker');
            if (oldMarker) {
              oldMarker.remove();
            }
          }

          const oldMarker = document.querySelector('.new-marker');
          if (oldMarker) {
            oldMarker.remove();
          }
          const newMarker = document.createElement('div');
          newMarker.className = 'new-marker';
          newMarker.style.backgroundImage = `url(https://img.icons8.com/?size=512&id=21613&format=png)`;
          newMarker.style.width = '30px';
          newMarker.style.height = '30px';
          newMarker.style.backgroundSize = '100%';
          new mapboxgl.Marker(newMarker).setLngLat([coordinates.lng, coordinates.lat]).addTo(map.current!);

          placeLocation(coordinates);
        });

        if (zoomSize && zoomSize <= 2.4) {
          map.current?.flyTo({
            center: [coordinates.lng, coordinates.lat],
            zoom: 2.4,
            speed: 8,
          });
        } else {
          map.current?.flyTo({
            center: [coordinates.lng, coordinates.lat],
            speed: 8,
          });
        }
      });
    }

    if (map) {
      useMapLocationStore.getState().setMapLocation(map.current);
    }
  }, [initialCenter, zoom]);

  const pickImageMarker = (postData: Tables<'posts'>) => {
    const marker = getHTMLElement({ type: CustomMarker.Image, imgSrc: postData.images });
    const markerInstance = new mapboxgl.Marker(marker).setLngLat([postData.longitude, postData.latitude]);
    markerInstance.addTo(map.current!);

    marker.addEventListener('click', async () => {
      mount('detail', <Detail data={postData} />);
    });
  };

  useEffect(() => {
    if (postsData && postsData.length !== 0 && !isPostModalOpened) {
      const sortedData = [...postsData].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      if (sortedData.length > 7) {
        const imageMarkers = document.querySelectorAll('.image-marker');
        imageMarkers.forEach(marker => marker.remove());

        for (let i = 0; i < 6; i++) {
          const postData = sortedData[i];
          if (!postData) return;
          pickImageMarker(postData);
        }

        const pinMarkers = document.querySelectorAll('.pin-marker');
        pinMarkers.forEach(marker => marker.remove());

        // for (let i = 6; i < postsData.length; i++) {
        //   const postData = sortedData[i];
        //   if (!postData) return;

        //   const marker = getHTMLElement({ type: CustomMarker.Default, imgSrc: pinSmall });
        //   const markerInstance = new mapboxgl.Marker(marker).setLngLat([postData.longitude, postData.latitude]);
        //   markerInstance.addTo(map.current!);

        //   marker.addEventListener('click', async () => {
        //     mount('detail', <Detail data={postData} />);
        //   });
        // }
        // for (let i = 6; i < postsData.length; i++) {
        //   const postData = sortedData[i];
        //   if (postData.latitude !== null && postData.longitude !== null) {
        //     const imageMarker = document.createElement('div');
        //     imageMarker.className = 'pin-marker';
        //     imageMarker.style.backgroundImage = `url(${pinSmall})`;
        //     const markerInstance = new mapboxgl.Marker(imageMarker).setLngLat([postData.longitude, postData.latitude]);
        //     markerInstance.addTo(map.current!);
        //     imageMarker.addEventListener('click', async () => {
        //       mount('detail', <Detail data={postData} />);
        //     });
        //   }
        // }
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
      const pinMarkers = document.querySelectorAll('.pin-marker');
      pinMarkers.forEach(marker => marker.remove());
    }
  }, [mount, postsData, isPostModalOpened, pickImageMarker]);

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
      globeCluster({ mapLocation, postsData, mount, postModalOpen });
    } else {
      const postModalOpen = true;
      globeCluster({ mapLocation, postsData, mount, postModalOpen });
    }
  }, [postsData, isPostModalOpened]);

  return <Styled.GlobeLayout ref={mapContainerRef} className="globeScroll" />;
};

export default Globe;
