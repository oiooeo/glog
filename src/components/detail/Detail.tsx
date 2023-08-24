import React from 'react';
import * as Styled from './style';
import { Tables } from '../../types/supabase';
import { BsHeart } from 'react-icons/bs';

type DetailProps = {
  data: Tables<'posts'>;
};

const Detail: React.FC<DetailProps> = ({ data }) => {
  return (
    <Styled.TalkBubble>
      <div>
        <Styled.TopdataBubble>
          <div>
            {data.countryId},{data.regionId}
          </div>
          <BsHeart />
        </Styled.TopdataBubble>
        <Styled.TopdataLikes>{data.likes}</Styled.TopdataLikes>
      </div>
      <Styled.ImageContainer key={data.id}>
        <Styled.Image>
          <Styled.ImageContent src={data.images!} alt={`Image for ${data.contents}`} />
        </Styled.Image>
      </Styled.ImageContainer>
      <div>
        <p>아이디</p>
        <p>{data.contents}</p>
        <p>
          {new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }).format(new Date(data.createdAt))}
        </p>
      </div>
    </Styled.TalkBubble>
  );
};

export default Detail;
