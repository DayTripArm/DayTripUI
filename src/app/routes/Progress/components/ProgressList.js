import React from 'react';
import { IconStar } from 'shared/components/Icons';

const ProgressList = ({ onOpenModal }) => (
  <ul className='no-list-style mb-0'>
    <li className='border__bottom border__default pb-4 mb-3'>
      <div className='d-flex align-items-center justify-content-between mb-4 mb-md-5'>
        <h4 className='mb-0 text__grey-dark'>February Earnings</h4>
        <button className='btn btn-sm btn-secondary' onClick={onOpenModal}>
          View Details
        </button>
      </div>
      <h2 className='mb-2'>$ 768.00</h2>
      <p className='text__grey-dark mb-0'>$340.00 paid out this month</p>
    </li>
    <li className='border__bottom border__default pb-4 mb-3'>
      <div className='d-flex align-items-center justify-content-between mb-4 mb-md-5'>
        <h4 className='mb-0 text__grey-dark'>Overal Ratings</h4>
        <button className='btn btn-sm btn-secondary' onClick={onOpenModal}>
          View Details
        </button>
      </div>
      <h2 className='mb-2 d-flex align-items-center'>
        <span className='weight-700'>4.8</span>
        <IconStar fill='#FE4C30' width='32' height='32' className='ml-2' />
      </h2>
      <p className='text__grey-dark mb-0'>All time</p>
    </li>
    <li className='border__bottom border__default pb-4 mb-3'>
      <div className='d-flex align-items-center justify-content-between mb-4 mb-md-5'>
        <h4 className='mb-0 text__grey-dark'>Review and Booking</h4>
        <button className='btn btn-sm btn-secondary' onClick={onOpenModal}>
          View Details
        </button>
      </div>
      <h2 className='mb-2'>73</h2>
      <p className='text__grey-dark mb-0'>All time</p>
    </li>
    <li className='border__bottom border__default pb-4 mb-3'>
      <div className='d-flex align-items-center justify-content-between mb-4 mb-md-5'>
        <h4 className='mb-0 text__grey-dark'>Destination Booked</h4>
        <button className='btn btn-sm btn-secondary' onClick={onOpenModal}>
          View Details
        </button>
      </div>
      <h2 className='mb-2'>3</h2>
      <p className='text__grey-dark mb-0'>Over All</p>
    </li>
    <li className='border__bottom border__default pb-4 mb-3'>
      <div className='d-flex align-items-center justify-content-between mb-4 mb-md-5'>
        <h4 className='mb-0 text__grey-dark'>Upcoming Trips</h4>
        <button className='btn btn-sm btn-secondary' onClick={onOpenModal}>
          View Details
        </button>
      </div>
      <h2 className='mb-2'>4</h2>
      <p className='text__grey-dark mb-0'>New Bookings</p>
    </li>
  </ul>
);

export default ProgressList;
