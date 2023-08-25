import { styled } from 'styled-components';

export const GlobeLayout = styled.div`
  width: 100vw;
  height: 100vh;

  & > .mapboxgl-canvas-container .image-marker {
    border-radius: 10px;
    background-size: cover;
    z-index: 10;

    &:hover {
      outline: 3px greenyellow solid;
    }
  }

  & > .mapboxgl-canvas-container .pin-marker {
    width: 30px;
    height: 100%;
    background-size: cover;
  }

  & > .mapboxgl-control-container .mapboxgl-ctrl-bottom-left {
    visibility: hidden;
  }

  & > .mapboxgl-control-container .mapboxgl-ctrl-bottom-right {
    visibility: hidden;
  }
`;
