import React from 'react';
import type { ReactNode } from 'react';

import mapboxgl from 'mapbox-gl';
import { renderToStaticMarkup } from 'react-dom/server';

import { ImageMarker, OrangeMarker } from './Globe.marker';
import pinFocus from '../../assets/pin/pinFocus.svg';
import Detail from '../detail/Detail';

import type { Tables } from '../../types/supabase';
export enum CustomMarker {
  Orange,
  Image,
}
type MapRef = React.MutableRefObject<mapboxgl.Map | null>;
type Mount = (name: string, element: ReactNode) => void;

const err = (n: never) => {
  return n;
};

export const getHTMLElement = ({ type, imgSrc }: { type: CustomMarker; imgSrc: string }) => {
  let el = '';
  switch (type) {
    case CustomMarker.Orange:
      el = renderToStaticMarkup(<OrangeMarker pin={imgSrc} />);
      break;
    case CustomMarker.Image:
      el = renderToStaticMarkup(<ImageMarker pin={imgSrc} />);
      break;
    default:
      err(type);
  }

  const uselessExpress = 'div';
  const imageMarker = document.createElement(uselessExpress);
  imageMarker.innerHTML = el;

  return imageMarker.firstChild as HTMLElement;
};

export const pickImageMarker = (map: MapRef, mount: Mount, flyToLocation: (lng: number, lat: number) => void, postData: Tables<'posts'>) => {
  const OrangePinMarker = document.querySelector('.orange-pin-marker');
  if (OrangePinMarker) OrangePinMarker.remove();

  const marker = getHTMLElement({ type: CustomMarker.Image, imgSrc: postData.images });
  const markerInstance = new mapboxgl.Marker(marker).setLngLat([postData.longitude, postData.latitude]);
  if (map.current) {
    markerInstance.addTo(map.current);
  } else {
    return;
  }

  const handleMarkerClick = () => {
    mount('detail', <Detail data={postData} />);
    flyToLocation(postData.longitude, postData.latitude);
  };

  marker.addEventListener('click', handleMarkerClick);
};

export const pickLocationWithMarker = (map: any, clickedPostLocation: { longitude: number; latitude: number }) => {
  const OrangePinMarker = document.querySelector('.orange-pin-marker');
  if (OrangePinMarker) OrangePinMarker.remove();

  if (map === null) return;
  const marker = getHTMLElement({ type: CustomMarker.Orange, imgSrc: pinFocus });
  const markerInstance = new mapboxgl.Marker(marker).setLngLat([clickedPostLocation.longitude, clickedPostLocation.latitude]);
  markerInstance.addTo(map);

  map.flyTo({
    center: [clickedPostLocation.longitude, clickedPostLocation.latitude],
    zoom: 7,
    speed: 8,
  });
};
