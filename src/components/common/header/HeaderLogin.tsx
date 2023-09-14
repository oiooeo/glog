import { BsPlusCircle, BsXCircle } from 'react-icons/bs';

import * as St from './style';
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
        <St.ClosePostButton onClick={closePost}>
          <BsXCircle size={'22px'} />
        </St.ClosePostButton>
      ) : (
        <St.OpenPostButton onClick={session ? openPost : signinHandler}>
          <BsPlusCircle size={'22px'} className="plus" />
          {!session && <St.Tooltip>글 작성하기</St.Tooltip>}
        </St.OpenPostButton>
      )}

      {session ? (
        <St.AuthSpan onClick={handleToSignOut} opened={isSearchListOpened || undefined}>
          로그아웃
        </St.AuthSpan>
      ) : (
        <St.AuthSpan onClick={signinHandler} opened={isSearchListOpened || undefined}>
          로그인
        </St.AuthSpan>
      )}
    </>
  );
};

export default HeaderLogin;
