import React from 'react';
import DriversIllustration from './components/DriversIllustration';
import Chips from 'shared/components/Chips';
import { IconClockOutlined, IconDestination } from 'shared/components/Icons';
import DriversList from './components/DriversList';

const Drivers = ({ history }) => (
  <>
    <DriversIllustration history={history} />
    <div className='rounded-top__30 bg-white pull-t-9 position-relative'>
      <div className='container pt-6 pt-lg-8 pt-xl-11'>
        <div className='col-xl-10 col-xxl-9 col-xxxl-8 m-auto p-0'>
          <h2 className='text__blue mb-4 mb-md-3'>Garni Temple and Geghard Monastery</h2>
          <div className='d-md-flex'>
            <div className='d-flex mb-4 mr-md-4'>
              <IconClockOutlined className='mr-2' />
              <p className='mb-0'>
                Trip duration: <span className='weight-500 text__grey-dark'>8 hours</span>
              </p>
            </div>
            <div className='d-flex mb-5'>
              <IconDestination className='mr-2' />
              <p className='mb-0'>
                Starting destination: <span className='weight-500 text__grey-dark'>Yerevan</span>
              </p>
            </div>
          </div>
          <div className='mb-9 mb-md-10 mb-xl-11'>
            <Chips name='Sep-1' className='mr-4 mb-md-5' />
            <Chips name='3 Travelers' />
          </div>
          <h2 className='text__blue mb-4 mb-md-5'>Available Drivers</h2>
          <DriversList />
        </div>
      </div>
    </div>
  </>
);

export default Drivers;
