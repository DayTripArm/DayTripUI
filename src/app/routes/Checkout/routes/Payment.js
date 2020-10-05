import React from 'react';
import Input from 'shared/components/Input';
import Checkbox from 'shared/components/Checkbox';
import { IconStar, IconCheckMarkFilled } from 'shared/components/Icons';
import { Link, useLocation } from 'react-router-dom';
import {useDispatch} from "react-redux";
import actions from "actions";
import moment from "moment";
import _ from "lodash";

const CardRegistrationForm = () => (
  <>
    <h4 className='text__grey-dark mb-4'>Add a Card</h4>
    <Input type='text' name='cardName' label='Name On Card' placeholder='Name Surname' />
    <Input type='text' name='cardNum' label='Card Number' placeholder='xxxx - xxxx - xxxx - xxxx' />
    <div className='d-flex mxw-328px mb-3'>
      <div className='pr-2 flex-fill d-flex'>
        <Input
          type='text'
          name='exp'
          label='Expiration Date'
          placeholder='01/24'
          containerClass='field-flexible flex-fill m-0'
        />
      </div>
      <div className='pl-2 flex-fill d-flex'>
        <Input
          type='text'
          name='ccv'
          label='CCV'
          placeholder='000'
          containerClass='field-flexible flex-fill m-0'
        />
      </div>
    </div>
    <Checkbox className='mr-5' name='setPrimary' label='Set as Default Payment Method' />
  </>
);

const CardInformation = () => (
  <>
    <h4 className='text__grey-dark mb-4'>Your Credit or Debit Card</h4>
    <div className='rounded__4 border-style border__default'>
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
  </>
);

const Payment = () => {
  const dispatch = useDispatch();
  const cardExists = false;
  const location = useLocation();
  const checkout_info = location.state;
  const driver_img_src = checkout_info.driver_img ? checkout_info.driver_img : 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png';


  const completeCheckout = () => {
    const body = _.omit(checkout_info,["driver_img", "trip_img", "driver_name", "car_specs", "car_full_name", "trip_location", "car_full_name", "languages", "trip_duration"])
    dispatch(actions.confirmTripBookingCheckout(body))
  }

  return (
    <>
      <div className='col-lg-5 col-xl-4 col-xxl-3 pl-0 pr-0 pr-md-4 mb-10'>
        <h2 className='text__blue'>Payment Information</h2>
        {cardExists ? <CardInformation /> : <CardRegistrationForm />}
      </div>
      <div className='col-lg-5 col-xl-4 col-xxl-3 px-0'>
        <div className='rounded__4 border-style border__default'>
          <div className='p-4 d-flex'>
            <img
              width='106'
              height='136'
              src={checkout_info.trip_img}
              alt={checkout_info.trip_title}
              className='rounded__4 object-pos-center object-fit-cover mr-3'
            />
            <div>
            <p className='weight-500 mb-2'>{checkout_info.trip_title}</p>
              <p className='mb-0'>
                <span className='weight-700'>5.0</span>
                <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                <span className='text-sm text__grey-dark'>(125 reviews)</span>
              </p>
            </div>
          </div>
          <hr className='border__top border__default m-0' />
          <div className='p-4'>
            <div className='d-flex justify-content-between mb-2'>
              <span className='text-sm text__grey-dark'>Day</span>
              <span className='weight-500'>{moment(checkout_info.trip_day).format('MMMM DD')}</span>
            </div>
            <div className='d-flex justify-content-between mb-2'>
              <span className='text-sm text__grey-dark'>Travelers</span>
              <span className='weight-500'>{checkout_info.travelers_count} Adults</span>
            </div>
            <div className='d-flex justify-content-between'>
              <span className='text-sm text__grey-dark'>Trip Duration</span>
              <span className='weight-500'>{checkout_info.trip_duration} hours</span>
            </div>
          </div>
          <hr className='border__top border__default m-0' />
          <div className='p-4'>
            <div className='d-flex justify-content-between mb-2'>
              <span className='text-sm text__grey-dark'>Trip Price</span>
              <span className='weight-500'>${parseFloat(checkout_info.price)+".00"}</span>
            </div>
            <div className='d-flex justify-content-between'>
              <span className='text-sm text__grey-dark'>Service Fee</span>
              <span className='weight-500'>$4.00</span>
            </div>
            <hr className='border__top border__default my-4' />
            <div className='d-flex justify-content-between'>
              <span className='text-sm text__grey-dark'>Total</span>
              <span className='weight-500'>${parseFloat(checkout_info.price+4)+".00"}</span>
            </div>
          </div>
          <hr className='border__top border__default m-0' />
          <div className='text-center py-3'>
            <Link to='/tour' className='btn btn-secondary btn-sm'>
              More Details
            </Link>
          </div>
        </div>
        <Link to='/checkout/success' className='btn btn-block btn-primary text-uppercase mt-5' onClick={(e) => {
            e.preventDefault();
            completeCheckout();
        }}>
          Checkout
        </Link>
      </div>
    </>
  );
};

export default Payment;
