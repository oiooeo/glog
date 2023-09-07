import { styled } from 'styled-components';

export const DetailLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: fit-content;
  margin: 10px 0;
  background: #ffffff;
  border-radius: 20px;
  z-index: 101;
  box-shadow: 3px 3px 20px rgba(251, 232, 189, 0.4);

  @media (max-width: 1060px) {
    margin: 0 0 10px 0;
  }
`;

export const DetailImageContainer = styled.div`
  overflow: hidden;
  width: 300px;
  height: 300px;
  border-radius: 20px 20px 0 0;
`;

export const LocationParagraph = styled.p`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 225px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  text-shadow: 0px 0px 8px rgb(0, 0, 0);
  word-break: keep-all;

  @media (max-width: 1060px) {
    font-weight: 500;
    text-shadow: 0px 0px 5px rgb(0, 0, 0);
  }
`;

export const LikeBox = styled.div`
  position: absolute;
  top: 20px;
  right: 15px;
`;

export const EditButton = styled.button`
  position: absolute;
  top: 255px;
  right: 10px;
  width: 40px;
  height: 40px;
  background: transparent;
  border: transparent;
  cursor: pointer;

  & > .edit {
    color: #ffffff;
    filter: drop-shadow(0px 0px 3px rgb(0, 0, 0));
  }
`;

export const DetailImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
`;

export const NameParagraph = styled.p`
  color: #72808e;
  font-size: 15px;
  font-weight: 600;
`;

export const ContentsParagraph = styled.p`
  font-size: 17px;
  line-height: 19px;
  white-space: pre-line;
`;

export const TimeParagraph = styled.p`
  color: #353c49;
  font-size: 14px;
  letter-spacing: 0px;
  word-spacing: -2px;
`;
