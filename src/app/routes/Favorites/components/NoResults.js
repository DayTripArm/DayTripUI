import React from 'react';
import ImpNoResultsGirl from 'assets/images/no_results_girl.svg';
import { Link } from 'react-router-dom';

const NoResults = ({texts}) => (
  <div className='px-4 pt-6 pt-md-11 pt-lg-13 pt-xxxl-18 text-center mh-min-screen'>
    <img src={ImpNoResultsGirl} alt='person' className='mb-6 px-6 px-md-0' />
    <h2 className='text__blue mb-4'>{texts.no_saved_trip_title}</h2>
      <p className='text__grey-dark'>
            {texts.no_saved_trip_text}
      </p>
      <Link to='/home' className='btn btn-primary text-uppercase btn-xs-block'>
        {texts.no_saved_btn}
      </Link>
  </div>
);

export default NoResults;
