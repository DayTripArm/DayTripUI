import React from 'react';
import Checkbox from 'shared/components/Checkbox';

const Checkboxes = () => (
  <div className='mb-4'>
    <Checkbox className='mr-5' name='check1' label='Checkbox 1' />
    <Checkbox className='mr-5' name='check2' label='Checkbox 2' checked />
  </div>
);

export default Checkboxes;
