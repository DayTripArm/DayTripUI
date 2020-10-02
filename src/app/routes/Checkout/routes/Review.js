import React, {useState} from 'react';
import Input from 'shared/components/Input';
import {
  IconDestination,
  IconStar,
  IconGlobe,
  IconNoSmoking,
  IconPetStep,
  IconSnack,
  IconCarSeat,
  IconWifi,
  IconWater,
  IconAC
} from 'shared/components/Icons';
import {CAR_SPECS} from "../../../../constants";
import Textarea from 'shared/components/Textarea';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from "react-router";
import _ from "lodash";
import moment from "moment";


const validations = {
    pickup_time: {
        required: true
    },
    pickup_location: {
        required: true
    },
};
const Review = (props) => {
    const locate = useLocation();
    const history = useHistory();
    const [invalidFields, setInvalidFields] = useState({});
    const [form, setForm] = useState({pickup_time: "", pickup_location: "", notes: ""});

    const checkout_info = locate.state;
    const trip_img_src = checkout_info.trip_img ? (process.env.NODE_ENV === "development"
        ? "http://localhost:3000" + checkout_info.trip_img
        : checkout_info.trip_img) : '';
    const driver_img_src = checkout_info.driver_img ? checkout_info.driver_img : 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png';

   //  Validate checkout form
    function validateForm() {

        return _.reduce(validations, (errors, rule, name) => {
            const result = validateField(name);
        if (result) { errors[name] = result; }

        return errors;
    }, {});
    }
    function validateField(name) {
        const rule = validations[name];
        if (rule) {
            if (rule.required && !form[name].trim()) {
                return { status: "error", statusMessage: "This field is required" };
            }

        }
    }

    function getStatusMessage(name) {
        const field = invalidFields[name];
        return field && field.statusMessage ? field.statusMessage : undefined;
    }

    function submitCheckout(){
        const invalidFields = validateForm();
        if (_.isEmpty(invalidFields)) {
            try {
                history.push({
                    pathname: '/checkout/payment',
                    state: {
                        ...checkout_info,
                        pickup_time: form.pickup_time,
                        pickup_location: form.pickup_location,
                        notes: form.notes
                    }
                })
            } catch (e) {
                console.log(" err ", e.response);
            }
        }
        setInvalidFields(invalidFields);
    };
  return (
    <>
      <div className='col-lg-5 col-xl-4 col-xxl-3 px-0 mb-10'>
        <h2 className='text__blue'>Review Your Trip</h2>
        <h4 className='text__grey-dark mb-4'>Pick Up Information</h4>
        <Input
            type='text'
            name="pickup_time"
            label='Pick Up Time'
            placeholder='Select the time'
            isError={getStatusMessage("pickup_time")  || false}
            onChange={e => setForm({
                ...form,
                pickup_time: e.target.value
            })}
        />
        <Input
          type='text'
          name='pickup_location'
          label='Pick Up Location'
          placeholder='Select Location'
          isError={getStatusMessage("pickup_location")  || false}
          icon={IconDestination}
          iconPosition='right'
          containerClass='mb-8'
          onChange={e => setForm({
                ...form,
                pickup_location: e.target.value
          })}
        />
        <Textarea
          name='notes'
          label='Notes'
          placeholder='Notes'
          className='h-152px'
          onChange={e => setForm({
                ...form,
                notes: e.target.value
          })}
        />
        <Link to='/checkout/payment' onClick={(e) => {
                e.preventDefault();
                submitCheckout();
            }} className='btn btn-primary text-uppercase'>
          Continue
        </Link>
      </div>
      <div className='col-lg-5 col-xl-4 col-xxl-3 px-0'>
        <div className='rounded__4 border-style border__default'>
        {trip_img_src && <div className='p-4 d-flex'>
            <img
              width='106'
              height='136'
              src={trip_img_src}
              alt={checkout_info.trip_title}
              className='rounded__4 object-pos-center object-fit-cover mr-3'
            />
            {checkout_info.trip_title && <div>
              <p className='weight-500 mb-2'>{checkout_info.trip_title}</p>
              <p className='mb-0'>
                <span className='weight-700'>5.0</span>
                <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                <span className='text-sm text__grey-dark'>(125 reviews)</span>
              </p>
            </div> }
          </div> }
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
          <div className='pt-3 px-4 pb-4'>
            <p className='text-center'>
              <button className='btn btn-secondary btn-sm'>Less Details</button>
            </p>
            <div className='d-flex'>
              <img
                width='56'
                height='56'
                src={driver_img_src}
                alt='user'
                className='rounded__50 object-pos-center object-fit-cover mr-3'
              />
              <div>
                <p className='weight-500 pt-1 mb-0'>{checkout_info.driver_name}</p>
                <p className='mb-0'>
                  <span className='weight-700'>5.0</span>
                  <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                  <span className='text-sm text__grey-dark'>(125 reviews)</span>
                </p>
              </div>
            </div>
            <hr className='border__top border__default my-4' />
            <div className='d-flex mb-4'>
              <IconGlobe className='mr-2' />
              <p className='mb-0'>
                Languages:{' '}
                <span className='weight-500 text__grey-dark'>{checkout_info.languages}</span>
              </p>
            </div>
            {
                Object.keys(checkout_info.car_specs).map((opt, i) => {
                    return (
                        <div className='d-flex mb-4' key={i}>
                          {opt === "car_seat" && (<IconCarSeat className='mr-2' />) }
                          {opt === "smoke_allowed" && (<IconNoSmoking className='mr-2' />) }
                          {opt === "pets_allowd"  && (<IconPetStep className='mr-2' />) }
                          {opt === "wifi"  && (<IconWifi className='mr-2' />) }
                          {opt === "snacks"  && (<IconSnack className='mr-2' />) }
                          {opt === "air_condition"  && (<IconAC className='mr-2' />) }
                          {opt === "water"  && (<IconWater className='mr-2' />) }
                          <p className='mb-0'>
                            {CAR_SPECS[opt]}: <span className='weight-500 text__grey-dark'>{checkout_info.car_specs[opt]? "Yes" : "No"}</span>
                          </p>
                        </div>
                     )
                })
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
