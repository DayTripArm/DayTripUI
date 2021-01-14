import React, { useEffect } from 'react';
import ModalAside from 'shared/components/ModalAside';
import MontlyProgress from './MontlyProgress';
import DriverProgressReviews from './DriverProgressReviews';
import PopularTrips from './PopularTrips';
import {useDispatch, useSelector} from "react-redux";
import actions from "actions";
import _ from 'lodash';

const DetailsModal = ({ onClose, activeSection}) => {
    const dispatch = useDispatch();
    const {driverData} = useSelector(state => state);
    const {driver_progress_details} = driverData;
    let title = "";
    switch(activeSection){
        case 1:
            title = 'Earnings';
        break;
        case 2:
            title = 'Reviews';
        break;
        case 4:
            title = 'Completed Trips';
        break;
        case 5:
            title = 'Popular Trips';
        break;
        case 6:
            title = 'Upcoming Trips';
        break;
        default:
            title = ''
        break
    }

    useEffect (() => {
        dispatch(actions.viewProgressDetailsRequest(Number(localStorage.id), Number(activeSection)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ModalAside title={title} onClose={onClose}>
            {
                activeSection === 1 && !_.isEmpty(driver_progress_details) &&
                <MontlyProgress section={1} details={driver_progress_details?.monthly_earnings} />
            }
            {
                activeSection === 2 && !_.isEmpty(driver_progress_details) &&
                <DriverProgressReviews overall_rating={driver_progress_details?.overall_rating} />
            }
            {
                activeSection === 4 && !_.isEmpty(driver_progress_details) &&
                <MontlyProgress section={4} details={driver_progress_details?.completed_trips} />
            }
            {
                activeSection === 5 && !_.isEmpty(driver_progress_details) &&
                <PopularTrips details={driver_progress_details?.popular_trips} />
            }
            {
                activeSection === 6 && !_.isEmpty(driver_progress_details) &&
                <MontlyProgress section={6} details={driver_progress_details?.upcoming_trips} />
            }
    </ModalAside>);
};

export default DetailsModal;
