import React, { useState } from 'react';
import Breadcrumbs from 'shared/components/Breadcrumbs';
import { IconCheckMarkFilled } from 'shared/components/Icons';

const routes = [
  {
    route: '/account',
    name: 'Account',
    isActive : false
  },
  {
    route: '/payment',
    name: 'Payments and Payouts',
    isActive : true
  },
];

const Payment = ({ cardExists }) =>
  cardExists ? (
    <>
      <h4 className='mb-4'>Payment Method</h4>
      <div className='rounded__4 border-style border__default mxw-md-388px'>
        <div className='p-4 text-sm d-flex align-items-center'>
          <IconCheckMarkFilled className='mr-2' />
          This card is in Armenian Dram
        </div>
        <hr className='border__top border__default m-0' />
        <div className='pt-3 px-4 pb-4 d-flex'>
          <div className='flex-fill mr-3'>
            <p className='text-sm weight-500 mb-1 text__grey-dark'>Card Type</p>
            <p className='text-sm mb-0'>Visa ending in 1234</p>
          </div>
          <div className='flex-fill mr-3'>
            <p className='text-sm weight-500 mb-1 text__grey-dark'>Name On Card</p>
            <p className='text-sm mb-0'>Poghos Poghosyan</p>
          </div>
          <div className='flex-fill'>
            <p className='text-sm weight-500 mb-1 text__grey-dark'>Expires On</p>
            <p className='text-sm mb-0'>01/2024</p>
          </div>
        </div>
      </div>
      <button className='btn btn-secondary text-uppercase mt-1'>Add a new card</button>
    </>
  ) : (
    <>
      <h4 className='mb-3'>Payment Method</h4>
      <p className='mb-5 mb-md-6'>
        Add a payment method using our secure payment system, then start planning you nexr trip
      </p>
      <button className='btn btn-primary text-uppercase btn-xs-block'>Add a payment method</button>
    </>
  );

const Payout = () => (
  <>
    <h4 className='mb-3'>Payout Method</h4>
    <p className='mb-5 mb-md-6'>
      Add a payout method using our secure payment system, then start planning you nexr trip
    </p>
    <button className='btn btn-primary text-uppercase btn-xs-block'>Add a payout method</button>
  </>
);

const PaymentPayout = () => {
  const cardExists = true;
  const [tab, setTab] = useState(1);

  return (
    <>
      <div className='mh-min-screen container'>
        <div className='col-xl-9 col-xxl-8 col-xxxl-7 m-auto p-0'>
          <Breadcrumbs routes={routes} className='pt-4 pb-5 pt-xl-5 pb-xl-6' />

          <h2 className='text__blue mb-5 mb-md-6 mb-xl-7'>Payments and Payouts</h2>

          <div className='tabs mb-6'>
            <ul className='no-list-style mb-3 mb-lg-0 clearfix'>
              <li
                className={tab === 1 ? 'active' : ''}
                onClick={() => setTab(1)}
                role='presentation'
              >
                Payment
              </li>
              <li
                className={tab === 2 ? 'active' : ''}
                onClick={() => setTab(2)}
                role='presentation'
              >
                Payout
              </li>
            </ul>
          </div>
          {tab === 1 && <Payment cardExists={cardExists} />}
          {tab === 2 && <Payout />}
        </div>
      </div>
    </>
  );
};

export default PaymentPayout;
