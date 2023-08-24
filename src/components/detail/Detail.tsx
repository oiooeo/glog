import React from 'react';
import * as Styled from './style';
import { Tables } from '../../types/supabase';
import { BsHeart } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin4Line } from 'react-icons/ri';
import Like from '../like/Like';
import { useSessionStore } from '../../zustand/store';

type DetailProps = {
  data: Tables<'posts'>;
};

const Detail: React.FC<DetailProps> = ({ data }) => {
  const session = useSessionStore(state => state.session);

  return (
    <Styled.DetailLayout>
      <Styled.DetailImageContainer>
        <Styled.LocationParagraph>
          {data.countryId}, {data.regionId}
        </Styled.LocationParagraph>
        <Styled.PostItemLikeBox>
          <Like data={data} />
        </Styled.PostItemLikeBox>
        <Styled.DetailImage src={data.images!} alt={`Image for ${data.contents}`} />
      </Styled.DetailImageContainer>

      <Styled.DetailContainer>
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
        {session?.user.id === data.userId && (
          <div>
            <CiEdit />
            <RiDeleteBin4Line />
          </div>
        )}
      </Styled.DetailContainer>
    </Styled.DetailLayout>
  );
};

export default Detail;
