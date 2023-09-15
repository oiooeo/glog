import React, { useRef, useState } from 'react';

import * as St from './style';
import { signin } from '../../../api/supabaseAuth';
import useOnClickOutside from '../../../hooks/useOnClickOutSide';
import { useMapLocationStore } from '../../../zustand/useMapLocationStore';
import Detail from '../../detail/Detail';
import { pickLocationWithMarker } from '../../globe/globe.util';
import Like from '../../like/Like';

import type { Tables } from '../../../types/supabase';

interface PostItemProps {
  data: Tables<'posts'>;
  lastItem?: boolean | null;
  fetchLikedPosts?: () => Promise<void>;
}

const PostItem = ({ data, lastItem, fetchLikedPosts }: PostItemProps, ref: any) => {
  const DetailLayoutref = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  const mapLocation = useMapLocationStore(state => state.mapLocation);

  const focus = () => {
    setIsClicked(!isClicked);
    pickLocationWithMarker(mapLocation, { longitude: data.longitude, latitude: data.latitude });
    if (itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const showDetail = () => {
    setIsClicked(!isClicked);
  };

  useOnClickOutside(DetailLayoutref, showDetail);

  return (
    <St.PostHoverLayout ref={ref}>
      {isClicked ? (
        <St.DetailLayout ref={DetailLayoutref}>
          <Detail data={data} />
        </St.DetailLayout>
      ) : (
        <St.PostItemLayout ref={itemRef} onClick={lastItem ? signin : focus} lastItem={lastItem}>
          {data.images !== null ? <St.PostItemImg src={data.images} alt="" /> : null}
          <St.LocationParagraph>
            {data.countryId}, {data.regionId}
          </St.LocationParagraph>
          <St.LikeBox>
            <Like data={data} fetchLikedPosts={fetchLikedPosts} />
          </St.LikeBox>
        </St.PostItemLayout>
      )}
    </St.PostHoverLayout>
  );
};

export default React.forwardRef(PostItem);
