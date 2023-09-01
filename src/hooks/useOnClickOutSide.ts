import { useEffect } from 'react';

const useOnClickOutside = (ref: React.RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        const OrangePinMarker = document.querySelector('.orange-pin-marker');
        if (OrangePinMarker) OrangePinMarker.remove();
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);

      if (!ref) {
        const OrangePinMarker = document.querySelector('.orange-pin-marker');
        if (OrangePinMarker) OrangePinMarker.remove();
      }
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
