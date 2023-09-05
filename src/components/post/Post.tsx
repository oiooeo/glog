import React, { useEffect, useRef, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-simple-toasts';

import ContentsSection from './Post.ContentsSection';
import ImageUploadHook from './Post.hooks';
import UploadBox from './Post.UploadBox';
import { handleMutationFunction, handleMutationSuccess } from './Post.util';
import * as Styled from './style';
import { deleteButton, getPostByPostId } from '../../api/supabaseDatabase';
import useInput from '../../hooks/useInput';
import { useLocationStore } from '../../zustand/useLocationStore';
import { usePostStore } from '../../zustand/usePostStore';
import { useSessionStore } from '../../zustand/useSessionStore';
import { useModal } from '../common/overlay/modal/Modal.hooks';

interface PostProps {
  unmount: (name: string) => void;
  type: string;
  postId?: string;
}

export interface LocationInfoTypes {
  countryId: string | null;
  regionId: string | null;
  address: string | null;
}

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

  const { imgFile, setImgFile, imgUrl, loading, handleImageInputChange } = ImageUploadHook(userId!);

  const { mutate } = useMutation({
    mutationFn: async () => {
      await handleMutationFunction({ type, session, contents, imgUrl, locationInfo, location, switchChecked, data });
    },
    onSuccess: async () => {
      await handleMutationSuccess({ queryClient, type, mount, unmount, userId, postId });
    },
  });

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files?.length > 1) {
      toast('사진은 한 게시물에 한장까지만 업로드 돼요!', { className: 'image-alert', position: 'top-left', duration: 1000 });
    }

    const file = event.dataTransfer.files[0];
    if (file) {
      handleImageInputChange(file);
    }
  };

  const handleImageSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files?.length > 1) {
      toast('사진은 한 게시물에 한장까지만 업로드 돼요!', { className: 'image-alert', position: 'top-left', duration: 1000 });
    }
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

  const handleToResetLocation = () => {
    setHere(false);
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
    setLocationInfo({ countryId: postData.countryId, regionId: postData.regionId, address: postData.address });
  };

  const deletePostMutation = useMutation(
    async (postId: string) => {
      await deleteButton(postId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getPosts']);
      },
    },
  );

  const handleDelete = () => {
    if (!data) return;
    deletePostMutation.mutate(data.id);
    usePostStore.getState().setIsPosting(false);
    unmount('post');
    unmount('detail');
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  return (
    <Styled.PostLayout>
      <UploadBox imgFile={imgFile} loading={loading} handleImageSubmit={handleImageSubmit} imgRef={imgRef} handleDrop={handleDrop} />
      <ContentsSection
        type={type}
        imgFile={imgFile}
        here={here}
        locationInfo={locationInfo}
        clickedLocation={clickedLocation}
        contents={contents}
        switchChecked={switchChecked}
        handleDelete={handleDelete}
        setSwitchChecked={setSwitchChecked}
        handleChangeContents={handleChangeContents}
        handleToSetLocation={handleToSetLocation}
        handleToResetLocation={handleToResetLocation}
        handleToSubmit={handleToSubmit}
        deleteButton={deleteButton}
        data={data}
      />
    </Styled.PostLayout>
  );
};

export default Post;
