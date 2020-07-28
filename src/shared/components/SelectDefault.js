import React from 'react';
import { IconArrowDown } from './Icons';

const SelectDefault = ({
  value,
  label,
  name,
  placeholder,
  isError,
  isSuccess,
  message,
  options,
  className = '',
  containerClass = '',
  onChange = () => {},
}) => {
  const setClasses = () => {
    let classes = ['icon-right'];
    if (className) classes.push(className);
    if (value) classes.push('is-active');
    else classes.push('is-empty');
    if (isError) classes.push('is-error');
    if (isSuccess) classes.push('is-success');
    return classes.join(' ');
  };
  return (
    // <Select value={selectedOption} onChange={handleChange} options={mockOptions} />
    <div className={`form-field ${containerClass}`}>
      {label && (
        <label htmlFor={name} className='mb-1 px-1'>
          {label}
        </label>
      )}
      <div className='position-relative'>
        <select
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={setClasses()}
        >
          <option disabled value='' hidden>
            {placeholder}
          </option>
          {options.map((option, i) => (
            <option value={option.value} key={i}>
              {option.label}
            </option>
          ))}
        </select>
        {message && (
          <p title={message} className='input-message text-xs text-ellipsis weight-500 px-1 mt-1'>
            {message}
          </p>
        )}
        <IconArrowDown className='input-icon' fill='#757575' />
      </div>
    </div>
  );
};

export default SelectDefault;
