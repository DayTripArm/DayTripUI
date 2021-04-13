import React from 'react';
import ModalAside from 'shared/components/ModalAside';
import { IconStar, IconDestination, IconHome, IconGlobe, IconPhone } from 'shared/components/Icons';
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router";
import { useTranslation } from 'react-i18next';
import _ from "lodash";
import moment from "moment";
import actions from "../../../../actions";

const TripDetailsModal = ({hideContact=false, onClose}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const locale_code = localStorage.getItem('lang') || 'en'
    const {driverData} = useSelector(state => state);

    const current_user = Number(localStorage.id);

    const {
        booked_trip_details={},
        profile={}
    } = driverData;

    const {
        trip_tour={},
        trip_info={},
        pickup_info={},
        user_info={},
        reviews={
          driver_review: {},
          trip_review: {}
        },
        price,
    } = booked_trip_details;

    const viewProfile = () => {
        history.push(user_info.user_type === 1? "/individuals/user": "/individuals/driver",
             {
                booked_trip: false,
                user_id: user_info.user_id,
                user_type: user_info.user_type,
                from: "driver"
            }
        );
    };

    const moreAbout = () => {
        history.push(`/tour/${trip_tour.id}`,
             {
                booked_trip: true,
                from: "driver"
            }
        );
    };

    const fetchName =(name) => {
        name = _.split(user_info.user_name, ' ')[0];
        if (name && name.length > 10) {
            name = _.truncate(name, {
                'length': 11,
                'omission': ''
            });
        }
        return name;
    };


    const onContactClick = (sender_id, recipient_id, booked_id) => {
        const body = {
            "sender_id" : sender_id,
            "recipient_id": recipient_id,
            "booked_trip_id": booked_id
        };
        dispatch(actions.getConversationRequest(body));
        history.push(`/messaging`);
    };

    return (
        <ModalAside title={_.startCase(moment(trip_info.trip_day).locale(locale_code === "am" ? "hy-am" : locale_code).format("MMMM D"))} onClose={onClose} id="booked_trip_modal">
            {!_.isEmpty(trip_tour) &&
            <>
                <div className='mb-0 d-flex justify-content-between mb-5'>
                    <h4 className='text__grey-dark'>{t("trips_page.trip_card.slider.trip_title")}</h4>
                    <button className='btn btn-secondary btn-sm' onClick={() => moreAbout()}>{t("trips_page.trip_card.slider.more_btn")}</button>
                </div>
                <div className='d-flex'>
                    <img
                        width='106'
                        height='136'
                        src={process.env.NODE_ENV === "development" ? "http://localhost:3000" + trip_tour.image: trip_tour.image}
                        alt='garni'
                        className='rounded__4 object-pos-center object-fit-cover mr-2'
                    />
                    <div>
                        <p className='weight-500 mb-2'>{trip_tour.title}</p>
                        <p className='mb-0'>
                            <span className='weight-700'>{reviews.trip_review?.rate || t("commons.no_reviews")}</span>
                            <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1'/>
                            {reviews.trip_review?.rate && <span className='text-sm text__grey-dark'>({reviews.trip_review.count} {t("commons.reviews")})</span>}
                        </p>
                    </div>
                </div>
                <hr className='border__top border__default my-4'/>
            </>
            }
            <div className='d-flex align-items-center justify-content-between mb-5'>
                <h4 className='mb-0 text__grey-dark'>{t("trips_page.trip_card.slider.trip_info.title")}</h4>
                {/*<button className='btn btn-secondary btn-sm'>Edit</button>*/}
            </div>
            <div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>{t("trips_page.trip_card.date")}</span>
                    <span className='mxw-60pc weight-700'>{_.startCase(moment(trip_info.trip_day).locale(locale_code === "am" ? "hy-am" : locale_code).format("MMMM D"))}</span>
                </div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>{t("trips_page.trip_card.travelers")}</span>
                    <span className='mxw-60pc weight-700'>{trip_info.travelers_count}</span>
                </div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>{t("trips_page.trip_card.slider.trip_info.duration")}</span>
                    <span className='mxw-60pc weight-700'>{trip_info.trip_duration}</span>
                </div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>{t("trips_page.trip_card.slider.trip_info.order_status")}</span>
                    <span className='mxw-60pc weight-700'>{t("trips_page.trip_card.slider.trip_info.confirmed_on")} May 2</span>
                </div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>{t("trips_page.trip_card.slider.trip_info.order_id")}</span>
                    <span className='mxw-60pc weight-700'>12097</span>
                </div>
            </div>
            <hr className='border__top border__default my-4'/>
            <div className='d-flex align-items-center justify-content-between mb-5'>
                <h4 className='mb-0 text__grey-dark'>{t("trips_page.trip_card.slider.pickup_info")}</h4>
                {/*<button className='btn btn-secondary btn-sm'>Edit</button>*/}
            </div>
            <div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>{t("trips_page.trip_card.slider.pickup_time")}</span>
                    <span className='mxw-60pc weight-700'>{pickup_info.pickup_time}</span>
                </div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>{t("trips_page.trip_card.slider.pickup_address")}</span>
                    <div className='mxw-60pc weight-700'>
                        <IconDestination fill='#757575' className='mr-1'/>
                        {pickup_info.pickup_location}
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>{t("trips_page.trip_card.slider.pickup_notes")}</span>
                    <span className='mxw-60pc weight-700'>{pickup_info.notes}</span>
                </div>
            </div>
            <hr className='border__top border__default my-4'/>
            <div className='mb-0 d-flex justify-content-between mb-5'>
                <h4 className='text__grey-dark'>{profile && profile.user_type === 2 ? t("trips_page.trip_card.slider.traveler") : t("trips_page.trip_card.slider.driver")}</h4>
                <button className='btn btn-secondary btn-sm' onClick={() => viewProfile()}>{t("trips_page.trip_card.slider.view_profile_btn")}</button>
            </div>
            <div className='d-flex'>
                <img
                    width='56'
                    height='56'
                    src={process.env.NODE_ENV === "development" ? "http://localhost:3000" + user_info.profile_photo: user_info.profile_photo}
                    alt='user'
                    className='rounded__50 object-pos-center object-fit-cover mr-3'
                />
                <div>
                    <p className='weight-500 pt-1 mb-0'>{user_info.user_name}</p>
                    {user_info?.user_type === 2 && <p className='mb-0'>
                        <span className='weight-700'>{reviews.driver_review?.rate || t("commons.no_reviews")}</span>
                        <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1'/>
                        {reviews.driver_review?.rate && <span className='text-sm text__grey-dark'>({reviews.driver_review.count} {t("commons.reviews")})</span>}
                    </p>}
                </div>
            </div>
            <hr className='border__top border__default my-4'/>
            <div className="user_info">
                <div className='d-flex mb-4'>
                    <IconHome className='mr-2' />
                    <p className='mb-0'>
                        <span className='text__grey-dark'>{t("trips_page.trip_card.slider.lives_in")}:</span>
                        <span className='weight-500 text__grey-dark  mxw-60pc'>{user_info.location}</span>
                    </p>
                </div>
                <div className='d-flex mb-4'>
                    <IconGlobe className='mr-2'/>
                    <p className='mb-0'>
                        <span className='text__grey-dark'>{t("trips_page.trip_card.slider.speaks")}:</span>
                        <span className='weight-500 text__grey-dark  mxw-60pc'>{user_info.languages}</span>
                    </p>
                </div>
                <div className='d-flex mb-4'>
                    <IconPhone className='mr-2'/>
                    <p className='mb-0'>
                        <span className='text__grey-dark'>{t("trips_page.trip_card.slider.phone")}:</span>
                        <span className='weight-500 text__grey-dark mxw-60pc'>{user_info.phone}</span>
                    </p>
                </div>
            </div>
            <hr className='border__top border__default my-4'/>
            <h4 className='mb-5 text__grey-dark'>{t("trips_page.trip_card.slider.price_title")}</h4>
            <div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>{t("trips_page.trip_card.slider.trip_price")}</span>
                    <span className='mxw-60pc weight-700'>${price}.00</span>
                </div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>{t("trips_page.trip_card.slider.service_fee")}</span>
                    <span className='mxw-60pc weight-700'>$4.00</span>
                </div>
            </div>
            <hr className='border__top border__default my-4'/>
            <div className='mb-3'>
                <div className='d-flex align-items-center justify-content-between text-sm'>
                    <span className='text__grey-dark'>{t("trips_page.trip_card.slider.total_price")}</span>
                        <span className='mxw-60pc weight-700'>{price+4}.00</span>
                </div>
            </div>
            {!hideContact &&
            <div className='shadow__4-up p-4 row position-sticky fixed-bottom bg-white translate-y-16'>
                <button className='btn btn-primary btn-block text-uppercase'
                        onClick={() => onContactClick(current_user, user_info.user_id, trip_info.booked_id)}>
                        {t("trips_page.trip_card.slider.contact_btn", {name: fetchName(user_info.user_name)})}
                </button>
            </div>
            }
        </ModalAside>
    )
};

export default TripDetailsModal;
