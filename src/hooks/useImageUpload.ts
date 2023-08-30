import { useState } from 'react';
import { supabase } from '../api/supabaseClient';
import imageCompression from 'browser-image-compression';
import heic2any from 'heic2any';
import exifr from 'exifr';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useMapLocationStore } from '../zustand/useMapLocationStore';

const useImageUpload = (userId: string) => {
  const [imgFile, setImgFile] = useState<string | null>(null);
  // 여기 수정
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const imageLocation = useMapLocationStore(state => state.mapLocation);

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

  const handleImageInputChange = async (file: File) => {
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
  };

  return { imgFile, imgUrl, loading, handleImageInputChange };
};

export default useImageUpload;
