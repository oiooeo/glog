import React from 'react';
import * as Styled from './style';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  leftText: string;
  rightText: string;
  width: string;
  checkedtextcolor: string;
  textcolor: string;
  checkedbackground: string;
  background: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, leftText, rightText, width, checkedtextcolor, textcolor, checkedbackground, background }) => {
  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <>
      <Styled.SwitchLabel checked={checked} width={width} checkedtextcolor={checkedtextcolor} textcolor={textcolor} checkedbackground={checkedbackground} background={background} onClick={handleClick}>
        <Styled.SwitchLeftText checked={checked} width={width} checkedtextcolor={checkedtextcolor} textcolor={textcolor} checkedbackground={checkedbackground} background={background}>
          {leftText}
        </Styled.SwitchLeftText>
        <Styled.SwitchRightText checked={checked} width={width} checkedtextcolor={checkedtextcolor} textcolor={textcolor} checkedbackground={checkedbackground} background={background}>
          {rightText}
        </Styled.SwitchRightText>
        <Styled.SwitchSpan checked={checked} width={width} checkedtextcolor={checkedtextcolor} textcolor={textcolor} checkedbackground={checkedbackground} background={background}>
          {checked ? rightText : leftText}
        </Styled.SwitchSpan>
      </Styled.SwitchLabel>
    </>
  );
};

export default Switch;
