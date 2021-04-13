import React from 'react';
import ImgCar from 'assets/images/car.svg';

const NoResults = ({no_driver_title, no_driver_desc}) => (
  <div className='text-center mh-min-screen'>
    <img src={ImgCar} alt='person' className='mb-6 px-6 px-md-0' />
    <h2 className='text__blue mb-4'>{no_driver_title}</h2>
      <p className='text__grey-dark'>
        {no_driver_desc}
      </p>
  </div>
);

export default NoResults;
