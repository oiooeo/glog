import { useState } from 'react';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import imageCompression from 'browser-image-compression';
import exifr from 'exifr';
import heic2any from 'heic2any';
import toast from 'react-simple-toasts';

import { supabase } from '../../../api/supabaseClient';
import { useMapLocationStore } from '../../../zustand/useMapLocationStore';

const useImageUpload = (userId: string) => {
  const [imgFile, setImgFile] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const imageLocation = useMapLocationStore(state => state.mapLocation);

  const handleImageInputChange = async (file: File) => {
    setLoading(true);

    const originalMetadata = await exifr.parse(file);
    if (originalMetadata?.longitude && originalMetadata?.latitude) {
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
      } catch (error) {}
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
      resizeFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/heic'];

    if (event.dataTransfer.files && !allowedFormats.includes(event.dataTransfer.files[0]?.type)) {
      toast('이미지 파일(png, jpeg, jpg, heic)을 선택하세요.', { className: 'image-alert', position: 'top-left', duration: 1000 });
      return;
    }

    if (event.dataTransfer.files && event.dataTransfer.files?.length > 1) {
      toast('사진은 한 게시물에 한장까지만 업로드 돼요!', { className: 'image-alert', position: 'top-left', duration: 1000 });
    }

    const file = event.dataTransfer.files[0];
    if (file) {
      handleImageInputChange(file);
    }
  };

  const handleImageSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/heic'];

    if (event.target.files && !allowedFormats.includes(event.target.files[0]?.type)) {
      toast('이미지 파일(png, jpeg, jpg, heic)을 선택하세요.', { className: 'image-alert', position: 'top-left', duration: 1000 });
      return;
    }

    if (event.target.files && event.target.files?.length > 1) {
      toast('사진은 한 게시물에 한장까지만 업로드 돼요!', { className: 'image-alert', position: 'top-left', duration: 1000 });
    }
    const file = event.target.files?.[0];
    if (!file) return;
    handleImageInputChange(file);
  };

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

  return { handleDrop, handleImageSubmit, imgFile, setImgFile, imgUrl, loading };
};

export default useImageUpload;
