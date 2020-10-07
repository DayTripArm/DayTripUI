import React from 'react';
import moment from "moment";
import { IconStar } from 'shared/components/Icons';
import ReviewModal from './ReviewModal';

const PastTripItem = ({ item, onBookedTripClick, onReviewModal}) => {
    let src = process.env.NODE_ENV === "development" ? "http://localhost:3000" + item.trip.trip_image : item.trip.trip_image;
    return (
        <React.Fragment key={item.id}>
        <div className='text-separator my-6'>
            <span
                className='separator-content text-xs text__grey-dark py-1 px-2'>{moment(item.trip_day).format("D MMMM YYYY")}</span>
        </div>
        <div
            className='rounded__4 border-style border__default d-md-flex justify-content-between align-items-center'>
            <div>
                <div className='px-4 pt-4 pb-11 pt-md-5 pb-md-5 px-md-5 d-flex position-relative'>
                    <img
                        width='78'
                        height='98'
                        src={src}
                        alt={item.trip.title}
                        className='rounded__4 object-pos-center object-fit-cover mr-3'
                    />
                    <div>
                        <p className='weight-500 mb-1'>{item.trip.title}</p>
                        <p className='mb-1 text-xs'>
                            <span className='weight-500'>Day:</span>{' '}
                            <span className='weight-500 text__grey-dark'>{moment(item.trip_day).format("D MMMM")}</span>
                        </p>
                        <p className='mb-0 text-xs'>
                            <span className='weight-500'>Travelers:</span>{' '}
                            <span className='weight-500 text__grey-dark'>{item.travelers_count} Guests</span>
                        </p>
                        <div className='cancelation-container d-md-inline-block d-flex justify-content-center py-3 py-md-0'>
                            <div className='d-flex align-items-center'>
                                <p className='text-xs mb-0 mr-2'>Already wrote a review</p>
                                <p className='weight-700 mb-0'>5.0</p>
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
                    Details
                </button>
                <button
                    className='btn btn-secondary btn-secondary__grey text-uppercase mb-1'
                    onClick={onReviewModal}
                >
                    Write a review
                </button>
            </div>
        </div>
    </React.Fragment>
    )
};

export default PastTripItem;
