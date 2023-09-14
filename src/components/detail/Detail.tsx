import { SlPencil } from 'react-icons/sl';

import * as St from './style';
import { usePostStore } from '../../zustand/usePostStore';
import { useSessionStore } from '../../zustand/useSessionStore';
import { useHeaderModal } from '../common/header/Header.hooks';
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
  const { closeSearchList, closeLikesList } = useHeaderModal();

  const openUpdate = () => {
    usePostStore.getState().setIsPosting(true);
    leftMount('post', <Post data={data} />);
    closeSearchList();
    closeLikesList();
    unmount('detail');
  };

  return (
    <St.DetailLayout>
      <St.DetailImageContainer>
        <St.LocationParagraph>
          {data.countryId}, {data.regionId}
        </St.LocationParagraph>
        <St.LikeBox>
          <Like data={data} />
        </St.LikeBox>
        {session?.user.id === data.userId && (
          <St.EditButton>
            <SlPencil size={'20px'} className="edit" onClick={openUpdate} />
          </St.EditButton>
        )}
        {data.images ? <St.DetailImage src={data.images} alt={`Image for ${data.contents}`} /> : null}
      </St.DetailImageContainer>

      <St.DetailContainer>
        <St.NameParagraph>{(data as any).user.name}</St.NameParagraph>
        <St.ContentsParagraph>{data.contents}</St.ContentsParagraph>
        <St.TimeParagraph>
          {new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'GMT',
          }).format(new Date(data.createdAt))}
        </St.TimeParagraph>
      </St.DetailContainer>
    </St.DetailLayout>
  );
};

export default Detail;
