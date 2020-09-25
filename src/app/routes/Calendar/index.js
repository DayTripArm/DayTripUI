import React, {useEffect, useState} from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { IconSetting } from 'shared/components/Icons';
import TripDetailsModal from '../Messaging/components/TripDetailsModal';
import SettingsModal from './components/SettingsModal';
import { DayPickerSingleDateController } from 'react-dates';
//import isInclusivelyAfterDay from 'react-dates/src/utils/isInclusivelyAfterDay';
import './react-date-custom-style.css';

import _ from 'lodash';
import moment from "moment";
import actions from "../../../actions";
import {useDispatch, useSelector} from "react-redux";


// const START_DATE = 'startDate';
// const END_DATE = 'endDate';
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

    const {calendar_settings={}} = driverData;
    let {unavailable_days} = calendar_settings;
    if (!unavailable_days) {
        unavailable_days = [];
    }

    const date = null;
    const [focused, setFocused] = useState(true);
    const [blocked, setBlocked] = useState([]);

    const [openSettingsModal, setOpenSettingsModal] = useState(false);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);

    useEffect (() => {
        dispatch(actions.getCalendarSettingsRequest(Number(localStorage.id)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDateChange = (date) => {
        const date_string = moment(date).format('YYYY-MM-DD');
        const blocked_list = blocked;
        let list = [];

        if (_.includes(blocked_list, date_string)) { // remove
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
    };

    const onFocusChange = () => {
        // Force the focused states to always be truthy so that date is always selectable
        setFocused(true);
    };


    // const { showInput } = defaultProps;
    //const { focused, date } = this.state;

    //const {availability_window, unavailable_days} = useSelector(state => state);
    const props = _.omit(defaultProps, [
        'autoFocus',
        'initialDate',
        'showInput',
    ]);

        //const dateString = date && date.format('YYYY-MM-DD');

        // const startDateString = startDate && startDate.format('YYYY-MM-DD');
        // const endDateString = endDate && endDate.format('YYYY-MM-DD');

    const isBlocked = (day) => {
        return unavailable_days.some(date => day.isSame(date), 'day');
    };

        // const isHiglighted = (day1) => {
        //     return list_days.some(day2 => day1.isSame(day2));
        // };
    const renderDay=(day)=> {
        if (day.day() % 6 === 5){
            return (
                <div style={{ backgroundColor: 'orange', height: '100%', color: 'white', position:'relative' }} >
                    <div style={{position:'absolute'}}><img src="https://www.iconninja.com/files/445/434/573/man-user-person-male-profile-avatar-icon.png" width="32px" height="32px"/></div>
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
                        daySize={70}
                        onDateChange={onDateChange}
                        onFocusChange={onFocusChange}
                        focused={focused}
                        renderDayContents={renderDay}
                        isOutsideRange={date => date.isBefore(moment(), 'day') || date.isAfter(moment().add(1, 'months'), 'day')}
                        isDayBlocked={isBlocked}
                        date={date}
                    />


                    <h2 className='text__blue mt-9 mb-2 mt-md-13 mb-md-6 mt-xl-15'>Overview</h2>
                    <p>March 1, 2020</p>
                    <div
                        className='rounded__4 border-style border__default d-md-flex justify-content-between align-items-center'>
                        <div>
                            <div className='px-4 pt-4 pb-11 pt-md-5 pb-md-5 px-md-5 d-flex position-relative'>
                                <img
                                    width='78'
                                    height='98'
                                    src='https://upload.wikimedia.org/wikipedia/commons/c/c5/Garni_Temple_02.JPG'
                                    alt='garni'
                                    className='rounded__4 object-pos-center object-fit-cover mr-3'
                                />
                                <div>
                                    <p className='weight-500 mb-1'>Garni Temple and Geghard Monastery</p>
                                    <p className='mb-1 text-xs'>
                                        <span className='weight-500'>Day:</span>{' '}
                                        <span className='weight-500 text__grey-dark'>September 1</span>
                                    </p>
                                    <p className='mb-0 text-xs'>
                                        <span className='weight-500'>Travelers:</span>{' '}
                                        <span className='weight-500 text__grey-dark'>3 Adults</span>
                                    </p>
                                    <div className='cancelation-container d-inline-block text-center py-2 py-md-0'>
                                        <button className='btn btn-secondary btn-sm'>Cancelation</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className='border__top border__default my-0'/>
                        <div className='py-3 d-flex flex-column flex-lg-row align-items-center pr-lg-5'>
                            <button
                                className='btn btn-secondary btn-secondary__grey text-uppercase mb-1'
                                onClick={() => setOpenDetailsModal(true)}
                            >
                                Details
                            </button>
                            <button className='btn btn-secondary text-uppercase'>Contact Traveler</button>
                        </div>
                    </div>
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
