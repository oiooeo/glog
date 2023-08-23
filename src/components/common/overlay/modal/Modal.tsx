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
      content = <Styled.ModalInner>{children}</Styled.ModalInner>;
      break;
    case 'left':
      content = <Styled.LeftModalInner>{children}</Styled.LeftModalInner>;
      break;
    case 'right':
      content = <Styled.RightModalInner>{children}</Styled.RightModalInner>;
      break;
    default:
      content = <Styled.ModalInner>{children}</Styled.ModalInner>;
  }

  return <Styled.ModalOuter>{content}</Styled.ModalOuter>;
};

export default Modal;
