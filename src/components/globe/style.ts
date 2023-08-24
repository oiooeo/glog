import { styled } from 'styled-components';

export const GlobeLayout = styled.div`
  width: 100vw;
  height: 100vh;

  & > .mapboxgl-control-container .mapboxgl-ctrl-bottom-left {
    visibility: hidden;
  }

  & > .mapboxgl-control-container .mapboxgl-ctrl-bottom-right {
    visibility: hidden;
  }
`;
