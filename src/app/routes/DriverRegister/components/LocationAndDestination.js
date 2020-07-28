import React from 'react';
import Input from 'shared/components/Input';
import SelectCustom from 'shared/components/SelectCustom';
import { IconDestination, IconQuestionOutlined } from 'shared/components/Icons';

const LocationAndDestination = () => (
  <>
    <h4 className='text__blue mb-6'>Let’s Make Your Profile Looks Better</h4>
    <SelectCustom
      type='text'
      name='location'
      label='Location'
      placeholder='Choose'
      value=''
      options={[
        { label: 'Option1', value: '1' },
        { label: 'Option2', value: '2' },
        { label: 'Option3', value: '3' },
      ]}
    />
    <Input
      type='text'
      name='locationMap'
      label='Choose your destination'
      placeholder='Select Location'
      icon={IconDestination}
      iconPosition='right'
      containerClass='mb-8'
    />
    <h4 className='text__blue mb-6'>
      1km Tariff{' '}
      <button className='btn btn-circle btn-sm border-0 pull-t-5'>
        <IconQuestionOutlined fill='#757575' />
      </button>
    </h4>
    <Input
      type='number'
      name='locationMap'
      label='Set Up Your Price in AMD for 1km Ride including waiting time'
      placeholder='Price'
      iconPosition='right'
    />
    <p className='text__grey-dark'>
      According to the 1km price, you will earn the following amounts for these example trips.
    </p>
    <ul className='no-list-style mb-0'>
      <li className='rounded__4 border-style border__default p-4 mb-2'>
        <div className='d-flex justify-content-between'>
          <p className='text-xs text__blue mb-0'>Yerevan - Garni - Geghard - Yerevan</p>
          <p className='text-xs text__blue weight-500 mb-0'>35.000AMD</p>
        </div>
        <hr className='border__top border__default mt-2 mb-3' />
        <div className='d-flex'>
          <p className='text-xs text__grey-dark mr-7 mb-0'>
            <span className='weight-500'>Trip duraction</span>: 8 hours
          </p>
          <p className='text-xs text__grey-dark mb-0'>
            <span className='weight-500'>Distance</span>: 35km
          </p>
        </div>
      </li>
      <li className='rounded__4 border-style border__default p-4 mb-2'>
        <div className='d-flex justify-content-between'>
          <p className='text-xs text__blue mb-0'>Yerevan - Garni - Geghard - Yerevan</p>
          <p className='text-xs text__blue weight-500 mb-0'>35.000AMD</p>
        </div>
        <hr className='border__top border__default mt-2 mb-3' />
        <div className='d-flex'>
          <p className='text-xs text__grey-dark mr-7 mb-0'>
            <span className='weight-500'>Trip duraction</span>: 8 hours
          </p>
          <p className='text-xs text__grey-dark mb-0'>
            <span className='weight-500'>Distance</span>: 35km
          </p>
        </div>
      </li>
      <li className='rounded__4 border-style border__default p-4'>
        <div className='d-flex justify-content-between'>
          <p className='text-xs text__blue mb-0'>Yerevan - Garni - Geghard - Yerevan</p>
          <p className='text-xs text__blue weight-500 mb-0'>35.000AMD</p>
        </div>
        <hr className='border__top border__default mt-2 mb-3' />
        <div className='d-flex'>
          <p className='text-xs text__grey-dark mr-7 mb-0'>
            <span className='weight-500'>Trip duraction</span>: 8 hours
          </p>
          <p className='text-xs text__grey-dark mb-0'>
            <span className='weight-500'>Distance</span>: 35km
          </p>
        </div>
      </li>
    </ul>
  </>
);

export default LocationAndDestination;
