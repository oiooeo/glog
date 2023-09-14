import styled, { keyframes } from 'styled-components';

export const PostHoverLayout = styled.div`
  transition: filter 0.3s ease;
  transition-property: margin-right;
  transition-duration: 0.3s;
  &:hover {
    margin-right: 50px;
  }
  @media (max-width: 1060px) {
    width: 320px;
  }
`;

export const PostItemLayout = styled.div<{ lastItem?: boolean | null }>`
  position: relative;
  overflow: hidden;
  width: 300px;
  height: ${props => (props.lastItem ? '150px' : '300px')};
  border-radius: ${props => (props.lastItem ? '16px 16px 0 0' : '16px')};
  filter: ${props => (props.lastItem ? 'blur(5px)' : 'none')};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transition: filter 0.3s ease;
  transition-property: margin-right;
  transition-duration: 0.3s;

  @media (max-width: 1060px) {
    height: 300px;
    margin: 15px 20px 15px 0;
    border-radius: 16px;
    filter: ${props => (props.lastItem ? 'blur(5px)' : 'none')};
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

const fadeInUp = keyframes`
0% {
  transform: translateY(100%);
}
100% {
  transform: translateY(0);
}
`;

export const DetailLayout = styled.div`
  float: right;
  transform: translate(0, 0);
  animation: fadein 0.5s;
  z-index: 101;

  @keyframes fadein {
    from {
      opacity: 0.6;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 1060px) {
    transform: translate(0, 0);
    margin: 0 23px 0 20px;
    &.slider {
      animation: ${fadeInUp} 0.5s;
    }
  }
`;
