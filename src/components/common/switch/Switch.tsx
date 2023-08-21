import React from 'react';
import * as Styled from './style';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  left: string;
  right: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, left, right }) => {
  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <>
      <Styled.SwitchLabel checked={checked} onClick={handleClick}>
        <Styled.SwitchLeftText checked={checked}>{left}</Styled.SwitchLeftText>
        <Styled.SwitchRightText checked={checked}>{right}</Styled.SwitchRightText>
        <Styled.SwitchSpan checked={checked}>{checked ? right : left}</Styled.SwitchSpan>
      </Styled.SwitchLabel>
    </>
  );
};

export default Switch;
