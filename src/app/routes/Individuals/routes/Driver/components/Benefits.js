import React from 'react';
import {
  IconCheckMarkOutlined,
  IconHome,
  IconGlobe,
  IconCar,
  IconSeat,
  IconNoSmoking,
  IconPetStep,
} from 'shared/components/Icons';

const Benefits = () => (
  <div className='row'>
    <div className='col-md-6 d-flex mb-4'>
      <IconHome className='mr-2' />
      <p className='mb-0'>
        Lives: <span className='weight-500 text__grey-dark'>Yerevan, Armenia</span>
      </p>
    </div>
    <div className='col-md-6 d-flex mb-4'>
      <IconGlobe className='mr-2' />
      <p className='mb-0'>
        Languages: <span className='weight-500 text__grey-dark'>English, Russian, French</span>
      </p>
    </div>
    <div className='col-md-6 d-flex mb-4'>
      <IconCar className='mr-2' />
      <p className='mb-0'>
        Car: <span className='weight-500 text__grey-dark'>Mercedes Benz C130</span>
      </p>
    </div>
    <div className='col-md-6 d-flex mb-4'>
      <IconSeat className='mr-2' />
      <p className='mb-0'>
        Seats: <span className='weight-500 text__grey-dark'>4</span>
      </p>
    </div>
    <div className='col-md-6 d-flex mb-4'>
      <IconCheckMarkOutlined className='mr-2' />
      <p className='mb-0'>
        Car Seat: <span className='weight-500 text__grey-dark'>Yes</span>
      </p>
    </div>
    <div className='col-md-6 d-flex mb-4'>
      <IconCheckMarkOutlined className='mr-2' />
      <p className='mb-0'>
        A/C: <span className='weight-500 text__grey-dark'>Yes</span>
      </p>
    </div>
    <div className='col-md-6 d-flex mb-4'>
      <IconNoSmoking className='mr-2' />
      <p className='mb-0'>
        Smoking: <span className='weight-500 text__grey-dark'>No</span>
      </p>
    </div>
    <div className='col-md-6 d-flex mb-4'>
      <IconCheckMarkOutlined className='mr-2' />
      <p className='mb-0'>
        Sneaks: <span className='weight-500 text__grey-dark'>Yes</span>
      </p>
    </div>
    <div className='col-md-6 d-flex mb-4'>
      <IconCheckMarkOutlined className='mr-2' />
      <p className='mb-0'>
        Water: <span className='weight-500 text__grey-dark'>Yes</span>
      </p>
    </div>
    <div className='col-md-6 d-flex'>
      <IconPetStep className='mr-2' />
      <p className='mb-0'>
        Pets Allowed: <span className='weight-500 text__grey-dark'>Yes</span>
      </p>
    </div>
  </div>
);

export default Benefits;
