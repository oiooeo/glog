import PostItem from '../common/postItem/PostItem';

import type { Tables } from '../../types/supabase';

export const scrollToTop = (scrollRef: React.MutableRefObject<HTMLDivElement | null>) => {
  scrollRef.current?.scrollTo({
    top: 0,
  });
};

export const renderPostItems = (items: Array<Tables<'posts'>>, startIndex: number, endIndex: number, lastItem?: boolean) => {
  return (
    <>
      {items.slice(startIndex, endIndex).map(item => (
        <PostItem key={item.id} data={item} lastItem={lastItem} />
      ))}
    </>
  );
};
