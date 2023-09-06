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

export const UploadImgFileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > label {
    position: absolute;
    top: 100px;
    left: 65px;
    color: rgba(204, 207, 211, 0.8);
    margin-bottom: 8px;

    @media (max-width: 1060px) {
      top: 3px;
      left: 3px;
      color: #f4f4f5;
      opacity: 0.8;
    }
  }

  & > span {
    position: absolute;
    top: 100px;
    left: 320px;
    text-align: center;
    font-size: 14px;
    color: rgba(239, 235, 237, 0.8);
    font-weight: 500;
    filter: drop-shadow(rgba(0, 0, 0, 0.4) 0px 0px 9px);

    @media (max-width: 1060px) {
      display: none;
    }
  }

  @media (max-width: 1060px) {
    position: fixed;
    bottom: 70px;
    width: 70px;
    height: 70px;
    margin-left: 20px;
    border-radius: 10px;
  }
`;

export const LoadingParagraph = styled.p`
  position: absolute;
  top: 100px;
  left: 65px;
  text-align: center;
  color: rgba(239, 235, 237, 0.8);
  filter: drop-shadow(rgba(0, 0, 0, 0.4) 0px 0px 9px);

  @media (max-width: 1060px) {
    display: none;
  }
`;

export const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  background-color: #72808e;
  border: 1px solid rgba(204, 207, 211, 0.6);
  border-radius: 20px;
  box-shadow: 3px 3px 20px rgba(251, 232, 189, 0.4);

  & > .image {
    color: rgba(204, 207, 211, 0.8);
    margin-bottom: 8px;
  }

  & > p {
    color: #ffffff;
    text-align: center;
    font-size: 17px;
    font-weight: 500;
    line-height: 25px;
  }

  & > span {
    position: absolute;
    top: 100px;
    left: 320px;
    text-align: center;
    font-size: 14px;
    color: rgba(239, 235, 237, 0.8);
    font-weight: 500;

    @media (max-width: 1060px) {
      display: none;
    }
  }

  @media (max-width: 1060px) {
    margin: 0 auto;
    margin-top: 70px;
  }
`;

export const LoadingDivMobile = styled.div`
  position: fixed;
  bottom: 70px;
  width: fit-content;
  height: fit-content;
`;

export const LoadingParagraphMobile = styled.p`
  font-size: 12px;
  margin-bottom: 10px;
  margin-left: 20px;
  text-align: center;
  color: rgba(239, 235, 237, 0.8);
  filter: drop-shadow(rgba(0, 0, 0, 1) 0px 0px 9px);

  @media (min-width: 1060px) {
    display: none;
  }
`;

export const ImgBoxMobile = styled(ImgBox)`
  @media (max-width: 1060px) {
    width: 70px;
    height: 70px;
    margin-top: 0px;
    margin-left: 20px;
    padding-top: 6px;
    border-radius: 10px;
  }
`;

export const UploadImgFile = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 3px 3px 20px rgba(251, 232, 189, 0.4);

  @media (max-width: 1060px) {
    width: 71px;
    height: 71px;
    border-radius: 10px;
  }
`;

export const UploadBox = styled.div`
  & > input {
    display: none;
  }
`;

export const SearchInput = styled.input`
  width: 300px;
  height: 40px;
  padding: 0 20px;
  background: #cccfd3;
  border-radius: 18px;
  border: 1px solid #b3bac1;
  color: #72808e;
  font-size: 15px;

  @media (max-width: 1060px) {
    position: fixed;
    bottom: 150px;
    left: 100px;
    width: calc(100vw - 120px);
    height: 30px;
    padding: 0 12px;
    background: rgba(18, 18, 18, 0.9);
    border: none;
    border-radius: 10px;
    color: #b3bac1;
    font-size: 14px;
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

export const PostEditSubmitButtonForMobile = styled(Button)`
  @media (max-width: 1060px) {
    position: fixed;
    bottom: 20px;
    right: 20px;
    height: 40px;
    width: calc(50vw - 50px);
    font-size: 15px;
  }
`;

export const PostDeleteSubmitButtonForMobile = styled(Button)`
  @media (max-width: 1060px) {
    position: fixed;
    bottom: 20px;
    left: 70px;
    height: 40px;
    width: calc(50vw - 50px);
    font-size: 15px;
  }
`;

export const PinParagraph = styled.p`
  position: fixed;
  top: 33%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  text-align: center;
  font-size: 21px;
  line-height: 28px;
  text-shadow: 3px 3px 10px rgba(251, 232, 189, 0.4);

  @media (max-width: 1060px) {
    display: none;
  }
`;

export const Pin = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  transform: translate(-50%, -50%);
`;

export const PinButton = styled(Button)`
  position: fixed;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 1060px) {
    display: none;
  }
`;

export const CheckButtonForMobile = styled(Button)`
  @media (max-width: 1060px) {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 25px;
    right: 26px;
    padding: 0;
    z-index: 1;
  }

  @media (min-width: 1060px) {
    display: none;
  }
`;

export const PencilButtonForMobile = styled(Button)`
  @media (max-width: 1060px) {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 150px;
    right: 26px;
    padding: 0;
    z-index: 1;
  }

  @media (min-width: 1060px) {
    display: none;
  }
`;

export const PinBackground = styled.div`
  position: absolute;
  top: 0;
  left: 350px;
  width: calc(100vw - 350px);
  height: 100vh;
  background-color: transparent;
  z-index: 100;

  @media (max-width: 1060px) {
    left: 0px;
    width: 100vw;
    height: calc(100vh - 180px);
  }
`;

export const PinWarning = styled.p`
  position: fixed;
  top: 65%;
  left: 50%;
  padding: 15px 20px;
  background-color: rgba(114, 128, 142, 0.6);
  border-radius: 18px;
  color: #f4f4f5;
  transform: translate(-50%, -50%);
`;

export const SwitchBox = styled.div`
  @media (max-width: 1060px) {
    display: none;
  }
`;

export const SwitchBoxMobile = styled.div`
  position: fixed;
  bottom: 150px;
  left: 20px;
  width: 70px;

  @media (min-width: 1060px) {
    display: none;
  }
`;
