import React from 'react';
import ImgCar from 'assets/images/car.svg';

const NoResults = () => (
  <div className='text-center mh-min-screen'>
    <img src={ImgCar} alt='person' className='mb-6 px-6 px-md-0' />
    <h2 className='text__blue mb-4'>There Are No Available Drivers</h2>
      <p className='text__grey-dark'>
          Please consider rescheduling your trip. You can edit the date and try again
      </p>
  </div>
);

export default NoResults;
