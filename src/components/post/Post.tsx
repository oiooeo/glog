import React, { useEffect, useRef, useState } from 'react';

import ImageUpload from './imageUpload/ImageUpload';
import useImageUpload from './imageUpload/ImageUpload.hooks';
import usePost from './Post.util';
import PostLocation from './postLocation/PostLocation';
import * as St from './style';
import useInput from '../../hooks/useInput';
import { useSessionStore } from '../../zustand/useSessionStore';
import { useModal } from '../common/overlay/modal/Modal.hooks';
import Switch from '../common/switch/Switch';

import type { Tables } from '../../types/supabase';

interface PostProps {
  data?: Tables<'posts'>;
}

const Post = ({ data }: PostProps) => {
  const { unmount } = useModal();
  const session = useSessionStore(state => state.session);
  const userId = session?.user.id;
  const imgRef = useRef<HTMLInputElement>(null);
  const [switchChecked, setSwitchChecked] = useState<boolean>(data?.private ?? false);
  const [contents, handleChangeContents] = useInput(data?.contents ?? '');
  const isContentsEmpty = contents === '';

  const { handleDrop, handleImageSubmit, imgFile, setImgFile, imgUrl, loading } = useImageUpload(userId!);
  const { onSubmit, onUpdate, handleToDelete, clickedLocation, handleToSetLocation, location, getLocationInformation, locationInfo, setLocationInfo, handleToResetLocation, here, setHere } = usePost(data);

  useEffect(() => {
    if (data) {
      setImgFile(data.images);
      setLocationInfo({ countryId: data.countryId, regionId: data.regionId, address: data.address });
      setHere(true);
    }
  }, []);

  useEffect(() => {
    if (location.latitude === 0 || location.longitude === 0) return;
    getLocationInformation();
  }, [location]);

  const handleToSubmit = () => {
    if (!isContentsEmpty) {
      onSubmit({ session, contents, imgUrl, locationInfo, location, switchChecked });
      unmount('post');
    }
  };

  const handleToUpdate = () => {
    if (!isContentsEmpty) {
      onUpdate({ session, contents, imgUrl, switchChecked, data });
      unmount('post');
    }
  };

  return (
    <St.PostLayout>
      <ImageUpload imgFile={imgFile} loading={loading} handleImageSubmit={handleImageSubmit} imgRef={imgRef} handleDrop={handleDrop} />
      {imgFile && <PostLocation data={data} here={here} locationInfo={locationInfo} handleToResetLocation={handleToResetLocation} clickedLocation={clickedLocation} handleToSetLocation={handleToSetLocation}></PostLocation>}

      {here && (
        <>
          <St.ContentsInput placeholder="짧은 글을 남겨주세요!" defaultValue={data?.contents ?? undefined} onChange={handleChangeContents} maxLength={30} rows={2} />
          <St.SwitchBox>
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
          </St.SwitchBox>
          <St.MobileSwitchBox>
            <p>공개범위</p>
            <Switch checked={switchChecked} onChange={setSwitchChecked} leftText={'전체'} rightText={'MY'} width={'70px'} checkedtextcolor={'#353C49'} textcolor={'#B3BAC1'} checkedbackground={'#B3BAC1'} background={'rgba(18, 18, 18, 0.6)'} />
          </St.MobileSwitchBox>

          <>
            {data ? (
              <>
                <St.ButtonBox>
                  <St.MobileDeleteButton
                    size="medium"
                    variant="deep-gray"
                    onClick={() => {
                      handleToDelete({ data });
                    }}
                  >
                    삭제하기
                  </St.MobileDeleteButton>
                  <St.MobileEditButton size="medium" variant={isContentsEmpty ? 'gray' : 'orange-shadow'} onClick={handleToUpdate}>
                    수정하기
                  </St.MobileEditButton>
                </St.ButtonBox>
              </>
            ) : (
              <St.PostSubmitButton size="large" variant={isContentsEmpty ? 'gray' : 'orange-shadow'} onClick={handleToSubmit}>
                작성하기
              </St.PostSubmitButton>
            )}
          </>
        </>
      )}
    </St.PostLayout>
  );
};

export default Post;
