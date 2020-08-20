import React from 'react';
import { NavLink } from 'react-router-dom';

const CarViewNavigation = () => {
    return (
        <div className={`menu-vertical menu-vertical__tabs bg-white px-lg-1 px-md-0`}>
            <ul className='no-list-style mb-3 mb-lg-0 clearfix'>
                <li>
                    <NavLink to='/carView' className='pl-3 py-2 pr-3 pr-lg-0'>
                        Car Details
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/carMore' className='pl-3 py-2 pr-3 pr-lg-0'>
                        More Details
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/carPrices' className='pl-3 py-2 pr-3 pr-lg-0'>
                        Car Prices
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default CarViewNavigation;
