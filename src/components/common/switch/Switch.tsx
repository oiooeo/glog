import React from 'react';

import * as St from './style';

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
      <St.SwitchLabel checked={checked} width={width} checkedtextcolor={checkedtextcolor} textcolor={textcolor} checkedbackground={checkedbackground} background={background} onClick={handleClick}>
        <St.SwitchLeftText checked={checked} width={width} checkedtextcolor={checkedtextcolor} textcolor={textcolor} checkedbackground={checkedbackground} background={background}>
          {leftText}
        </St.SwitchLeftText>
        <St.SwitchRightText checked={checked} width={width} checkedtextcolor={checkedtextcolor} textcolor={textcolor} checkedbackground={checkedbackground} background={background}>
          {rightText}
        </St.SwitchRightText>
        <St.SwitchSpan checked={checked} width={width} checkedtextcolor={checkedtextcolor} textcolor={textcolor} checkedbackground={checkedbackground} background={background}>
          {checked ? rightText : leftText}
        </St.SwitchSpan>
      </St.SwitchLabel>
    </>
  );
};

export default Switch;
