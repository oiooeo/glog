import React, { useEffect, useState } from 'react';
import PostItem from '../common/postItem/PostItem';
import * as Styled from './style';
import { useQuery } from '@tanstack/react-query';
import { getMyPosts, getPosts } from '../../api/supabaseDatabase';
import { Tables } from '../../types/supabase';
import { useSessionStore, useTabStore } from '../../zustand/store';
import { signin } from '../../api/supabaseAuth';

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
    } else if (tab === 'my') {
      setData(myData);
    }
  }, [tab, postsData, myData]);

  useEffect(() => {
    if (isSearchListOpened) {
      setKey(keyword);
    } else setKey('');
  }, [keyword, isSearchListOpened]);

  useEffect(() => {
    if (data) {
      const filteredData = data?.filter(item => item.countryId?.includes(key) || item.regionId?.includes(key) || item.address?.includes(key));
      const sortedData = [...filteredData].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

      setSearchResult(sortedData);
    }
  }, [data, key]);

  useEffect(() => {
    console.log(data);
    const searchData = data?.filter(item => item.countryId?.includes(key) || item.regionId?.includes(key) || item.address?.includes(key));
    if (searchData) {
      const filterData = searchData?.slice(0, page * 5);
      setSearchResult(filterData);
    } else {
      const scrollData = data?.slice(0, page * 5);
      setSearchResult(scrollData);
    }
  }, [page, key]);

  const handleScroll = () => {
    setLoading(true);
    const scrollSearch = document.querySelector('.scrollSearch');
    if (scrollSearch) {
      const isAtBottom = scrollSearch.scrollHeight - scrollSearch.scrollTop === scrollSearch.clientHeight;
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
    const scrollSearch = document.querySelector('.scrollSearch');
    scrollSearch?.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {session ? (
        <>
          <Styled.ScrollDiv className="scrollSearch">
            {searchResult?.map(item => (
              <PostItem key={item.id} data={item} />
            ))}
          </Styled.ScrollDiv>
          {loading && <Styled.LoadingDiv>Loading..</Styled.LoadingDiv>}
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
