import { styled } from 'styled-components';

export const GlobeLayout = styled.div`
  z-index: 1;
  width: 100vw;
  /* height: 100vh; */
  height: calc(var(--vh, 1vh) * 100);

  & > .mapboxgl-canvas-container .image-marker-div {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    z-index: 10;
  }

  & > .mapboxgl-canvas-container .image-marker {
    z-index: 12;

    & > img {
      width: 70px;
      height: 70px;
      border-radius: 10px;
      transition: transform 0.3s ease-in;
      box-shadow: 1px 1px 15px rgba(251, 232, 189, 0.4);
      object-fit: cover;

      &:hover {
        transform: translateY(-20px);
      }
    }
  }

  & > .mapboxgl-control-container .mapboxgl-ctrl-bottom-left {
    visibility: hidden;
  }

  & > .mapboxgl-control-container .mapboxgl-ctrl-bottom-right {
    visibility: hidden;
  }
`;

export const PinBox = styled.div`
  width: 30px;
  height: 30px;
`;

export const PinMarker = styled.img`
  width: 30px;
  height: 30px;
`;
