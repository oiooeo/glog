import { styled } from 'styled-components';

export const Layout = styled.div`
  margin: 100px 50px;
`;

export const ImageContainer = styled.div`
  margin-bottom: 20px;
`;

export const Image = styled.div`
  width: 200px;
  height: 200px;
`;

export const ImageContent = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
`;


export const TalkBubble = styled.div`
  z-index: 100;
  position: relative;
  width: 300px;
  height: 400px;
  background: linear-gradient(to bottom, #484848 70%, gray 30%);
  color: white;
  border-radius: 20px;
  padding: 12px 12.8px;
  margin-bottom:60px; /* example 간격을 위해 넣음  */

  &:after {
    border-top: 60px solid gray;
    border-left: 0px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
    position: absolute;
    top: 390px;
    left: 40%;
    border-radius: 20px;
  }
`;
