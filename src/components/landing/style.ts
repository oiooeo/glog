import { styled } from 'styled-components';

export const PageLanding = styled.div<{ $completeclass: string }>`
  z-index: ${props => (props.$completeclass === 'true' ? 0 : 101)};
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: opacity 0.5s 0.5s;

  &.complete {
    opacity: 0;
  }
  @media (max-width: 540px) {
    width: 100%;
  }
`;
export const Landing = styled.div`
  width: 600px;
  height: 8px;
  border-radius: 5px;
  background-color: #fff;
  overflow: hidden;
  @media (max-width: 540px) {
    width: 80%;
  }
`;
export const LandingBar = styled.div<{ $percentage: number }>`
  background-color: #e55a54;
  width: ${props => (props.$percentage > 100 ? '100' : props.$percentage)}%;
  height: 100%;
`;

export const MainText = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 20px;
  @media (max-width: 540px) {
    font-size: 18px;
  }
`;
export const ServeText = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 30px;
  @media (max-width: 540px) {
    font-size: 15px;
  }
`;
