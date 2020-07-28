import React from 'react';

const Textarea = ({
  value,
  label,
  name,
  placeholder,
  isError,
  isSuccess,
  message,
  className = '',
  containerClass = '',
  onChange = () => {},
  onFocus,
  onBlur,
  required,
}) => {
  const setClasses = () => {
    let classes = [];
    if (className) classes.push(className);
    if (value) classes.push('is-active');
    if (isError) classes.push('is-error');
    if (isSuccess) classes.push('is-success');
    return classes.join(' ');
  };
  return (
    <div className={`form-field ${containerClass}`}>
      {label && (
        <label htmlFor={name} className='mb-1 px-1'>
          {label}
        </label>
      )}
      <div className='position-relative'>
        <textarea
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={setClasses()}
          required={required}
        />
        {message && (
          <p title={message} className='input-message text-xs weight-500 px-1 mt-1'>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Textarea;
