import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import * as Styled from './style';
import { useLocationStore, useMapLocationStore } from '../../zustand/store';
import { useModal } from '../common/overlay/modal/Modal.hooks';
import Detail from '../detail/Detail';
import { Tables } from '../../types/supabase';
import pinSmall from '../../assets/pin/pinSmall.svg';

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

        const textMarker = document.createElement('div');
        textMarker.className = 'formMarker';
        textMarker.style.width = `40px`;
        textMarker.style.height = `40px`;
        textMarker.style.backgroundSize = '100%';

        if (marker) {
          marker.setLngLat([location.lng, location.lat]);
        } else {
          marker = new mapboxgl.Marker(textMarker).setLngLat([location.lng, location.lat]).addTo(map.current!);
        }
      } catch (error) {
        console.error('error', error);
      }
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

    if (postsData && postsData.length !== 0) {
      console.log(postsData.length);
      zoomSize = map.current?.getZoom();
      const sortedData = [...postsData].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      for (let i = 0; i < 6; i++) {
        const postData = sortedData[i];
        if (postData.latitude !== null && postData.longitude !== null) {
          const imageMarker = document.createElement('div');
          imageMarker.className = 'image-marker';
          imageMarker.style.backgroundImage = `url(${postData.images})`;
          imageMarker.style.width = `70px`;
          imageMarker.style.height = `70px`;

          const markerInstance = new mapboxgl.Marker(imageMarker).setLngLat([postData.longitude, postData.latitude]);
          markerInstance.addTo(map.current!);

          imageMarker.addEventListener('click', async () => {
            mount('detail', <Detail data={postData} />);
          });
        }
      }

      for (let i = 6; i < postsData.length; i++) {
        const postData = sortedData[i];
        if (postData.latitude !== null && postData.longitude !== null) {
          const imageMarker = document.createElement('div');
          imageMarker.className = 'pin-marker';
          imageMarker.style.backgroundImage = `url(${pinSmall})`;
          imageMarker.style.width = `30px`;
          imageMarker.style.height = `30px`;

          const markerInstance = new mapboxgl.Marker(imageMarker).setLngLat([postData.longitude, postData.latitude]);
          markerInstance.addTo(map.current!);

          imageMarker.addEventListener('click', async () => {
            mount('detail', <Detail data={postData} />);
          });
        }
      }
    }

    if (map) {
      useMapLocationStore.getState().setMapLocation(map.current);
    }
  }, [initialCenter, zoom, postsData]);

  // 지역 검색에 필요한 코드
  useEffect(() => {
    if (mapLocation) {
    }
  }, [mapLocation]);

  return <Styled.GlobeLayout ref={mapContainerRef} />;
};

export default Globe;
