import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import * as Styled from './style';
import { useLocationStore } from '../../zustand/store';

interface MapProps {
  initialCenter: [number, number];
  zoom: number;
}

const Globe: React.FC<MapProps> = ({ initialCenter, zoom }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN ? process.env.REACT_APP_ACCESS_TOKEN : '';
  // DB
  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        image: 'https://a.cdn-hotels.com/gdcs/production123/d477/f88c6cdb-3e47-45f5-bfd7-d3775d1f3bcc.jpg?impolicy=fcrop&w=800&h=533&q=medium',
        coordinates: {
          latitude: 21.0090571,
          longitude: 105.8607507,
        },
      },
      {
        image: 'https://a.cdn-hotels.com/gdcs/production123/d477/f88c6cdb-3e47-45f5-bfd7-d3775d1f3bcc.jpg?impolicy=fcrop&w=800&h=533&q=medium',
        coordinates: {
          latitude: 39.904211,
          longitude: 116.407395,
        },
      },
      {
        image: 'https://a.cdn-hotels.com/gdcs/production123/d477/f88c6cdb-3e47-45f5-bfd7-d3775d1f3bcc.jpg?impolicy=fcrop&w=800&h=533&q=medium',
        coordinates: {
          latitude: 37.6173,
          longitude: 55.755826,
        },
      },
      {
        image: 'https://a.cdn-hotels.com/gdcs/production123/d477/f88c6cdb-3e47-45f5-bfd7-d3775d1f3bcc.jpg?impolicy=fcrop&w=800&h=533&q=medium',
        coordinates: {
          latitude: 37.566535,
          longitude: 126.9779692,
        },
      },
      {
        image: 'https://ak-d.tripcdn.com/images/01013120008k3ku5pCF85_C_500_280.jpg?proc=source%2ftrip',
        coordinates: {
          latitude: 33.5903547,
          longitude: 130.4017155,
        },
      },
      {
        image: 'https://ak-d.tripcdn.com/images/01013120008k3ku5pCF85_C_500_280.jpg?proc=source%2ftrip',
        coordinates: {
          latitude: 37.6173,
          longitude: 55.755826,
        },
      },
      {
        image: 'https://ak-d.tripcdn.com/images/01013120008k3ku5pCF85_C_500_280.jpg?proc=source%2ftrip',
        coordinates: {
          latitude: 21.521757,
          longitude: -77.781167,
        },
      },
    ],
  };

  useEffect(() => {
    const placeLocation = async (location: { lng: number; lat: number }) => {
      const zoomSized = map.current?.getZoom();
      try {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location.lng},${location.lat}.json?access_token=${mapboxgl.accessToken}&language=ko`);
        const data = await response.json();
        const dataFeatures = data.features;
        const placeName = dataFeatures[dataFeatures.length - 2].place_name_ko;
        const placeComponents = placeName.split(', ');
        const city = placeComponents[placeComponents.length - 2];
        const country = placeComponents[placeComponents.length - 1];

        const popupContent = `${country}, ${city}`; // 팝업 내용을 장소 정보로 설정
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(popupContent);

        const clickedLocation = {
          latitude: location.lat,
          longitude: location.lng,
          regionId: city,
          countryId: country,
        };

        useLocationStore.getState().setClickedLocation(clickedLocation);

        if (zoomSized && zoomSized >= 2) {
          const textMarker = document.createElement('div');
          textMarker.className = 'formMarker';
          textMarker.style.width = `40px`;
          textMarker.style.height = `40px`;
          textMarker.style.backgroundSize = '100%';
          const marker = new mapboxgl.Marker(textMarker)
            .setLngLat([location.lng, location.lat])
            .setPopup(popup) // 마커에 팝업 연결
            .addTo(map.current!);
          if (!popup.isOpen()) {
            marker.togglePopup();
          }
        } else {
          // 이미 생성된 마커가 있는 경우 팝업만 업데이트
          const oldMarker = document.querySelector('formMarker');
          oldMarker?.remove();
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

      for (let i = 0; i < geojson.features.length; i++) {
        const marker = geojson.features[i];
        // 작성한 marker 생성
        const el = document.createElement('div');
        el.className = 'marker';
        if (i < 6) {
          el.style.backgroundImage = `url(${marker.image}/40/40/)`;
          el.style.width = `40px`;
          el.style.height = `40px`;
          el.style.backgroundSize = '100%';
        } else {
          el.style.backgroundImage = `url(https://img.icons8.com/?size=512&id=21613&format=png)`;
          el.style.width = `20px`;
          el.style.height = `20px`;
          el.style.backgroundSize = '100%';
        }
        const markerInfo = {
          lng: marker.coordinates.longitude,
          lat: marker.coordinates.latitude,
        };

        el.addEventListener('click', async () => {
          map.current?.flyTo({
            center: [markerInfo.lng, markerInfo.lat],
            zoom: 10, // 원하는 줌 레벨 설정
            speed: 0.8, // 이동 속도 설정
          });
          map.current?.once('moveend', () => {
            console.log('moveend');
            placeLocation(markerInfo);
          });
        });
        new mapboxgl.Marker(el).setLngLat([markerInfo.lng, markerInfo.lat]).addTo(map.current!);
      }
    }

    //searchBox
    // const searchScript = document.createElement('script');
    // searchScript.src = 'https://api.mapbox.com/search-js/v1.0.0-beta.17/web.js';
    // searchScript.defer = true;
    // searchScript.onload = function () {
    //   if ((window as any).MapboxSearchBox) {
    //     const geocoder = new (window as any).MapboxSearchBox();
    //     geocoder.accessToken = mapboxgl.accessToken;
    //     geocoder.flyTo = {
    //       bearing: 0,
    //       speed: 8,
    //       curve: 1,
    //       easing: function (t: any) {
    //         return t;
    //       },
    //     };
    //     geocoder.marker = true;
    //     geocoder.mapboxgl = mapboxgl;
    //     map.current?.addControl(geocoder);
    //   }
    // };
    // document.head.appendChild(searchScript);
  }, [initialCenter, zoom]);
  return <Styled.GlobeLayout ref={mapContainerRef} />;
};

export default Globe;
