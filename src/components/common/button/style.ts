import { ReactNode } from 'react';
import { styled, css } from 'styled-components';

export interface ButtonProps {
  color?: string;
  variant?: string;
  size?: string;
  onClick?: () => void;
  children: ReactNode;
}

export const Button = styled.button<ButtonProps>`
  /* 와이어프레임을 바탕으로 임의로 넣은 스타일입니다. */
  font-size: 12px;
  color: #000000;
  padding: 0.4rem 1.2rem;
  background-color: #616161;
  border: none;
  border-radius: 99px;
  cursor: pointer;

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
    props.variant === 'disable' &&
    css`
      background-color:#D9D9D9;
      color: #828282;
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
      width: 290px;
      height: 50px;
      border-radius: 10px;
    `}
`;
