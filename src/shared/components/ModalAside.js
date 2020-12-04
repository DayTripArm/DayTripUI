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
    resizeModal();
    if (preventOutsideClick) return;
    document.addEventListener('keydown', handleKeydown, true);
    //eslint-disable-next-line
    return () => {
      document.removeEventListener('keydown', handleKeydown, true);
      document.body.style.overflow = 'visible';
    };
    //eslint-disable-next-line
  }, []);

    window.addEventListener("hashchange", function (event, data) {
        if(event.currentTarget.location.hash === ''){
            onClose();
        }
    });

  function resizeModal(){
      const modal_el = document.querySelector('.modal-aside');
      if (modal_el && !modal_el.classList.contains('htr_modal')) {
          const scroll_pos = window.pageYOffset || document.documentElement.scrollTop;
          const menu_height = document.body.clientWidth < 1280 ? document.querySelector('.guest-menu')? document.querySelector('.guest-menu').clientHeight: 0 : 0;
          if (scroll_pos >= 72){
              modal_el.setAttribute("style", "top: 0; max-height: calc(100vh - "+(menu_height)+"px)");
              modal_el.firstChild.setAttribute("style","max-height: calc(100vh - "+(menu_height)+"px)");
              if (modal_el.id === 'booked_trip_modal') {
                  modal_el.querySelector('.modal-body').setAttribute("style","max-height: calc(100vh - "+(menu_height+57)+"px)");
              }
          } else {
              modal_el.setAttribute("style", "top: "+(72 - scroll_pos)+"px; max-height: calc(100vh - "+(72 - scroll_pos + menu_height)+"px)");
              modal_el.firstChild.setAttribute("style","max-height: calc(100vh - "+(72 - scroll_pos + menu_height)+"px)");
              if (modal_el.id === 'booked_trip_modal'){
                  modal_el.querySelector('.modal-body').setAttribute("style","max-height: calc(100vh - "+(72 - scroll_pos + menu_height+57)+"px)");
              }
          }
      }
  }

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
