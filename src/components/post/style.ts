import { styled } from 'styled-components';

export const ImgUpload = styled.div`
  display: grid;
  align-content: space-evenly;
  text-align: center;
`
export const UploadImgFile = styled.img`
  transform: translate(0px, 10px);
  width: 300px;
  height: 280px;
  object-fit: cover;
`
export const UdLabels = styled.div`
  display: flex;
  justify-content: center;
`
export const UploadBox = styled.div`
  transform: translate(-20px, 25px);
  font-weight: bolder;

  & > input {
    display: none;
  }
`

export const DeleteLabel = styled.div`
  transform: translate(10px, 25px);
  font-weight: bolder;
`
export const DeleteprofileImg = styled.input`
  display: none;
`