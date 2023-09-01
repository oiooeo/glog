import { Tables } from '../../types/supabase';
import PostItem from '../common/postItem/PostItem';

export const scrollToTop = (scrollRef: React.MutableRefObject<HTMLDivElement | null>) => {
  scrollRef.current?.scrollTo({
    top: 0,
  });
};

export const renderPostItems = (items: Tables<'posts'>[], startIndex: number, endIndex: number, lastItem?: boolean) => {
  return (
    <>
      {items.slice(startIndex, endIndex).map(item => (
        <PostItem key={item.id} data={item} lastItem={lastItem} />
      ))}
    </>
  );
};
