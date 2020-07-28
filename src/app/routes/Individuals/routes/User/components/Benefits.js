import React from 'react';
import { IconHome, IconGlobe } from 'shared/components/Icons';

const Benefits = () => (
  <div className='row'>
    <div className='col-md-6 d-flex mb-4'>
      <IconHome className='mr-2' />
      <p className='mb-0'>
        Lives: <span className='weight-500 text__grey-dark'>Yerevan, Armenia</span>
      </p>
    </div>
    <div className='col-md-6 d-flex mb-4'>
      <IconGlobe className='mr-2' />
      <p className='mb-0'>
        Languages: <span className='weight-500 text__grey-dark'>English, Russian, French</span>
      </p>
    </div>
  </div>
);

export default Benefits;
