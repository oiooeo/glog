import { styled } from 'styled-components';

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 40px;
  background: #f4f4f5;
  border-radius: 18px;
  border: 1px solid #b3bac1;

  @media (max-width: 1060px) {
    position: fixed;
    bottom: 20px;
    left: 70px;
    width: calc(100vw - 90px);
    background: rgba(53, 60, 73, 0.8);
    border: 1px solid rgba(77, 87, 101, 1);
  }
`;

export const SearchInput = styled.input`
  flex-grow: 1;
  width: 260px;
  height: 40px;
  padding: 0 20px;
  background: transparent;
  border: none;
  color: #72808e;
  font-size: 16px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #b3bac1;
  }

  @media (max-width: 1060px) {
    color: #cccfd3;
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
`;
