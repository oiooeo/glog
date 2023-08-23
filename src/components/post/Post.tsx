import React, { useState, useRef } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import DefaultImg from './DefaultImg.png';
import * as St from './style';
import { supabase } from '../../api/supabaseClient';
import { Tables } from '../../types/supabase';
import useSessionStore from '../../hooks/useSessionStore';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import Switch from '../common/switch/Switch';
import Button from '../common/button/Button';
// supabase uuid 확인하기

const Post = () => {
  const [imgFile, setImgFile] = useState<string>();
  const [switchChecked, setSwitchChecked] = useState(false);
  const imgRef = useRef<any>();
  const session = useSessionStore(state => state.session);
  const email = session?.user.email;
  const userId = session?.user.id;
  const [formData, setFormData] = useState<Tables<'posts'>>({
    id: uuid(),
    contents: '',
    countryId: 'ee',
    createdAt: null,
    images: '',
    latitude: 'f',
    longitude: 'f',
    likes: 0,
    private: switchChecked,
    regionId: 'f',
    userId,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveImgFile = async () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result instanceof ArrayBuffer) {
        const blob = new Blob([reader.result], { type: 'image/png' });
        const blobUrl = URL.createObjectURL(blob);
        setImgFile(blobUrl);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleToSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (imgFile) {
      //이미지 storage 저장 로직
      const { error: storageError, data: storageData } = await supabase.storage.from('images').upload(`${email}/${uuid()}`, imgRef.current.files[0], {
        cacheControl: '3600',
        upsert: false,
      });

      // alert toast message로 바꾸기
      if (!storageError) {
        alert('업로드 완료!');
        setImgFile('');
      }
      if (storageError) return alert('storage에러발생');

      //publicUrl 끌어오기
      const { data: storage } = supabase.storage.from('images').getPublicUrl(`${storageData?.path}`);

      // database에 이미지 url 넣기
      const { error: dbError } = await supabase.from('posts').insert([{ ...formData, images: storage?.publicUrl }]);
      if (dbError) {
        console.log(dbError);
        return alert('db에러발생');
      } else {
        return alert('성공');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleToSubmit}>
        <div>
          <St.ImgUpload>
            <div>
              <St.UploadBox>
                <label htmlFor="inputImg">
                  <St.UploadImgFile src={imgFile ? imgFile : DefaultImg} alt="이미지 업로드" />
                </label>
                <input id="inputImg" type="file" accept="image/png, image/jpeg, image/jpg" name="images" onChange={saveImgFile} ref={imgRef} />
              </St.UploadBox>
              <br />
              <br />
            </div>
          </St.ImgUpload>
        </div>
        <input placeholder="짧은 글을 남겨주세요!" type="text" name="contents" value={formData.contents} onChange={onChange} maxLength={50} />
        <Switch checked={switchChecked} onChange={setSwitchChecked} left={'전체공유'} right={'나만보기'} />
        <Button type="submit">작성하기</Button>
      </form>
    </div>
  );
};

export default Post;

// const { mutate } = useMutation({
//   mutationFn: async () => {
//     await supabase.from('posts').insert(formData);
//   },
//   onSuccess: () => {
//     queryClient.invalidateQueries(['getPosts']);
//   },
// });

//   return (
//     <div>
//       <button onClick={handleFormSubmit}>+</button>;
//     </div>
//   );
// };

// export default Post;
