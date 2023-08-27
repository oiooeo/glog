import { styled } from 'styled-components';
import Button from '../common/button/Button';

export const PostLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
    font-size: 18px;
    font-weight: 300;
    line-height: 22px;
  }
`;

export const UploadImgFile = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 3px 3px 20px rgba(251, 232, 189, 0.4);
`;

export const UploadBox = styled.div`
  & > input {
    display: none;
  }
`;

export const SearchInput = styled.input`
  width: 300px;
  height: 50px;
  border: none;
  border-radius: 99px;
`;

export const ContentsInput = styled.textarea`
  padding: 20px 15px;
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
`;

export const Pin = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 70px;
  height: 70px;
  transform: translate(-50%, -50%);
`;

export const PinButton = styled(Button)`
  position: fixed;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
