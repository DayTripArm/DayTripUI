import React from 'react';
import Input from 'shared/components/Input';
import { IconCopy } from 'shared/components/Icons';

const Refer = () => (
  <div className='container'>
    <div className='mh-min-screen d-flex align-items-center justify-content-center'>
      <div>
        <h2 className='text__blue mb-4'>Earn $15 for Every New Traveler You Refer</h2>
        <p className='mb-md-6'>
          Get a friends to start traveling and earn $15 when they complete their first trip.
        </p>
        <div className='d-md-flex justify-content-center'>
          <Input
            type='text'
            name='share'
            placeholder='Url'
            icon={IconCopy}
            iconPosition='right'
            containerClass='mb-4 mr-md-3'
          />
          <button className='btn btn-primary text-uppercase btn-xs-block'>Share</button>
        </div>
      </div>
    </div>
  </div>
);

export default Refer;
