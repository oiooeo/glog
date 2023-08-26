import React, { useEffect, useState } from 'react';
import PostItem from '../common/postItem/PostItem';
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
  const session = useSessionStore(state => state.session);
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

  return (
    <>
      {session ? (
        <>
          {searchResult?.map(item => (
            <PostItem key={item.id} data={item} />
          ))}
        </>
      ) : (
        <>
          {searchResult?.slice(0, 5).map(item => (
            <PostItem key={item.id} data={item} />
          ))}
          <button onClick={signin}>로그인하세요</button>
        </>
      )}
    </>
  );
};

export default SearchList;
