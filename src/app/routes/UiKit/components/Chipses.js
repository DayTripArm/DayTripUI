import React from 'react';
import Chips from 'shared/components/Chips';

const Chipses = () => (
  <div className='mb-4'>
    <Chips className='mr-5' />
    <Chips removable />
  </div>
);

export default Chipses;
