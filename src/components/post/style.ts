import { styled } from 'styled-components';

export const Grid = styled.div`
  display: grid;
  justify-items: center;
  height: auto;
  grid-row-gap: 12px;
`;

export const ImgBox = styled.div`
  align-items: center;
  width: 300px;
  height: 300px;
  background-color: #616161;
  color: #ffffff;
  justify-content: center;
  border-radius: 20px;
`;

export const UploadImgFile = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
`;

export const UploadBox = styled.div`
  font-weight: bolder;

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

export const ContentsInputBox = styled.div`
  width: 300px;
  height: 103px;
  border: none;
  border-radius: 99px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentsInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #616161;

  &:focus {
    border: none;
    outline: none;
    border-bottom: 1px solid #616161;
  }
`;
