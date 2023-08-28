import { styled } from 'styled-components';

export const LikeLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const LikeButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;

  & .like {
    filter: drop-shadow(0px 0px 3px rgb(0, 0, 0));
  }
`;

export const LikeParagraph = styled.p`
  color: #ffffff;
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  text-shadow: 0px 0px 5px rgb(0, 0, 0);
`;
