import React, { useEffect, useState } from 'react';
import { AuthError, signin, signout } from '../../../api/supabaseAuth';
import { supabase } from '../../../api/supabaseClient';
import * as Styled from './style';
import { BsSearch, BsHeart, BsPlusLg } from 'react-icons/bs';
import useSessionStore from '../../../hooks/useSessionStore';

const Header = () => {
  const [user, setUser] = useState({});
  const session = useSessionStore(state => state.session);
  const setSession = useSessionStore(state => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession]);

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

  const signinHandler = () => {
    try {
      signin();
    } catch (error) {
      if (error instanceof AuthError) {
        alert({ type: 'alert', title: '로그인 실패', content: error.message });
      }
    }
  };

  const signoutHandler = async () => {
    try {
      signout();
    } catch (error) {
      if (error instanceof AuthError) {
        alert({ type: 'alert', title: '로그아웃 실패', content: error.message });
      }
    }
  };

  return (
    <Styled.HeaderWrapper>
      <Styled.Wrapper>
        <Styled.Circle>로고</Styled.Circle>
        <Styled.Circle>
          <BsPlusLg />
        </Styled.Circle>
        {session ? <Styled.AuthText onClick={signoutHandler}>로그아웃</Styled.AuthText> : <Styled.AuthText onClick={signinHandler}>로그인</Styled.AuthText>}
      </Styled.Wrapper>
      <Styled.Wrapper>
        <Styled.Circle>
          <BsSearch />
        </Styled.Circle>
        <Styled.Circle>
          <BsHeart />
        </Styled.Circle>
      </Styled.Wrapper>
    </Styled.HeaderWrapper>
  );
};

export default Header;
