import React, {useEffect} from 'react';
import DriversIllustration from './components/DriversIllustration';
import Chips from 'shared/components/Chips';
import { IconClockOutlined, IconDestination } from 'shared/components/Icons';
import DriversList from './components/DriversList';
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";
import moment from "moment";

const Drivers = ({ history }) => {
    const dispatch = useDispatch();
    const url_params = new URLSearchParams(window.location.search)
    const day = url_params.get('date');
    const travelers_count = url_params.get('travelers');
    useEffect(() => {
        const body = {
            date: day,
            travelers: travelers_count,
            trip_id: 0
        };
        dispatch(actions.searchForDriversRequest(body))
    },[])
    const {travelerData} = useSelector(state => state);
    const {search_for_drivers} = travelerData;
    const {drivers_list, trip_details} = search_for_drivers;
    const trip_duration = trip_details ? trip_details.trip_duration : 8;
    const start_location = trip_details ?  trip_details.start_location : 'Yerevan';


    return (
        <>
            {trip_details && (<DriversIllustration history={history}/>)}
            <div className='rounded-top__30 bg-white pull-t-9 position-relative'>
                <div className='container pt-6 pt-lg-8 pt-xl-11'>
                    <div className='col-xl-10 col-xxl-9 col-xxxl-8 m-auto p-0'>
                        {trip_details && (<h2 className='text__blue mb-4 mb-md-3'>{trip_details.title}</h2>)}
                        <div className='d-md-flex'>
                            <div className='d-flex mb-4 mr-md-4'>
                                <IconClockOutlined className='mr-2'/>
                                <p className='mb-0'>
                                    Trip duration: <span className='weight-500 text__grey-dark'>{trip_duration} hours</span>
                                </p>
                            </div>
                            <div className='d-flex mb-5'>
                                <IconDestination className='mr-2'/>
                                <p className='mb-0'>
                                    Starting destination: <span className='weight-500 text__grey-dark'>{start_location}</span>
                                </p>
                            </div>
                        </div>
                        <div className='mb-9 mb-md-10 mb-xl-11'>
                            <Chips name={moment(day).format('MMM-DD')} className='mr-4 mb-md-5'/>
                            <Chips name={travelers_count} />
                        </div>
                        <h2 className='text__blue mb-4 mb-md-5'>Available Drivers</h2>
                        {drivers_list && (<DriversList driversList={drivers_list}/>)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Drivers;
