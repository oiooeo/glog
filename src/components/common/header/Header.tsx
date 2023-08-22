import React, { useEffect, useState } from 'react';
import { AuthError, signin, signout } from '../../../api/supabaseAuth';
import { supabase } from '../../../api/supabaseClient';
import * as Styled from './style';
import { BsSearch, BsHeart, BsPlusLg } from 'react-icons/bs';
import useSessionStore from '../../../hooks/useSessionStore';
import Switch from '../switch/Switch';
import { useModal } from '../overlay/modal/Modal.hooks';
import LikesList from '../../likesList/LikesList';
import SearchList from '../../searchList/SearchList';
import { User } from '@supabase/supabase-js';
import { addNewUser } from '../../../api/supabaseDatabase';

const Header = () => {
  const [user, setUser] = useState<User>();
  const [switchChecked, setSwitchChecked] = useState(false);
  const { rightMount, unmount } = useModal();
  const session = useSessionStore(state => state.session);
  const setSession = useSessionStore(state => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session && session.user && session.user.email) addNewUser(session.user.email);
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
          console.log(value.data.user);
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

  const openSearchList = () => {
    rightMount('searchList', <SearchList />);
  };

  const openLikesList = () => {
    rightMount('likesList', <LikesList />);
  };

  return (
    <Styled.HeaderWrapper>
      <Styled.Wrapper>
        <Styled.Circle>로고</Styled.Circle>
        <Styled.Circle>
          <BsPlusLg size={'16px'} />
        </Styled.Circle>
        {session ? <Styled.AuthSpan onClick={signoutHandler}>로그아웃</Styled.AuthSpan> : <Styled.AuthSpan onClick={signinHandler}>로그인</Styled.AuthSpan>}
      </Styled.Wrapper>
      <Switch checked={switchChecked} onChange={setSwitchChecked} left={'탐색'} right={'MY'} />
      <Styled.Wrapper>
        <Styled.Circle onClick={openSearchList}>
          <BsSearch size={'16px'} />
        </Styled.Circle>
        <Styled.Circle onClick={openLikesList}>
          <BsHeart size={'16px'} />
        </Styled.Circle>
      </Styled.Wrapper>
    </Styled.HeaderWrapper>
  );
};

export default Header;
