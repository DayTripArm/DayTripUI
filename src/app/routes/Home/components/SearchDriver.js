import React from 'react';
import ImgSearchDriver from 'assets/images/temp/search_driver.jpg';
import Input from 'shared/components/Input';
import { Link } from 'react-router-dom';

const SearchDriver = () => (
  <>
    <h2 className='text__blue'> Hit The Road </h2>
    <div className='home-search-driver box-overlay rounded__10 overflow-hidden'>
      <img src={ImgSearchDriver} alt='home' className='w-100 object-pos-center object-fit-cover' />
      <div className='overlay d-flex align-items-center justify-content-center'>
        <div className='d-flex flex-column align-items-center'>
          <div className='text-white text-center px-4 px-lg-5'>
            <h2 className='h1 mb-4'>Take a Full Day Ride</h2>
            <h4 className='mb-5 weight-300'>
              Our drivers will be at your disposal for a whole day. Decide Where to go and where to
              stop.
            </h4>
          </div>
          <div className='bg-white rounded__10 px-4 px-lg-5 pb-5 pt-4 d-flex flex-column flex-lg-row align-items-end'>
            <Input
              type='text'
              name='field1'
              label='Date *'
              placeholder='Select your Date'
              containerClass='mr-lg-4 mb-lg-0'
            />
            <Input
              type='number'
              name='field1'
              label='Travelers *'
              placeholder='Count'
              containerClass='mr-lg-4 mb-lg-0'
              hideApperance
            />
            <Link to='/drivers' className='btn btn-primary btn-block__md'>
              Search for Driver
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default SearchDriver;
