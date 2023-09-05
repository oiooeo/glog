import { styled } from 'styled-components';

export const ScrollDiv = styled.div`
  overflow-y: scroll;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
  height: fit-content;
  float: right;
  padding: 20px 0;

  /* @media (max-width: 1060px) {
    display: none;
  } */
`;
