import React from 'react';

import { BiSearch } from 'react-icons/bi';

import * as Styled from './style';

interface SearchBoxProps {
  onSearch: (value: string) => void;
  value: string;
  setValue: (value: string) => void;
}

const SearchBox = ({ onSearch, value, setValue }: SearchBoxProps) => {
  const doSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={doSearch}>
      <Styled.SearchBox>
        <Styled.SearchInput
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
          placeholder="여행지의 지역명을 검색해보세요"
        />
        <Styled.SearchButton type="submit">
          <BiSearch size={'22px'} />
        </Styled.SearchButton>
      </Styled.SearchBox>
    </form>
  );
};

export default SearchBox;
