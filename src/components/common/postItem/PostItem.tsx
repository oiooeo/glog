import React, { useRef, useState } from 'react';

import * as Styled from './style';
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
}

const PostItem = ({ data, lastItem }: PostItemProps, ref: any) => {
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
    <Styled.PostHoverLayout ref={ref}>
      {isClicked ? (
        <Styled.DetailLayout ref={DetailLayoutref}>
          <Detail data={data} />
        </Styled.DetailLayout>
      ) : (
        <Styled.PostItemLayout ref={itemRef} onClick={lastItem ? signin : focus} lastItem={lastItem}>
          {data.images !== null ? <Styled.PostItemImg src={data.images} alt="" /> : null}
          <Styled.LocationParagraph>
            {data.countryId}, {data.regionId}
          </Styled.LocationParagraph>
          <Styled.LikeBox>
            <Like data={data} />
          </Styled.LikeBox>
        </Styled.PostItemLayout>
      )}
    </Styled.PostHoverLayout>
  );
};

export default React.forwardRef(PostItem);
