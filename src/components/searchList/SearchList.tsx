import React, { useEffect, useState, useRef } from 'react';
import PostItem from '../common/postItem/PostItem';
import * as Styled from './style';
import { useQuery } from '@tanstack/react-query';
import { getMyPosts, getPosts } from '../../api/supabaseDatabase';
import { Tables } from '../../types/supabase';
import { useSessionStore, useTabStore } from '../../zustand/store';
import { signin } from '../../api/supabaseAuth';
import ReactLoading from 'react-loading';

type SearchListProps = {
  keyword: string;
  isSearchListOpened: boolean;
};

const SearchList: React.FC<SearchListProps> = ({ keyword, isSearchListOpened }) => {
  const [key, setKey] = useState('');
  const [searchResult, setSearchResult] = useState<Tables<'posts'>[]>();
  const [page, setPage] = useState<number>(1);
  const session = useSessionStore(state => state.session);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: postsData } = useQuery(['getPosts'], getPosts);
  const [data, setData] = useState<Tables<'posts'>[]>();
  const [myData, setMyData] = useState<Tables<'posts'>[]>();
  const tab = useTabStore(state => state.tab);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchMyPosts() {
      try {
        if (session) {
          const data = await getMyPosts(session.user.id);
          setMyData(data);
        }
      } catch (error) {
        console.error('Error fetching liked posts:', error);
      }
    }

    fetchMyPosts();
  }, [session]);

  useEffect(() => {
    if (tab === 'explore') {
      setData(postsData);
      scrollToTop();
      setPage(1);
    } else if (tab === 'my') {
      setData(myData);
      scrollToTop();
      setPage(1);
    }
  }, [tab, postsData, myData]);

  useEffect(() => {
    if (isSearchListOpened) {
      setKey(keyword);
    } else setKey('');
  }, [keyword, isSearchListOpened]);

  useEffect(() => {
    const searchData = data?.filter(item => item.countryId?.includes(key) || item.regionId?.includes(key) || item.address?.includes(key));
    if (searchData) {
      const filterData = searchData?.slice(0, page * 5);
      setSearchResult(filterData);
    } else {
      const scrollData = data?.slice(0, page * 5);
      setSearchResult(scrollData);
    }
  }, [data, page, key]);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      top: 0,
    });
  };

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

  return (
    <>
      {session ? (
        <>
          <Styled.ScrollDiv ref={scrollRef}>
            {searchResult?.map(item => (
              <PostItem key={item.id} data={item} />
            ))}
          </Styled.ScrollDiv>
          {loading && (
            <Styled.LoadingDiv>
              <ReactLoading type="spin" color="#ffffff" width={'50px'} />
            </Styled.LoadingDiv>
          )}
        </>
      ) : (
        <>
          {searchResult?.slice(0, 4).map(item => (
            <PostItem key={item.id} data={item} />
          ))}
          <Styled.LoginGuideButton onClick={signin}>더 많은 정보를 보고 싶으시다면 로그인 해주세요!</Styled.LoginGuideButton>
          {searchResult?.slice(4, 5).map(item => (
            <PostItem key={item.id} data={item} lastItem={true} />
          ))}
        </>
      )}
    </>
  );
};

export default SearchList;
