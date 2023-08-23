import { MouseEvent, ReactNode } from 'react';
import * as Styled from './style';
import { useOverlayContext } from '../Overlay.context';

interface Props {
  children: ReactNode;
  name: string;
  position: 'left' | 'center' | 'right';
}

const Modal = ({ children, name, position }: Props) => {
  const { unmount } = useOverlayContext();

  type CloseModal = (event: MouseEvent<HTMLDivElement>) => void;
  const handleClose: CloseModal = event => {
    const { target, currentTarget } = event;

    if (target !== currentTarget) return;

    unmount(name);
  };

  let content;
  switch (position) {
    case 'center':
      content = (
        <Styled.ModalOuter>
          <Styled.ModalInner>{children}</Styled.ModalInner>
        </Styled.ModalOuter>
      );
      break;
    case 'left':
      content = (
        <Styled.ModalOuter>
          <Styled.LeftModalInner>{children}</Styled.LeftModalInner>
        </Styled.ModalOuter>
      );
      break;
    case 'right':
      content = (
        <Styled.RightModalOuter>
          <Styled.RightModalInner>{children}</Styled.RightModalInner>
        </Styled.RightModalOuter>
      );
      break;
    default:
      content = (
        <Styled.ModalOuter>
          <Styled.ModalInner>{children}</Styled.ModalInner>
        </Styled.ModalOuter>
      );
  }

  return <>{content}</>;
};

export default Modal;
