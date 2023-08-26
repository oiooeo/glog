import React from 'react';
import * as Styled from './style';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  leftText: string;
  rightText: string;
  width: string;
  checkedTextColor: string;
  textColor: string;
  checkedBackground: string;
  background: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, leftText, rightText, width, checkedTextColor, textColor, checkedBackground, background }) => {
  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <>
      <Styled.SwitchLabel checked={checked} width={width} checkedTextColor={checkedTextColor} textColor={textColor} checkedBackground={checkedBackground} background={background} onClick={handleClick}>
        <Styled.SwitchLeftText checked={checked} width={width} checkedTextColor={checkedTextColor} textColor={textColor} checkedBackground={checkedBackground} background={background}>
          {leftText}
        </Styled.SwitchLeftText>
        <Styled.SwitchRightText checked={checked} width={width} checkedTextColor={checkedTextColor} textColor={textColor} checkedBackground={checkedBackground} background={background}>
          {rightText}
        </Styled.SwitchRightText>
        <Styled.SwitchSpan checked={checked} width={width} checkedTextColor={checkedTextColor} textColor={textColor} checkedBackground={checkedBackground} background={background}>
          {checked ? rightText : leftText}
        </Styled.SwitchSpan>
      </Styled.SwitchLabel>
    </>
  );
};

export default Switch;
