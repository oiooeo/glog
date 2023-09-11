import { styled } from 'styled-components';

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 30px;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 50px;
  background: transparent;
  z-index: 100;

  @media (max-width: 1060px) {
    top: 15px;
    padding: 0 10px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderLogo = styled.img`
  width: fit-content;
  height: 40px;
  cursor: pointer;

  @media (max-width: 1060px) {
    height: 32px;
  }
`;

export const CircleButton = styled.button<{ opened?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(53, 60, 73, 0.6);
  border: 1px solid rgba(53, 60, 73, 1);
  border-radius: 50%;
  color: #cccfd3;
  margin-left: 10px;
  cursor: pointer;

  @media (max-width: 1060px) {
    margin-left: ${props => (props.opened ? '0' : '10px')};
  }
`;

export const OpenPostButton = styled(CircleButton)`
  background-color: rgba(221, 82, 1, 0.4);
  border: 1px solid rgba(221, 82, 1, 0.2);
  border-radius: 50%;
  color: #d5cbc7;
  cursor: pointer;

  &:hover {
    background-color: rgba(221, 82, 1, 0.7);
  }

  @media (max-width: 1060px) {
    position: fixed;
    bottom: 20px;
    margin-left: 10px;
  }
`;

export const ClosePostButton = styled(OpenPostButton)`
  background-color: rgba(221, 82, 1, 0.7);

  @media (max-width: 1060px) {
    background-color: rgba(53, 60, 73, 0.8);
    border: 1px solid rgba(114, 128, 142, 1);

    &:hover {
      background-color: rgba(53, 60, 73, 0.8);
    }
  }
`;

export const AuthSpan = styled.span<{ opened?: boolean }>`
  margin-left: 10px;
  color: #72808e;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: 1060px) {
    display: ${props => (props.opened ? 'none' : 'block')};
    width: 40px;
    margin-left: 5px;
    font-size: 11px;
    font-weight: 500;
  }
`;

export const SwitchBox = styled.div<{ close?: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 1060px) {
    display: ${props => (props.close ? 'none' : 'flex')};
    position: fixed;
    top: auto;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const SearchBox = styled.div`
  display: flex;
  width: 300px;
  height: fit-content;
  margin-left: 10px;
  background-color: rgba(53, 60, 73, 0.9);
  border-radius: 20px;
  border: 1px solid rgba(77, 87, 101, 1);
  animation: fadein 0.5s;

  @keyframes fadein {
    from {
      opacity: 0.3;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 1060px) {
    width: calc(100vw - 170px);
  }
`;

export const SearchInput = styled.input`
  width: 260px;
  height: 40px;
  padding: 0 15px;
  background: none;
  border: none;
  color: #cccfd3;
  font-size: 16px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #72808e;

    @media (max-width: 1060px) {
      font-size: 13px;
    }
  }

  @media (max-width: 1060px) {
    padding: 0 0 0 15px;
    width: calc(100vw - 215px);
  }
`;

export const SearchButton = styled.button`
  align-items: center;
  height: 40px;
  width: 40px;
  background: none;
  border: none;
  color: rgba(204, 207, 211, 0.8);
  font-size: 12px;
  cursor: pointer;

  @media (max-width: 1060px) {
  }
`;

export const Tooltip = styled.span`
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 11px;
  top: 50px;
  white-space: nowrap;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: transparent transparent #333 transparent;
  }

  @media (max-width: 1060px) {
    top: -45px;
    margin-left: 28px;
    &::before {
      top: 100%;
      left: 32%;
      transform: translateX(-50%);
      border-width: 13px 4px;
      border-style: solid;
      border-color: #333 transparent transparent transparent;
    }
  }
`;
