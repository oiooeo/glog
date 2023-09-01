import * as Styled from './style';

export const OrangeMarker = ({ pin }: { pin: string }) => {
  return (
    <div className="orange-pin-marker">
      <Styled.PinMarker src={pin} alt="marker" />
    </div>
  );
};

export const ImageMarker = ({ pin }: { pin: string }) => {
  return (
    <div className="image-marker">
      <Styled.PinMarker src={pin} alt="marker" />
    </div>
  );
};
