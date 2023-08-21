import { FC } from 'react';
import * as St from './style';
import { ButtonProps } from './style';

const Button: FC<ButtonProps> = ({ onClick, color, variant, children, size, ...props }) => {
  return (
    <St.Button
      onClick={onClick}
      color={color}
      variant={variant}
      size={size}
      {...props}
    >
      {children}
    </St.Button>
  );
};

export default Button;