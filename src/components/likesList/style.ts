import { styled } from 'styled-components';

export const scrollDiv = styled.div`
  overflow-y: scroll;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const loadingDiv = styled.div`
  color: white;
  display: flex;
  justify-content: center;
`;
