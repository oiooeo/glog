import React from 'react';

import { renderPostItems } from './SearchList.util';
import * as St from './style';
import { signin } from '../../api/supabaseAuth';
import Loader from '../common/loader/Loader';

import type { Tables } from '../../types/supabase';
import type { Session } from '@supabase/supabase-js';

interface Props {
  session: Session | null;
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
  searchResult: Array<Tables<'posts'>> | undefined;
  loading: boolean;
}

const SessionDependentView = ({ session, scrollRef, searchResult, loading }: Props) => {
  return (
    <>
      {session ? (
        <St.ScrollDiv ref={scrollRef}>{searchResult && renderPostItems(searchResult, 0, searchResult.length)}</St.ScrollDiv>
      ) : (
        <St.ScrollDiv>
          {searchResult && renderPostItems(searchResult, 0, 4)}
          <St.LoginGuideButton onClick={() => signin}>더 많은 정보를 보고 싶으시다면 로그인 해주세요!</St.LoginGuideButton>
          {searchResult && renderPostItems(searchResult, 4, 5, true)}
        </St.ScrollDiv>
      )}
      {loading && (
        <St.LoadingDiv>
          <Loader />
        </St.LoadingDiv>
      )}
    </>
  );
};

export default SessionDependentView;
