import React, { useRef, useState } from 'react';
import * as Styled from './style';
import Like from '../../like/Like';
import { Tables } from '../../../types/supabase';
import useOnClickOutside from '../../../hooks/useOnClickOutSide';
import Detail from '../../detail/Detail';
import { signin } from '../../../api/supabaseAuth';
import { useMapLocationStore } from '../../../zustand/useMapLocationStore';
import { pickLocationWithMarker } from '../../globe/globe.util';

type PostItemProps = { data: Tables<'posts'>; lastItem?: boolean };

const PostItem: React.FC<PostItemProps> = ({ data, lastItem }) => {
  const ref = useRef<HTMLDivElement>(null);
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

  useOnClickOutside(ref, showDetail);

  return (
    <div>
      {isClicked ? (
        <Styled.DetailLayout ref={ref}>
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
    </div>
  );
};

export default PostItem;
