import React from 'react';
import ImpNoResults from 'assets/images/no_results.svg';

const NoResults = ({message, short_desc="When you book a trip the messages from your host will show up here."}) => (
  <div className='mt-lg-1 text-center mh-min-screen'>
    <img src={ImpNoResults} alt='person' className='mb-6 px-6 px-md-0' />
    <h2 className='text__blue mb-4'>{message}</h2>
    <p className='text__grey-dark'>
      {short_desc}
    </p>
  </div>
);

export default NoResults;
