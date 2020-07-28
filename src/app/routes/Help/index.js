import React from 'react';
import { Link } from 'react-router-dom';

const Help = () => {
  return (
    <div className='container'>
      <h1 className='mxw-700px text__grey-dark mt-6 mb-md-8 mt-md-9 mt-xl-11 mb-xl-9 mb-xxl-11 mt-xxl-13'>
        Get help with our reservations, account and more.
      </h1>
      <ul className='no-list-style mb-0 row'>
        <li className='mb-5 mb-md-6 mb-xl-9 col-md-6 col-xl-4 col-xxl-3'>
          <h4 className='text__blue mb-3'>Getting Started</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea mattis eleifend mi
            convallis felis quis egestas luctus dignissim. Suspendisse augue a vulputate elit.
          </p>
          <Link to='/help/1' className='btn btn-secondary btn-sm'>
            Read More
          </Link>
        </li>
        <li className='mb-5 mb-md-6 mb-xl-9 col-md-6 col-xl-4 col-xxl-3'>
          <h4 className='text__blue mb-3'>Booking</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea mattis eleifend mi
            convallis felis quis egestas luctus dignissim. Suspendisse augue a vulputate elit.
          </p>
          <Link to='/help/1' className='btn btn-secondary btn-sm'>
            Read More
          </Link>
        </li>
        <li className='mb-5 mb-md-6 mb-xl-9 col-md-6 col-xl-4 col-xxl-3'>
          <h4 className='text__blue mb-3'>Payment</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea mattis eleifend mi
            convallis felis quis egestas luctus dignissim. Suspendisse augue a vulputate elit.
          </p>
          <Link to='/help/1' className='btn btn-secondary btn-sm'>
            Read More
          </Link>
        </li>
        <li className='mb-5 mb-md-6 mb-xl-9 col-md-6 col-xl-4 col-xxl-3'>
          <h4 className='text__blue mb-3'>Your Trips</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea mattis eleifend mi
            convallis felis quis egestas luctus dignissim. Suspendisse augue a vulputate elit.
          </p>
          <Link to='/help/1' className='btn btn-secondary btn-sm'>
            Read More
          </Link>
        </li>
        <li className='mb-5 mb-md-6 mb-xl-9 col-md-6 col-xl-4 col-xxl-3'>
          <h4 className='text__blue mb-3'>Your Account</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea mattis eleifend mi
            convallis felis quis egestas luctus dignissim. Suspendisse augue a vulputate elit.
          </p>
          <Link to='/help/1' className='btn btn-secondary btn-sm'>
            Read More
          </Link>
        </li>
        <li className='mb-5 mb-md-6 mb-xl-9 col-md-6 col-xl-4 col-xxl-3'>
          <h4 className='text__blue mb-3'>Become a Driver</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea mattis eleifend mi
            convallis felis quis egestas luctus dignissim. Suspendisse augue a vulputate elit.
          </p>
          <Link to='/help/1' className='btn btn-secondary btn-sm'>
            Read More
          </Link>
        </li>
        <li className='mb-5 mb-md-6 mb-xl-9 col-md-6 col-xl-4 col-xxl-3'>
          <h4 className='text__blue mb-3'>Partners & Community</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea mattis eleifend mi
            convallis felis quis egestas luctus dignissim. Suspendisse augue a vulputate elit.
          </p>
          <Link to='/help/1' className='btn btn-secondary btn-sm'>
            Read More
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Help;
