import React from 'react';
import ModalAside from 'shared/components/ModalAside';
import { IconStar, IconDestination, IconFlag, IconGlobe, IconPhone } from 'shared/components/Icons';
import {useSelector} from "react-redux";
import { useHistory } from "react-router";
import _ from "lodash";

const TripDetailsModal = ({ onClose, title = 'Trips' }) => {
    const history = useHistory();

    const {driverData} = useSelector(state => state);

    const {
        booked_trip_details={}
    } = driverData;

    const {
        trip_tour={},
        trip_info={},
        pickup_info={},
        user_info={},
        price,
    } = booked_trip_details;

    const viewProfile = () => {
        history.push("/individuals/user",
             {
                booked_trip: true,
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

    return (
        <ModalAside title={title} onClose={onClose} id="booked_trip_modal">
            {!_.isEmpty(trip_tour) &&
            <>
                <div className='d-flex align-items-center justify-content-between mb-5'>
                    <h4 className='mb-0 text__grey-dark'>Trip Tour</h4>
                    <button className='btn btn-secondary btn-sm' onClick={() => moreAbout()}>More About</button>
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
                            <span className='weight-700'>5.0</span>
                            <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1'/>
                            <span className='text-sm text__grey-dark'>(125 reviews)</span>
                        </p>
                    </div>
                </div>
                <hr className='border__top border__default my-4'/>
            </>
            }
            <div className='d-flex align-items-center justify-content-between mb-5'>
                <h4 className='mb-0 text__grey-dark'>Trip Info</h4>
                {/*<button className='btn btn-secondary btn-sm'>Edit</button>*/}
            </div>
            <div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>Day</span>
                    <span className='mxw-60pc weight-700'>{trip_info.trip_day}</span>
                </div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>Travelers</span>
                    <span className='mxw-60pc weight-700'>{trip_info.travelers_count}</span>
                </div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>Trip Duration</span>
                    <span className='mxw-60pc weight-700'>{trip_info.trip_duration}</span>
                </div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>Order Status</span>
                    <span className='mxw-60pc weight-700'>Confirmed on May 2</span>
                </div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>Order ID</span>
                    <span className='mxw-60pc weight-700'>12097</span>
                </div>
            </div>
            <hr className='border__top border__default my-4'/>
            <div className='d-flex align-items-center justify-content-between mb-5'>
                <h4 className='mb-0 text__grey-dark'>Pick Up Info</h4>
                {/*<button className='btn btn-secondary btn-sm'>Edit</button>*/}
            </div>
            <div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>Time</span>
                    <span className='mxw-60pc weight-700'>{pickup_info.pickup_time}</span>
                </div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>Address</span>
                    <div className='mxw-60pc d-flex align-items-center weight-700'>
                        <IconDestination fill='#757575' className='mr-1'/>
                        {pickup_info.pickup_location}
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>Note</span>
                    <span className='mxw-60pc weight-700'>{pickup_info.notes}</span>
                </div>
            </div>
            <hr className='border__top border__default my-4'/>
            <div className='d-flex align-items-center justify-content-between mb-5'>
                <h4 className='mb-0 text__grey-dark'>Traveler</h4>
                <button className='btn btn-secondary btn-sm' onClick={() => viewProfile()}>View Profile</button>
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
                    <p className='mb-0'>
                        <span className='weight-700'>5.0</span>
                        <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1'/>
                        <span className='text-sm text__grey-dark'>(125 reviews)</span>
                    </p>
                </div>
            </div>
            <hr className='border__top border__default my-4'/>
            <div className="user_info">
                <div className='d-flex mb-4'>
                    <IconFlag className='mr-2'/>
                    <p className='mb-0'>
                        Nation: <span className='weight-500 text__grey-dark  mxw-60pc'>{user_info.location}</span>
                    </p>
                </div>
                <div className='d-flex mb-4'>
                    <IconGlobe className='mr-2'/>
                    <p className='mb-0'>
                        <span className='text__grey-dark'>Languages:</span>
                        <span className='weight-500 text__grey-dark  mxw-60pc'>{user_info.languages}</span>
                    </p>
                </div>
                <div className='d-flex mb-4'>
                    <IconPhone className='mr-2'/>
                    <p className='mb-0'>
                        <span className='text__grey-dark'>Number:</span>
                        <span className='weight-500 text__grey-dark mxw-60pc'>{user_info.phone}</span>
                    </p>
                </div>
            </div>
            <hr className='border__top border__default my-4'/>
            <h4 className='mb-5 text__grey-dark'>Price</h4>
            <div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>Total Price</span>
                    <span className='mxw-60pc weight-700'>$44.00</span>
                </div>
                <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
                    <span className='text__grey-dark'>Service Fee</span>
                    <span className='mxw-60pc weight-700'>$4.00</span>
                </div>
            </div>
            <hr className='border__top border__default my-4'/>
            <div className='mb-3'>
                <div className='d-flex align-items-center justify-content-between text-sm'>
                    <span className='text__grey-dark'>Total</span>
                    <span className='mxw-60pc weight-700'>{price}</span>
                </div>
            </div>
            <div className='shadow__4-up p-4 row position-sticky fixed-bottom bg-white translate-y-16'>
                <button className='btn btn-primary btn-block text-uppercase'>Contact to {user_info.user_name}</button>
            </div>
        </ModalAside>
    )
};

export default TripDetailsModal;
