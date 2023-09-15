import type { MouseEvent, ReactNode } from 'react';

import * as St from './style';
import { useOverlayContext } from '../Overlay.context';

interface Props {
  children: ReactNode;
  name: string;
  position: 'left' | 'center' | 'right';
}

type CloseModal = (event: MouseEvent<HTMLDivElement>) => void;

const Modal = ({ children, name, position }: Props) => {
  const { unmount } = useOverlayContext();

  const handleClose: CloseModal = event => {
    const { target, currentTarget } = event;

    if (target !== currentTarget) return;

    unmount(name);
  };

  let content;
  switch (position) {
    case 'center':
      content = (
        <St.ModalOuter onClick={handleClose}>
          <St.ModalInner>{children}</St.ModalInner>
        </St.ModalOuter>
      );
      break;
    case 'left':
      content = (
        <St.LeftModalOuter>
          <St.LeftModalInner>{children}</St.LeftModalInner>
        </St.LeftModalOuter>
      );
      break;
    case 'right':
      content = (
        <St.RightModalOuter>
          <St.RightModalInner>{children}</St.RightModalInner>
        </St.RightModalOuter>
      );
      break;
    default:
      content = (
        <St.ModalOuter onClick={handleClose}>
          <St.ModalInner>{children}</St.ModalInner>
        </St.ModalOuter>
      );
  }

  return <>{content}</>;
};

export default Modal;
