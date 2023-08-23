import { styled } from 'styled-components';

export const PostItemLayout = styled.div`
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 300px;
  margin: 15px 0;
  border-radius: 16px;
`;

export const PostItemImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PostItemLocation = styled.p`
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
