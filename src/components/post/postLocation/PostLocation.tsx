import React from 'react';

import { SlPencil } from 'react-icons/sl';

import * as St from './style';
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
          <St.PinBackground>
            <St.Pin src={pin} alt="위치" />
            <St.PinWarning>위치는 수정이 안돼요!</St.PinWarning>
          </St.PinBackground>
          <St.SearchInput value={`${locationInfo.countryId}, ${locationInfo.regionId}`} disabled />
        </>
      ) : (
        <>
          {here ? (
            <>
              <St.SearchInput value={`${locationInfo?.countryId}, ${locationInfo?.regionId}`} disabled />
              <St.PinBackground>
                <St.Pin src={pin} alt="위치" />
                <St.MobilePin src={pin} alt="위치" />
                <St.PinButton size="large" variant="black" onClick={handleToResetLocation}>
                  수정하기
                </St.PinButton>
                <St.MobilePencilButton size="circle" variant="black" onClick={handleToResetLocation}>
                  <SlPencil size={'15px'} />
                </St.MobilePencilButton>
              </St.PinBackground>
            </>
          ) : (
            <>
              <GlobeSearch />
              <St.PinParagraph>
                지구본을 움직여 <br /> 정확한 위치에 핀을 꽂아주세요!
              </St.PinParagraph>
              <St.Pin src={pin} alt="위치" />
              {clickedLocation.latitude === 0 || clickedLocation.longitude === 0 ? (
                <>
                  <St.MobilePinParagraph>지구본을 움직여서 정확한 위치에 핀을 꽂아주세요!</St.MobilePinParagraph>
                  <St.MobilePin src={pin} alt="위치" />
                  <St.PinButton size="large" variant="gray">
                    여기예요!
                  </St.PinButton>
                </>
              ) : (
                <>
                  <St.MobilePinParagraph>핀을 터치하면 위치가 확정돼요!</St.MobilePinParagraph>
                  <St.MobilePin src={focus} alt="위치" onClick={handleToSetLocation} style={{ cursor: 'pointer' }} />
                  <St.PinButton size="large" variant="orange" onClick={handleToSetLocation}>
                    여기예요!
                  </St.PinButton>
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
