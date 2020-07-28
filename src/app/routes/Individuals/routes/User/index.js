import React from 'react';
import Benefits from './components/Benefits';
import DriverInfo from './components/DriverInfo';

const User = () => {
  return (
    <>
      <div className='container overflow-hidden'>
        <div className='row mh-min-screen mt-6 mt-md-9 mt-xl-11 mt-xxl-13'>
          <div className='col-xl-3 pr-xl-0 pr-xxxl-8'>
            <DriverInfo />
          </div>
          <div className='col-xl-9'>
            <h1 className='text__blue mt-9 mt-md-10 mt-xl-0 mb-2 mb-xl-1'>Hi, I am Nane !</h1>
            <p className='text-sm weight-500 text__grey-dark mb-5'>Member since June 2017</p>
            <p className='mb-0'>
              Hi I’m musician and I have a rock band. I love traveling and getting to know peoplenew
              people from all around the world. Let’s meet :)
            </p>
            <hr className='border__top border__default my-4 my-md-5' />
            <Benefits />
            <hr className='border__top border__default my-4 mt-md-1 mb-md-5' />
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
