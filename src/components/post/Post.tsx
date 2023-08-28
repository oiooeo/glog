import React, { useState, useRef, useEffect } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import * as Styled from './style';
import { supabase } from '../../api/supabaseClient';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import Switch from '../common/switch/Switch';
import Button from '../common/button/Button';
import useInput from '../../hooks/useInput';
import { useLocationStore, usePostStore, useSessionStore } from '../../zustand/store';
import toast from 'react-simple-toasts';
import { PiImageSquareFill } from 'react-icons/pi';
import pin from '../../assets/pin/pinLarge.svg';
import { useModal } from '../common/overlay/modal/Modal.hooks';
import Detail from '../detail/Detail';
import { getPost } from '../../api/supabaseDatabase';
import SearchBox from '../globe/SearchBox';
import imageCompression from 'browser-image-compression';
import heic2any from 'heic2any';

type PostProps = {
  unmount: (name: string) => void;
  leftMount: (name: string, element: React.ReactNode) => void;
  setIsPostOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const Post = ({ leftMount, unmount, setIsPostOpened }: PostProps) => {
  const queryClient = useQueryClient();
  const [imgFile, setImgFile] = useState<string>();
  const [imgUrl, setImgUrl] = useState<string>('');
  const [switchChecked, setSwitchChecked] = useState(false);
  const [here, setHere] = useState(false);
  const [contents, handleChangeContents] = useInput();
  const imgRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<any>(null);
  const session = useSessionStore(state => state.session);
  const clickedLocation = useLocationStore(state => state.clickedLocation);
  const userId = session?.user.id;
  const { mount } = useModal();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await supabase.from('posts').insert({
        contents: contents,
        images: imgUrl,
        countryId: clickedLocation?.countryId,
        regionId: clickedLocation?.regionId,
        latitude: clickedLocation?.latitude,
        longitude: clickedLocation?.longitude,
        address: clickedLocation?.address,
        private: switchChecked,
        userId: session?.user.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getPosts']);
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
      console.log('Uploaded File:', file);

      const options = {
        maxSizeMB: 3,
        useWebWorker: true,
      };

      const resizeFile = async (fileToResize: File) => {
        try {
          console.log('Original File Size:', fileToResize.size);

          const compressedFile = await imageCompression(fileToResize, options);
          console.log('Compressed File Size:', compressedFile.size);

          await uploadImgFile(compressedFile);
          console.log('Uploaded Compressed File:', compressedFile);
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
          console.log('Converted JPG File:', jpgFile);
          resizeFile(jpgFile);
        });
      } else {
        console.log('No conversion needed. Using original file.');
        resizeFile(file);
      }
    }
  };

  const handleToSetLocation = () => {
    setHere(true);
  };

  const handleToSubmit = async () => {
    mutate();
    unmount('post');
    setIsPostOpened(false);
    usePostStore.getState().setIsPosting(false);
    toast('업로드 완료! 다른 게시물들도 확인해보세요 :)', { className: 'post-alert', position: 'top-center' });

    const post = userId ? await getPost(userId) : null;
    if (post) mount('detail', <Detail data={post} />);
  };

  useEffect(() => {
    if (regionRef.current) {
      regionRef.current.value = `${clickedLocation?.countryId}, ${clickedLocation?.regionId}`;
    }
  }, [clickedLocation]);

  return (
    <Styled.PostLayout>
      <Styled.UploadBox onDragEnter={event => event.preventDefault()} onDragOver={event => event.preventDefault()} onDragLeave={event => event.preventDefault()} onDrop={handleDrop}>
        <label htmlFor="inputImg">
          {imgFile ? (
            <Styled.UploadImgFile src={imgFile} alt="이미지 업로드" />
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
        </label>
        <input id="inputImg" type="file" accept="image/png, image/jpeg, image/jpg, image/HEIC, image/heic " onChange={handleImageInputChange} ref={imgRef} />
      </Styled.UploadBox>

      {imgFile && (
        <>
          <SearchBox />
          {here ? (
            <>
              <Styled.Pin src={pin} alt="위치" />
              <Styled.PinButton size="large" variant="black">
                수정하기
              </Styled.PinButton>
            </>
          ) : (
            <>
              <Styled.PinParagraph>
                핀을 이동해서 <br /> 정확한 여행지를 알려주세요!
              </Styled.PinParagraph>
              <Styled.Pin src={pin} alt="위치" />
              <Styled.PinButton size="large" variant="black" onClick={handleToSetLocation}>
                여기예요!
              </Styled.PinButton>
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
    </Styled.PostLayout>
  );
};

export default Post;
