import React from 'react';
import * as Styled from './style';

const Footer = () => {
  return (
    <Styled.FooterWrapper>
      <Styled.FooterText>&copy; 2023 지구인들 All rights reserved.</Styled.FooterText>
      <Styled.GitHubLink href="https://github.com/oiooeo/glog" target="_blank" rel="noopener noreferrer">
        View on GitHub
      </Styled.GitHubLink>
    </Styled.FooterWrapper>
  );
};

export default Footer;
