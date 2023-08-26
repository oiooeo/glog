import { styled } from 'styled-components';

export const PostItemLayout = styled.div`
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 300px;
  margin: 10px 0 10px auto;
  border-radius: 16px;
  transition-property: margin-right;
  transition-duration: 0.3s;
  box-shadow: 3px 3px 20px rgba(251, 232, 189, 0.4);

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
  left: 20px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  text-shadow: 0px 0px 8px rgb(0, 0, 0);
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
