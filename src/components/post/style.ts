import { styled } from 'styled-components';

export const ImgUpload = styled.div`
  display: grid;
  align-content: space-evenly;
  text-align: center;
`;

export const ImgBox = styled.div`
  align-items: center;
  width: 300px;
  height: 300px;
  background-color: #333;
  color: #ffffff;
  text-align: center;
`;

export const UploadImgFile = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;

export const UdLabels = styled.div`
  display: flex;
  justify-content: center;
`;

export const UploadBox = styled.div`
  transform: translate(-20px, 25px);
  font-weight: bolder;

  & > input {
    display: none;
  }
`;
