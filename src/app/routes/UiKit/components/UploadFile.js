import React from 'react';
import { IconUpload } from 'shared/components/Icons';

const UploadFile = ({ name, label, multiple, size }) => (
  <>
    <label
      htmlFor={name}
      tabIndex='0'
      className={`upload-label rounded__4 border-style border__dashed border__default text__grey-dark d-flex flex-column align-items-center justify-content-center${
        size === 'sm' ? ' upload-label__sm' : ''
      }`}
    >
      <IconUpload fill='#757575' />
      {size !== 'sm' && <span className='text-sm weight-500'>{label}</span>}
    </label>
    <input id={name} name={name} type='file' className='d-none' multiple={multiple} />
  </>
);

export default UploadFile;
