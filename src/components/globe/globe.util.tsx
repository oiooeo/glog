import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { OrangeMarker } from './Globe.marker';

export enum CustomMarker {
  Orange,
  Default,
}

const err = (n: never) => {
  return n;
};

export const getHTMLElement = ({ type, imgSrc }: { type: CustomMarker; imgSrc: string }) => {
  let el = '';
  switch (type) {
    case CustomMarker.Orange:
      el = renderToStaticMarkup(<OrangeMarker pinFocus={imgSrc} />);
      break;
    case CustomMarker.Default:
      break;
    default:
      err(type);
  }

  const uselessExpress = 'div';
  const imageMarker = document.createElement(uselessExpress);
  imageMarker.innerHTML = el;

  return imageMarker.firstChild as HTMLElement;
};
