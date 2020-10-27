import React from 'react';
import ImpNoResultsGirl from 'assets/images/no_results_girl.svg';

const NoResults = () => (
  <div className='px-4 pt-6 pt-md-11 pt-lg-13 pt-xxxl-18 text-center mh-min-screen'>
    <img src={ImpNoResultsGirl} alt='person' className='mb-6 px-6 px-md-0' />
    <h2 className='text__blue mb-4'>You don’t Have Any Saved Trips</h2>
  </div>
);

export default NoResults;
