import React, { useRef, useEffect } from 'react';
import { IconArrowRight } from './Icons';

const Modal = ({
  children,
  id,
  size = '',
  title = '',
  preventOutsideClick,
  onClose,
  className = '',
  containerClass,
}) => {
  const container = useRef();

  const handleKeydown = e => e.keyCode === 27 && handleClose();

  const handleClose = () => {
    if (preventOutsideClick) return;
    container.current.classList.remove('active');
    setTimeout(() => onClose && onClose(), 150);
  };

  useEffect(() => {
    container.current.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (preventOutsideClick) return;
    document.addEventListener('keydown', handleKeydown, true);
    //eslint-disable-next-line
    return () => {
      document.removeEventListener('keydown', handleKeydown, true);
      document.body.style.overflow = 'visible';
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div
      id={id}
      ref={container}
      onClick={handleClose}
      role='presentation'
      className={`modal modal-aside d-flex justify-content-end modal__${size} ${containerClass}`}
    >
      <div
        className={`modal-content ${className}`}
        onClick={e => e.stopPropagation()}
        role='presentation'
      >
        <div className='modal-title border__bottom border__default py-1 pl-4 pr-2 d-flex align-items-center justify-content-between'>
          <p className='mb-0 weight-700'>{title}</p>
          <button
            className='btn btn-circle size-fixed border-0 position-static'
            onClick={handleClose}
          >
            <IconArrowRight />
          </button>
        </div>
        <div className='modal-body overflow-auto p-4'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
