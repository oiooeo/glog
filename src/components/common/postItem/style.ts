import { styled } from 'styled-components';

export const PostItemLayout = styled.div`
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 295px;
  margin: 15px 0;
  border-radius: 16px;
  float: right;
  transition-property: margin-right;
  transition-duration: 0.3s;

  &:hover {
    margin-right: 50px;
  }
`;

export const PostItemImg = styled.img`
  width: 100%;
  height: 100%;
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

export const DetailLayout = styled.div`
  float: right;
  transform: translate(-50px, 0);
  animation: fadein 0.5s;

  @keyframes fadein {
    from {
      opacity: 0.6;
    }
    to {
      opacity: 1;
    }
  }
`;
