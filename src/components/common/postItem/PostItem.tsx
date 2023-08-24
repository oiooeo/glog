import React from 'react';
import * as Styled from './style';

type PostItemProps = { images: string | null; countryId: string | null; regionId: string | null };

const PostItem: React.FC<PostItemProps> = ({ images, countryId, regionId }) => {
  return (
    <Styled.PostItemLayout>
      {images !== null ? <Styled.PostItemImg src={images} alt="" /> : null}
      <Styled.PostItemLocation>
        {countryId}, {regionId}
      </Styled.PostItemLocation>
      <Styled.PostItemLikeBox>좋아요</Styled.PostItemLikeBox>
    </Styled.PostItemLayout>
  );
};

export default PostItem;
