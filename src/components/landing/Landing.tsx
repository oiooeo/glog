import React, { useEffect, useState } from 'react';

import * as St from './style';

const Landing = () => {
  const [percentage, setPercentage] = useState(0);
  const completeclass = percentage >= 100 ? 'true' : 'false';

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const increasePercentage = () => {
      setPercentage((prevPercentage: number) => {
        const newPercentage = prevPercentage + 1;
        if (newPercentage >= 100) {
          clearInterval(timer as NodeJS.Timeout);
          return 100;
        }
        return newPercentage;
      });
    };

    timer = setInterval(increasePercentage, 30);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  return (
    <St.PageLanding $completeclass={completeclass}>
      {percentage <= 50 && (
        <>
          <St.MainText>지구를 여행했던 기록을 남겨보세요</St.MainText>
          <St.ServeText>멋진 여행의 순간을 많은 사람들과 공유하고 탐색해보세요</St.ServeText>
        </>
      )}
      {percentage > 50 && (
        <>
          <St.MainText>지구를 돌려서 가고싶은 여행장소를 살펴보세요</St.MainText>
          <St.ServeText>지구 위 불빛들을 클릭해보세요</St.ServeText>
        </>
      )}
      <St.Landing>
        <St.LandingBar $percentage={percentage} />
      </St.Landing>
    </St.PageLanding>
  );
};

export default Landing;
