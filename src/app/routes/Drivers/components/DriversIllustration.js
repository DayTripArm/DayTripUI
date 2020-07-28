import React from 'react';
import { IconArrowLeft } from 'shared/components/Icons';

const DriversIllustration = ({ history }) => (
  <div className='drivers-illustration box-overlay'>
    <img
      src='https://upload.wikimedia.org/wikipedia/commons/c/c5/Garni_Temple_02.JPG'
      alt='garni'
      className='w-100 h-100 object-pos-center object-fit-cover'
    />
    <div className='overlay'>
      <div className='container pt-4 pt-xl-5'>
        <button className='back-btn btn btn-circle border-0' onClick={() => history.goBack()}>
          <IconArrowLeft />
        </button>
      </div>
    </div>
  </div>
);

export default DriversIllustration;
