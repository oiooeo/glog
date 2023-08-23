import React, { useState, useRef } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import * as Styled from './style';
import { supabase } from '../../api/supabaseClient';
import useSessionStore from '../../hooks/useSessionStore';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import Switch from '../common/switch/Switch';
import Button from '../common/button/Button';
import useInput from '../../hooks/useInput';

const Post = () => {
  const queryClient = useQueryClient();
  const [imgFile, setImgFile] = useState<string>();
  const [imgUrl, setImgUrl] = useState<string>('');
  const [switchChecked, setSwitchChecked] = useState(false);
  const [contents, handleChangeContents] = useInput();
  const imgRef = useRef<any>();
  const session = useSessionStore(state => state.session);
  const userId = session?.user.id;

  const { mutate } = useMutation({
    mutationFn: async () => {
      await supabase.from('posts').insert({
        contents,
        images: imgUrl,
        countryId: '',
        regionId: '',
        latitude: '',
        longitude: '',
        private: switchChecked,
        userId: session?.user.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['getPosts']);
    },
  });

  const uploadImg = async () => {
    const file = imgRef.current.files[0];
    const { data: storageData } = await supabase.storage.from('images').upload(`${userId}/${uuid()}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(storageData?.path || '');
    setImgUrl(publicUrlData.publicUrl);
  };

  const uploadImgFile = async () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result instanceof ArrayBuffer) {
        const blob = new Blob([reader.result], { type: 'image/png' });
        const blobUrl = URL.createObjectURL(blob);
        setImgFile(blobUrl);
      }
    };
    if (file) reader.readAsArrayBuffer(file);
    await uploadImg();
  };

  const handleToSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate();
  };

  return (
    <div>
      <form onSubmit={handleToSubmit}>
        <div>
          <Styled.ImgUpload>
            <div>
              <Styled.UploadBox>
                <label htmlFor="inputImg">{imgFile ? <Styled.UploadImgFile src={imgFile} alt="이미지 업로드" /> : <Styled.ImgBox>사진 선택</Styled.ImgBox>}</label>
                <input id="inputImg" type="file" accept="image/png, image/jpeg, image/jpg" name="images" onChange={uploadImgFile} ref={imgRef} />
              </Styled.UploadBox>
              <br />
              <br />
            </div>
          </Styled.ImgUpload>
        </div>
        <input placeholder="짧은 글을 남겨주세요!" type="text" name="contents" onChange={handleChangeContents} maxLength={50} />
        <Switch checked={switchChecked} onChange={setSwitchChecked} left={'전체공유'} right={'나만보기'} />
        <Button type="submit">작성하기</Button>
      </form>
    </div>
  );
};

export default Post;
