import React from 'react';
import { IconCheckMarkFilled } from 'shared/components/Icons';

const CarRegComplete = () => (
  <>
    <h4 className='text__blue mb-4'>Great Progress, Nane!</h4>
    <p className='text__grey-dark'>
      Now let’s get some details abou your car so you can publish your listing.
    </p>
    <div className='d-flex align-items-center text-xs'>
      <IconCheckMarkFilled className='mr-2' />
      Model, Number of Seats, What’s included and more
    </div>
    <div className='text-right mt-3'>
      <button class='btn btn-sm btn-secondary btn-bold'>Change</button>
    </div>
    <hr className='border__top border__default mt-4 mb-5' />
    <p className='text__blue'>STEP: 2</p>
    <p className='weight-600 mb-2'>Set Personal Datas</p>
    <p>About, ID and More</p>
  </>
);

export default CarRegComplete;
