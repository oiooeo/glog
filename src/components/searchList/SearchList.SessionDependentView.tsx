import React from 'react';

import { renderPostItems } from './SearchList.util';
import * as Styled from './style';
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
        <Styled.ScrollDiv ref={scrollRef}>{searchResult && renderPostItems(searchResult, 0, searchResult.length)}</Styled.ScrollDiv>
      ) : (
        <Styled.ScrollDiv>
          {searchResult && renderPostItems(searchResult, 0, 4)}
          <Styled.LoginGuideButton onClick={() => signin}>더 많은 정보를 보고 싶으시다면 로그인 해주세요!</Styled.LoginGuideButton>
          {searchResult && renderPostItems(searchResult, 4, 5, true)}
        </Styled.ScrollDiv>
      )}
      {loading && (
        <Styled.LoadingDiv>
          <Loader />
        </Styled.LoadingDiv>
      )}
    </>
  );
};

export default SessionDependentView;
