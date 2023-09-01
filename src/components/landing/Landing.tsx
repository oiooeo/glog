import React, { useState, useEffect } from 'react';
import * as Styled from './style';

const Landing = () => {
  const [percentage, setPercentage] = useState(0);
  const completeClass = percentage >= 100 ? true : false;

  useEffect(() => {
    const timer = setInterval(() => {
      setPercentage((prevPercentage: number) => prevPercentage + 1);
      if (percentage >= 100) {
        clearInterval(timer);
      }
    }, 30);
    return () => {
      clearInterval(timer);
      setPercentage(101);
    };
  }, []);

  return (
    <Styled.PageLanding completeClass={completeClass}>
      {percentage <= 50 && (
        <>
          <Styled.MainText>지구를 여행했던 기록을 남겨보세요</Styled.MainText>
          <Styled.ServeText>멋진 여행의 순간을 많은 사람들과 공유하고 탐색해보세요</Styled.ServeText>
        </>
      )}
      {percentage > 50 && (
        <>
          <Styled.MainText>지구를 돌려서 가고싶은 여행장소를 살펴보세요</Styled.MainText>
          <Styled.ServeText>지구 위 불빛들을 클릭해보세요</Styled.ServeText>
        </>
      )}
      <Styled.Landing>
        <Styled.LandingBar percentage={percentage} />
      </Styled.Landing>
    </Styled.PageLanding>
  );
};

export default Landing;
