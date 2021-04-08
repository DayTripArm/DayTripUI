import React from 'react';
import ImpNoResults from 'assets/images/no_results.svg';

const NoResults = ({message}) => (
  <div className='mt-lg-1 text-center mh-min-screen'>
    <img src={ImpNoResults} alt='person' className='mb-6 px-6 px-md-0' />
    <h2 className='text__blue mb-4'>{message}</h2>
    <p className='text__grey-dark'>
      When you book a trip or messages from your host will show up here.
    </p>
  </div>
);

export default NoResults;
