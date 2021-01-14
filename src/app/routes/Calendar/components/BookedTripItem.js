import React from 'react';
import moment from "moment";

const BookedTripItem = ({ item, onBookedTripClick}) => {
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
                    {item.trip.trip_image ?
                        <img
                            width='78'
                            height='98'
                            src={src}
                            alt={item.trip.title}
                            className='rounded__4 object-pos-center object-fit-cover mr-3'
                        /> :
                        <div className='img_overlay_lg rounded__4 object-pos-center object-fit-cover mr-3'>
                        </div>
                    }
                    <div>
                        <p className='weight-500 mb-1'>{item.trip.title}</p>
                        <p className='mb-1 text-xs'>
                            <span className='weight-500'>Date:</span>{' '}
                            <span className='weight-500 text__grey-dark'>{moment(item.trip_day).format("MMMM D")}</span>
                        </p>
                        <p className='mb-0 text-xs'>
                            <span className='weight-500'>Travelers:</span>{' '}
                            <span className='weight-500 text__grey-dark'>{item.travelers_count}</span>
                        </p>
                        {moment(item.trip_day).isSameOrAfter(moment(), 'day') &&
                         <div className='cancelation-container d-inline-block text-center py-2 py-md-0'>
                            <button className='btn btn-secondary btn-sm'>Cancelation</button>
                        </div>
                        }
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
                <button className='btn btn-secondary text-uppercase'>Contact Traveler</button>
            </div>
        </div>
    </React.Fragment>
    )
};

export default BookedTripItem;
