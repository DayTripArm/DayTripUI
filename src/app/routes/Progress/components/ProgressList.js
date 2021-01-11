import React from 'react';
import { IconStar } from 'shared/components/Icons';
import {MONTH_LIST} from "../../../../constants";

const ProgressList = ({ onOpenModal, driver_progress }) => (
  <ul className='no-list-style mb-0'>
    <li className='border__bottom border__default pb-4 mb-3'>
      <div className='d-flex align-items-center justify-content-between mb-4 mb-md-5'>
        <h4 className='mb-0 text__grey-dark'>{MONTH_LIST[new Date().getMonth()]} Earnings</h4>
        <button className='btn btn-sm btn-secondary' onClick={() => {onOpenModal(1)}}>
          View Details
        </button>
      </div>
      <h2 className='mb-2'>$ {driver_progress?.current_month_earnings || 0}</h2>
      <p className='text__grey-dark mb-0'>Earnings including upcoming bookings</p>
    </li>
    <li className='border__bottom border__default pb-4 mb-3'>
      <div className='d-flex align-items-center justify-content-between mb-4 mb-md-5'>
        <h4 className='mb-0 text__grey-dark'>Rating and Reviews</h4>
        <button className='btn btn-sm btn-secondary' onClick={() => {onOpenModal(2)}}>
          View Details
        </button>
      </div>
      <h2 className='mb-2 d-flex align-items-center'>
        <span className='weight-700'>{driver_progress?.overall_rating || "No reviews"}</span>
        <IconStar fill='#FE4C30' width='32' height='32' className='ml-2' />
      </h2>
      <p className='text__grey-dark mb-0'>Average rating</p>
    </li>
    <li className='border__bottom border__default pb-4 mb-3'>
      <div className='d-flex align-items-center justify-content-between mb-4 mb-md-5'>
        <h4 className='mb-0 text__grey-dark'>Bookings</h4>
      </div>
      <h2 className='mb-2'>{driver_progress?.bookings || 0}</h2>
      <p className='text__grey-dark mb-0'>All past and upcoming bookings</p>
    </li>
    <li className='border__bottom border__default pb-4 mb-3'>
      <div className='d-flex align-items-center justify-content-between mb-4 mb-md-5'>
        <h4 className='mb-0 text__grey-dark'>Completed Trips</h4>
        <button className='btn btn-sm btn-secondary' onClick={() => {onOpenModal(4)}}>
          View Details
        </button>
      </div>
      <h2 className='mb-2'>{driver_progress?.upcoming_trips || 0}</h2>
      <p className='text__grey-dark mb-0'>Last Month</p>
    </li>
    <li className='border__bottom border__default pb-4 mb-3'>
      <div className='d-flex align-items-center justify-content-between mb-4 mb-md-5'>
        <h4 className='mb-0 text__grey-dark'>Popular Trips</h4>
        <button className='btn btn-sm btn-secondary' onClick={() => {onOpenModal(5)}}>
          View Details
        </button>
      </div>
      <h2 className='mb-2'>{driver_progress?.popular_trips || 0}</h2>
      <p className='text__grey-dark mb-0'>Overall</p>
    </li>
    <li className='border__bottom border__default pb-4 mb-3'>
      <div className='d-flex align-items-center justify-content-between mb-4 mb-md-5'>
        <h4 className='mb-0 text__grey-dark'>Upcoming Trips</h4>
        <button className='btn btn-sm btn-secondary' onClick={() => {onOpenModal(6)}}>
          View Details
        </button>
      </div>
      <h2 className='mb-2'>{driver_progress?.upcoming_trips || 0}</h2>
      <p className='text__grey-dark mb-0'>Overall</p>
    </li>
  </ul>
);

export default ProgressList;
