import { useEffect, useState } from 'react';

import { useHeaderModal } from './Header.hooks';
import HeaderLogin from './HeaderLogin';
import HeaderSearch from './HeaderSearch';
import * as St from './style';
import { AuthError, signin, signout } from '../../../api/supabaseAuth';
import { supabase } from '../../../api/supabaseClient';
import { addNewUser } from '../../../api/supabaseDatabase';
import logo from '../../../assets/logo.svg';
import { useMarkerInvisible } from '../../../zustand/useMarkerInvisible';
import { usePostStore } from '../../../zustand/usePostStore';
import { useSessionStore } from '../../../zustand/useSessionStore';
import { useTabStore } from '../../../zustand/useTabStore';
import Switch from '../switch/Switch';

import type { User } from '@supabase/supabase-js';

const Header = () => {
  const [_user, setUser] = useState<User>();
  const [switchChecked, setSwitchChecked] = useState(false);
  const { closePost, closeSearchList, closeLikesList, openPost, handleToSearch, handleOnEnterPress, openSearchList, openLikesList, isSearchListOpened, isLikeListOpened, handleChangeKeyword, unmount } = useHeaderModal();
  const session = useSessionStore(state => state.session);
  const setSession = useSessionStore(state => state.setSession);
  const isPostModalOpened = usePostStore(state => state.isPosting);
  const isRightModalOpened = useMarkerInvisible(state => state.isMarkerInvisible);

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
      await signout();
      setUser(undefined);
      window.location.reload();
    } catch (error) {
      if (error instanceof AuthError) {
        alert({ type: 'alert', title: '로그아웃 실패', content: error.message });
      }
    }
  };

  const fetchData = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      if (session?.user?.email) {
        await addNewUser(session.user.id, session.user.email, session.user.user_metadata.name, session.user.user_metadata.avatar_url);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession]);

  useEffect(() => {
    if (switchChecked) {
      if (session) {
        useTabStore.getState().setTab('my');
        unmount('detail');
      }
      if (!session) {
        signinHandler();
      }
    } else {
      useTabStore.getState().setTab('explore');
      unmount('detail');
    }
  }, [switchChecked, session]);

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then(value => {
        if (value.data.user) {
          setUser(value.data.user);
        }
      });
    }
    if (session === null) return;
    getUserData();
  }, []);

  return (
    <St.HeaderWrapper>
      <St.Wrapper>
        <St.HeaderLogo src={logo} alt="" onClick={() => (window.location.href = '/')} />
        <HeaderLogin openPost={openPost} closePost={closePost} signinHandler={signinHandler} signoutHandler={signoutHandler} isSearchListOpened={isSearchListOpened} />
      </St.Wrapper>

      <St.SwitchBox close={isPostModalOpened?.toString() || isRightModalOpened?.toString() || undefined}>
        <Switch
          checked={switchChecked}
          onChange={setSwitchChecked}
          leftText={'탐색'}
          rightText={'MY'}
          width={'230px'}
          $checkedtextcolor={'#FFFFFF'}
          $textcolor={'#CCCFD3'}
          $checkedbackground={'rgba(221, 82, 1, 0.4)'}
          $background={'rgba(18, 18, 18, 0.6)'}
        />
      </St.SwitchBox>
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
    </St.HeaderWrapper>
  );
};

export default Header;
