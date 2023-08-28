import React, { useEffect, useState } from 'react';
import { AuthError, signin, signout } from '../../../api/supabaseAuth';
import { supabase } from '../../../api/supabaseClient';
import * as Styled from './style';
import { BsPlusCircle, BsXCircle } from 'react-icons/bs';
import { BiSearch, BiHeart } from 'react-icons/bi';
import Switch from '../switch/Switch';
import { useModal } from '../overlay/modal/Modal.hooks';
import LikesList from '../../likesList/LikesList';
import SearchList from '../../searchList/SearchList';
import { User } from '@supabase/supabase-js';
import { addNewUser } from '../../../api/supabaseDatabase';
import Post from '../../post/Post';
import { usePostStore, useSessionStore } from '../../../zustand/store';
import useInput from '../../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import toast from 'react-simple-toasts';

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
        navigate('/my');
      }
      if (!session) {
        signinHandler();
      }
    } else {
      navigate('/');
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

  const closePost = () => {
    usePostStore.getState().setIsPosting(false);
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
    usePostStore.getState().setIsPosting(true);
    leftMount('post', <Post leftMount={leftMount} unmount={unmount} setIsPostOpened={setIsPostOpened} />);
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

  const openLoginToast = () => {
    toast('로그인 해주세요!', { className: 'login-alert', position: 'top-right' });
  };

  return (
    <Styled.HeaderWrapper>
      <Styled.Wrapper>
        <Styled.HeaderLogo src={logo} alt="" />
        {isPostOpened ? (
          <Styled.ClosePostButton onClick={closePost}>
            <BsXCircle size={'22px'} />
          </Styled.ClosePostButton>
        ) : (
          <Styled.OpenPostButton onClick={session ? openPost : signinHandler}>
            <BsPlusCircle size={'22px'} className="plus" />
          </Styled.OpenPostButton>
        )}

        {session ? <Styled.AuthSpan onClick={signoutHandler}>로그아웃</Styled.AuthSpan> : <Styled.AuthSpan onClick={signinHandler}>로그인</Styled.AuthSpan>}
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

      <Styled.Wrapper>
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
                  <BsXCircle size={'22px'} />
                </Styled.CircleButton>
              </>
            ) : (
              <>
                <Styled.CircleButton onClick={session ? openLikesList : openLoginToast}>
                  <BiHeart size={'22px'} />
                </Styled.CircleButton>
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
