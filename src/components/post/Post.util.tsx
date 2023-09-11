import { useState } from 'react';
import type { ReactNode } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-simple-toasts';

import { supabase } from '../../api/supabaseClient';
import { deletePost, getPostByPostId, getPostByUserId } from '../../api/supabaseDatabase';
import { useLocationStore } from '../../zustand/useLocationStore';
import { usePostStore } from '../../zustand/usePostStore';
import Detail from '../detail/Detail';

import type { Tables } from '../../types/supabase';
import type { Session } from '@supabase/supabase-js';

export interface LocationInfoTypes {
  countryId: string | null;
  regionId: string | null;
  address: string | null;
}

interface MutationInsertProps {
  session: Session | null;
  contents: string;
  imgUrl: string | undefined;
  locationInfo: LocationInfoTypes;
  location: {
    longitude: number;
    latitude: number;
  };
  switchChecked: any;
}

interface MutationUpdateProps {
  session: Session | null;
  contents: string;
  imgUrl: string | undefined;
  switchChecked: any;
  data: any;
}

interface SuccessProps {
  mount: (name: string, element: ReactNode) => void;
  userId?: string | undefined;
  postId?: string | undefined;
}

interface DeleteProps {
  data: Tables<'posts'>;
  unmount: (name: string) => void;
}

const usePost = () => {
  const queryClient = useQueryClient();
  const [here, setHere] = useState(false);
  const clickedLocation = useLocationStore(state => state.clickedLocation);
  const [location, setLocation] = useState({ longitude: 0, latitude: 0 });
  const [locationInfo, setLocationInfo] = useState<LocationInfoTypes>({ countryId: '', regionId: '', address: '' });

  const handleToInsertMutation = async ({ session, contents, imgUrl, locationInfo, location, switchChecked }: MutationInsertProps) => {
    await supabase.from('posts').insert({
      userId: session?.user.id,
      contents,
      images: imgUrl,
      countryId: locationInfo.countryId,
      regionId: locationInfo.regionId,
      latitude: location?.latitude,
      longitude: location?.longitude,
      address: locationInfo.address,
      private: switchChecked,
    });
  };

  const handleToUpdateMutation = async ({ session, contents, imgUrl, switchChecked, data }: MutationUpdateProps) => {
    await supabase
      .from('posts')
      .update({
        userId: session?.user.id,
        contents,
        images: imgUrl,
        private: switchChecked,
      })
      .eq('id', data?.id);
  };

  const insertCompleted = async ({ mount, userId }: SuccessProps) => {
    queryClient.invalidateQueries(['getPosts']);
    usePostStore.getState().setIsPosting(false);

    toast('업로드 완료! 다른 게시물들도 확인해보세요 :)', { className: 'post-alert', position: 'top-center' });
    const post = userId ? await getPostByUserId(userId) : null;
    if (post) {
      mount('detail', <Detail data={post} />);
    }
  };

  const updateCompleted = async ({ mount, postId }: SuccessProps) => {
    queryClient.invalidateQueries(['getPosts']);
    usePostStore.getState().setIsPosting(false);

    toast('수정 완료!', { className: 'post-alert', position: 'top-center' });
    const post = postId ? await getPostByPostId(postId) : null;
    if (post) {
      mount('detail', <Detail data={post} />);
    }
  };

  const deletePostMutation = useMutation(
    async (postId: string) => {
      await deletePost(postId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getPosts']);
      },
    },
  );

  const handleToDelete = ({ data, unmount }: DeleteProps) => {
    if (!data) return;
    deletePostMutation.mutate(data.id);
    usePostStore.getState().setIsPosting(false);
    unmount('post');
    unmount('detail');
  };

  const handleToSetLocation = () => {
    setLocation({ longitude: clickedLocation.longitude, latitude: clickedLocation.latitude });
  };

  const getLocationInformation = async () => {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location.longitude},${location.latitude}.json?access_token=${process.env.REACT_APP_ACCESS_TOKEN}&language=ko`);
    const data = await response.json();
    const dataFeatures = data.features;

    if (dataFeatures.length === 0) {
      toast(`육지에 핀을 꽂아주세요!`, { className: 'post-alert', position: 'top-center' });
    } else {
      const placeName = dataFeatures[dataFeatures.length - 2].place_name_ko || dataFeatures[dataFeatures.length - 2].place_name;
      const placeComponents = placeName.split(', ');
      setLocationInfo({
        countryId: placeComponents[placeComponents.length - 2],
        regionId: placeComponents[placeComponents.length - 1],
        address: dataFeatures[0].place_name_ko !== undefined ? dataFeatures[0].place_name_ko : dataFeatures[0].place_name,
      });
      setHere(true);
    }
  };

  const handleToResetLocation = () => {
    setHere(false);
  };

  return {
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
  };
};

export default usePost;
