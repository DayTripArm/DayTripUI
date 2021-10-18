import React from 'react';
import moment from "moment";
import { IconStar } from 'shared/components/Icons';
import _ from "lodash";
import {HOST_URL} from "../../../../constants";
import { useTranslation } from 'react-i18next';

const PastTripItem = ({ item, onBookedTripClick, onReviewModal}) => {
    let src = process.env.NODE_ENV === "development" ? HOST_URL + item.trip?.trip_image : item.trip?.trip_image;
    const locale = localStorage.getItem('lang') || 'en';
    const { t } = useTranslation();
    return (
        <React.Fragment key={item.id}>
        <div className='text-separator my-6'>
            <span
                className='separator-content text-xs text__grey-dark py-1 px-2'>{_.startCase(moment(item.trip_day).locale(locale === "am" ? "hy-am" : locale).format("D MMMM YYYY"))}</span>
        </div>
        <div
            className='rounded__4 border-style border__default d-md-flex justify-content-between align-items-center'>
            <div>
                <div className='px-4 pt-4 pb-11 pt-md-5 pb-md-5 px-md-5 d-flex position-relative'>
                    {item.trip?.trip_image ?
                        <img
                            width='78'
                            height='98'
                            src={src}
                            alt={item.trip.title}
                            className='rounded__4 object-pos-center object-fit-cover mr-3'
                        /> :
                        <div className='img_overlay rounded__4 object-pos-center object-fit-cover mr-3'>
                        </div>
                    }
                    <div>
                        <p className='weight-500 mb-1'>{item.trip.title.length >= 53 ? item.trip.title.slice(0,53) + "..." : item.trip.title}</p>
                        <p className='mb-1 text-xs'>
                            <span className='weight-500'>{t("trips_page.trip_card.date")}:</span>{' '}
                            <span className='weight-500 text__grey-dark'>{_.startCase(moment(item.trip_day).locale(locale === "am" ? "hy-am" : locale).format("D MMMM"))}</span>
                        </p>
                        <p className='mb-0 text-xs'>
                            <span className='weight-500'>{t("trips_page.trip_card.travelers")}:</span>{' '}
                            <span className='weight-500 text__grey-dark'>{item.travelers_count}</span>
                        </p>
                        <div className='cancelation-container d-md-inline-block d-flex justify-content-center py-3 py-md-0'>
                            <div className='d-flex align-items-center'>
                                <p className='text-xs mb-0 mr-2'>{t("trips_page.trip_card.trip_rating")}:</p>
                                { item.reviews.trip_review?.rate ?
                                    <p className='weight-700 mb-0'>{item.reviews.trip_review?.rate}</p>:
                                    <button className='btn btn-secondary btn-sm'
                                        onClick={(e) => {onReviewModal({open: true, currentTab: 1});} }>{t("trips_page.trip_card.rating_text")}</button>
                                }
                                <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                            </div>
                            <div className='d-flex align-items-center'>
                                <p className='text-xs mb-0 mr-2'>{t("trips_page.trip_card.driver_rating")}:</p>
                                { item.reviews.driver_review?.rate ?
                                    <p className='weight-700 mb-0'>{item.reviews.driver_review?.rate}</p>:
                                    <button className='btn btn-secondary btn-sm'
                                        onClick={(e) => {onReviewModal({open: true, currentTab: 2});} }>{t("trips_page.trip_card.rating_text")}</button>
                                }
                                <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className='border__top border__default my-0'/>
            <div className='py-3 d-flex flex-column flex-lg-row align-items-center pr-lg-5'>
                <button
                    className='btn btn-secondary btn-secondary__grey text-uppercase mb-1'
                    onClick={onBookedTripClick}
                >
                    {t("trips_page.trip_card.btn_details")}
                </button>
                <button
                    className={`btn btn-secondary btn-secondary__grey text-uppercase mb-1 ${item.reviews.trip_review?.rate && item.reviews.driver_review?.rate ? 'btn-disabled': ''}`}
                    onClick={(e) => {onReviewModal({open: true, currentTab: 1});}}
                >
                   {item.reviews.trip_review?.rate && item.reviews.driver_review?.rate
                        ? t("trips_page.trip_card.see_review") : t("trips_page.trip_card.rate_review") }
                </button>
            </div>
        </div>
    </React.Fragment>
    )
};

export default PastTripItem;
