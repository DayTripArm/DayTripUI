import React from 'react';
import ImpPersonJump from 'assets/images/person_jump.svg';
import { Link } from 'react-router-dom';

const Success = () => (
  <div className='px-4 mt-6 mt-md-11 mt-lg-13 mt-xxxl-18 text-center'>
    <img src={ImpPersonJump} alt='person' className='mb-6 px-6 px-md-0' />
    <h2 className='text__blue mb-4'>Big Thank You!</h2>
    <h4 className='mb-4'>Your Trip is Confirmed.</h4>
    <p className='text__grey-dark'>Don’t forget to take a lot of selfies and have fun</p>
    <Link to='/home' className='btn btn-primary text-uppercase btn-xs-block'>
      Back to home
    </Link>
  </div>
);

export default Success;
