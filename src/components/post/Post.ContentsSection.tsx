import React from 'react';

import * as Styled from './style';
import pin from '../../assets/pin/pinLarge.svg';
import Button from '../common/button/Button';
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
  deleteButton: (postId: string) => Promise<void>;
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
  deleteButton,
  data,
}: ContentsSectionProps) => {
  return (
    <>
      {type === 'post' && imgFile && (
        <>
          <GlobeSearch />
          {here ? (
            <Styled.PinBackground>
              <Styled.Pin src={pin} alt="위치" />
              <Styled.PinButton size="large" variant="black" onClick={handleToResetLocation}>
                수정하기
              </Styled.PinButton>
            </Styled.PinBackground>
          ) : (
            <>
              <Styled.PinParagraph>
                지구본을 움직여 <br /> 정확한 위치에 핀을 꽂아주세요!
              </Styled.PinParagraph>
              <Styled.Pin src={pin} alt="위치" />
              {clickedLocation.latitude === 0 || clickedLocation.longitude === 0 ? (
                <Styled.PinButton size="large" variant="gray">
                  여기예요!
                </Styled.PinButton>
              ) : (
                <Styled.PinButton size="large" variant="orange" onClick={handleToSetLocation}>
                  여기예요!
                </Styled.PinButton>
              )}
            </>
          )}
        </>
      )}

      {clickedLocation && here && (
        <>
          <Styled.ContentsInput placeholder="짧은 글을 남겨주세요!" onChange={handleChangeContents} maxLength={30} rows={2} />
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
          {contents === '' ? (
            <Button size="large" variant="gray">
              작성하기
            </Button>
          ) : (
            <Button size="large" variant="orange-shadow" onClick={handleToSubmit}>
              작성하기
            </Button>
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
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button size="medium" variant="deep-gray" onClick={handleDelete}>
              삭제하기
            </Button>
            {contents === '' ? (
              <Button size="medium" variant="gray">
                수정하기
              </Button>
            ) : (
              <Button size="medium" variant="orange-shadow" onClick={handleToSubmit}>
                수정하기
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ContentsSection;
