import React from 'react';
import * as Styled from './style';
import { BsSearch, BsHeart, BsPlusLg } from 'react-icons/bs';

const Header = () => {
  return (
    <Styled.HeaderWrapper>
      <Styled.Wrapper>
        <Styled.Circle>로고</Styled.Circle>
        <Styled.Circle>
          <BsPlusLg />
        </Styled.Circle>
      </Styled.Wrapper>
      <Styled.Wrapper>
        <Styled.Circle>
          <BsSearch />
        </Styled.Circle>
        <Styled.Circle>
          <BsHeart />
        </Styled.Circle>
      </Styled.Wrapper>
    </Styled.HeaderWrapper>
  );
};

export default Header;
