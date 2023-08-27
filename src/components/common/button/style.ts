import { ReactNode } from 'react';
import { styled, css } from 'styled-components';

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
      box-shadow: 3px 3px 20px rgba(251, 232, 189, 0.4);
    `}

  ${props =>
    props.variant === 'black' &&
    css`
      background-color: #121212;
      color: #ffffff;
    `}

  ${props =>
    props.color === 'primary' &&
    css`
      color: #ffffff;
    `}

  ${props =>
    props.color === 'secondary' &&
    css`
      background-color: #c5c5c5;
      color: #000000;
    `}

  ${props =>
    props.variant === 'transparent' &&
    css`
      background-color: transparent;
    `}

  ${props =>
    props.variant === 'outlined' &&
    css`
      background-color: #ffffff;
      border: 2px solid black;
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
      width: 130px;
      height: 38px;
    `}

  ${props =>
    props.size === 'large' &&
    css`
      font-size: 18px;
      width: 300px;
      height: 50px;
      border-radius: 10px;
    `}
`;
