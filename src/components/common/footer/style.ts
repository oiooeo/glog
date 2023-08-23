import { styled } from 'styled-components';

export const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 100%;
  height: 30px;
  z-index: 98;
`;

export const FooterText = styled.p`
  font-size: 12px;
  color: #ffffff;
`;

export const GitHubLink = styled.a`
  color: #ffffff;
  font-size: 12px;
  text-decoration: none;
`;
