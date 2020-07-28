import React from 'react';
import Checkbox from 'shared/components/Checkbox';

const CarDetails = () => (
  <>
    <div className='d-flex align-items-start justify-content-between mb-2'>
      <p className='weight-700 mb-0'>How Many Travelers can fit in Your car?</p>
      <button className='btn btn-secondary btn-sm'>Edit</button>
    </div>
    <span className='text__grey-dark'>4</span>
    <hr className='border__top border__default my-4' />
    <div className='d-flex align-items-start justify-content-between mb-6'>
      <p className='weight-700 mb-0'>Tell us what you have in the car</p>
      <button className='btn btn-secondary btn-sm'>Cancel</button>
    </div>
    <Checkbox className='mb-4 w-100' name='check1' label='Car Seat' />
    <Checkbox className='mb-4 w-100' name='check1' label='Air Conditioning' />
    <Checkbox className='mb-4 w-100' name='check1' label='Smoke Allowed' />
    <Checkbox className='mb-4 w-100' name='check1' label='Pets Allowed' />
    <Checkbox className='mb-4 w-100' name='check1' label='Water' />
    <Checkbox className='mb-4 w-100' name='check1' label='Snacks' />
    <Checkbox className='w-100 mb-4' name='check1' label='WIFI' />
    <div className='pt-3'>
      <button className='btn btn-primary text-uppercase'>Save</button>
    </div>
    <hr className='border__top border__default my-4' />
    <div className='d-flex align-items-start justify-content-between mb-2'>
      <p className='weight-700 mb-0'>Selected Destinations</p>
      <button className='btn btn-secondary btn-sm'>Edit</button>
    </div>
    <p className='text__grey-dark'>Garni, Dilijan, Alaverdi</p>
    <hr className='border__top border__default mt-4 mb-0' />
  </>
);

export default CarDetails;
