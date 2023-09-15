import React from 'react';

import PostItem from '../common/postItem/PostItem';

import type { Tables } from '../../types/supabase';

export const scrollToTop = (scrollRef: any) => {
  scrollRef?.scrollTo({
    top: 0,
  });
};

interface renderPostItemsProps {
  searchResult: Array<Tables<'posts'>>;
  lastItem?: boolean | null;
}

const RefRenderPostItems = ({ searchResult, lastItem }: renderPostItemsProps, ref?: any) => {
  return (
    <>
      {searchResult.map((post, index) => {
        return <PostItem key={post.id} data={post} ref={searchResult.length - 1 === index ? ref : null} lastItem={searchResult.length - 1 === index ? lastItem : null} />;
      })}
    </>
  );
};

export default React.forwardRef(RefRenderPostItems);
