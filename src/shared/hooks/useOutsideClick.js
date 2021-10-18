import { useEffect } from 'react';

const useOutsideClick = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
    //eslint-disable-next-line
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, handler]);
};

export default useOutsideClick;
