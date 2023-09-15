import React from 'react';

import PostItem from '../common/postItem/PostItem';

import type { Tables } from '../../types/supabase';

interface renderPostItemsProps {
  searchResult: Array<Tables<'posts'>>;
  lastitem?: boolean | null;
}

const RefRenderPostItems = ({ searchResult, lastitem }: renderPostItemsProps, ref?: any) => {
  return (
    <>
      {searchResult.map((post, index) => {
        return <PostItem key={post.id} data={post} ref={searchResult.length - 1 === index ? ref : null} lastitem={searchResult.length - 1 === index ? lastitem : null} />;
      })}
    </>
  );
};

export default React.forwardRef(RefRenderPostItems);
