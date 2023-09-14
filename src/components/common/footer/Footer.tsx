import React from 'react';

import * as St from './style';

const Footer = () => {
  return (
    <St.FooterWrapper>
      <St.MobileFooterText>&copy; Glog</St.MobileFooterText>
      <St.FooterText>&copy; 2023 Glog All rights reserved.</St.FooterText>
      <St.GitHubLink href="https://github.com/oiooeo/glog" target="_blank" rel="noopener noreferrer">
        View on GitHub.
      </St.GitHubLink>
    </St.FooterWrapper>
  );
};

export default Footer;
