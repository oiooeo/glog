import React from 'react';
import * as Styled from './style';

type PostItemProps = { imgUrl: string };

const PostItem: React.FC<PostItemProps> = ({ imgUrl }) => {
  return (
    <Styled.PostItemLayout>
      <Styled.PostItemImg src={imgUrl} alt="" />
      <Styled.PostItemLocation>나라, 지역</Styled.PostItemLocation>
      <Styled.PostItemLikeBox>좋아요</Styled.PostItemLikeBox>
    </Styled.PostItemLayout>
  );
};

export default PostItem;
