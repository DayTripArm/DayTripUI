import React, {useState} from 'react';
import Input from 'shared/components/Input';
import Checkbox from 'shared/components/Checkbox';
import {
    IconStar,
    IconGlobe,
    IconNoSmoking,
    IconPetStep,
    IconSnack,
    IconCarSeat,
    IconWifi,
    IconWater,
    IconAC,
    IconCheckMarkFilled
} from 'shared/components/Icons';
import { Link, useLocation } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { useTranslation } from 'react-i18next';
import actions from "actions";
import moment from "moment";
import _ from "lodash";

const CardRegistrationForm = ({card_info_texts}) => (
  <>
    <h4 className='text__grey-dark mb-4'>{card_info_texts.add_card}</h4>
    <Input type='text' name='cardName' label={card_info_texts.name_on_card} placeholder={card_info_texts.name_pholder} />
    <Input type='text' name='cardNum' label={card_info_texts.card_num} placeholder='xxxx - xxxx - xxxx - xxxx' />
    <div className='d-flex mxw-328px mb-3'>
      <div className='pr-2 flex-fill d-flex'>
        <Input
          type='text'
          name='exp'
          label={card_info_texts.expire_date}
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
    <Checkbox className='mr-5' name='setPrimary' label={card_info_texts.set_as_default_checkbox} />
  </>
);

const CardInformation = ({card_info_texts}) => (
  <>
    <h4 className='text__grey-dark mb-4'>{card_info_texts.title}</h4>
    <div className='rounded__4 border-style border__default'>
      <div className='p-4 text-sm d-flex align-items-center'>
        <IconCheckMarkFilled className='mr-2' />
            {card_info_texts.card_type}
      </div>
      <hr className='border__top border__default m-0' />
      <div className='pt-3 px-4 pb-4 d-flex'>
        <div className='flex-fill mr-3'>
          <p className='text-sm weight-500 mb-1 text__grey-dark'>{card_info_texts.card_type}</p>
          <p className='text-sm mb-0'>{card_info_texts.card_type}</p>
        </div>
        <div className='flex-fill mr-3'>
          <p className='text-sm weight-500 mb-1 text__grey-dark'>{card_info_texts.card_type}</p>
          <p className='text-sm mb-0'>Poghos Poghosyan</p>
        </div>
        <div className='flex-fill'>
          <p className='text-sm weight-500 mb-1 text__grey-dark'>{card_info_texts.card_type}</p>
          <p className='text-sm mb-0'>01/2024</p>
        </div>
      </div>
    </div>
  </>
);

const Payment = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const cardExists = false;
  const location = useLocation();
  const checkout_info = location.state;
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const driver_img_src = checkout_info?.driver_img || 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png';

  const card_info_texts = {
    card_currency: t("account_page.payments.card_currency", {currency: "AMD"}),
    card_type: t("account_page.payments.card_type"),
    visa_ends: t("account_page.payments.visa_ends", {number: 1234}),
    name_on_card: t("account_page.payments.name_on_card"),
    expires_on: t("account_page.payments.expires_on"),
    btn: t("account_page.payments.add_payment_btn"),
    card_num: t("checkout_page.card_info.card_num"),
    expire_date: t("checkout_page.card_info.expire_date"),
    name_pholder: t("home_page.sign_up.name_placeholder"),
    set_as_default_checkbox: t("checkout_page.card_info.set_as_default_checkbox")
  }
    const locale = localStorage.getItem('lang') || 'en';
  const completeCheckout = () => {
    const body = _.omit(checkout_info,["driver_img", "trip_img", "driver_name", "car_specs", "car_full_name", "trip_location", "trip_review", "review", "car_full_name", "languages", "trip_duration"]);
    dispatch(actions.confirmTripBookingCheckout(body))
  };

  return (
    <>
      <div className='col-lg-5 col-xl-4 col-xxl-3 pl-0 pr-0 pr-md-4 mb-10'>
        <h2 className='text__blue'>{t("checkout_page.payment_page_title")}</h2>
        {cardExists ? <CardInformation card_info_texts={card_info_texts} /> : <CardRegistrationForm card_info_texts={card_info_texts} />}
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
              <span className='weight-500'>{_.startCase(moment(checkout_info.trip_day).locale(locale === "am" ? "hy-am" : locale).format('MMMM DD'))}</span>
            </div>
            <div className='d-flex justify-content-between mb-2'>
              <span className='text-sm text__grey-dark'>{t("checkout_page.trip_summary.travelers")}</span>
              <span className='weight-500'>{t("commons.travelers_pholder", {count: checkout_info?.travelers_count})}</span>
            </div>
            <div className='d-flex justify-content-between'>
              <span className='text-sm text__grey-dark'>{t("checkout_page.trip_summary.duration")}</span>
              <span className='weight-500'>{checkout_info.trip_duration} hours</span>
            </div>
          </div>
          <hr className='border__top border__default m-0' />
          <div className='p-4'>
            <div className='d-flex justify-content-between mb-2'>
              <span className='text-sm text__grey-dark'>{t("checkout_page.trip_summary.price")}</span>
              <span className='weight-500'>${parseFloat(checkout_info.price)+".00"}</span>
            </div>
            <div className='d-flex justify-content-between'>
              <span className='text-sm text__grey-dark'>{t("checkout_page.trip_summary.fee")}</span>
              <span className='weight-500'>$4.00</span>
            </div>
            <hr className='border__top border__default my-4' />
            <div className='d-flex justify-content-between'>
              <span className='text-sm text__grey-dark'>{t("checkout_page.trip_summary.total_price")}</span>
              <span className='weight-500'>${parseFloat(checkout_info.price+4)+".00"}</span>
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
                    <span className='weight-500 text__grey-dark'>{checkout_info.languages}</span>
                  </p>
                </div>
                {
                    Object.keys(checkout_info.car_specs).map((opt, i) => {
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
        <Link to='/checkout/success' className='btn btn-block btn-primary text-uppercase mt-5' onClick={(e) => {
            e.preventDefault();
            completeCheckout();
        }}>
           {t("checkout_page.trip_summary.btn")}
        </Link>
      </div>
    </>
  );
};

export default Payment;
