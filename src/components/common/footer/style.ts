import { styled } from 'styled-components';

export const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 30px;
  display: flex;
  justify-content: center;
  background-color: transparent;
  width: 100%;
  height: fit-content;
  z-index: 98;
`;

export const FooterText = styled.p`
  margin-right: 6px;
  font-size: 12px;
  color: #cccfd3;
`;

export const GitHubLink = styled.a`
  height: fit-content;
  color: #cccfd3;
  font-size: 12px;
  text-decoration: none;
`;
