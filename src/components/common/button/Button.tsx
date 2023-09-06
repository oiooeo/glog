import * as Styled from './style';

import type { ButtonProps } from './style';

const Button = ({ onClick, color, variant, children, size, ...props }: ButtonProps) => {
  return (
    <Styled.Button onClick={onClick} color={color} variant={variant} size={size} {...props}>
      {children}
    </Styled.Button>
  );
};

export default Button;
