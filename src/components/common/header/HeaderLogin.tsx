import { BsPlusCircle, BsXCircle } from 'react-icons/bs';

import * as Styled from './style';
import { usePostStore } from '../../../zustand/usePostStore';
import { useSessionStore } from '../../../zustand/useSessionStore';

interface HeaderLoginTypes {
  openPost: () => void;
  signinHandler: () => void;
  signoutHandler: () => Promise<void>;
  closePost: () => void;
  isSearchListOpened: boolean;
}

const HeaderLogin = (props: HeaderLoginTypes) => {
  const { openPost, signinHandler, signoutHandler, closePost, isSearchListOpened } = props;
  const session = useSessionStore(state => state.session);
  const isPostModalOpened = usePostStore(state => state.isPosting);
  const handleToSignOut = () => {
    signoutHandler();
  };

  return (
    <>
      {isPostModalOpened ? (
        <Styled.ClosePostButton onClick={closePost}>
          <BsXCircle size={'22px'} />
        </Styled.ClosePostButton>
      ) : (
        <Styled.OpenPostButton onClick={session ? openPost : signinHandler}>
          <BsPlusCircle size={'22px'} className="plus" />
          {!session && <Styled.Tooltip>글 작성하기</Styled.Tooltip>}
        </Styled.OpenPostButton>
      )}

      {session ? (
        <Styled.AuthSpan onClick={handleToSignOut} opened={isSearchListOpened || undefined}>
          로그아웃
        </Styled.AuthSpan>
      ) : (
        <Styled.AuthSpan onClick={signinHandler} opened={isSearchListOpened || undefined}>
          로그인
        </Styled.AuthSpan>
      )}
    </>
  );
};

export default HeaderLogin;
