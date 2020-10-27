import React, { useState } from 'react';
import Modal from 'shared/components/Modal';
import Textarea from 'shared/components/Textarea';
import Rating from 'app/routes/UiKit/components/Rating';

const ReviewModal = ({ onClose }) => {
  const [tab, setTab] = useState(1);

  return (
    <Modal title='Rate and Review' showDismissButton onClose={() => onClose(false)}>
      <div className='py-4 px-0 px-md-8'>
        <div className='tabs tabs__fit mb-6'>
          <ul className='no-list-style mb-3 mb-lg-0 clearfix'>
            <li className={tab === 1 ? 'active' : ''} onClick={() => setTab(1)} role='presentation'>
              Your Trip
            </li>
            <li className={tab === 2 ? 'active' : ''} onClick={() => setTab(2)} role='presentation'>
              Your Driver
            </li>
          </ul>
        </div>
        <p className='text-center weight-700'>Did you enjoy your day? Please rate the trip and the driver</p>
        <div className='mb-6'>
          <Rating />
        </div>
        <p className='text-center weight-700'>Share your experience</p>
        <Textarea name='note' placeholder='Write a review' value='' className='h-152px' />
        <button className='btn btn-primary btn-block text-uppercase'>Submit</button>
      </div>
    </Modal>
  );
};

export default ReviewModal;
