import React from 'react';
import Header from 'app/components/Header';

const Headers = () => (
  <>
    <div className='mb-13 py-6'>
      <Header />
    </div>
    <div className='mb-13 py-6'>
      <Header type='authorized' navigationType='user' />
    </div>
    <div className='py-6'>
      <Header type='authorized' navigationType='driver' />
    </div>
  </>
);

export default Headers;
