import { styled } from 'styled-components';

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
    cursor: pointer;

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
  position: flex;
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

    @media (max-width: 1060px) {
      font-weight: 300;
      line-height: 22px;
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

    @media (max-width: 1060px) {
      display: none;
    }
  }

  @media (max-width: 1060px) {
    margin: 0 auto;
    margin-top: 70px;
  }
`;

export const MobileLoadingDiv = styled.div`
  @media (max-width: 1060px) {
    position: fixed;
    bottom: 70px;
    width: fit-content;
    height: fit-content;
  }
`;

export const MobileLoadingParagraph = styled.p`
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

export const MobileImgBox = styled(ImgBox)`
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
