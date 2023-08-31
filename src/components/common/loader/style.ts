import { keyframes, styled } from 'styled-components';

const rotateLeft = keyframes`
  from {
    transform: rotateY(90deg);
  }
  to {
    transform: rotateY(180deg);
  }
`;

const rotateRight = keyframes`
  from {
    transform: rotateY(180deg);
  }
  to {
    transform: rotateY(90deg);
  }
`;

export const EarthContainer = styled.div`
  position: relative;
  width: 49px;
  height: 60px;
  perspective: 1000px;
`;

export const Earth = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 110%;
  height: 100%;
`;

export const EarthLeft = styled.div`
  position: absolute;
  top: 15%;
  left: 15%;
  width: 60%;
  transform-origin: center;
  animation: ${rotateLeft} 0.5s linear infinite;
`;

export const EarthRight = styled.div`
  position: absolute;
  top: 15%;
  right: 25%;
  width: 60%;
  transform-origin: center;
  animation: ${rotateRight} 0.5s linear infinite;
`;
