import { styled } from 'styled-components';

export const DetailLayout = styled.div`
  position: relative;
  width: 300px;
  height: 430px;
  background: #ffffff;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 20px;
  z-index: 100;

  &:after {
    position: absolute;
    left: 10%;
    top: 430px;
    border-top: 50px solid gray;
    border-left: 0px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
  }
`;

export const DetailImageContainer = styled.div`
  position: absolute;
  width: 300px;
  height: 290px;
`;

export const DetailImage = styled.img`
  position: absolute;
  width: 300px;
  height: 290px;
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

export const PostItemLikeBox = styled.div`
  position: absolute;
  top: 20px;
  right: 15px;
`;

export const DetailContainer = styled.div``;
