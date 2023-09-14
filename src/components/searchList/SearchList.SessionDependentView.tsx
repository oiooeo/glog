import React from 'react';

import RenderPostItems from './SearchList.util';
import * as Styled from './style';
import { signin } from '../../api/supabaseAuth';

import type { Tables } from '../../types/supabase';
import type { Session } from '@supabase/supabase-js';

interface Props {
  session: Session | null;
  searchResult: Array<Tables<'posts'>> | undefined;
}

const SessionDependentView = ({ session, searchResult }: Props, ref: any) => {
  return (
    <>
      {session ? (
        <Styled.ScrollDiv>{searchResult && <RenderPostItems searchResult={searchResult} ref={ref} />}</Styled.ScrollDiv>
      ) : (
        <Styled.ScrollDiv>
          {searchResult && <RenderPostItems searchResult={searchResult} lastItem={true} />}
          <Styled.LoginGuideButton onClick={() => signin}>더 많은 정보를 보고 싶으시다면 로그인 해주세요!</Styled.LoginGuideButton>
        </Styled.ScrollDiv>
      )}
    </>
  );
};

export default React.forwardRef(SessionDependentView);
