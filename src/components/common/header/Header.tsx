import React, { useEffect, useState } from 'react';
import { AuthError, signin, signout } from '../../../api/supabaseAuth';
import { supabase } from '../../../api/supabaseClient';
import * as Styled from './style';
import { BsSearch, BsHeart, BsPlusLg, BsXLg } from 'react-icons/bs';
import Switch from '../switch/Switch';
import { useModal } from '../overlay/modal/Modal.hooks';
import LikesList from '../../likesList/LikesList';
import SearchList from '../../searchList/SearchList';
import { User } from '@supabase/supabase-js';
import { addNewUser } from '../../../api/supabaseDatabase';
import Post from '../../post/Post';
import { useSessionStore } from '../../../zustand/store';

const Header = () => {
  const [user, setUser] = useState<User>();
  const [switchChecked, setSwitchChecked] = useState(false);
  const [isLikeListOpened, setIsLikeListOpened] = useState(false);
  const [isSearchListOpened, setIsSearchListOpened] = useState(false);
  const { leftMount, rightMount, unmount } = useModal();
  const session = useSessionStore(state => state.session);
  const setSession = useSessionStore(state => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session && session.user && session.user.email) addNewUser(session.user.id, session.user.email);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession]);

  useEffect(() => {
    if (switchChecked) {
      console.log('MY 탭 활성화');
    } else {
      console.log('탐색 탭 활성화');
    }
  }, [switchChecked]);

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then(value => {
        if (value.data.user) {
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  const signinHandler = async () => {
    try {
      await signin();
    } catch (error) {
      if (error instanceof AuthError) {
        alert({ type: 'alert', title: '로그인 실패', content: error.message });
      }
    }
  };

  const signoutHandler = async () => {
    try {
      signout();
      setUser(undefined);
    } catch (error) {
      if (error instanceof AuthError) {
        alert({ type: 'alert', title: '로그아웃 실패', content: error.message });
      }
    }
  };

  const openPost = () => {
    leftMount('post', <Post unmount={unmount} />);
  };

  const closeSearchList = () => {
    unmount('searchList');
    setIsSearchListOpened(false);
  };

  const closeLikesList = () => {
    unmount('likesList');
    setIsLikeListOpened(false);
  };

  const openSearchList = () => {
    rightMount('searchList', <SearchList />);
    setIsSearchListOpened(true);
    closeLikesList();
  };

  const openLikesList = () => {
    rightMount('likesList', <LikesList />);
    setIsLikeListOpened(true);
    closeSearchList();
  };

  const handleToSearch = () => {
    // 검색 결과를 SearchList 컴포넌트로 보내주기?
    // input 값만 SearchList 컴포넌트로 보내주기? < 이게 나을듯?
  };

  return (
    <Styled.HeaderWrapper>
      <Styled.Wrapper>
        <Styled.Circle>로고</Styled.Circle>
        <Styled.Circle onClick={session ? openPost : signinHandler}>
          <BsPlusLg size={'16px'} />
        </Styled.Circle>
        {session ? <Styled.AuthSpan onClick={signoutHandler}>로그아웃</Styled.AuthSpan> : <Styled.AuthSpan onClick={signinHandler}>로그인</Styled.AuthSpan>}
      </Styled.Wrapper>

      <Styled.SwitchBox>
        <Switch checked={switchChecked} onChange={setSwitchChecked} left={'탐색'} right={'MY'} />
      </Styled.SwitchBox>

      <Styled.Wrapper>
        {isSearchListOpened ? (
          <>
            <Styled.Circle onClick={closeSearchList}>
              <BsXLg size={'16px'} />
            </Styled.Circle>
            <Styled.SearchInput />
          </>
        ) : null}

        <Styled.Circle onClick={isSearchListOpened ? handleToSearch : openSearchList}>
          <BsSearch size={'16px'} />
        </Styled.Circle>

        {isLikeListOpened ? (
          <Styled.Circle onClick={closeLikesList}>
            <BsXLg size={'16px'} />
          </Styled.Circle>
        ) : (
          <Styled.Circle onClick={session ? openLikesList : signinHandler}>
            <BsHeart size={'16px'} />
          </Styled.Circle>
        )}
      </Styled.Wrapper>
    </Styled.HeaderWrapper>
  );
};

export default Header;
