import { styled } from 'styled-components';

export const ModalOuter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000082;
  z-index: 99;
`;

export const LeftModalOuter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: fit-content;
  height: 100%;
  background-color: #00000000;
  z-index: 99;
`;

export const RightModalOuter = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: fit-content;
  height: 100%;
  background-color: #00000000;
  z-index: 99;
`;

export const ModalInner = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
  padding: 20px;
  transform: translate(-50%, -70%);
  transition: all 2s ease-in;
`;

export const LeftModalInner = styled.div`
  position: absolute;
  width: fit-content;
  height: calc(100vh - 65px);
  margin-top: 65px;
  padding: 20px;
  background: transparent;
`;

export const RightModalInner = styled.div`
  position: absolute;
  overflow-y: auto;
  right: 0;
  width: fit-content;
  height: calc(100vh - 65px);
  margin-top: 65px;
  padding-right: 20px;
  background: transparent;

  &::-webkit-scrollbar {
    display: none;
  }
`;
