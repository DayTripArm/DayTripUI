import React from 'react';
import Breadcrumbs from 'shared/components/Breadcrumbs';

const routes = [
  {
    route: '/',
    name: 'Account',
  },
  {
    route: '/',
    name: 'Login & Security',
  },
];

const LoginSecurity = () => {
  return (
    <div className='container'>
      <div className='col-xl-10 col-xxl-9 col-xxxl-8 m-auto p-0'>
        <Breadcrumbs routes={routes} className='mt-4 mb-5 mt-xl-5 mb-xl-6' />

        <h2 className='text__blue mb-0'>Login & Security</h2>

        <h4 className='text__grey-dark mb-0 mt-5 mt-md-6'>Login</h4>

        <ul className='no-list-style mb-0'>
          <li className='border__bottom border__default pt-4 pb-4'>
            <div className='d-flex align-items-center justify-content-between mb-2'>
              <p className='mb-0 weight-700'>Password</p>
              <button className='btn btn-sm btn-secondary'>Update</button>
            </div>
            <p className='text__grey-dark mb-0'>Last Update 13 days ago</p>
          </li>
        </ul>

        <h4 className='text__grey-dark mb-0 mt-5 mt-md-6'>Social accounts</h4>

        <ul className='no-list-style mb-0'>
          <li className='border__bottom border__default pt-4 pb-4'>
            <div className='d-flex align-items-center justify-content-between mb-2'>
              <p className='mb-0 weight-700'>Facebook</p>
              <button className='btn btn-sm btn-secondary'>Connect</button>
            </div>
            <p className='text__grey-dark mb-0'>Not Connected</p>
          </li>
        </ul>
        <ul className='no-list-style mb-0'>
          <li className='border__bottom border__default pt-4 pb-4'>
            <div className='d-flex align-items-center justify-content-between mb-2'>
              <p className='mb-0 weight-700'>Google</p>
              <button className='btn btn-sm btn-secondary'>Connect</button>
            </div>
            <p className='text__grey-dark mb-0'>Not Connected</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoginSecurity;
