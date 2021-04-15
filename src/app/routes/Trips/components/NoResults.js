import React from 'react';
import ImpNoResults from 'assets/images/no_results.svg';
import { Link } from 'react-router-dom';

const NoResults = ({message, texts}) => {
    return (
        <div className='px-4 mt-6 mt-md-11 mt-lg-13 mt-xxxl-18 text-center mh-min-screen'>
            <img src={ImpNoResults} alt='person' className='mb-6 px-6 px-md-0'/>
            <h2 className='text__blue mb-4'>{message}</h2>
            <h4 className='mb-4'>{texts.no_trip_header}</h4>
            <p className='text__grey-dark'>
                {texts.no_trip_text}
            </p>
            <Link to='/home' className='btn btn-primary text-uppercase btn-xs-block'>
                {texts.explore_btn}
            </Link>
        </div>
    )
};

export default NoResults;
