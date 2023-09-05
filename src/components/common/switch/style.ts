import { styled } from 'styled-components';

interface StyledProps {
  checked: boolean;
  width: string;
  checkedtextcolor: string;
  textcolor: string;
  checkedbackground: string;
  background: string;
}

export const SwitchLabel = styled.label<StyledProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  width: ${props => props.width};
  height: 50px;
  padding: 3px 5px;
  background-color: rgba(53, 60, 73, 0.6);
  border-radius: 30px;
  border: 1px solid rgba(53, 60, 73, 1);
  cursor: pointer;

  @media (max-width: 1060px) {
    width: calc(${props => props.width} - 40px);
    height: 40px;
  }
`;

export const SwitchBox = styled.div<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc((${props => `calc(${props.width} - 20px)`}) / 2);
  height: 38px;
  border-radius: 30px;
  font-size: 14px;
  transition: all 0.2s ease-in;
  z-index: 10;

  @media (max-width: 1060px) {
    width: calc((${props => `calc(${props.width} - 20px)`}) / 2 - 20px);
    height: 31px;
    font-size: 12px;
  }
`;

export const SwitchLeftText = styled(SwitchBox)<StyledProps>`
  background-color: ${props => (props.checked ? props.background : 'transparent')};
  color: ${props => (props.checked ? props.textcolor : props.checkedtextcolor)};
  font-weight: ${props => (props.checked ? '400' : '700')};
  z-index: 12;
`;

export const SwitchRightText = styled(SwitchBox)<StyledProps>`
  background-color: ${props => (props.checked ? 'transparent' : props.background)};
  color: ${props => (props.checked ? props.checkedtextcolor : props.textcolor)};
  font-weight: ${props => (props.checked ? '700' : '400')};
  z-index: 12;
`;

export const SwitchSpan = styled(SwitchBox)<StyledProps>`
  position: absolute;
  background-color: ${props => props.checkedbackground};
  color: transparent;
  border-radius: 40px;
  font-size: 14px;
  transition: transform 0.15s;
  transform: translateX(${props => (props.checked ? 'calc(100% + 7px)' : '0px')});
  z-index: 11;
`;
