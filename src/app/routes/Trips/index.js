import React, {useEffect, useState} from 'react';
import ReviewModal from './components/ReviewModal';
import TripDetailsModal from '../Messaging/components/TripDetailsModal';
import NoResults from './components/NoResults';
import UpcomingTripItem from './components/UpcomingTripItem';
import PastTripItem from './components/PastTripItem';

import _ from 'lodash';
import moment from "moment";
import actions from "../../../actions";
import {useDispatch, useSelector} from "react-redux";

const Trips = () => {
  // Conditionally
  const dispatch = useDispatch();
  const {travelerData} = useSelector(state => state);

  const {booked_trips={}} = travelerData
  let {travelers_trips} = booked_trips;
  let  dataLength = travelers_trips && travelers_trips.length;
  let upcoming_trips  = travelers_trips &&  _.filter(travelers_trips, item => moment(item.trip_day).isSameOrAfter(moment(), 'day'));
  let past_trips  = travelers_trips && _.filter(travelers_trips, item => moment(item.trip_day).isBefore(moment(), 'day'));

  const [tab, setTab] = useState(1);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);


    const onBookedTripClick = (booked_id) => {
        dispatch(actions.getBookedTripRequest(booked_id, 2));

        setOpenDetailsModal(true);
        window.location.hash = "modal"
    };

  useEffect (() => {
      dispatch(actions.getBookedTripsRequest(Number(localStorage.id), Number(localStorage.userType)));
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (dataLength && dataLength===0) return <NoResults message={`There aren't Any Trips Yet`}/>;

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
            {tab === 1  &&
                   (upcoming_trips && upcoming_trips.length > 0 ?
                    upcoming_trips.map((item) => {return <UpcomingTripItem key={item.id} item={item} onBookedTripClick={() => onBookedTripClick(item.id)}/>}) :
                    <NoResults message={`You don’t Have Any Upcoming Trips`}/>)
            }
            {tab === 2 &&
                (past_trips && past_trips.length > 0 ?
                past_trips.map((item) => {return <PastTripItem key={item.id} item={item} onBookedTripClick={() => onBookedTripClick(item.id)} onReviewModal={() => setOpenReviewModal(true)}/>}) :
                <NoResults message={`You don’t Have Any Past Trips`}/>)
            }

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
