import type { ReactNode } from 'react';

import { css, styled } from 'styled-components';

export interface ButtonProps {
  color?: string;
  variant?: string;
  size?: string;
  onClick?: () => void;
  children: ReactNode;
  type?: string;
}

export const Button = styled.button<ButtonProps>`
  font-size: 12px;
  color: #000000;
  padding: 0.4rem 1.2rem;
  background-color: #616161;
  border: none;
  border-radius: 99px;
  cursor: pointer;

  ${props =>
    props.variant === 'gray' &&
    css`
      background-color: #72808e;
      color: #b3bac1;
    `}

  ${props =>
    props.variant === 'orange' &&
    css`
      background-color: #fc5522;
      color: #f4f4f5;
    `}

  ${props =>
    props.variant === 'orange-shadow' &&
    css`
      background-color: #fc5522;
      color: #f4f4f5;
      box-shadow: 3px 3px 20px rgba(251, 232, 189, 0.4);
    `}

  ${props =>
    props.variant === 'black' &&
    css`
      background-color: #121212;
      color: #ffffff;
    `}

  ${props =>
    props.variant === 'deep-gray' &&
    css`
      background-color: #4d5765;
      color: #e4e7eb;
    `}

  ${props =>
    props.size === 'small' &&
    css`
      width: 88px;
      height: 38px;
    `}

  ${props =>
    props.size === 'medium' &&
    css`
      width: 145px;
      height: 50px;
      border-radius: 10px;
      font-size: 18px;
    `}

  ${props =>
    props.size === 'large' &&
    css`
      width: 300px;
      height: 50px;
      border-radius: 10px;
      font-size: 18px;
    `}
`;
