import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DefaultMarker, ImageMarker, OrangeMarker } from './Globe.marker';

export enum CustomMarker {
  Orange,
  Default,
  Image,
}

const err = (n: never) => {
  return n;
};

export const getHTMLElement = ({ type, imgSrc }: { type: CustomMarker; imgSrc: string }) => {
  let el = '';
  switch (type) {
    case CustomMarker.Orange:
      el = renderToStaticMarkup(<OrangeMarker pin={imgSrc} />);
      break;
    case CustomMarker.Default:
      el = renderToStaticMarkup(<DefaultMarker pin={imgSrc} />);
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
