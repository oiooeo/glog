import React from 'react';

import { SlPencil } from 'react-icons/sl';

import * as Styled from './style';
import pin from '../../assets/pin/pinLarge.svg';
import focus from '../../assets/pin/pinLargeFocus.svg';
import Switch from '../common/switch/Switch';
import GlobeSearch from '../globeSearch/GlobeSearch';

import type { LocationInfoTypes } from './Post';

interface ContentsSectionProps {
  type: string;
  imgFile: string | null;
  here: boolean;
  locationInfo: LocationInfoTypes;
  clickedLocation: { longitude: number; latitude: number };
  contents: string;
  switchChecked: boolean;
  setSwitchChecked: React.Dispatch<any>;
  handleDelete: () => void;
  handleChangeContents: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => void;
  handleToSetLocation: () => void;
  handleToResetLocation: () => void;
  handleToSubmit: () => void;
  data: any;
}

const ContentsSection = ({
  type,
  imgFile,
  here,
  locationInfo,
  clickedLocation,
  contents,
  switchChecked,
  handleDelete,
  setSwitchChecked,
  handleChangeContents,
  handleToSetLocation,
  handleToResetLocation,
  handleToSubmit,
  data,
}: ContentsSectionProps) => {
  return (
    <>
      {type === 'post' && imgFile && (
        <>
          {here ? (
            <>
              <Styled.SearchInput value={`${locationInfo?.countryId}, ${locationInfo?.regionId}`} disabled />
              <Styled.PinBackground>
                <Styled.Pin src={pin} alt="위치" />
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

      {type === 'post' && clickedLocation && here && (
        <>
          <Styled.ContentsInput placeholder="짧은 글을 남겨주세요!" onChange={handleChangeContents} maxLength={30} rows={2} />
          <Styled.SwitchBox>
            <Switch
              checked={switchChecked}
              onChange={setSwitchChecked}
              leftText={'전체공개'}
              rightText={'나만보기'}
              width={'300px'}
              checkedtextcolor={'#353C49'}
              textcolor={'#72808E'}
              checkedbackground={'#72808E'}
              background={'rgba(18, 18, 18, 0.6)'}
            />
          </Styled.SwitchBox>
          <Styled.SwitchBoxMobile>
            <Switch checked={switchChecked} onChange={setSwitchChecked} leftText={'lock'} rightText={'lock'} width={'70px'} checkedtextcolor={'#353C49'} textcolor={'#72808E'} checkedbackground={'#72808E'} background={'rgba(18, 18, 18, 0.6)'} />
          </Styled.SwitchBoxMobile>
          {contents === '' ? (
            <Styled.PostSubmitButton size="large" variant="gray">
              작성하기
            </Styled.PostSubmitButton>
          ) : (
            <Styled.PostSubmitButton size="large" variant="orange-shadow" onClick={handleToSubmit}>
              작성하기
            </Styled.PostSubmitButton>
          )}
        </>
      )}

      {type === 'update' && (
        <>
          <Styled.PinBackground>
            <Styled.Pin src={pin} alt="위치" />
            <Styled.PinWarning>위치는 수정이 안돼요!</Styled.PinWarning>
          </Styled.PinBackground>
          <Styled.SearchInput value={`${locationInfo.countryId}, ${locationInfo.regionId}`} disabled />
          <Styled.ContentsInput placeholder="짧은 글을 남겨주세요!" defaultValue={data?.contents} onChange={handleChangeContents} maxLength={30} rows={2} />
          <Styled.SwitchBox>
            <Switch
              checked={switchChecked}
              onChange={setSwitchChecked}
              leftText={'전체공개'}
              rightText={'나만보기'}
              width={'300px'}
              checkedtextcolor={'#353C49'}
              textcolor={'#72808E'}
              checkedbackground={'#72808E'}
              background={'rgba(18, 18, 18, 0.6)'}
            />
          </Styled.SwitchBox>
          <Styled.SwitchBoxMobile>
            <Switch checked={switchChecked} onChange={setSwitchChecked} leftText={'lock'} rightText={'lo'} width={'70px'} checkedtextcolor={'#353C49'} textcolor={'#72808E'} checkedbackground={'#72808E'} background={'rgba(18, 18, 18, 0.6)'} />
          </Styled.SwitchBoxMobile>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Styled.PostDeleteSubmitButtonForMobile size="medium" variant="deep-gray" onClick={handleDelete}>
              삭제하기
            </Styled.PostDeleteSubmitButtonForMobile>
            {contents === '' ? (
              <Styled.PostEditSubmitButtonForMobile size="medium" variant="gray">
                수정하기
              </Styled.PostEditSubmitButtonForMobile>
            ) : (
              <Styled.PostEditSubmitButtonForMobile size="medium" variant="orange-shadow" onClick={handleToSubmit}>
                수정하기
              </Styled.PostEditSubmitButtonForMobile>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ContentsSection;
