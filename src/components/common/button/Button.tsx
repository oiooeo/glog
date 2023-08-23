import { FC } from 'react';
import * as Styled from './style';
import { ButtonProps } from './style';

const Button: FC<ButtonProps> = ({ onClick, color, variant, children, size, ...props }) => {
  return (
    <Styled.Button onClick={onClick} color={color} variant={variant} size={size} {...props}>
      {children}
    </Styled.Button>
  );
};

export default Button;
