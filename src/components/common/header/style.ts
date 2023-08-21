import { styled } from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 25px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Circle = styled.button`
  background-color: f0f0f0;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: #333;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;
