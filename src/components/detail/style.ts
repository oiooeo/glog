import { styled } from 'styled-components';

export const DetailLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 410px;
  background: #ffffff;
  border-radius: 20px;
  z-index: 100;
`;

export const DetailImageContainer = styled.div`
  overflow: hidden;
  width: 300px;
  height: 290px;
  border-radius: 20px 20px 0 0;
`;

export const DetailImage = styled.img`
  width: 300px;
  height: 295px;
  object-fit: cover;
`;

export const LocationParagraph = styled.p`
  position: absolute;
  top: 20px;
  left: 15px;
  background: #00000047;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
`;

export const LikeBox = styled.div`
  position: absolute;
  top: 20px;
  right: 15px;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
`;

export const NameParagraph = styled.p`
  font-size: 15px;
`;

export const ContentsParagraph = styled.p`
  font-size: 18px;
`;

export const TimeParagraph = styled.p`
  font-size: 15px;
`;
