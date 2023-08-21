import { styled } from 'styled-components';

export const ModalOuter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000000;
  z-index: 99;
`;

export const ModalInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
  padding: 20px;
  background-color: #343434;
  color: #ffffff;
`;

export const LeftModalInner = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 300px;
  height: 100%;
  padding: 20px;
  background-color: #343434;
  color: #ffffff;
`;

export const RightModalInner = styled.div`
  position: absolute;
  box-sizing: border-box;
  right: 0;
  width: 300px;
  height: 100%;
  padding: 20px;
  background-color: #343434;
  color: #ffffff;
`;
