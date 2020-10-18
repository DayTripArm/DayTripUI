import React from 'react';
import { IconTimes } from './Icons';

const Chips = ({ removable, name = 'Chips', className = '', onRemove = () => {}, onClick = () => {} }) => (
  <div className={`d-inline-flex align-items-center chips${removable ? ' text-xs chips-removable' : ''} ${className}`} onClick={onClick}>
    {name}
    {removable && (
      <button className='btn btn-circle btn-sm border-0' onClick={onRemove}>
        <IconTimes />
      </button>
    )}
  </div>
);

export default Chips;
