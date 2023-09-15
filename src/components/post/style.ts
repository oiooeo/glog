import { styled } from 'styled-components';

import Button from '../common/button/Button';

export const PostLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 1060px) {
    height: fit-content;
  }
`;

export const ContentsInput = styled.textarea`
  padding: 20px;
  background-color: #f4f4f5;
  border-radius: 20px;
  border: none;
  color: #4d5765;
  font-size: 17px;
  resize: none;

  &::placeholder {
    color: #b3bac1;
    font-size: 17px;
  }

  &:focus {
    border: none;
    outline: none;
    border-bottom: 1px solid #616161;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1060px) {
    position: fixed;
    bottom: 70px;
    left: 100px;
    width: calc(100vw - 120px);
    height: 70px;
    padding: 12px;
    border-radius: 10px;
    font-size: 15px;

    &::placeholder {
      font-size: 15px;
    }
  }
`;

export const PostSubmitButton = styled(Button)`
  @media (max-width: 1060px) {
    position: fixed;
    bottom: 20px;
    left: 70px;
    width: calc(100vw - 90px);
    height: 40px;
    font-size: 15px;
  }
`;

export const MobileEditButton = styled(Button)`
  @media (max-width: 1060px) {
    position: fixed;
    bottom: 20px;
    right: 20px;
    height: 40px;
    width: calc(50vw - 50px);
    font-size: 15px;
  }
`;

export const MobileDeleteButton = styled(Button)`
  @media (max-width: 1060px) {
    position: fixed;
    bottom: 20px;
    left: 70px;
    height: 40px;
    width: calc(50vw - 50px);
    font-size: 15px;
  }
`;

export const SwitchBox = styled.div`
  @media (max-width: 1060px) {
    display: none;
  }
`;

export const MobileSwitchBox = styled.div`
  position: fixed;
  bottom: 150px;
  left: 20px;
  width: 70px;

  & > p {
    margin-bottom: 2px;
    color: rgba(244, 244, 245, 0.8);
    text-align: center;
    font-size: 12px;
    font-weight: 400;
  }

  @media (min-width: 1060px) {
    display: none;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  gap: 10px;
`;
