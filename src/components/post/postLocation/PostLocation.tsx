import React from 'react';

import { SlPencil } from 'react-icons/sl';

import * as Styled from './style';
import pin from '../../../assets/pin/pinLarge.svg';
import focus from '../../../assets/pin/pinLargeFocus.svg';
import GlobeSearch from '../../globeSearch/GlobeSearch';

import type { Tables } from '../../../types/supabase';
import type { Location } from '../../../zustand/useLocationStore';
import type { LocationInfoTypes } from '../Post.util';

interface PostLocationProps {
  data?: Tables<'posts'>;
  here: boolean;
  locationInfo: LocationInfoTypes;
  handleToResetLocation: () => void;
  clickedLocation: Location;
  handleToSetLocation: () => void;
}

const PostLocation = ({ data, here, locationInfo, handleToResetLocation, clickedLocation, handleToSetLocation }: PostLocationProps) => {
  return (
    <>
      {data ? (
        <>
          <Styled.PinBackground>
            <Styled.Pin src={pin} alt="위치" />
            <Styled.PinWarning>위치는 수정이 안돼요!</Styled.PinWarning>
          </Styled.PinBackground>
          <Styled.SearchInput value={`${locationInfo.countryId}, ${locationInfo.regionId}`} disabled />
        </>
      ) : (
        <>
          {here ? (
            <>
              <Styled.SearchInput value={`${locationInfo?.countryId}, ${locationInfo?.regionId}`} disabled />
              <Styled.PinBackground>
                <Styled.Pin src={pin} alt="위치" />
                <Styled.PinForMobile src={pin} alt="위치" />
                <Styled.PinButton size="large" variant="black" onClick={handleToResetLocation}>
                  수정하기
                </Styled.PinButton>
                <Styled.PencilButtonForMobile size="circle" variant="black" onClick={handleToResetLocation}>
                  <SlPencil size={'15px'} />
                </Styled.PencilButtonForMobile>
              </Styled.PinBackground>
            </>
          ) : (
            <>
              <GlobeSearch />
              <Styled.PinParagraph>
                지구본을 움직여 <br /> 정확한 위치에 핀을 꽂아주세요!
              </Styled.PinParagraph>
              <Styled.Pin src={pin} alt="위치" />
              {clickedLocation.latitude === 0 || clickedLocation.longitude === 0 ? (
                <>
                  <Styled.PinParagraphForMobile>지구본을 움직여서 정확한 위치에 핀을 꽂아주세요!</Styled.PinParagraphForMobile>
                  <Styled.PinForMobile src={pin} alt="위치" />
                  <Styled.PinButton size="large" variant="gray">
                    여기예요!
                  </Styled.PinButton>
                </>
              ) : (
                <>
                  <Styled.PinParagraphForMobile>핀을 터치하면 위치가 확정돼요!</Styled.PinParagraphForMobile>
                  <Styled.PinForMobile src={focus} alt="위치" onClick={handleToSetLocation} style={{ cursor: 'pointer' }} />
                  <Styled.PinButton size="large" variant="orange" onClick={handleToSetLocation}>
                    여기예요!
                  </Styled.PinButton>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default PostLocation;
