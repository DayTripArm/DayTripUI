import React from 'react';
import Select, { components } from 'react-select';
import { IconArrowDown, IconArrowUp } from './Icons';

// Static Components
const selectComponents = {
  Placeholder: props => <components.Placeholder {...props} />,
  DropdownIndicator: props => (
    <components.DropdownIndicator {...props}>
      {props.isFocused ? <IconArrowUp /> : <IconArrowDown />}
    </components.DropdownIndicator>
  ),
};

// Static Styles
const restStyles = {
  placeholder: base => ({
    ...base,
    color: '#BDBDBD',
  }),
  indicatorSeparator: base => ({
    ...base,
    display: 'none',
  }),
  dropdownIndicator: base => ({
    ...base,
    '& svg path': {
      fill: '#757575',
    },
    '&:hover svg path': {
      fill: '#090925',
    },
  }),
  menu: base => ({
    ...base,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  }),
};

const SelectCustom = ({
  value,
  label,
  name,
  placeholder,
  isError,
  isSuccess,
  message,
  options,
  borderWidth = 1,
  className = '',
  containerClass = '',
  onChange = () => {},
}) => {
  const borderColor = isError ? '#B80000' : isSuccess ? '#88B800' : null;
  const ctrlDefaultborder = borderColor || '#BDBDBD';
  const ctrlFocusedBorder = borderColor || '#100F72';

  const styles = {
    control: (base, state) => ({
      ...base,
      height: 48,
      boxShadow: 'none',
      paddingLeft: 8,
      borderWidth,
      borderColor: state.isFocused ? ctrlFocusedBorder : ctrlDefaultborder,
      '&:hover': {
        borderColor: state.isFocused ? ctrlFocusedBorder : ctrlDefaultborder,
      },
    }),
    option: (base, state) => ({
      ...base,
      paddingLeft: '16px',
      paddingRight: '16px',
      cursor: "pointer",
      backgroundColor: state.isSelected ? '#F0F0F0' : '#FFFFFF',
      color: '#090925',

      '&:hover': {
        backgroundColor: state.isSelected ? '#F0F0F0' : '#F8F8F8',
      },
    }),
    ...restStyles,
  };

  const restProps = {
    styles,
    components: selectComponents,
  };

  return (
    <div className={`select-container ${containerClass}`}>
      {label && (
        <label htmlFor={name} className='form-label mb-1 px-1'>
          {label}
        </label>
      )}
      <Select
        id={name}
        name={name}
        options={options}
        onChange={onChange}
        defaultValue={value}
        className={className}
        placeholder={placeholder}
        {...restProps}
      />
      {message && (
        <p
          title={message}
          className={`input-message text-xs text-ellipsis weight-500 px-1 mt-1 mb-0${
            isSuccess ? ' text-success' : isError ? ' text-danger' : ''
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default SelectCustom;