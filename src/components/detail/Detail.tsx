import React, { useState } from 'react';
import * as Styled from './style';
import { Tables } from '../../types/supabase';
import { RiPencilLine } from 'react-icons/ri';
import Like from '../like/Like';
import { useSessionStore } from '../../zustand/store';
import { deleteButton } from '../../api/supabaseDatabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModal } from '../common/overlay/modal/Modal.hooks';
import Post from '../post/Post';

type DetailProps = {
  data: Tables<'posts'>;
  contents?: string;
};

const Detail: React.FC<DetailProps> = ({ data }) => {
  const queryClient = useQueryClient();
  const session = useSessionStore(state => state.session);
  const deletePostMutation = useMutation((postId: string) => deleteButton(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['getPosts']);
    },
  });
  const { leftMount, rightMount, unmount } = useModal();
  const [isPostOpened, setIsPostOpened] = useState(false);
  const handleDelete = () => {
    deletePostMutation.mutate(data.id);
  };
  const openUpdate = (id:string) => {
    leftMount('detail', <Post location={'detail'} unmount={unmount} setIsPostOpened={setIsPostOpened} postId={id}/>);
    setIsPostOpened(true);
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
            <RiPencilLine size={'24px'} className="edit" onClick={() => openUpdate(data.id)} />
            {/* <RiDeleteBin4Fill color="#ffffff80" onClick={handleDelete} /> */}
          </Styled.EditButton>
        )}
        <Styled.DetailImage src={data.images!} alt={`Image for ${data.contents}`} />
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
          }).format(new Date(data.createdAt))}
        </Styled.TimeParagraph>
      </Styled.DetailContainer>
    </Styled.DetailLayout>
  );
};

export default Detail;
