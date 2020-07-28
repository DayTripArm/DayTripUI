import React from 'react';
import { IconArrowRight } from './Icons';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ routes, className = '' }) => {
  return (
    <div className={`text-sm d-flex align-items-center ${className}`}>
      {routes.map((item, i) => (
        <div key={i}>
          <Link to={item.route} className='text__blue weight-500'>
            {item.name}
          </Link>
          {i < routes.length - 1 && <IconArrowRight />}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
