import * as St from './style';
import loaderBg from '../../../assets/loader/loaderBg.svg';
import loaderLeft from '../../../assets/loader/loaderLeft.svg';
import loaderRight from '../../../assets/loader/loaderRight.svg';

const Loader = () => {
  return (
    <St.EarthContainer>
      <St.Earth>
        <img src={loaderBg} alt="bg" />
        <St.EarthLeft>
          <img src={loaderLeft} alt="left" />
        </St.EarthLeft>
        <St.EarthRight>
          <img src={loaderRight} alt="right" />
        </St.EarthRight>
      </St.Earth>
    </St.EarthContainer>
  );
};

export default Loader;
