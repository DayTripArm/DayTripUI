import React from 'react';
import { IconArrowLeft } from 'shared/components/Icons';
import Benefits from './components/Benefits';
import DriverInfo from './components/DriverInfo';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import BookPanel from './components/BookPanel';
import { Link } from 'react-router-dom';

const Driver = ({ history }) => {
  return (
    <>
      <div className='container overflow-hidden'>
        <div className='mt-4 mb-5'>
          <button className='btn btn-circle border-0' onClick={() => history.goBack()}>
            <IconArrowLeft />
          </button>
          <Link to='/individuals/user' className='btn btn-secondary btn-sm ml-18'>
            Switch to User [THIS BUTTON IS NOT PART OF DESIGN]
          </Link>
        </div>
        <div className='row'>
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
            <Gallery />
            <Reviews />
            <div className='text-right my-5'>
              <button className='btn btn-secondary btn-sm'>Show More Reviews</button>
            </div>
          </div>
        </div>
      </div>
      <BookPanel />
    </>
  );
};

export default Driver;
