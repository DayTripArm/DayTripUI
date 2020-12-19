import React, {useEffect, useState} from 'react';

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
  onChange,
  onFocus,
  onBlur,
  required,
  disabled
}) => {
    const [inputValue, setInputValue] = useState(value);
    const onChangeHandle = (e, name) => {
        if (onChange) {
            onChange(e, name);
        }

        setInputValue(e.target ? e.target.value : e);
    };
  const setClasses = () => {
    let classes = [];
    if (className) classes.push(className);
    if (value) classes.push('is-active');
    if (isError) classes.push('is-error');
    if (disabled) classes.push('is-disabled');
    if (isSuccess) classes.push('is-success');
    return classes.join(' ');
  };
  useEffect(() => {
    setInputValue(value);
  }, [value]);
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
          value={inputValue}
          onChange={onChangeHandle}
          onFocus={onFocus}
          onBlur={onBlur}
          className={setClasses()}
          required={required}
          disabled={disabled}
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
