import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import * as Styled from './style';
import { useLocationStore, useMapLocationStore } from '../../zustand/store';
import Preview from './preview/Preview';
import { useModal } from '../common/overlay/modal/Modal.hooks';
import Detail from '../detail/Detail';

interface MapProps {
  initialCenter: [number, number];
  zoom: number;
  postData: any;
}

const Globe: React.FC<MapProps> = ({ initialCenter, zoom, postData }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { mount, unmount } = useModal();

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const mapLocation = useMapLocationStore(state => state.mapLocation);

  mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN ? process.env.REACT_APP_ACCESS_TOKEN : '';
  let marker: any;
  useEffect(() => {
    const placeLocation = async (location: { lng: number; lat: number }) => {
      const zoomSized = map.current?.getZoom();
      try {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location.lng},${location.lat}.json?access_token=${mapboxgl.accessToken}&language=ko`);
        const data = await response.json();
        const dataFeatures = data.features;
        const placeName = dataFeatures[dataFeatures.length - 2].place_name_ko ? dataFeatures[dataFeatures.length - 2].place_name_ko : dataFeatures[dataFeatures.length - 2].place_name;
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

        const popupContent = `${country}, ${city}`; // 팝업 내용을 장소 정보로 설정

        useLocationStore.getState().setClickedLocation(clickedLocation);

        if (zoomSized && zoomSized >= 2) {
          const textMarker = document.createElement('div');
          textMarker.className = 'formMarker';
          textMarker.style.width = `40px`;
          textMarker.style.height = `40px`;
          textMarker.style.backgroundSize = '100%';

          if (marker) {
            const popup = marker.getPopup();
            if (popup) {
              popup.remove();
            }
            marker.setLngLat([location.lng, location.lat]);
          } else {
            marker = new mapboxgl.Marker(textMarker).setLngLat([location.lng, location.lat]).addTo(map.current!);
          }
          const popup = new mapboxgl.Popup({ offset: 25 }).setText(popupContent);
          marker.setPopup(popup).togglePopup();
        }
      } catch (error) {
        console.error('error', error);
      }
    };

    if (!map.current && mapContainerRef.current) {
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/seungbeom1999/cllfu8drf00gy01pu6gf4h98b/draft',
        center: initialCenter,
        zoom: zoom,
      });
      // mapPost 기능때 사용
      map.current.on('click', e => {
        const coordinates = e.lngLat;

        map.current?.on('zoom', async () => {
          const zoomSize = map.current?.getZoom();
          if (zoomSize && zoomSize <= 9) {
            const oldMarker = document.querySelector('.new-marker');
            if (oldMarker) {
              oldMarker.remove();
            }
          }
          // 확대가 다 됐을 경우 생성
          if (zoomSize && zoomSize == 2) {
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
          }
        });
        // post 지역으로 확대
        map.current?.flyTo({
          center: [coordinates.lng, coordinates.lat],
          zoom: 2,
          // speed: 0.8,
        });
      });
    }

    if (postData) {
      for (let i = 0; i < postData.length; i++) {
        const marker = postData[i];
        console.log(marker);
        const markerElement = document.createElement('div');
        // const previewComponent = <Preview image={marker.images} />;
        // ReactDOM.createRoot(previewComponent, markerElement);

        if (marker.latitude !== null && marker.longitude !== null) {
          markerElement.style.backgroundImage = `url(${marker.images})`;
          markerElement.style.width = `70px`;
          markerElement.style.height = `70px`;
          markerElement.style.backgroundSize = '100%';
          markerElement.style.borderRadius = `15px`;

          markerElement.addEventListener('click', async () => {
            if (markerInfo.lng !== null && markerInfo.lat !== null) {
              console.log('클릭');
              mount('detail', <Detail data={marker} />);
              setIsModalOpened(true);
            }
          });

          const markerInfo = {
            lng: marker.longitude,
            lat: marker.latitude,
          };

          markerElement.addEventListener('click', async () => {
            if (markerInfo.lng !== null && markerInfo.lat !== null) {
              map.current?.flyTo({
                center: [markerInfo.lng, markerInfo.lat],
                zoom: 2,
                speed: 0.8,
              });

              map.current?.once('moveend', () => {
                placeLocation(markerInfo);
              });
            }
          });
          new mapboxgl.Marker(markerElement).setLngLat([markerInfo.lng, markerInfo.lat]).addTo(map.current!);

          // const markerInstance = new mapboxgl.Marker(markerElement);
          // markerInstance.setLngLat([markerInfo.lng, markerInfo.lat]);
          // markerInstance.addTo(map.current!);
        }
      }
    }

    if (map) {
      useMapLocationStore.getState().setMapLocation(map.current);
    }
  }, [initialCenter, zoom, postData]);

  // 지역 검색에 필요한 코드
  useEffect(() => {
    if (mapLocation) {
    }
  }, [mapLocation]);

  return <Styled.GlobeLayout ref={mapContainerRef} />;
};

export default Globe;
