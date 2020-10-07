import React, {useEffect, useState} from 'react';
import { IconStar } from 'shared/components/Icons';
import ReviewModal from './components/ReviewModal';
import TripDetailsModal from '../Messaging/components/TripDetailsModal';
import NoResults from './components/NoResults';
import UpcomingTripItem from './components/UpcomingTripItem';
import PastTripItem from './components/PastTripItem';

import moment from "moment";
import actions from "../../../actions";
import {useDispatch, useSelector} from "react-redux";

const Trips = () => {
  // Conditionally
  const dispatch = useDispatch();
  const {travelerData} = useSelector(state => state);

  const {booked_trips={}} = travelerData
  let {travelers_trips} = booked_trips;
  let  dataLength = (travelers_trips && travelers_trips.length >0) || false;

  const [tab, setTab] = useState(1);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);


    const onBookedTripClick = (booked_id, traveler_id) => {
        dispatch(actions.getBookedTripRequest(booked_id));
        dispatch(actions.bookedProfileInfoRequest(traveler_id));

        setOpenDetailsModal(true);
    };

  useEffect (() => {
      dispatch(actions.getBookedTripsRequest(Number(localStorage.id), Number(localStorage.userType)));
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!dataLength) return <NoResults />;

  return (
    <>
      <div className='container'>
        <div className='col-xl-9 col-xxl-8 col-xxxl-7 m-auto p-0'>
          <h2 className='text__blue mb-0 mt-6 mb-5 mt-md-9 mb-md-9 mt-xl-11 mt-xxl-13'>Trips</h2>
          <div className='tabs mb-6'>
            <ul className='no-list-style mb-3 mb-lg-0 clearfix'>
              <li
                className={tab === 1 ? 'active' : ''}
                onClick={() => setTab(1)}
                role='presentation'
              >
                Upcoming Trips
              </li>
              <li
                className={tab === 2 ? 'active' : ''}
                onClick={() => setTab(2)}
                role='presentation'
              >
                Past Trips
              </li>
            </ul>
          </div>
            {tab === 1 &&  travelers_trips && travelers_trips.map((item) => {
                return (moment(item.trip_day).isSameOrAfter(moment(), 'day') &&
                    <UpcomingTripItem key={item.id} item={item} onBookedTripClick={() => onBookedTripClick(item.id, item.driver_id)}/>)
            })}
            {tab === 2 &&  travelers_trips && travelers_trips.map((item) => {
                return (moment(item.trip_day).isBefore(moment(), 'day') &&
                    <PastTripItem key={item.id} item={item} onBookedTripClick={() => onBookedTripClick(item.id, item.driver_id)} onReviewModal={() => setOpenReviewModal(true)}/>)
            })}

        </div>
      </div>
        {openDetailsModal && (
            <TripDetailsModal title='Trips' onClose={() => setOpenDetailsModal(false)}/>
        )}
      {openReviewModal && <ReviewModal onClose={() => setOpenReviewModal(false)} />}
    </>
  );
};

export default Trips;
