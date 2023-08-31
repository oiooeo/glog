import React from 'react';
import ReactLoading from 'react-loading';
import * as Styled from './style';
import { Session } from '@supabase/supabase-js';
import { renderPostItems } from './SearchList.until';
import { signin } from '../../api/supabaseAuth';

import type { Tables } from '../../types/supabase';

type Props = {
  session: Session | null;
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
  searchResult: Tables<'posts'>[] | undefined;
  loading: boolean;
};

const SessionDependentView = ({ session, scrollRef, searchResult, loading }: Props) => {
  return (
    <>
      {session ? (
        <Styled.ScrollDiv ref={scrollRef}>{searchResult && renderPostItems(searchResult, 0, searchResult.length)}</Styled.ScrollDiv>
      ) : (
        <>
          {searchResult && renderPostItems(searchResult, 0, 4)}
          <Styled.LoginGuideButton onClick={signin}>더 많은 정보를 보고 싶으시다면 로그인 해주세요!</Styled.LoginGuideButton>
          {searchResult && renderPostItems(searchResult, 4, 5, true)}
        </>
      )}
      {loading && (
        <Styled.LoadingDiv>
          <ReactLoading type="spin" color="#ffffff" width={'50px'} />
        </Styled.LoadingDiv>
      )}
    </>
  );
};

export default SessionDependentView;
