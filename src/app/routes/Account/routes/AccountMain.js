import React from 'react';
import { Link } from 'react-router-dom';
import IconUser from 'assets/images/ic_user.svg';
import IconShield from 'assets/images/ic_shield.svg';
import IconWallet from 'assets/images/ic_wallet.svg';
import {useSelector} from "react-redux";
import _ from "lodash";

const AccountMain = ({ match }) => {

  const {travelerData={}, driverData={}, config} = useSelector(state => state);
  const {profile={}} = !_.isEmpty(travelerData.profile) ? travelerData : driverData;
  const {name} = profile;
  const {userType} = config;

  return (
    <div className='container'>
      <h2 className='text__blue mb-4 mt-6 mt-md-9 mt-xl-11 mt-xxl-14 mt-xxxl-13'>Account</h2>
      <div className='d-flex align-items-center mb-5'>
        <p className='text-sm mb-0 mr-5'>{name}</p>
          <Link to={Number(userType) === 1 ? "/individuals/user" : "/individuals/driver"} className='btn btn-secondary btn-sm ml-5'>
              Go to profile
          </Link>
      </div>

      <div className='row row-1'>
        <div className='col-12 col-md-6 col-xxl-4 mb-2 mb-md-4 px-2'>
          <Link to="account/personal" className='d-block text__black'>
            <div className='rounded__4 border-style border__default p-4 p-md-5 p-xl-6'>
              <img src={IconUser} alt='user' className='mb-4 mb-xl-5' />
              <h4 className='mb-2 mb-md-4'>Personal Info</h4>
              <p className='mb-0'>Provide personal details and how we can reach you</p>
            </div>
          </Link>
        </div>

        <div className='col-12 col-md-6 col-xxl-4 mb-2 mb-md-4 px-2'>
          <Link to="account/loginSecurity" className='d-block text__black'>
            <div className='rounded__4 border-style border__default p-4 p-md-5 p-xl-6'>
              <img src={IconShield} alt='user' className='mb-4 mb-xl-5' />
              <h4 className='mb-2 mb-md-4'>Login & Security</h4>
              <p className='mb-0'>Update your password and secure your account</p>
            </div>
          </Link>
        </div>

        <div className='col-12 col-md-6 col-xxl-4 mb-2 mb-md-4 px-2'>
          <Link to="account/paymentPayout" className='d-block text__black'>
            <div className='rounded__4 border-style border__default p-4 p-md-5 p-xl-6'>
              <img src={IconWallet} alt='user' className='mb-4 mb-xl-5' />
              <h4 className='mb-2 mb-md-4'>Payments & Payouts</h4>
              <p className='mb-0'>Review payments, payouts</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountMain;
