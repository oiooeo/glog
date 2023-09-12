import React, { useEffect, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import SessionDependentView from './SearchList.SessionDependentView';
import { scrollToTop } from './SearchList.util';
import { getMyPosts, getPosts } from '../../api/supabaseDatabase';
import { useMapLocationStore } from '../../zustand/useMapLocationStore';
import { useSearchStore } from '../../zustand/useSearchStore';
import { useSessionStore } from '../../zustand/useSessionStore';
import { useTabStore } from '../../zustand/useTabStore';

import type { Tables } from '../../types/supabase';

interface SearchListProps {
  keyword: string;
  isSearchListOpened: boolean;
}

const SearchList = ({ keyword, isSearchListOpened }: SearchListProps) => {
  const { key, setKey } = useSearchStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const mapLocation = useMapLocationStore(state => state.mapLocation);

  const [searchResult, setSearchResult] = useState<Array<Tables<'posts'>>>();
  const session = useSessionStore(state => state.session);
  const tab = useTabStore(state => state.tab);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { data: postsData } = useQuery(['getPosts'], getPosts);
  const { data: myData } = useQuery(['getMyPosts'], async () => await getMyPosts(session?.user.id as string));

  const fetchData = tab === 'explore' ? postsData : tab === 'my' ? myData : null;
  const data = tab === 'explore' || tab === 'my' ? fetchData : null;

  const handleScroll = () => {
    setLoading(true);
    if (scrollRef.current) {
      const isAtBottom = scrollRef.current.scrollHeight - scrollRef.current.scrollTop === scrollRef.current.clientHeight;
      if (isAtBottom) {
        setTimeout(() => {
          setPage(prev => prev + 1);
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    scrollToTop(scrollRef);
    setPage(1);
  }, [tab]);

  useEffect(() => {
    if (isSearchListOpened) {
      setKey(keyword);
    } else setKey('');
  }, [keyword, isSearchListOpened]);

  useEffect(() => {
    const searchData = data?.filter(item => item.countryId?.includes(key) || item.regionId?.includes(key) || item.address?.includes(key));
    const filterData = searchData?.slice(0, page * 5);
    setSearchResult(filterData);
  }, [data, page, key]);

  useEffect(() => {
    if (searchResult && searchResult.length > 0 && key.length > 0) {
      const correctResult = searchResult[0]?.countryId?.includes(key) || searchResult[0]?.regionId?.includes(key) || searchResult[0].address?.includes(key);
      if (correctResult) {
        const coordinates: [number, number] = [searchResult[0].longitude, searchResult[0].latitude];
        mapLocation.flyTo({ center: coordinates, zoom: 4 });
      }
    }
  }, [key, searchResult, mapLocation]);

  return <SessionDependentView session={session} scrollRef={scrollRef} searchResult={searchResult} loading={loading} />;
};

export default SearchList;
