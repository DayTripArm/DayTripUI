import React from 'react';
import { IconArrowRight } from './Icons';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";

const Breadcrumbs = ({ routes, className = '' }) => {
  const history = useHistory();
  return (
    <div className={`text-sm d-flex align-items-center ${className}`}>
      {routes.map((item, i) => (
        <div key={i}>
          {!item.isActive?
            <Link to={item.route} className='text__blue weight-500' onClick={ (event) => {
                event.preventDefault();
            }}>
                {item.name}
            </Link>:
            <span className='text__blue weight-500'>{item.name}</span>
          }
          {i < routes.length - 1 && <IconArrowRight />}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
