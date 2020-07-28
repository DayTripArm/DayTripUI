import React from 'react';
import { IconStar, IconCheckMarkOutlined } from 'shared/components/Icons';

const DriverInfo = () => (
  <div className='rounded__8 border-style border__default'>
    <div className='p-4 p-md-5 p-xxl-6'>
      <div className='d-flex'>
        <img
          width='80'
          height='80'
          src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png'
          alt='garni'
          className='rounded__50 object-pos-center object-fit-cover mr-3 mr-md-5'
        />
        <div>
          <p className='weight-500 pt-2 mb-0'>Nane Minasyan</p>
          <p className='mb-0'>
            <span className='weight-700'>5.0</span>
            <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
            <span className='text-sm text__grey-dark'>(125 reviews)</span>
          </p>
        </div>
      </div>
    </div>
    <hr className='border__top border__default my-0' />
    <div className='p-4 p-md-5 p-xxl-6'>
      <div className='d-flex mb-4'>
        <IconCheckMarkOutlined className='mr-2' /> ID
      </div>
      <div className='d-flex mb-4'>
        <IconCheckMarkOutlined className='mr-2' /> Phone
      </div>
      <div className='d-flex'>
        <IconCheckMarkOutlined className='mr-2' /> Email Address
      </div>
    </div>
  </div>
);

export default DriverInfo;
