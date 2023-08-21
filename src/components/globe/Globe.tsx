import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

interface MapProps {
  initialCenter: [number, number];
  zoom: number;
}

const Globe: React.FC<MapProps> = ({ initialCenter, zoom }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN ? process.env.REACT_APP_ACCESS_TOKEN : '';

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
      console.log(zoomSized);
      try {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location.lng},${location.lat}.json?access_token=${mapboxgl.accessToken}&language=ko`);
        const data = await response.json();
        const placeName = data.features[0].place_name;
        const placeComponents = placeName.split(', ');
        const city = placeComponents[placeComponents.length - 3];
        const country = placeComponents[placeComponents.length - 1];
        const popupContent = `${country}, ${city}`; // 팝업 내용을 장소 정보로 설정
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(popupContent);

        if (zoomSized && zoomSized >= 9) {
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
          //zoom이 9 이하일때는 삭제
          console.log(zoomSize);
          if (zoomSize && zoomSize <= 9) {
            const oldMarker = document.querySelector('.new-marker');
            if (oldMarker) {
              oldMarker.remove();
            }
          }
          // 확대가 다 됐을 경우 생성
          if (zoomSize && zoomSize == 10) {
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
          zoom: 10,
          speed: 0.8,
        });
      });
    }
  }, [initialCenter, zoom]);
  return <div>Globe</div>;
};

export default Globe;
