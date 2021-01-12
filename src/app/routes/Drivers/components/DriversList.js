import React from 'react';
import { IconStar,
    IconGlobe,
    IconSmoking,
    IconCarSeat,
    IconAC,
    IconCar,
    IconSeat } from 'shared/components/Icons';
import Slider from 'react-slick';
import ModalLogin from 'app/components/modals/ModalLogin';
import { useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router";
import actions from "actions";
import moment from "moment";
import _ from "lodash";

const settings = {
    className: 'slick-cards-sm',
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1023,
            settings: {
                slidesToShow: 1,
            },
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};

let limit = 5;

const DriversList = ({drivers_list,trip_details, driversTotalCount, req_body}) => {
    const {travelerData} = useSelector(state => state);
    const {profile} = travelerData;
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();

    const loadDriverList = (lmt) => {
        limit = lmt +5;
        const body = {
            date: req_body ? req_body.date : location.state.date,
            travelers: req_body ? req_body.travelers : location.state.travelers,
            trip_id: req_body ? req_body.trip_id : (trip_details?.trip_id || null),
            offset: 0,
            limit: limit
        };
        dispatch(actions.searchForDriversRequest(body))
    };

    const {
        showSignIn,
        showSignUp,
    } = travelerData;

    const bookTrip = (e, driver, learn_more) => {
        e.preventDefault();
        const src = process.env.NODE_ENV === "development" ? "http://localhost:3000" + driver.profile_photos.full_path : driver.profile_photos.full_path;
        const trip_img = !_.isEmpty(trip_details?.images) ? trip_details?.images[0].url : trip_details?.image?.url;
        const trip_img_src = process.env.NODE_ENV === "development" ? "http://localhost:3000" + trip_img : trip_img;

        if (localStorage.id || learn_more) {
            history.push({
                pathname: learn_more ? '/individuals/driver' : '/checkout/review',
                state: {
                    user_id: driver.id,
                    user_type: driver.user_type,
                    booked_trip: true,
                    traveler_id: Number(localStorage.id),
                    trip_id: location.state?.trip_id || null,
                    driver_img: src,
                    trip_title: location.state?.trip_id ? trip_details.title: "Hit the road "+(profile.name ? profile.name : ''),
                    trip_img: trip_img_src,
                    driver_name: driver.driver_name,
                    car_full_name: driver.car_full_name,
                    car_specs: driver.car_specs,
                    price: location.state?.trip_id ? driver.tariff1 : driver.hit_the_road_tariff,
                    languages: driver.languages,
                    review: driver.review,
                    trip_review: learn_more ? {}: location.state?.review,
                    trip_day: location.state?.date || moment().format('YYYY-MM-DD'),
                    trip_duration: trip_details.trip_duration || 12,
                    travelers_count: location.state?.travelers || 2
                }
            });
        } else {
            !showSignUp && dispatch(actions.showHideSignIn(true))
        }
    };

    return (<>
            <ul className='no-list-style mb-0'>
                {
                    drivers_list.map((driver, i) => {
                        const profile_photo = process.env.NODE_ENV === "development" ? "http://localhost:3000" + driver.profile_photos.full_path : driver.profile_photos.full_path;
                        return (
                            <li className='mb-2 mb-md-4 mb-xl-5' key={i}>
                                <div className='rounded__4 border-style border__default d-md-flex'>

                                    <div className="card-item card-item__s col-md-4 pt-4 px-4">
                                        <Slider {...settings}>
                                            {
                                                driver.car_photos.map((photo, index) => {
                                                    const car_photo = process.env.NODE_ENV === "development" ? "http://localhost:3000" + photo.full_path : photo.full_path;

                                                    return (
                                                        <div key={index} className='image-container mb-4'>
                                                            <img src={car_photo} className='object-pos-center object-fit-cover bg__grey-dark rounded__10' alt='img' />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Slider>
                                    </div>
                                    <div className="col-md-8">
                                        <div className='pt-4 pb-5 rounded__4 border__bottom border__default d-md-flex align-items-center justify-content-between'>
                                            <div className='d-flex mb-5 mb-md-0'>
                                                <img
                                                    width='56'
                                                    height='56'
                                                    src={profile_photo}
                                                    alt={driver.driver_name}
                                                    className='rounded__50 object-pos-center object-fit-cover mr-3'
                                                />
                                                <div>
                                                    <p className='weight-500 pt-1 mb-0'>{driver.driver_name}</p>
                                                    <p className='mb-0'>
                                                        <span className='weight-700'>{driver.review?.rate || 'No reviews'}</span>
                                                        <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                                                        {driver.review?.rate && <span className='text-sm text__grey-dark'>({driver.review.count} reviews)</span>}
                                                    </p>
                                                </div>
                                            </div>
                                            <button onClick={(e) => bookTrip(e, driver)} className='btn btn-primary text-uppercase btn-xs-block'>
                                                Book for ${location.state?.trip_id ? driver.tariff1 : driver.hit_the_road_tariff}
                                            </button>
                                        </div>
                                        <div className='pt-5 pt-md-4 pb-4'>
                                            <div className='d-md-flex flex-wrap justify-content-between'>

                                                <div className='col-md-8 px-0 d-flex mb-4'>
                                                    <IconCar className='mr-2' />
                                                    <p className='mb-0'>
                                                        Car: <span className='weight-500 text__grey-dark'>{driver.car_full_name}</span>
                                                    </p>
                                                </div>

                                                <div className='col-md-4 px-0 d-flex mb-4'>
                                                    <IconSeat className='mr-2' />
                                                    <p className='mb-0'>
                                                        Seats: <span className='weight-500 text__grey-dark'>{driver.car_seats}</span>
                                                    </p>
                                                </div>

                                                <div className='col-md-8 px-0 d-flex mb-4'>
                                                    <IconGlobe className='mr-2 fixed-svg' />
                                                    <p className='mb-0'>
                                                        Speaks:{' '}
                                                        <span className='weight-500 text__grey-dark'>{driver.languages}</span>
                                                    </p>
                                                </div>

                                                <div className='col-md-4 px-0 d-flex mb-4'>
                                                    <IconCarSeat className='mr-2' />
                                                    <p className='mb-0'>
                                                        Car Seat:{' '}
                                                        <span className='weight-500 text__grey-dark'>{driver.car_seat ? "Yes" : "No"}</span>
                                                    </p>
                                                </div>

                                                <div className='col-md-8 px-0 d-flex mb-4'>
                                                    <IconSmoking className='mr-2' />
                                                    <p className='mb-0'>
                                                        Smoking Allowed:{' '}
                                                        <span className='weight-500 text__grey-dark'>{driver.smoke_allowed ? "Yes" : "No"}</span>
                                                    </p>
                                                </div>

                                                <div className='col-md-4 px-0 d-flex mb-4'>
                                                    <IconAC className='mr-2' />
                                                    <p className='mb-0'>
                                                        Air Conditioning:{' '}
                                                        <span className='weight-500 text__grey-dark'>{driver.air_condition ? "Yes" : "No"}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className='text-right' onClick={(e) => bookTrip(e, driver, true)}>
                                                <button className='btn weight-700 btn-sm btn-text'>
                                                    Learn More
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>);
                    })
                }
            </ul>
            {(limit < driversTotalCount) &&
                <div className='text-center mt-5 mt-xl-6'>
                    <button onClick={e => loadDriverList(limit)} className='btn btn-primary text-uppercase'>Load More
                    </button>
                </div>
            }
            {showSignIn && <ModalLogin onClose={() => dispatch(actions.showHideSignIn(false))} />}
        </>
    );
};


export default DriversList;
