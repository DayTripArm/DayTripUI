import React, { useRef, useEffect } from 'react';
import { IconTimes } from './Icons';

const Modal = ({
  children,
  id,
  size = '',
  title = '',
  showDismissButton,
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
      className={`modal py-md-4 modal__${size} ${containerClass}`}
    >
      <div
        className={`modal-content ${className}`}
        onClick={e => e.stopPropagation()}
        role='presentation'
      >
        <div className='modal-title border__bottom border__default'>
          {size ? (
            <p className='mb-0 text-center weight-700'>{title}</p>
          ) : (
            <h4 className='text__blue text-center mb-0'>{title}</h4>
          )}
          <button
            className={`modal-dismiss btn btn-circle border-0 d-block d-md-${
              showDismissButton ? 'block' : 'none'
            }`}
            onClick={handleClose}
          >
            <IconTimes />
          </button>
        </div>
        <div className='modal-body p-4'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
