import * as St from './style';

export const OrangeMarker = ({ pin }: { pin: string }) => {
  return (
    <div className="orange-pin-marker">
      <St.PinMarker src={pin} alt="marker" />
    </div>
  );
};

export const ImageMarker = ({ pin }: { pin: string }) => {
  return (
    <div className="image-marker">
      <St.PinMarker src={pin} alt="marker" />
    </div>
  );
};
