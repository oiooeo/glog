import React, { useEffect, useState } from 'react';
import PostItem from '../common/postItem/PostItem';
import * as Styled from './style';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../api/supabaseDatabase';
import { Tables } from '../../types/supabase';
import { useSessionStore } from '../../zustand/store';
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
  const { data } = useQuery(['getPosts'], getPosts);

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
    if (data) {
      const filterData = data.slice(0, page * 5);
      setSearchResult(filterData);
    }
  }, [page]);

  const handleScroll = () => {
    setLoading(true);
    const scrollDiv = document.querySelector('.scrollDiv');
    if (scrollDiv) {
      const isAtBottom = scrollDiv.scrollHeight - scrollDiv.scrollTop === scrollDiv.clientHeight;
      if (isAtBottom) {
        setTimeout(() => {
          setPage(prev => prev + 1);
          setLoading(false);
        }, 1000); // 1초 후에 페이지 번호 증가 및 로딩 종료
      } else {
        setLoading(false); // 맨 아래로 스크롤하지 않았을 때는 로딩 종료
      }
    }
  };

  useEffect(() => {
    const scrollDiv = document.querySelector('.scrollDiv');
    scrollDiv?.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {session ? (
        <>
          <Styled.scrollDiv className="scrollDiv">
            {searchResult?.map(item => (
              <PostItem key={item.id} data={item} />
            ))}
          </Styled.scrollDiv>
          {loading && <Styled.loadingDiv>Loading..</Styled.loadingDiv>}
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
