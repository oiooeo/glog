import { styled } from 'styled-components';

export const ImageContainer = styled.div`
  /* margin-bottom: 20px; */
  display: flex;
  justify-content: center;
  align-items: center;
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
  display: grid;
  grid-template-rows: 0fr 1fr 0.4fr;
  align-content: space-around;
  z-index: 100;
  position: relative;
  width: 200px;
  height: 300px;
  background: linear-gradient(to bottom, #484848 70%, gray 30%);
  color: white;
  border-radius: 20px;
  padding: 12px 12.8px;
  margin-bottom: 60px; /* example 간격을 위해 넣음  */

  &:after {
    border-top: 60px solid gray;
    border-left: 0px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
    position: absolute;
    top: 290px;
    left: 50%;
    border-radius: 20px;
  }
`;
export const TopdataBubble = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;
export const TopdataLikes = styled.div`
  text-align: right;
  margin-right: 3px;
`;
