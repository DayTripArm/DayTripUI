import React, {useEffect, useState} from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import Responsive from "react-responsive";
import { IconSetting } from 'shared/components/Icons';
import TripDetailsModal from '../Messaging/components/TripDetailsModal';
import SettingsModal from './components/SettingsModal';
import BookedTripItem from './components/BookedTripItem';
import NavNext from './components/NavNext';
import NavPrev from './components/NavPrev';
import { DayPickerSingleDateController } from 'react-dates';
//import './react-date-custom-style';

import _ from 'lodash';
import moment from "moment";
import actions from "../../../actions";
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router";


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
    const history = useHistory();
    const {driverData} = useSelector(state => state);
    const { t } = useTranslation();
    const {calendar_settings={}, driver_calendar={}} = driverData;
    const locale_code = localStorage.getItem('lang') || 'en'
    let {available_days} = calendar_settings;
    if (!available_days) {
        available_days = [];
    }

    let {calendar_info, overview_trips} = driver_calendar;

    const date = null;
    const [focused, setFocused] = useState(true);

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

        const booked_day_list = _.reduce(calendar_info, (memo, obj) => {
            memo.push(obj.trip_day);

            return memo;
        }, []);

        let included_days = [];

        // ****************************************************
        // on calendar booked trip click
        if (_.includes(booked_day_list, date_string)) {
            const booked_obj = _.find(calendar_info, item => item.trip_day === date_string);

            onBookedTripClick(booked_obj.id, booked_obj.traveler_id);
        } else { // *********************************** block/unblock part

            if (_.includes(available_days, date_string)) {
                included_days = _.filter(available_days, date => date !== date_string)
            } else {
                included_days = [...available_days, moment(date).format('YYYY-MM-DD')]
            }

            const settings_obj = {
                driver_id: Number(localStorage.id),
                available_days: {
                    included_days
                }
            };

            dispatch(actions.updateCalendarSettingsRequest(Number(localStorage.id), settings_obj));
        }
    };

    const onBookedTripClick = (booked_id) => {
        dispatch(actions.getBookedTripRequest(booked_id, 1));

        setOpenDetailsModal(true);
        window.location.hash = "modal"
    };

    const onContactClick = (sender_id, recipient_id, booked_id) => {
        const body = {
            "sender_id" : sender_id,
            "recipient_id": recipient_id,
            "booked_trip_id": booked_id
        };
        dispatch(actions.getConversationRequest(body));
        history.push(`/messaging`);

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
        return available_days.some(date => day.isSame(date, 'day'));
    };

    const isOutsideRange = (date) => {
        if (calendar_info) {
            const list = _.reduce(calendar_info, (memo, obj) => {
                memo.push(obj.trip_day);

                return memo;
            }, []);
            let isIncluded = _.includes(list, date.format('YYYY-MM-DD'));
            return date.isBefore(moment(), 'day') && !isIncluded;
        }
    };

    const renderDayContents=(day, i)=> {

        if (calendar_info && (_.find(calendar_info, {trip_day: day.format("YYYY-MM-DD")})) ){
            const info = _.find(calendar_info, {trip_day: day.format("YYYY-MM-DD")});

            return (
                <div className={moment(day).isSameOrAfter(moment(), 'day')? 'CalendarProfileActive' : 'CalendarProfileInactive'} >
                    <div style={{position:'absolute', padding: window.matchMedia("(max-width: 400px)").matches ? '0px': window.matchMedia("(max-width: 500px)").matches ? '2px': '5px'}}>
                        <img
                            className="CalendarProfileImg"
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

    const daySize = window.matchMedia("(max-width: 350px)")
        .matches ? 35 :  window.matchMedia("(max-width: 400px)")
        .matches ? 38 :  window.matchMedia("(max-width: 500px)")
        .matches ? 48 :  window.matchMedia("(max-width: 720px)")
        .matches ? 70 :  window.matchMedia("(max-width: 768px)")
        .matches ? 90 :  window.matchMedia("(max-width: 950px)")
        .matches ? 45 : window.matchMedia("(max-width: 1030px)")
        .matches ? 60 : window.matchMedia("(max-width: 1279px)")
        .matches ? 65 : window.matchMedia("(max-width: 1559px)")
        .matches ? 60 : 66;
    const numberOfMonths = window.matchMedia("(max-width: 768px)").matches ? 1 : 2;


    const onMonthClick=(d)=>{
        const allowedRange = moment().add(12, 'months');
        let b = d.diff(allowedRange, 'months', true);
        const nextBtn = document.getElementsByClassName('DayPickerNavigation_rightButton__horizontalDefault')[0];
        if(b > -1.5) {
            nextBtn.style.display = 'none';
        }else{
            nextBtn.style.display = 'block';
        }
        // Use the nextBtn.style.display = 'none' or 'block' to controll the navBtn
    }

    return (
        <>
            <div className='calendar-page container'>
                <div className='col-xl-9 col-xxl-8 col-xxxl-7 m-auto p-0'>
                    <div
                        className='d-flex align-items-center justify-content-between mt-6 mb-5 mt-md-9 mb-md-9 mt-xl-11 mt-xxl-13 '>
                        <h2 className='text__blue mb-0'>{t("calendar_page.title")}</h2>
                        <button className='btn btn-circle border-0' onClick={() => {
                            setOpenSettingsModal(true);
                            window.location.hash = "modal"
                        }}>
                            <IconSetting/>
                        </button>
                    </div>

                    {/*<Mobile>*/}
                        <DayPickerSingleDateController
                            {...props}
                            verticalHeight={370}
                            noBorder={true}
                            daySize={daySize}
                            numberOfMonths = {numberOfMonths}
                            onDateChange={onDateChange}
                            onFocusChange={onFocusChange}
                            onNextMonthClick={d => onMonthClick(d)}
                            onPrevMonthClick={d => onMonthClick(d)}
                            focused={focused}
                            navNext={<NavNext/>}
                            navPrev={<NavPrev/>}
                            renderDayContents={renderDayContents}
                            isOutsideRange={date => isOutsideRange(date)}
                            isDayHighlighted={isDayHighlighted}
                            renderMonthElement={({ month }) => {
                                const date = moment(month).locale(locale_code === "am" ? "hy-am" : locale_code)
                                return _.startCase(date.format('MMMM YYYY'))
                            }}
                            date={date}
                        />

                    {/*</Mobile>*/}


                    <h2 className='text__blue mb-0 mt-6 mb-5 mt-md-9 mb-md-9 mt-xl-11 mt-xxl-13'>{t("calendar_page.overview")}</h2>
                    <div className='tabs mb-6'>
                        <ul className='no-list-style mb-3 mb-lg-0 clearfix'>
                            <li
                                className={tab === 1 ? 'active' : ''}
                                onClick={() => setTab(1)}
                                role='presentation'
                            >
                                {t("calendar_page.upcoming_tab")}
                            </li>
                            <li
                                className={tab === 2 ? 'active' : ''}
                                onClick={() => setTab(2)}
                                role='presentation'
                            >
                                {t("calendar_page.past_tab")}
                            </li>
                        </ul>
                    </div>
                    {tab === 1 &&  overview_trips && overview_trips.map((item) => {
                        return (moment(item.trip_day).isSameOrAfter(moment(), 'day') &&
                            <BookedTripItem key={item.id} item={item} onBookedTripClick={() => onBookedTripClick(item.id)} onContactClick={() => onContactClick(item.traveler_id, item.driver_id, item.id)} />)

                    })}
                    {tab === 2 &&  overview_trips && overview_trips.map((item) => {
                        return (moment(item.trip_day).isBefore(moment(), 'day') &&
                            <BookedTripItem key={item.id} item={item} onBookedTripClick={() => onBookedTripClick(item.id)} onContactClick={() => onContactClick(item.traveler_id, item.driver_id, item.id)}/>)
                    })}

                </div>
            </div>
            {openSettingsModal && <SettingsModal onClose={() => setOpenSettingsModal(false)}/>}
            {openDetailsModal && (
                <TripDetailsModal onClose={() => setOpenDetailsModal(false)}/>
            )}
        </>
    );
};
export const Mobile = props => <Responsive {...props} maxWidth={767} />;
export const Default = props => <Responsive {...props} minWidth={768} />;
export default Calendar;
