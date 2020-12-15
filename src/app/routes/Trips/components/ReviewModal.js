import React, { useState } from 'react';
import Modal from 'shared/components/Modal';
import Textarea from 'shared/components/Textarea';
import Rating from 'shared/components/Rating';
import {useDispatch} from "react-redux";
import actions from "../../../../actions";
import _ from "lodash";

const validations = {
    rate: {
        required: true
    }
};

const ReviewModal = ({ onClose, reviewTrip }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(1);
  const [invalidFields, setInvalidFields] = useState({});
  const [tripForm, setTripRateForm] = useState(reviewTrip.reviews.trip_review || {rate: "0.0", notes: ""});
  const [driverForm, setDriverRateForm] = useState(reviewTrip.reviews.driver_review || {rate: "0.0", notes: ""});

  function validateForm() {

    return _.reduce(validations, (errors, rule, name) => {
        const result = validateField(tab === 1 ? tripForm: driverForm, name);
        if (result) { errors[name] = result; }

        return errors;
    }, {});
  }
  function validateField(form, name) {
    const rule = validations[name];
    if (rule) {
        if (rule.required && _.isEmpty(form[name])) {
            return { status: "error", statusMessage: "This field is required" };
        }
    }
  }

  function getStatusMessage(name) {
    const field = invalidFields[name];
    return field && field.statusMessage ? field.statusMessage : undefined;
  }

  function writeReview(){
      const invalidFields = validateForm();
      if (_.isEmpty(invalidFields)) {
          if (tab === 1) {
              const body = {
                  "login_id" : Number(localStorage.id),
                  "booked_trip_id": reviewTrip.id,
                  "review_text": tripForm.notes,
                  "rate": tripForm.rate
              };
              console.log(body)
              dispatch(actions.addTripReviewRequest(body));
          }
          else {
              const body = {
                  "traveler_id" : Number(localStorage.id),
                  "driver_id": reviewTrip.driver_id,
                  "booked_trip_id": reviewTrip.id,
                  "review_text": driverForm.notes,
                  "rate": driverForm.rate
              };
              dispatch(actions.addDriverReviewRequest(body));
              console.log(body)
          }

      }
      setInvalidFields(invalidFields);
  }
  return (
    <Modal title='Rate and Review' showDismissButton onClose={() => onClose(false)}>
      <div className='py-4 px-0 px-md-8'>
        <div className='tabs tabs__fit mb-6'>
          <ul className='no-list-style mb-3 mb-lg-0 clearfix'>
            <li className={tab === 1 ? 'active' : ''} onClick={() => setTab(1)} role='presentation'>
              Your Trip
            </li>
            <li className={tab === 2 ? 'active' : ''} onClick={() => setTab(2)} role='presentation'>
              Your Driver
            </li>
          </ul>
        </div>
        <p className='text-center weight-700'>Did you enjoy your day? Please rate the trip and the driver</p>
        <div className='mb-6'>
            {tab === 1 &&
                (<Rating initValue={tripForm.rate} onClick={(rating) => setTripRateForm({...tripForm, rate: rating })} />)
            }
            {tab === 2 &&
                (<Rating initValue={driverForm.rate} onClick={(rating) => setDriverRateForm({...driverForm, rate: rating })} />)
            }
        </div>
        <p className='text-center weight-700'>Share your experience</p>
        <Textarea name='note' placeholder='Write a review' value={tab === 1 ? tripForm.notes: driverForm.notes} className='h-152px'
            readonly={tab === 1 ? (!_.isEmpty(reviewTrip.reviews.trip_review.notes) ? true: false) : (!_.isEmpty(reviewTrip.reviews.driver_review.notes) ? true: false) }
            onChange={(e) => {
                        tab === 1 ? setTripRateForm({...tripForm, notes: e.target.value }):
                        setDriverRateForm({...driverForm, notes: e.target.value })
            }} />
        {tab === 1 && _.isEmpty(reviewTrip.reviews.trip_review?.rate) && <button className={`btn btn-primary btn-block text-uppercase`} onClick={(e) => {
            e.preventDefault();
            writeReview()
        }}>Submit</button> }
        {tab === 2 && _.isEmpty(reviewTrip.reviews.driver_review?.rate) && <button className={`btn btn-primary btn-block text-uppercase`} onClick={(e) => {
            e.preventDefault();
            writeReview()
        }}>Submit</button> }
      </div>
    </Modal>
  );
};

export default ReviewModal;
