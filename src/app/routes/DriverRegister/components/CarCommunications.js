import React from 'react';
import { IconPlus, IconMinus } from 'shared/components/Icons';
import Checkbox from 'shared/components/Checkbox';

const CarRegistration = () => (
  <>
    <h4 className='text__blue mb-4'>How many travelers can fit in your car?</h4>
    <p className='text__grey-dark'>
      Check that you have enough sits to fit all your guests comfortably.
    </p>
    <div className='d-flex align-items-center mb-7'>
      <span className='weight-500 mr-1'>Seats</span>
      <div className='d-flex align-items-center'>
        <button className='btn btn-circle border-0'>
          <IconPlus />
        </button>
        <span className='mx-1'>4</span>
        <button className='btn btn-circle border-0'>
          <IconMinus />
        </button>
      </div>
    </div>
    <h4 className='text__blue mb-4'>Tell us what you have in the car</h4>
    <p className='text__grey-dark'>
      Tell the travelers more about your car and rules. You can add even more after you publish.
    </p>
    <Checkbox className='mb-4 w-100' name='check1' label='Car Seat' />
    <Checkbox className='mb-4 w-100' name='check1' label='Air Conditioning' />
    <Checkbox className='mb-4 w-100' name='check1' label='Smoke Allowed' />
    <Checkbox className='mb-4 w-100' name='check1' label='Pets Allowed' />
    <Checkbox className='mb-4 w-100' name='check1' label='Water' />
    <Checkbox className='mb-4 w-100' name='check1' label='Snacks' />
    <Checkbox className='w-100' name='check1' label='WIFI' />
  </>
);

export default CarRegistration;
