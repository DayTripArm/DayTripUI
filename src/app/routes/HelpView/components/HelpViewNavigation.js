import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconTimes } from 'shared/components/Icons';

const HelpViewNavigation = ({ open, onClose }) => {
  return (
    <div className={`menu-vertical bg-white px-1 px-md-0 d-${open ? 'block' : 'none'} d-md-block`}>
      <div className='p-4 text-right d-md-none'>
        <button className='btn btn-circle border-0' onClick={onClose}>
          <IconTimes />
        </button>
      </div>
      <ul className='no-list-style mb-0'>
        <li>
          <NavLink to='/asd' className='pl-3 py-2'>
            Getting Started
          </NavLink>
        </li>
        <li>
          <NavLink to='/asd' className='pl-3 py-2'>
            Booking
          </NavLink>
        </li>
        <li>
          <NavLink to='/asd' className='pl-3 py-2'>
            Payment
          </NavLink>
        </li>
        <li className='pl-3'>
          <span className='weight-700 pb-2'>Your Trips</span>
          <ul className='no-list-style mb-0'>
            <li>
              <NavLink to='/asd' className='pl-3 py-2'>
                Help with your trip
              </NavLink>
            </li>
            <li>
              <NavLink to='/asd' className='pl-3 py-2'>
                Host cancellations
              </NavLink>
            </li>
            <li>
              {/* <span>Changing a reservation</span> */}
              <NavLink to='/help' className='pl-3 py-2'>
                Changing a reservation
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink to='/asd' className='pl-3 py-2'>
            Your Account
          </NavLink>
        </li>
        <li>
          <NavLink to='/asd' className='pl-3 py-2'>
            Become a Driver
          </NavLink>
        </li>
        <li>
          <NavLink to='/asd' className='pl-3 py-2'>
            Partners & Community
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default HelpViewNavigation;
