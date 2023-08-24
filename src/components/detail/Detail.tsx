import React from 'react';
import * as Styled from './style';
import { getPosts } from '../../api/supabaseDatabase';
import { useQuery } from '@tanstack/react-query';

const Detail = () => {
  const { data } = useQuery(['getPosts'], getPosts);

  return (
    <Styled.Layout>
      <div>
        {data &&
          data.map(post => (
            <Styled.ImageContainer key={post.id}>
              <Styled.Image>
                <Styled.ImageContent src={post.images!} alt={`Image for ${post.contents}`} />
              </Styled.Image>
              <h2>{post.contents}</h2>
              <p>{post.countryId}</p>
              <p>{post.regionId}</p>
              <p>{post.createdAt}</p>
            </Styled.ImageContainer>
          ))}
      </div>
    </Styled.Layout>
  );
};

export default Detail;
