import { styled } from 'styled-components';

import Button from '../../common/button/Button';

export const SearchInput = styled.input`
  width: 300px;
  height: 40px;
  padding: 0 20px;
  background: #cccfd3;
  border-radius: 18px;
  border: 1px solid #b3bac1;
  color: #72808e;
  font-size: 15px;

  @media (max-width: 1060px) {
    position: fixed;
    bottom: 150px;
    left: 100px;
    width: calc(100vw - 120px);
    height: 30px;
    padding: 0 12px;
    background: rgba(18, 18, 18, 0.9);
    border: none;
    border-radius: 10px;
    color: #b3bac1;
    font-size: 14px;
  }
`;

export const PinParagraph = styled.p`
  position: fixed;
  top: 33%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  text-align: center;
  font-size: 21px;
  line-height: 28px;
  text-shadow: 3px 3px 10px rgba(251, 232, 189, 0.4);

  @media (max-width: 1060px) {
    display: none;
  }
`;

export const MobilePinParagraph = styled.p`
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  text-align: center;
  font-size: 14px;
  text-shadow: 3px 3px 10px rgba(251, 232, 189, 0.4);
  white-space: nowrap;

  @media (min-width: 1060px) {
    display: none;
  }
`;

export const Pin = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  transform: translate(-50%, -50%);

  @media (max-width: 1060px) {
    display: none;
  }
`;

export const MobilePin = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  transform: translate(-50%, -50%);

  @media (min-width: 1060px) {
    display: none;
  }
`;

export const PinButton = styled(Button)`
  position: fixed;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 1060px) {
    display: none;
  }
`;

export const MobilePencilButton = styled(Button)`
  @media (max-width: 1060px) {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 150px;
    right: 26px;
    padding: 0;
    background: transparent;
    z-index: 1;
  }

  @media (min-width: 1060px) {
    display: none;
  }
`;

export const PinBackground = styled.div`
  position: absolute;
  top: 0;
  left: 350px;
  width: calc(100vw - 350px);
  height: 100vh;
  background-color: transparent;
  z-index: 100;

  @media (max-width: 1060px) {
    left: 0px;
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100 - 180px);
  }
`;

export const PinWarning = styled.p`
  position: fixed;
  top: 65%;
  left: 50%;
  padding: 15px 20px;
  background-color: rgba(114, 128, 142, 0.6);
  border-radius: 18px;
  color: #f4f4f5;
  transform: translate(-50%, -50%);
`;

export const SwitchBox = styled.div`
  @media (max-width: 1060px) {
    display: none;
  }
`;
