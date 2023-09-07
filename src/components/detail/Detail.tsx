import { SlPencil } from 'react-icons/sl';

import * as Styled from './style';
import { usePostStore } from '../../zustand/usePostStore';
import { useSessionStore } from '../../zustand/useSessionStore';
import { useModal } from '../common/overlay/modal/Modal.hooks';
import Like from '../like/Like';
import Post from '../post/Post';

import type { Tables } from '../../types/supabase';

interface DetailProps {
  data: Tables<'posts'>;
}

const Detail = ({ data }: DetailProps) => {
  const session = useSessionStore(state => state.session);
  const { leftMount, unmount } = useModal();

  const openUpdate = (id: string) => {
    usePostStore.getState().setIsPosting(true);
    leftMount('post', <Post type={'update'} unmount={unmount} postId={id} />);
    unmount('detail');
    unmount('searchList');
    unmount('likesList');
  };

  return (
    <Styled.DetailLayout>
      <Styled.DetailImageContainer>
        <Styled.LocationParagraph>
          {data.countryId}, {data.regionId}
        </Styled.LocationParagraph>
        <Styled.LikeBox>
          <Like data={data} />
        </Styled.LikeBox>
        {session?.user.id === data.userId && (
          <Styled.EditButton>
            <SlPencil
              size={'20px'}
              className="edit"
              onClick={() => {
                openUpdate(data.id);
              }}
            />
          </Styled.EditButton>
        )}
        {data.images ? <Styled.DetailImage src={data.images} alt={`Image for ${data.contents}`} /> : null}
      </Styled.DetailImageContainer>

      <Styled.DetailContainer>
        <Styled.NameParagraph>{(data as any).user.name}</Styled.NameParagraph>
        <Styled.ContentsParagraph>{data.contents}</Styled.ContentsParagraph>
        <Styled.TimeParagraph>
          {new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'GMT',
          }).format(new Date(data.createdAt))}
        </Styled.TimeParagraph>
      </Styled.DetailContainer>
    </Styled.DetailLayout>
  );
};

export default Detail;
