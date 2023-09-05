import { styled } from 'styled-components';

export const LoginGuideButton = styled.button`
  position: fixed;
  bottom: 50px;
  width: 340px;
  height: 50px;
  margin-left: 70px;
  background-color: rgba(114, 128, 142, 0.6);
  border: none;
  border-radius: 20px;
  color: #f4f4f5;
  font-size: 15px;
  font-weight: 600;
  z-index: 102;
  cursor: pointer;
`;

export const ScrollDiv = styled.div`
  overflow-y: scroll;
  height: 100%;
  z-index: 101;

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
  margin: 20px 0;

  /* @media (max-width: 1060px) {
    display: none;
  } */
`;
