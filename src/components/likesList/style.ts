import { styled } from 'styled-components';

export const ScrollDiv = styled.div`
  width: 350px;
  height: 100%;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow-y: scroll;
  z-index: 101;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1060px) {
    display: flex;
    flex-direction: row;
    height: fit-content;
    width: 100%;
    gap: 0;
  }
`;

export const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
  height: fit-content;
  float: right;
  padding: 20px 0;

  @media (max-width: 1060px) {
    display: none;
  }
`;
