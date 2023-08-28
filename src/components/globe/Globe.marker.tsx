import * as Styled from './style';

export const OrangeMarker = ({ pin }: { pin: string }) => {
  return (
    <div className="orange-pin-marker">
      <Styled.PinMarker src={pin} alt="marker" />
    </div>
  );
};

export const DefaultMarker = ({ pin }: { pin: string }) => {
  return (
    <Styled.PinBox className="pin-marker">
      <Styled.PinMarker src={pin} alt="marker" />
    </Styled.PinBox>
  );
};

export const ImageMarker = ({ pin }: { pin: string }) => {
  return (
    <div className="image-marker">
      <Styled.PinMarker src={pin} alt="marker" />
    </div>
  );
};
