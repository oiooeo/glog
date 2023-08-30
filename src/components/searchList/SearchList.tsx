import React, { useEffect, useState, useRef } from 'react';
import ReactLoading from 'react-loading';
import * as Styled from './style';
import { useQuery } from '@tanstack/react-query';
import { getMyPosts, getPosts } from '../../api/supabaseDatabase';
import { signin } from '../../api/supabaseAuth';
import { useSessionStore } from '../../zustand/useSessionStore';
import { useTabStore } from '../../zustand/useTabStore';
import { renderPostItems, scrollToTop } from './SearchList.until';

import type { Tables } from '../../types/supabase';

type SearchListProps = {
  keyword: string;
  isSearchListOpened: boolean;
};

const SearchList = ({ keyword, isSearchListOpened }: SearchListProps) => {
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const [searchResult, setSearchResult] = useState<Tables<'posts'>[]>();
  const session = useSessionStore(state => state.session);
  const tab = useTabStore(state => state.tab);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { data: postsData } = useQuery(['getPosts'], getPosts);
  const { data: myData } = useQuery(['getMyPosts'], () => getMyPosts(session?.user.id as string));

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

export default SearchList;
