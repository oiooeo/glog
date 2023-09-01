import * as Styled from './style';
import logo from '../../../assets/logo.svg';
import { useEffect, useState } from 'react';
import { supabase } from '../../../api/supabaseClient';
import { AuthError, signin, signout } from '../../../api/supabaseAuth';
import { addNewUser } from '../../../api/supabaseDatabase';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '../../../zustand/useSessionStore';
import { useTabStore } from '../../../zustand/useTabStore';
import { useHeaderModal } from './Header.hooks';
import HeaderLogin from './HeaderLogin';
import HeaderSearch from './HeaderSearch';
import Switch from '../switch/Switch';

import type { User } from '@supabase/supabase-js';

const Header = () => {
  const [user, setUser] = useState<User>();
  const [switchChecked, setSwitchChecked] = useState(false);
  const { closePost, closeSearchList, closeLikesList, openPost, handleToSearch, handleOnEnterPress, openSearchList, openLikesList, isSearchListOpened, isLikeListOpened, handleChangeKeyword } = useHeaderModal();
  const session = useSessionStore(state => state.session);
  const setSession = useSessionStore(state => state.setSession);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session && session.user && session.user.email) addNewUser(session.user.id, session.user.email, session.user.user_metadata.name, session.user.user_metadata.avatar_url);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession]);

  useEffect(() => {
    if (switchChecked) {
      if (session) {
        useTabStore.getState().setTab('my');
      }
      if (!session) {
        signinHandler();
      }
    } else {
      useTabStore.getState().setTab('explore');
    }
  }, [switchChecked, navigate, session]);

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
      await signout();
      setUser(undefined);
      navigate('/');
      window.location.reload();
    } catch (error) {
      if (error instanceof AuthError) {
        alert({ type: 'alert', title: '로그아웃 실패', content: error.message });
      }
    }
  };

  return (
    <Styled.HeaderWrapper>
      <Styled.Wrapper>
        <Styled.HeaderLogo src={logo} alt="" onClick={() => (window.location.href = '/')} />
        <HeaderLogin openPost={openPost} closePost={closePost} signinHandler={signinHandler} signoutHandler={signoutHandler} />
      </Styled.Wrapper>

      <Styled.SwitchBox>
        <Switch
          checked={switchChecked}
          onChange={setSwitchChecked}
          leftText={'탐색'}
          rightText={'MY'}
          width={'230px'}
          checkedtextcolor={'#FFFFFF'}
          textcolor={'#CCCFD3'}
          checkedbackground={'rgba(221, 82, 1, 0.4)'}
          background={'rgba(18, 18, 18, 0.6)'}
        />
      </Styled.SwitchBox>
      <HeaderSearch
        openSearchList={openSearchList}
        closeSearchList={closeSearchList}
        handleToSearch={handleToSearch}
        closeLikesList={closeLikesList}
        openLikesList={openLikesList}
        signinHandler={signinHandler}
        handleOnEnterPress={handleOnEnterPress}
        isSearchListOpened={isSearchListOpened}
        isLikeListOpened={isLikeListOpened}
        handleChangeKeyword={handleChangeKeyword}
      />
    </Styled.HeaderWrapper>
  );
};

export default Header;
