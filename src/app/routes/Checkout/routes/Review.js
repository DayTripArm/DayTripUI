import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from "react-redux";

import _ from "lodash";
import moment from "moment";

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
import Textarea from 'shared/components/Textarea';
import Timepicker from "shared/components/Timepicker";
import actions from "../../../../actions";
import {CURRENCIES, SERVICE_FEES} from "../../../../constants";


const validations = {
    pickup_time: {
        required: true
    },
    pickup_location: {
        required: true
    },
};
const Review = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const {config} = useSelector(state => state);

    const [invalidFields, setInvalidFields] = useState({});
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showMoreDetails, setShowMoreDetails] = useState(false);
    const [form, setForm] = useState({pickup_time: "", pickup_location: "", notes: ""});

    const locale = localStorage.getItem('lang') || 'en';
    const pickTime = !_.isEmpty(form.pickup_time) ? {hour: _.split(form.pickup_time,":")[0], minute: _.split(form.pickup_time,":")[1]} : {hour: "08", minute: "30"};
    const selected_currency = localStorage.getItem('currency') || 'amd'
    const currency_sign = _.find(CURRENCIES, {short_name: selected_currency}) || CURRENCIES[2];
    const checkout_info = JSON.parse(localStorage.getItem("booking_details"));
    const driver_img_src = checkout_info?.driver_img || 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png';

    const service_fee = SERVICE_FEES[selected_currency.toLowerCase()];
    const {booking_price=checkout_info?.price} = config

    useEffect(() => {
        dispatch(actions.convertTripPriceRequest(checkout_info?.price, selected_currency));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selected_currency]);

    // Select time
    function onTimeSet(){
        setForm({...form, pickup_time: pickTime.hour + ":" + pickTime.minute});
        setShowTimePicker(!showTimePicker);
        document.body.style.overflowY = 'auto';
    }

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
                return { status: "error", statusMessage: t("commons.required_field") };
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
                localStorage.setItem("booking_details", JSON.stringify({
                    ...checkout_info,
                    pickup_time: form.pickup_time,
                    pickup_location: form.pickup_location,
                    notes: form.notes
                }));
                history.push({
                    pathname: '/checkout/payment'
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
        <h2 className='text__blue'>{t("checkout_page.pickup_info.page_title")}</h2>
        <h4 className='text__grey-dark mb-4'>{t("checkout_page.pickup_info.title")}</h4>
        <div className="position-relative" >
            <Input
                type='text'
                name="pickup_time"
                value={form.pickup_time}
                label={t("checkout_page.pickup_info.pickup_time")}
                placeholder={t("checkout_page.pickup_info.pickup_placeholder")}
                isError={getStatusMessage("pickup_time")  || false}
                onMouseDown={() => {
                    if (showTimePicker){
                        document.body.style.overflowY = 'hidden';
                    } else {
                        document.body.style.overflowY = 'auto';
                    }
                    setShowTimePicker(!showTimePicker);
                }}
            />
            { showTimePicker &&
              <div className="timepicker_wrapper">
                <div className="tp_header">
                    <span className="btn btn-secondary btn-sm btn-clear" onClick={() => {
                        setShowTimePicker(!showTimePicker);
                        document.body.style.overflowY = 'auto';
                    }}>{t("commons.buttons.cancel_btn")}</span>
                    <span className="btn btn-secondary btn-sm btn-save" onClick={() => onTimeSet()}>{t("commons.buttons.save_btn")}</span>
                </div>
                <Timepicker pickTime={pickTime} />
              </div>
            }
        </div>
        <Input
          type='text'
          name='pickup_location'
          label={t("checkout_page.pickup_info.pickup_location")}
          placeholder={t("checkout_page.pickup_info.pickup_location_placeholder")}
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
          label={t("checkout_page.pickup_info.notes")}
          placeholder={t("checkout_page.pickup_info.notes_placeholder")}
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
            {t("checkout_page.pickup_info.btn")}
        </Link>
      </div>
      <div className='col-lg-5 col-xl-4 col-xxl-3 px-0'>
        <div className='rounded__4 border-style border__default'>
         <div className='p-4 d-flex'>
            <img
              width='106'
              height='136'
              src={checkout_info?.trip_img}
              alt={checkout_info?.trip_title || t("home_page.hit_the_road.section_title")}
              className='rounded__4 object-pos-center object-fit-cover mr-3'
            />
            <div>
              <p className='weight-500 mb-2'>{checkout_info?.trip_title}</p>
              <p className='mb-0'>
                <span className='weight-700'>{checkout_info?.trip_review?.rate || t("commons.no_reviews")}</span>
                <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                {checkout_info?.trip_review?.rate && <span className='text-sm text__grey-dark'>({checkout_info?.trip_review?.count} {t("commons.reviews")})</span>}
              </p>
            </div>
          </div>
          <hr className='border__top border__default m-0' />
          <div className='p-4'>
            <div className='d-flex justify-content-between mb-2'>
              <span className='text-sm text__grey-dark'>{t("checkout_page.trip_summary.date")}</span>
              <span className='weight-500'>{_.startCase(moment(checkout_info?.trip_day).locale(locale === "am" ? "hy-am" : locale).format('MMMM DD'))}</span>
            </div>
            <div className='d-flex justify-content-between mb-2'>
              <span className='text-sm text__grey-dark'>{t("checkout_page.trip_summary.travelers")}</span>
              <span className='weight-500'>{t("commons.travelers_pholder", {count: checkout_info?.travelers_count})}</span>
            </div>
            <div className='d-flex justify-content-between'>
              <span className='text-sm text__grey-dark'>{t("checkout_page.trip_summary.duration")}</span>
              <span className='weight-500'>{checkout_info?.trip_duration}</span>
            </div>
          </div>
          <hr className='border__top border__default m-0' />
          <div className='p-4'>
            <div className='d-flex justify-content-between mb-2'>
              <span className='text-sm text__grey-dark'>{t("checkout_page.trip_summary.price")}</span>
              <span className='weight-500'>{currency_sign["utf_symbol"]}{parseFloat(booking_price)+".00"}</span>
            </div>
            <div className='d-flex justify-content-between'>
              <span className='text-sm text__grey-dark'>{t("checkout_page.trip_summary.fee")}</span>
              <span className='weight-500'>{currency_sign["utf_symbol"]}{service_fee+".00"}</span>
            </div>
            <hr className='border__top border__default my-4' />
            <div className='d-flex justify-content-between'>
              <span className='text-sm text__grey-dark'>{t("checkout_page.trip_summary.total_price")}</span>
              <span className='weight-500'>{currency_sign["utf_symbol"]}{parseFloat(booking_price+service_fee)+".00"}</span>
            </div>
          </div>
          <hr className='border__top border__default m-0' />
          <div className='pt-3 px-4 pb-4'>
            <p className='text-center'>
              <button className='btn btn-secondary btn-sm' onClick={() => setShowMoreDetails(!showMoreDetails)}>{showMoreDetails ? t("checkout_page.trip_summary.less_detail"): t("checkout_page.trip_summary.more_detail")}</button>
            </p>
            {showMoreDetails &&
            <>
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
                  <span className='weight-700'>{checkout_info?.review.rate || t("commons.no_reviews")}</span>
                  <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                  {checkout_info?.review?.rate && <span className='text-sm text__grey-dark'>({checkout_info?.review?.count} {t("commons.reviews")})</span>}
                </p>
              </div>
            </div>
            <hr className='border__top border__default my-4' />
            <div className='d-flex mb-4'>
              <IconGlobe className='mr-2 fixed-svg' />
              <p className='mb-0'>
                {t("commons.car_options.speaks")}:{' '}
                <span className='weight-500 text__grey-dark'>{checkout_info?.languages}</span>
              </p>
            </div>
            {
                Object.keys(checkout_info?.car_specs).map((opt, i) => {
                    return (
                        <div className='d-flex mb-4' key={i}>
                          {opt === "car_seat" && (<IconCarSeat className='mr-2' />) }
                          {opt === "smoking_allowed" && (<IconNoSmoking className='mr-2' />) }
                          {opt === "pets_allowed"  && (<IconPetStep className='mr-2' />) }
                          {opt === "wifi"  && (<IconWifi className='mr-2' />) }
                          {opt === "snacks"  && (<IconSnack className='mr-2' />) }
                          {opt === "air_conditioning"  && (<IconAC className='mr-2' />) }
                          {opt === "water"  && (<IconWater className='mr-2' />) }
                          <p className='mb-0'>
                            {t(`commons.car_options.${opt}`)}: <span className='weight-500 text__grey-dark'>{checkout_info.car_specs[opt]? t("commons.toogle_yes") : t("commons.toogle_no")}</span>
                          </p>
                        </div>
                     )
                })
            }
          </>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
