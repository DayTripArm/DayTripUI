import React, { useState } from 'react';
import Modal from 'shared/components/Modal';
import Textarea from 'shared/components/Textarea';
import Rating from 'shared/components/Rating';
import {useDispatch} from "react-redux";
import actions from "../../../../actions";
import _ from "lodash";
import { useTranslation } from 'react-i18next';

const validations = {
    rate: {
        required: true
    }
};

const ReviewModal = ({ onClose, reviewTrip, activeTab }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(activeTab);
  const { t } = useTranslation();
  const [invalidFields, setInvalidFields] = useState({});
  const [isRated, setIsRated] = useState(false);
  const [tripForm, setTripRateForm] = useState(reviewTrip.reviews.trip_review || {rate: null, notes: ""});
  const [driverForm, setDriverRateForm] = useState(reviewTrip.reviews.driver_review || {rate: null, notes: ""});

  function validateForm(validate) {

    return _.reduce(validations, (errors, rule, name) => {
        const result = validateField(tab === 1 ? tripForm: driverForm, name,validate);
        if (result) { errors[name] = result; }

        return errors;
    }, {});
  }
  function validateField(form, name,validate) {
    const rule = validations[name];
    if (rule) {
        if (rule.required && (!form[name] || (form[name] && form[name]===0)) && validate) {
            return { status: "error", statusMessage: t("trips_page.trip_card.rate_review_modal.rate_err_msg",
                    {text: (tab === 1 ? t("trips_page.trip_card.rate_review_modal.tab1"): t("trips_page.trip_card.rate_review_modal.tab2")).toLowerCase()})};
        }
    }
  }

  function getStatusMessage(name) {
    const field = invalidFields[name];
    return field && field.statusMessage ? field.statusMessage : undefined;
  }

  function writeReview(){
      const invalidFields = validateForm(true);
      if (_.isEmpty(invalidFields)) {
          if (tab === 1) {
              const body = {
                  "login_id" : Number(localStorage.id),
                  "booked_trip_id": reviewTrip.id,
                  "review_text": tripForm.notes,
                  "rate": tripForm.rate
              };
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
          setIsRated(true);
          dispatch(actions.getBookedTripsRequest(Number(localStorage.id), Number(localStorage.userType)));
      }
      setInvalidFields(invalidFields);
  }
  return (
    <Modal title={t("trips_page.trip_card.rate_review_modal.title")} showDismissButton onClose={() => onClose(false)}>
      {isRated ?
      <div className='py-4 px-0 px-md-8'>
          <p className='text-center weight-700'>{t("trips_page.trip_card.rate_review_modal.thank_u_feedback")}</p>
      </div> :
      <div className='py-4 px-0 px-md-8'>
        <div className='tabs tabs__fit mb-6'>
          <ul className='no-list-style mb-3 mb-lg-0 clearfix'>
            <li className={tab === 1 ? 'active' : ''} onClick={() => {setTab(1); validateForm(false); setInvalidFields({});}} role='presentation'>
                {t("trips_page.trip_card.rate_review_modal.tab1")}
            </li>
            <li className={tab === 2 ? 'active' : ''} onClick={() => {setTab(2); validateForm(false); setInvalidFields({});}} role='presentation'>
                {t("trips_page.trip_card.rate_review_modal.tab2")}
            </li>
          </ul>
        </div>
        {tab === 1 && (<p className='text-center weight-700'>{t("trips_page.trip_card.rate_review_modal.text1")}</p>)}
        <div className='mb-6'>
            {tab === 1 &&
                (
                  <>
                    <Rating isDisabled={reviewTrip.reviews.trip_review?.rate>=1 ? true: false} initValue={tripForm.rate} onClick={(rating) => setTripRateForm({...tripForm, rate: rating })} />
                    {getStatusMessage("rate") ? <div style={{textAlign: "center", color: "#B80000"}}>
                      <span className="text-error-message">{getStatusMessage("rate")}</span>
                    </div> : null}
                  </>
                )
            }
            {tab === 2 &&
                (
                    <>
                    <Rating isDisabled={reviewTrip.reviews.driver_review?.rate>=1 ? true: false} initValue={driverForm.rate} onClick={(rating) => setDriverRateForm({...driverForm, rate: rating })} />
                    {getStatusMessage("rate") ? <div style={{textAlign: "center", color: "#B80000"}}>
                        <span className="text-error-message">{getStatusMessage("rate")}</span>
                    </div> : null}
                    </>
                )
            }
        </div>
        {tab === 2 && (<p className='text-center weight-700'>{t("trips_page.trip_card.rate_review_modal.text1")}</p>)}
        <Textarea name='note' placeholder={t("trips_page.trip_card.rate_review_modal.write_review_text")} value={tab === 1 ? tripForm.notes: driverForm.notes} className='h-152px'
            disabled={tab === 1 ? (!_.isEmpty(reviewTrip.reviews.trip_review.notes) ? true: false) : (!_.isEmpty(reviewTrip.reviews.driver_review.notes) ? true: false) }
            onChange={(e) => {
                        tab === 1 ? setTripRateForm({...tripForm, notes: e.target.value }):
                        setDriverRateForm({...driverForm, notes: e.target.value })
            }} />
        {tab === 1 && _.isEmpty(reviewTrip.reviews.trip_review?.rate) && <button className={`btn btn-primary btn-block text-uppercase`} onClick={(e) => {
            e.preventDefault();
            writeReview()
        }}>{t("commons.buttons.submit_btn")}</button> }
        {tab === 2 && _.isEmpty(reviewTrip.reviews.driver_review?.rate) && <button className={`btn btn-primary btn-block text-uppercase`} onClick={(e) => {
            e.preventDefault();
            writeReview()
        }}>{t("commons.buttons.submit_btn")}</button> }
      </div>}
    </Modal>
  );
};

export default ReviewModal;
