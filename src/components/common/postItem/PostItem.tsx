import React from 'react';
import * as Styled from './style';
import Like from '../../like/Like';
import { Tables } from '../../../types/supabase';

type PostItemProps = { data: Tables<'posts'> };

const PostItem: React.FC<PostItemProps> = ({ data }) => {
  return (
    <Styled.PostItemLayout>
      {data.images !== null ? <Styled.PostItemImg src={data.images} alt="" /> : null}
      <Styled.PostItemLocation>
        {data.countryId}, {data.regionId}
      </Styled.PostItemLocation>
      <Styled.PostItemLikeBox>
        <Like data={data} />
      </Styled.PostItemLikeBox>
    </Styled.PostItemLayout>
  );
};

export default PostItem;
