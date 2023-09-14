import * as St from './style';

import type { ButtonProps } from './style';

const Button = ({ onClick, color, variant, children, size, ...props }: ButtonProps) => {
  return (
    <St.Button onClick={onClick} color={color} variant={variant} size={size} {...props}>
      {children}
    </St.Button>
  );
};

export default Button;
