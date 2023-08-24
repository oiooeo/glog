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
import useInput from '../../../hooks/useInput';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState<User>();
  const [switchChecked, setSwitchChecked] = useState(false);
  const [isPostOpened, setIsPostOpened] = useState(false);
  const [isLikeListOpened, setIsLikeListOpened] = useState(false);
  const [isSearchListOpened, setIsSearchListOpened] = useState(false);
  const [keyword, handleChangeKeyword] = useInput();
  const { leftMount, rightMount, unmount } = useModal();
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
        console.log('MY 탭 활성화');
        navigate('/my');
      }
      if (!session) {
        signinHandler();
      }
    } else {
      console.log('탐색 탭 활성화');
      navigate('/');
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
      navigate('/');
      window.location.reload();
    } catch (error) {
      if (error instanceof AuthError) {
        alert({ type: 'alert', title: '로그아웃 실패', content: error.message });
      }
    }
  };

  const closePost = () => {
    unmount('post');
    setIsPostOpened(false);
  };

  const closeSearchList = () => {
    unmount('searchList');
    setIsSearchListOpened(false);
  };

  const closeLikesList = () => {
    unmount('likesList');
    setIsLikeListOpened(false);
  };

  const openPost = () => {
    leftMount('post', <Post unmount={unmount} />);
    setIsPostOpened(true);
    closeLikesList();
    closeSearchList();
  };

  const handleToSearch = () => {
    rightMount('searchList', <SearchList keyword={keyword} isSearchListOpened={isSearchListOpened} />);
  };

  const handleOnEnterPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleToSearch();
    }
  };

  const openSearchList = () => {
    closeLikesList();
    setIsSearchListOpened(true);
    handleToSearch();
  };

  const openLikesList = () => {
    closeSearchList();
    setIsLikeListOpened(true);
    rightMount('likesList', <LikesList />);
  };

  return (
    <Styled.HeaderWrapper>
      <Styled.Wrapper>
        <Styled.Circle>로고</Styled.Circle>
        {isPostOpened ? (
          <Styled.Circle onClick={closePost}>
            <BsXLg size={'16px'} />
          </Styled.Circle>
        ) : (
          <Styled.Circle onClick={session ? openPost : signinHandler}>
            <BsPlusLg size={'16px'} />
          </Styled.Circle>
        )}

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
            <Styled.SearchInput placeholder="검색" type="text" name="keyword" onChange={handleChangeKeyword} onKeyPress={handleOnEnterPress} maxLength={20} />
            <Styled.SearchButton type="button" onClick={handleToSearch}>
              <BsSearch size={'16px'} />
            </Styled.SearchButton>
          </>
        ) : (
          <>
            <Styled.Circle onClick={openSearchList}>
              <BsSearch size={'16px'} />
            </Styled.Circle>
            {isLikeListOpened ? (
              <>
                <Styled.Circle onClick={closeLikesList}>
                  <BsXLg size={'16px'} />
                </Styled.Circle>
              </>
            ) : (
              <>
                <Styled.Circle onClick={session ? openLikesList : signinHandler}>
                  <BsHeart size={'16px'} />
                </Styled.Circle>
              </>
            )}
          </>
        )}

        {}
      </Styled.Wrapper>
    </Styled.HeaderWrapper>
  );
};

export default Header;
