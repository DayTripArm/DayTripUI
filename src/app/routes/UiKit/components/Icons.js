import React from 'react';
import * as IconList from 'shared/components/Icons';

const Icons = () => (
  <>
    {Object.values(IconList).map((Icon, i) => (
      <Icon key={i} className='mr-3 mb-3' />
    ))}
  </>
);

export default Icons;
