import { styled } from 'styled-components';

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  background: transparent;
  z-index: 100;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderLogo = styled.img`
  width: fit-content;
  height: 40px;
`;

export const SwitchBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const SearchInput = styled.input`
  width: 285px;
  height: 35px;
  padding: 0 10px;
  margin-left: 5px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 16px 0 0 16px;
  font-size: 15px;
`;

export const SearchButton = styled.button`
  align-items: center;
  height: 35px;
  margin-right: 5px;
  padding: 0 8px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 0 16px 16px 0;
  font-size: 12px;
  cursor: pointer;
`;

export const OpenPostButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 0 15px;
  background-color: rgba(221, 82, 1, 0.4);
  border: 1px solid rgba(221, 82, 1, 0.2);
  border-radius: 50%;
  color: #d5cbc7;
  cursor: pointer;

  &:hover {
    background-color: rgba(221, 82, 1, 0.7);
  }
`;

export const ClosePostButton = styled(OpenPostButton)`
  background-color: rgba(221, 82, 1, 0.7);
`;

export const Circle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 50%;
  color: #333;
  margin: 5px;
  cursor: pointer;
`;

export const AuthSpan = styled.span`
  margin: 5px;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;
