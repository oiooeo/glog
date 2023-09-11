import React, { useEffect, useRef, useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import ImageUpload from './imageUpload/ImageUpload';
import useImageUpload from './imageUpload/ImageUpload.hooks';
import usePost from './Post.util';
import PostLocation from './postLocation/PostLocation';
import * as Styled from './style';
import useInput from '../../hooks/useInput';
import { useSessionStore } from '../../zustand/useSessionStore';
import { useModal } from '../common/overlay/modal/Modal.hooks';
import Switch from '../common/switch/Switch';

import type { Tables } from '../../types/supabase';

interface PostProps {
  data?: Tables<'posts'>;
}

const Post = ({ data }: PostProps) => {
  const { mount, unmount } = useModal();
  const session = useSessionStore(state => state.session);
  const userId = session?.user.id;
  const imgRef = useRef<HTMLInputElement>(null);
  const [switchChecked, setSwitchChecked] = useState<boolean>(data?.private ?? false);
  const [contents, handleChangeContents] = useInput(data?.contents ?? '');

  const { handleDrop, handleImageSubmit, imgFile, setImgFile, imgUrl, loading } = useImageUpload(userId!);
  const {
    handleToInsertMutation,
    handleToUpdateMutation,
    insertCompleted,
    updateCompleted,
    handleToDelete,
    clickedLocation,
    handleToSetLocation,
    location,
    getLocationInformation,
    locationInfo,
    setLocationInfo,
    handleToResetLocation,
    here,
    setHere,
  } = usePost();

  const { mutate: onSubmit } = useMutation({
    mutationFn: async () => {
      await handleToInsertMutation({ session, contents, imgUrl, locationInfo, location, switchChecked });
    },
    onSuccess: async () => {
      await insertCompleted({ mount, userId });
    },
  });

  const { mutate: onUpdate } = useMutation({
    mutationFn: async () => {
      await handleToUpdateMutation({ session, contents, imgUrl, switchChecked, data });
    },
    onSuccess: async () => {
      await updateCompleted({ mount, postId: data?.id });
    },
  });

  useEffect(() => {
    if (!data) return;
    setImgFile(data.images);
    setLocationInfo({ countryId: data.countryId, regionId: data.regionId, address: data.address });
    setHere(true);
  }, []);

  useEffect(() => {
    if (location.latitude === 0 || location.longitude === 0) return;
    getLocationInformation();
  }, [location]);

  const handleToSubmit = () => {
    onSubmit();
    unmount('post');
  };

  const handleToUpdate = () => {
    onUpdate();
    unmount('post');
  };

  return (
    <Styled.PostLayout>
      <ImageUpload imgFile={imgFile} loading={loading} handleImageSubmit={handleImageSubmit} imgRef={imgRef} handleDrop={handleDrop} />
      {imgFile && <PostLocation data={data} here={here} locationInfo={locationInfo} handleToResetLocation={handleToResetLocation} clickedLocation={clickedLocation} handleToSetLocation={handleToSetLocation}></PostLocation>}

      {here && (
        <>
          <Styled.ContentsInput placeholder="짧은 글을 남겨주세요!" defaultValue={data?.contents ?? undefined} onChange={handleChangeContents} maxLength={30} rows={2} />
          <Styled.SwitchBox>
            <Switch
              checked={switchChecked}
              onChange={setSwitchChecked}
              leftText={'전체공개'}
              rightText={'나만보기'}
              width={'300px'}
              checkedtextcolor={'#353C49'}
              textcolor={'#72808E'}
              checkedbackground={'#72808E'}
              background={'rgba(18, 18, 18, 0.6)'}
            />
          </Styled.SwitchBox>
          <Styled.SwitchBoxMobile>
            <p>공개범위</p>
            <Switch checked={switchChecked} onChange={setSwitchChecked} leftText={'전체'} rightText={'MY'} width={'70px'} checkedtextcolor={'#353C49'} textcolor={'#B3BAC1'} checkedbackground={'#B3BAC1'} background={'rgba(18, 18, 18, 0.6)'} />
          </Styled.SwitchBoxMobile>

          <>
            {data ? (
              <>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Styled.PostDeleteSubmitButtonForMobile
                    size="medium"
                    variant="deep-gray"
                    onClick={() => {
                      handleToDelete({ data, unmount });
                    }}
                  >
                    삭제하기
                  </Styled.PostDeleteSubmitButtonForMobile>
                  {contents === '' ? (
                    <Styled.PostEditSubmitButtonForMobile size="medium" variant="gray">
                      수정하기
                    </Styled.PostEditSubmitButtonForMobile>
                  ) : (
                    <Styled.PostEditSubmitButtonForMobile size="medium" variant="orange-shadow" onClick={handleToUpdate}>
                      수정하기
                    </Styled.PostEditSubmitButtonForMobile>
                  )}
                </div>
              </>
            ) : (
              <>
                {contents === '' ? (
                  <Styled.PostSubmitButton size="large" variant="gray">
                    작성하기
                  </Styled.PostSubmitButton>
                ) : (
                  <Styled.PostSubmitButton size="large" variant="orange-shadow" onClick={handleToSubmit}>
                    작성하기
                  </Styled.PostSubmitButton>
                )}
              </>
            )}
          </>
        </>
      )}
    </Styled.PostLayout>
  );
};

export default Post;
