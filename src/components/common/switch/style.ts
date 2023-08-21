import { styled } from 'styled-components';

interface StyledProps {
  checked: boolean;
}

export const SwitchLabel = styled.label<StyledProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: fit-content;
  height: fit-content;
  padding: 5px;
  border-radius: 30px;
  background-color: #d9d9d9;
  cursor: pointer;
`;

export const SwitchLeftText = styled.div<StyledProps>`
  padding: 10px 25px;
  border-radius: 30px;
  background-color: ${props => (props.checked ? '#11111110' : '#111111')};
  color: ${props => (props.checked ? '#111111' : '#D9D9D9')};
  font-size: 14px;
  transition: all 0.2s ease-in;
`;

export const SwitchRightText = styled.div<StyledProps>`
  padding: 10px 25px;
  border-radius: 30px;
  background-color: ${props => (props.checked ? '#111111' : '#11111110')};
  color: ${props => (props.checked ? '#D9D9D9' : '#111111')};
  font-size: 14px;
  transition: all 0.2s ease-in;
`;
