import React, { useState, useRef, useEffect } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import * as Styled from './style';
import { supabase } from '../../api/supabaseClient';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import Switch from '../common/switch/Switch';
import Button from '../common/button/Button';
import useInput from '../../hooks/useInput';
import { useLocationStore, useMapLocationStore, usePostStore, useSessionStore } from '../../zustand/store';
import toast from 'react-simple-toasts';
import { PiImageSquareFill } from 'react-icons/pi';
import pin from '../../assets/pin/pinLarge.svg';
import { useModal } from '../common/overlay/modal/Modal.hooks';
import Detail from '../detail/Detail';
import { getPostByUserId, getPostByPostId, deleteButton } from '../../api/supabaseDatabase';
import imageCompression from 'browser-image-compression';
import heic2any from 'heic2any';
import GlobeSearch from '../globeSearch/GlobeSearch';
import exifr from 'exifr';
import ReactLoading from 'react-loading';

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
  const [imgFile, setImgFile] = useState<string>();
  const [here, setHere] = useState(false);
  const [imgUrl, setImgUrl] = useState<string>(type === 'post' ? '' : data?.images);
  const [switchChecked, setSwitchChecked] = useState(type === 'post' ? false : data?.private);
  const [contents, handleChangeContents] = useInput(type === 'post' ? '' : data?.contents);
  const [location, setLocation] = useState({ longitude: 0, latitude: 0 });
  const [locationInfo, setLocationInfo] = useState<LocationInfoTypes>({ countryId: '', regionId: '', address: '' });
  const imageLocation = useMapLocationStore(state => state.mapLocation);
  const [loading, setLoading] = useState(false);

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

  const uploadImg = async (file: File) => {
    const { data: storageData } = await supabase.storage.from('images').upload(`${userId}/${uuid()}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(storageData?.path || '');
    setImgUrl(publicUrlData.publicUrl);
  };

  const uploadImgFile = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result instanceof ArrayBuffer) {
        const blob = new Blob([reader.result], { type: file.type });
        const blobUrl = URL.createObjectURL(blob);
        setImgFile(blobUrl);
      }
    };
    reader.readAsArrayBuffer(file);
    await uploadImg(file);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (file) {
      await uploadImgFile(file);
    }
  };

  const handleImageInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setLoading(true);

      const originalMetadata = await exifr.parse(file);
      if (originalMetadata && originalMetadata.longitude && originalMetadata.latitude) {
        imageLocation.flyTo({ center: [originalMetadata.longitude, originalMetadata.latitude], zoom: 5 });
      }

      const options = {
        maxSizeMB: 1,
        useWebWorker: true,
      };

      const resizeFile = async (fileToResize: File) => {
        try {
          const compressedFile = await imageCompression(fileToResize, options);
          await uploadImgFile(compressedFile);
        } catch (error) {
          console.error('Image compression error:', error);
        }
      };

      if (file.type === 'image/heic' || file.type === 'image/HEIC') {
        heic2any({ blob: file, toType: 'image/jpeg' }).then(function (resultBlob: any) {
          const jpgFile = new File([resultBlob], file.name.split('.')[0] + '.jpg', {
            type: 'image/jpeg',
            lastModified: new Date().getTime(),
          });
          resizeFile(jpgFile);
        });
      } else {
        console.log('No conversion needed. Using original file.');
        resizeFile(file);
      }
    }
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
    setImgFile(postData.images);
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
      <Styled.UploadBox onDragEnter={event => event.preventDefault()} onDragOver={event => event.preventDefault()} onDragLeave={event => event.preventDefault()} onDrop={handleDrop}>
        <label htmlFor="inputImg">
          {imgFile ? (
            <Styled.UploadImgFile src={imgFile} alt="이미지 업로드" />
          ) : (
            <Styled.ImgBox>
              {loading ? (
                <>
                  <ReactLoading type="spin" color="#ffffff" width={'50px'} />
                  <p>
                    사진 업로드 중 ...
                    <br />
                    잠시만 기다려주세요!
                  </p>
                </>
              ) : (
                <Styled.ImgBox>
                  <PiImageSquareFill size={'26px'} className="image" />
                  <p>
                    여기에 사진을
                    <br />
                    업로드 해주세요
                  </p>
                </Styled.ImgBox>
              )}
            </Styled.ImgBox>
          )}
        </label>
        <input id="inputImg" type="file" accept="image/png, image/jpeg, image/jpg, image/HEIC, image/heic " onChange={handleImageInputChange} ref={imgRef} />
      </Styled.UploadBox>

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
                핀을 이동해서 <br /> 정확한 여행지를 알려주세요!
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
            leftText={'전체공유'}
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
            leftText={'전체공유'}
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
