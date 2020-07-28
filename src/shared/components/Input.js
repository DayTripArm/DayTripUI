import React from 'react';
import { IconTimes, IconArrowUp, IconArrowDown } from './Icons';

const Input = ({
  value,
  label,
  name,
  type,
  placeholder,
  isError,
  isSuccess,
  message,
  icon,
  iconPosition,
  className = '',
  containerClass = '',
  showClearIcon,
  hideApperance,
  onChange,
  onFocus,
  onBlur,
  required,
  autoFocus,
}) => {
  const Icon = icon;

  const setClasses = () => {
    let classes = [];
    if (className) classes.push(className);
    if (value) classes.push('is-active');
    if (isError) classes.push('is-error');
    if (isSuccess) classes.push('is-success');
    if (type === 'search') classes.push('is-search');
    if (icon) classes.push(iconPosition === 'left' ? 'icon-left' : 'icon-right');
    return classes.join(' ');
  };

  const onChangeHandle = (e, name) => {
    if (onChange) {
      onChange(e, name);
    }
  };

  const onBlurHandle = (e, name) => {
    if (onBlur) {
      onBlur(e, name);
    }
  };

  return (
    <div className={`form-field ${containerClass}`}>
      {label && (
        <label htmlFor={name} className='mb-1 px-1'>
          {label}
        </label>
      )}
      <div className='position-relative'>
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={(e) => onChangeHandle(e, name)}
          onFocus={onFocus}
          onBlur={(e) => onBlurHandle(e, name)}
          className={setClasses()}
          required={required}
          autoFocus={autoFocus}
        />
        {message && (
          <p title={message} className='input-message text-xs weight-500 px-1 mt-1'>
            {message}
          </p>
        )}
        {icon && (
          <button className='btn btn-circle border-0 input-icon'>
            <Icon fill='#757575' />
          </button>
        )}
        {type === 'search' && value && (
          <button className='input-clear btn text__grey-dark btn-sm'>
            Clean {showClearIcon && <IconTimes className='times-icon ml-1' />}
          </button>
        )}
        {type === 'number' && !hideApperance && (
          <div className='btn-container px-2 d-flex flex-column rounded__4'>
            <button className='input-btn input-btn__up'>
              <IconArrowUp />
            </button>
            <button className='input-btn input-btn__down'>
              <IconArrowDown />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
