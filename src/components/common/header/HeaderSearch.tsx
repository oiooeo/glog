import React from 'react';
import * as Styled from './style';
import { BsXCircle } from 'react-icons/bs';
import { BiSearch, BiHeart, BiSolidHeart } from 'react-icons/bi';
import { useSessionStore } from '../../../zustand/useSessionStore';

type HeaderSearch = {
  openSearchList: () => void;
  closeSearchList: () => void;
  handleToSearch: () => void;
  closeLikesList: () => void;
  openLikesList: () => void;
  signinHandler: () => void;
  handleOnEnterPress: (e: React.KeyboardEvent) => void;
  isSearchListOpened: boolean;
  isLikeListOpened: boolean;
  handleChangeKeyword: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => void;
};
const HeaderSearch = (props: HeaderSearch) => {
  const { openSearchList, closeSearchList, handleToSearch, closeLikesList, openLikesList, signinHandler, handleOnEnterPress, isSearchListOpened, isLikeListOpened, handleChangeKeyword } = props;

  const session = useSessionStore(state => state.session);

  return (
    <>
      {isSearchListOpened ? (
        <>
          <Styled.CircleButton onClick={closeSearchList}>
            <BsXCircle size={'22px'} />
          </Styled.CircleButton>
          <Styled.SearchBox>
            <Styled.SearchInput placeholder="가고 싶은 여행지를 입력하세요" type="text" name="keyword" onChange={handleChangeKeyword} onKeyPress={handleOnEnterPress} maxLength={20} autoComplete="off" />
            <Styled.SearchButton type="button" onClick={handleToSearch}>
              <BiSearch size={'22px'} />
            </Styled.SearchButton>
          </Styled.SearchBox>
        </>
      ) : (
        <>
          <Styled.CircleButton onClick={openSearchList}>
            <BiSearch size={'22px'} />
          </Styled.CircleButton>
          {isLikeListOpened ? (
            <>
              <Styled.CircleButton onClick={closeLikesList}>
                <BiSolidHeart size={'22px'} />
              </Styled.CircleButton>
            </>
          ) : (
            <>
              <Styled.CircleButton onClick={session ? openLikesList : signinHandler}>
                <BiHeart size={'22px'} />
              </Styled.CircleButton>
            </>
          )}
        </>
      )}
    </>
  );
};

export default HeaderSearch;
