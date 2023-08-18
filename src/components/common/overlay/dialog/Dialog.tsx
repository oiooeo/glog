import { MouseEvent, ReactNode } from 'react';
import { useLockBodyScroll } from '../../../../hooks/useLockBodyScroll';

interface Props {
  onClose: any;
  onSuccess?: any;
  type: 'Confirm' | 'Alert';
  children: ReactNode;
}

export const Dialog = ({ onClose, onSuccess, type, children }: Props) => {
  type CloseDialog = (event: MouseEvent<HTMLDivElement | HTMLElement>) => void;
  const close: CloseDialog = event => {
    const { target, currentTarget } = event;
    if (target !== currentTarget) return;
    onClose();
  };

  useLockBodyScroll(true);

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-40" onClick={close}>
      <div className="absolute max-w-[500px] min-w-[400px] min-h-[200px] text-center p-10 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg left-1/2 top-1/2">
        <p>{children}</p>
        {type === 'Confirm' ? (
          <div className="mt-12">
            {/* <Button onClick={onClose}>취소</Button> */}
            {/* <Button onClick={onSuccess}>확인</Button> */}
          </div>
        ) : (
          <div className="mt-12">{/* <Button onClick={close}>확인</Button> */}</div>
        )}
      </div>
    </div>
  );
};
