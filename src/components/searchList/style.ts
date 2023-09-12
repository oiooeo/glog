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

  @media (max-width: 1060px) {
    display: none;
  }
`;

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
  margin: 20px 0;

  @media (max-width: 1060px) {
    display: none;
  }
`;
