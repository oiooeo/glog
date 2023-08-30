import React, { useState, useRef, useEffect } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import * as Styled from './style';
import { supabase } from '../../api/supabaseClient';
import Switch from '../common/switch/Switch';
import Button from '../common/button/Button';
import useInput from '../../hooks/useInput';
import toast from 'react-simple-toasts';
import { PiImageSquareFill } from 'react-icons/pi';
import pin from '../../assets/pin/pinLarge.svg';
import { useModal } from '../common/overlay/modal/Modal.hooks';
import Detail from '../detail/Detail';
import { getPostByUserId, getPostByPostId, deleteButton } from '../../api/supabaseDatabase';
import GlobeSearch from '../globeSearch/GlobeSearch';
import ReactLoading from 'react-loading';
import { useSessionStore } from '../../zustand/useSessionStore';
import { useLocationStore } from '../../zustand/useLocationStore';
import { usePostStore } from '../../zustand/usePostStore';
import useImageUpload from '../../hooks/useImageUpload';
import UploadBox from './Post.UploadBox';

type PostProps = {
  unmount: (name: string) => void;
  type: string;
  postId?: string;
};

type LocationInfoTypes = {
  countryId: string | null;
  regionId: string | null;
  address: string | null;
};

const Post = ({ type, unmount, postId }: PostProps) => {
  const { mount } = useModal();
  const queryClient = useQueryClient();
  const clickedLocation = useLocationStore(state => state.clickedLocation);
  const session = useSessionStore(state => state.session);
  const userId = session?.user.id;
  const imgRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<any>(null);
  const [here, setHere] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(type === 'post' ? false : data?.private);
  const [contents, handleChangeContents] = useInput(type === 'post' ? '' : data?.contents);
  const [location, setLocation] = useState({ longitude: 0, latitude: 0 });
  const [locationInfo, setLocationInfo] = useState<LocationInfoTypes>({ countryId: '', regionId: '', address: '' });

  const { imgFile, imgUrl, loading, handleImageInputChange } = useImageUpload(userId!);

  const { mutate } = useMutation({
    mutationFn: async () => {
      type === 'post'
        ? await supabase.from('posts').insert({
            userId: session?.user.id,
            contents: contents,
            images: imgUrl,
            countryId: locationInfo.countryId,
            regionId: locationInfo.regionId,
            latitude: location?.latitude,
            longitude: location?.longitude,
            address: locationInfo.address,
            private: switchChecked,
          })
        : await supabase
            .from('posts')
            .update({
              userId: session?.user.id,
              contents: contents,
              images: imgUrl,
              private: switchChecked,
            })
            .eq('id', data?.id);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(['getPosts']);
      unmount('post');
      usePostStore.getState().setIsPosting(false);

      if (type === 'post') {
        toast('업로드 완료! 다른 게시물들도 확인해보세요 :)', { className: 'post-alert', position: 'top-center' });
        const post = userId ? await getPostByUserId(userId) : null;
        if (post) {
          mount('detail', <Detail data={post} />);
        }
      } else {
        toast('수정 완료!', { className: 'post-alert', position: 'top-center' });
        const post = postId ? await getPostByPostId(postId) : null;
        if (post) {
          mount('detail', <Detail data={post} />);
        }
      }
    },
  });

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (file) {
      await handleImageInputChange(file);
    }
  };

  const handleImageSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    handleImageInputChange(file);
  };

  const getLocationInformation = async () => {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location.longitude},${location.latitude}.json?access_token=${process.env.REACT_APP_ACCESS_TOKEN}&language=ko`);
    const data = await response.json();
    const dataFeatures = data.features;
    const placeName = dataFeatures[dataFeatures.length - 2].place_name_ko || dataFeatures[dataFeatures.length - 2].place_name;
    const placeComponents = placeName.split(', ');
    setLocationInfo({ countryId: placeComponents[placeComponents.length - 2], regionId: placeComponents[placeComponents.length - 1], address: dataFeatures[0].place_name_ko !== undefined ? dataFeatures[0].place_name_ko : dataFeatures[0].place_name });
  };

  useEffect(() => {
    if (location.latitude === 0 || location.longitude === 0) return;
    getLocationInformation();
  }, [location]);

  const handleToSetLocation = () => {
    setHere(true);
    setLocation({ longitude: clickedLocation.longitude, latitude: clickedLocation.latitude });
  };

  const handleToSubmit = () => {
    mutate();
  };

  const fetchData = async () => {
    if (!postId) return;
    const postData = await getPostByPostId(postId);
    if (!postData) return;
    setData(postData);
    setLocation({ longitude: postData.longitude, latitude: postData.latitude });
    setSwitchChecked(postData.private);
    setLocationInfo({ countryId: postData.countryId!, regionId: postData.regionId!, address: postData.address! });
  };

  const deletePostMutation = useMutation((postId: string) => deleteButton(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['getPosts']);
    },
  });

  const handleDelete = () => {
    if (!data) return;
    deletePostMutation.mutate(data.id);
    unmount('post');
    unmount('detail');
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  return (
    <Styled.PostLayout>
      <UploadBox imgFile={imgFile} loading={loading} handleImageInputChange={handleImageInputChange} handleImageSubmit={handleImageSubmit} imgRef={imgRef} handleDrop={handleDrop} />

      {type === 'post' && imgFile && (
        <>
          <GlobeSearch />
          {here ? (
            <>
              <Styled.Pin src={pin} alt="위치" />
              <Styled.PinButton size="large" variant="black" onClick={handleToSetLocation}>
                수정하기
              </Styled.PinButton>
            </>
          ) : (
            <>
              <Styled.PinParagraph>
                지구본을 움직여 <br /> 정확한 위치에 핀을 꽂아주세요!
              </Styled.PinParagraph>
              <Styled.Pin src={pin} alt="위치" />
              {clickedLocation.latitude === 0 || clickedLocation.longitude === 0 ? (
                <Styled.PinButton size="large" variant="gray">
                  여기예요!
                </Styled.PinButton>
              ) : (
                <Styled.PinButton size="large" variant="black" onClick={handleToSetLocation}>
                  여기예요!
                </Styled.PinButton>
              )}
            </>
          )}
        </>
      )}

      {clickedLocation && here && (
        <>
          <Styled.ContentsInput placeholder="짧은 글을 남겨주세요!" onChange={handleChangeContents} maxLength={30} rows={2} />
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
          {contents === '' ? (
            <Button size="large" variant="gray">
              작성하기
            </Button>
          ) : (
            <Button size="large" variant="orange" onClick={handleToSubmit}>
              작성하기
            </Button>
          )}
        </>
      )}

      {type === 'update' && (
        <>
          <Styled.PinBackground>
            <Styled.Pin src={pin} alt="위치" />
            <Styled.PinWarning>위치는 수정이 안돼요!</Styled.PinWarning>
          </Styled.PinBackground>
          <Styled.SearchInput value={`${locationInfo.countryId}, ${locationInfo.regionId}`} disabled />
          <Styled.ContentsInput placeholder="짧은 글을 남겨주세요!" defaultValue={data?.contents} onChange={handleChangeContents} maxLength={30} rows={2} />
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
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button size="medium" variant="deep-gray" onClick={handleDelete}>
              삭제하기
            </Button>
            {contents === '' ? (
              <Button size="medium" variant="gray">
                작성하기
              </Button>
            ) : (
              <Button size="medium" variant="orange" onClick={handleToSubmit}>
                작성하기
              </Button>
            )}
          </div>
        </>
      )}
    </Styled.PostLayout>
  );
};

export default Post;
