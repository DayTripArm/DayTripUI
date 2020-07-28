import React from 'react';

const Checkbox = ({ checked, className = '', name, label, onChange = () => {} }) => (
  <div className={`checkbox ${className}`}>
    <input type='checkbox' id={name} name={name} checked={checked} onChange={onChange} />
    <label htmlFor={name}>{label && label}</label>
  </div>
);
export default Checkbox;
