import React, {useEffect, useState} from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { IconSetting } from 'shared/components/Icons';
import TripDetailsModal from '../Messaging/components/TripDetailsModal';
import SettingsModal from './components/SettingsModal';
import BookedTripItem from './components/BookedTripItem';
import { DayPickerSingleDateController } from 'react-dates';
import './react-date-custom-style.css';

import _ from 'lodash';
import moment from "moment";
import actions from "../../../actions";
import {useDispatch, useSelector} from "react-redux";


const HORIZONTAL_ORIENTATION = 'horizontal';
const defaultProps = {
    // example props for the demo
    autoFocus: false,
    initialDate: null,
    showInput: false,

    // day presentation and interaction related props
    renderCalendarDay: undefined,
    renderDayContents: null,
    //isDayBlocked: () => false,
    //isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
    // isDayHighlighted: (day1) => {
    //     return day.some(day2 => day1.isSame(day2))
    // },
    enableOutsideDays: false,

    // calendar presentation and interaction related props
    orientation: HORIZONTAL_ORIENTATION,
    withPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 2,
    onOutsideClick() {},
    keepOpenOnDateSelect: false,
    renderCalendarInfo: null,
    isRTL: false,

    // navigation related props
    navPrev: null,
    navNext: null,
    renderNavPrevButton: null,
    renderNavNextButton: null,
    onPrevMonthClick() {},
    onNextMonthClick() {},

    hideKeyboardShortcutsPanel: true,

    // internationalization
    monthFormat: 'MMMM YYYY',
};

const Calendar = () => {
    const dispatch = useDispatch();
    const {driverData} = useSelector(state => state);

    const {calendar_settings={}, driver_calendar={}} = driverData;

    let {unavailable_days} = calendar_settings;
    if (!unavailable_days) {
        unavailable_days = [];
    }

    let {calendar_info, overview_trips} = driver_calendar;

    const date = null;
    const [focused, setFocused] = useState(true);
    const [blocked, setBlocked] = useState([]);
    const [tab, setTab] = useState(1);

    const [openSettingsModal, setOpenSettingsModal] = useState(false);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);

    useEffect (() => {
            dispatch(actions.getBookedTripsRequest(Number(localStorage.id), Number(localStorage.userType)));
            dispatch(actions.getCalendarSettingsRequest(Number(localStorage.id)));
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDateChange = (date) => {
        const date_string = moment(date).format('YYYY-MM-DD');
        const blocked_list = blocked;
        const booked_day_list = _.reduce(calendar_info, (memo, obj) => {
            memo.push(obj.trip_day);

            return memo;
        }, []);
        let list = [];

        // ****************************************************
        // on calendar booked trip click
        if (_.includes(booked_day_list, date_string)) {
            const booked_obj = _.find(calendar_info, item => item.trip_day === date_string);

            onBookedTripClick(booked_obj.id, booked_obj.traveler_id);
        } else { // *********************************** block/unblock part
            if (_.includes(blocked_list, date_string)) {
                list = _.filter(blocked_list, date => date !== date_string)
            } else {
                list = [...blocked, moment(date).format('YYYY-MM-DD')]
            }

            let settings_obj = {
                driver_id: Number(localStorage.id),
                day: date_string
            };
            dispatch(actions.updateCalendarSettingsRequest(Number(localStorage.id), settings_obj));

            setBlocked(list);
        }
    };

    const onBookedTripClick = (booked_id, traveler_id) => {
        dispatch(actions.getBookedTripRequest(booked_id));
        dispatch(actions.bookedProfileInfoRequest(traveler_id));

        setOpenDetailsModal(true);
    };

    const onFocusChange = () => {
        // Force the focused states to always be truthy so that date is always selectable
        setFocused(true);
    };

    const props = _.omit(defaultProps, [
        'autoFocus',
        'initialDate',
        'showInput',
    ]);

    const isBlocked = (day) => {
        return unavailable_days.some(date => day.isSame(date), 'day');
    };

    const renderDay=(day)=> {
        if (calendar_info && (_.find(calendar_info, {trip_day: day.format("YYYY-MM-DD")})) ){
            return (
                <div style={{ backgroundColor: '#FE4C30', height: '100%', color: 'white', position:'relative' }} >
                    <div style={{position:'absolute'}}><img alt="" src="https://www.iconninja.com/files/445/434/573/man-user-person-male-profile-avatar-icon.png" width="32px" height="32px"/></div>
                    <span >{day.format('D')}</span>

                </div>
            )
        }else{
            return (
                <span>{day.format('D')}</span>
            )
        }

    };

    return (
        <>
            <div className='container'>
                <div className='col-xl-9 col-xxl-8 col-xxxl-7 m-auto p-0'>
                    <div
                        className='d-flex align-items-center justify-content-between mt-6 mb-5 mt-md-9 mb-md-9 mt-xl-11 mt-xxl-13 '>
                        <h2 className='text__blue mb-0'>Calendar</h2>
                        <button className='btn btn-circle border-0' onClick={() => setOpenSettingsModal(true)}>
                            <IconSetting/>
                        </button>
                    </div>


                    <DayPickerSingleDateController
                        {...props}
                        daySize={69}
                        onDateChange={onDateChange}
                        onFocusChange={onFocusChange}
                        focused={focused}
                        renderDayContents={renderDay}
                        isOutsideRange={date => date.isBefore(moment(), 'day') || date.isAfter(moment().add(1, 'months'), 'day')}
                        isDayBlocked={isBlocked}
                        date={date}
                    />

                    <h2 className='text__blue mb-0 mt-6 mb-5 mt-md-9 mb-md-9 mt-xl-11 mt-xxl-13'>Overview</h2>
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
                    {tab === 1 &&  overview_trips && overview_trips.map((item) => {
                        return (moment(item.trip_day).isSameOrAfter(moment(), 'day') &&
                            <BookedTripItem key={item.id} item={item} onBookedTripClick={() => onBookedTripClick(item.id, item.traveler_id)} />)

                    })}
                    {tab === 2 &&  overview_trips && overview_trips.map((item) => {
                        return (moment(item.trip_day).isBefore(moment(), 'day') &&
                            <BookedTripItem key={item.id} item={item} onBookedTripClick={() => onBookedTripClick(item.id, item.traveler_id)} />)
                    })}

                </div>
            </div>
            {openSettingsModal && <SettingsModal onClose={() => setOpenSettingsModal(false)}/>}
            {openDetailsModal && (
                <TripDetailsModal title='March 18' onClose={() => setOpenDetailsModal(false)}/>
            )}
        </>
    );
};

export default Calendar;
