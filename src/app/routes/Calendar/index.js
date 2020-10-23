import React, {useEffect, useState} from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import Responsive from "react-responsive";
import { IconSetting } from 'shared/components/Icons';
import TripDetailsModal from '../Messaging/components/TripDetailsModal';
import SettingsModal from './components/SettingsModal';
import BookedTripItem from './components/BookedTripItem';
import { DayPickerSingleDateController } from 'react-dates';
//import './react-date-custom-style';

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
    weekDayFormat: 'ddd'
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

    const onBookedTripClick = (booked_id) => {
        dispatch(actions.getBookedTripRequest(booked_id, 1));

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

    const isDayHighlighted = (day) => {
        return unavailable_days.some(date => day.isSame(date, 'day'));
    };

    const isOutsideRange = (date) => {
        if (calendar_info) {
            const list = _.reduce(calendar_info, (memo, obj) => {
                memo.push(obj.trip_day);

                return memo;
            }, []);;
            let isIncluded = _.includes(list, date.format('YYYY-MM-DD'));
            return date.isBefore(moment(), 'day') && !isIncluded;
        }
    };

    const renderDayContents=(day, i)=> {

        if (calendar_info && (_.find(calendar_info, {trip_day: day.format("YYYY-MM-DD")})) ){
            const info = _.find(calendar_info, {trip_day: day.format("YYYY-MM-DD")});

            return (
                <div className={moment(day).isSameOrAfter(moment(), 'day')? 'CalendarProfileActive' : 'CalendarProfileInactive'} >
                    <div style={{position:'absolute', padding:'5px'}}>
                        <img
                            className={moment(day).isSameOrAfter(moment(), 'day') ? 'CalendarProfileImgActive' : 'CalendarProfileImgInactive'}
                            alt=""
                            src={process.env.NODE_ENV === "development" ? "http://localhost:3000" + info.traveler_photo : info.traveler_photo}
                        /></div>
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
            <div className='calendar-page container'>
                <div className='col-xl-9 col-xxl-8 col-xxxl-7 m-auto p-0'>
                    <div
                        className='d-flex align-items-center justify-content-between mt-6 mb-5 mt-md-9 mb-md-9 mt-xl-11 mt-xxl-13 '>
                        <h2 className='text__blue mb-0'>Calendar</h2>
                        <button className='btn btn-circle border-0' onClick={() => setOpenSettingsModal(true)}>
                            <IconSetting/>
                        </button>
                    </div>

                    <Mobile>
                        <DayPickerSingleDateController
                            {...props}
                            noBorder={true}
                            daySize={68}
                            numberOfMonths = {1}
                            onDateChange={onDateChange}
                            onFocusChange={onFocusChange}
                            focused={focused}
                            renderDayContents={renderDayContents}
                            isOutsideRange={date => isOutsideRange(date)}
                            isDayHighlighted={isDayHighlighted}
                            date={date}
                        />
                    </Mobile>
                    <Default>
                        <DayPickerSingleDateController
                            {...props}
                            noBorder={true}
                            daySize={68}
                            onDateChange={onDateChange}
                            onFocusChange={onFocusChange}
                            focused={focused}
                            renderDayContents={renderDayContents}
                            isOutsideRange={date => isOutsideRange(date)}
                            isDayHighlighted={isDayHighlighted}
                            date={date}
                        />
                    </Default>

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
                            <BookedTripItem key={item.id} item={item} onBookedTripClick={() => onBookedTripClick(item.id)} />)

                    })}
                    {tab === 2 &&  overview_trips && overview_trips.map((item) => {
                        return (moment(item.trip_day).isBefore(moment(), 'day') &&
                            <BookedTripItem key={item.id} item={item} onBookedTripClick={() => onBookedTripClick(item.id)} />)
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
export const Mobile = props => <Responsive {...props} maxWidth={767} />;
export const Default = props => <Responsive {...props} minWidth={768} />;
export default Calendar;
