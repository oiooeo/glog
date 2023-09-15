import React from 'react';

import { BiHeart, BiSearch, BiSolidHeart } from 'react-icons/bi';
import { BsXCircle } from 'react-icons/bs';

import * as St from './style';
import { useSessionStore } from '../../../zustand/useSessionStore';

interface HeaderSearchTypes {
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
}
const HeaderSearch = (props: HeaderSearchTypes) => {
  const { openSearchList, closeSearchList, handleToSearch, closeLikesList, openLikesList, signinHandler, handleOnEnterPress, isSearchListOpened, isLikeListOpened, handleChangeKeyword } = props;

  const session = useSessionStore(state => state.session);

  return (
    <St.Wrapper>
      {isSearchListOpened ? (
        <>
          <St.CircleButton onClick={closeSearchList} opened={isSearchListOpened.toString() || undefined}>
            <BsXCircle size={'22px'} />
          </St.CircleButton>
          <St.SearchBox>
            <St.SearchInput placeholder="가고 싶은 여행지를 입력하세요" type="text" name="keyword" onChange={handleChangeKeyword} onKeyPress={handleOnEnterPress} maxLength={20} autoComplete="off" />
            <St.SearchButton type="button" onClick={handleToSearch}>
              <BiSearch size={'22px'} />
            </St.SearchButton>
          </St.SearchBox>
        </>
      ) : (
        <>
          <St.CircleButton onClick={openSearchList}>
            <BiSearch size={'22px'} />
          </St.CircleButton>
          {isLikeListOpened ? (
            <>
              <St.CircleButton onClick={closeLikesList}>
                <BiSolidHeart size={'22px'} />
              </St.CircleButton>
            </>
          ) : (
            <>
              <St.CircleButton onClick={session ? openLikesList : signinHandler}>
                <BiHeart size={'22px'} />
              </St.CircleButton>
            </>
          )}
        </>
      )}
    </St.Wrapper>
  );
};

export default HeaderSearch;
