import { styled } from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
  background-color: #ffffff;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Circle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 50%;
  color: #333;
  margin: 5px;
  font-size: 12px;
  cursor: pointer;
`;

export const AuthSpan = styled.span`
  margin: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;
