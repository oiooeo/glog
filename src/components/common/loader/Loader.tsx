import * as Styled from './style';
import loaderBg from '../../../assets/loader/loaderBg.svg';
import loaderLeft from '../../../assets/loader/loaderLeft.svg';
import loaderRight from '../../../assets/loader/loaderRight.svg';

const Loader = () => {
  return (
    <Styled.EarthContainer>
      <Styled.Earth>
        <img src={loaderBg} alt="bg" />
        <Styled.EarthLeft>
          <img src={loaderLeft} alt="left" />
        </Styled.EarthLeft>
        <Styled.EarthRight>
          <img src={loaderRight} alt="right" />
        </Styled.EarthRight>
      </Styled.Earth>
    </Styled.EarthContainer>
  );
};

export default Loader;
