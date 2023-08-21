import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const LogoText = styled.span`
  font-size: 10px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  background-color: f0f0f0;
  border: none;
  cursor: pointer;
  font-size: 15px;
  color: #333;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <IconButton>
          <LogoText>로고</LogoText>
        </IconButton>
        <IconButton>+</IconButton>
      </LogoWrapper>
      <IconWrapper>
        <IconButton>검색</IconButton>
        <IconButton>하트</IconButton>
      </IconWrapper>
    </HeaderWrapper>
  );
};

export default Header;
