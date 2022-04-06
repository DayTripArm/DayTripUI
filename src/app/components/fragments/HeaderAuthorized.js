import React, { useState, useRef } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    IconHome,
    IconHeartFilled,
    IconTrip,
    IconCalendar,
    IconBookedCalendar,
    IconChart,
    IconCar,
    IconMessage,
    IconUnreadMessage,
    IconUser,
} from 'shared/components/Icons';
import DeleteAccountModal from '../modals/DeleteAccountModal';
import RestrictDeleteModal from '../modals/RestrictDeleteModal';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import actions from "../../../actions";
import {HOST_URL} from "../../../constants";
import _ from "lodash";
import Api from "../../../Api";
import moment from "moment";

const HeaderAuthorized = ({ type }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const dropdownContainer = useRef();
    const [openDropdown, setOpenDropdown] = useState(false);

    useOutsideClick(dropdownContainer, () => setOpenDropdown(false));
    const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);
    const [openRestrictModal, setOpenRestrictModal] = useState(false);

    const {travelerData={}, driverData={}, config={}} = useSelector(state => state);

    const {userType} = config; // 'userType' storing as string

    const {profile:travelerProfile={}, user_info={}} = travelerData;
    const {profile:driverProfile={}, driver_info={}, driver_calendar={}} = driverData;

    const {conversations=[]} = config;
    const {conversations_list} = conversations;
    const {overview_trips} = driver_calendar;

    const {user={}} = !_.isEmpty(user_info) ? user_info : driver_info;
    let obj = {};
    let bookedTripsCount = -1;
    let unreadMessages, acceptedBookedTrips = 0;

    if (Number(userType) === 1) { //traveler user
        obj = !_.isEmpty(travelerProfile) ? travelerProfile : user;
    } else { // driver user
        obj = !_.isEmpty(driverProfile) ? driverProfile : user;
    }

    let {name, profile_photo} = obj;

    name = _.split(name, ' ')[0];
    if (name && name.length > 20) {
        name = _.truncate(name, {
            'length': 21,
            'omission': ''
        });
    }

    if (conversations_list && conversations_list.length > 0){
        unreadMessages = conversations_list.reduce((x, y) => x = x + y.unread_messages , 0 );
    }

    if (overview_trips && overview_trips.length > 0){
        acceptedBookedTrips = overview_trips.some(i => i.status === 0 && moment(i.trip_day).isSameOrAfter(moment(), 'day'));
    }

    const navigationTypes = {
        user: [
            {
                route: '/home',
                icon: IconHome,
                name: t("home_page.top_menu.home"),
            },
            {
                route: '/favorites',
                icon: IconHeartFilled,
                name: t("home_page.top_menu.saved")
            },
            {
                route: '/trips',
                icon: IconTrip,
                name: t("home_page.top_menu.trips")
            },
            {
                route: '/messaging',
                icon: unreadMessages > 0 ? IconUnreadMessage : IconMessage ,
                name: t("home_page.top_menu.messages")
            },
        ],
        driver: [
            {
                route: '/calendar',
                icon: acceptedBookedTrips ? IconBookedCalendar : IconCalendar,
                name: t("home_page.top_menu.calendar")
            },
            {
                route: '/progress',
                icon: IconChart,
                name: t("home_page.top_menu.progress")
            },
            {
                route: '/car',
                icon: IconCar,
                name: t("home_page.top_menu.my_car")
            },
            {
                route: '/messaging',
                icon: unreadMessages > 0 ? IconUnreadMessage : IconMessage,
                name: t("home_page.top_menu.messages")
            },
        ],
    };
    const logOut = () => {
        dispatch(actions.logOut());
        delete localStorage.userType;
        delete localStorage.is_prereg;
        delete localStorage.id;
        window.location.href = "/";
    };

    const deleteAccount = () => {
        const asyncRequest = async () => {
            const bookedCount = await Api.getBookedTripsCount(Number(localStorage.id), Number(localStorage.userType));  // get users booked trips
            bookedTripsCount = bookedCount.response.data ? bookedCount.response.data.book_trips_count : -1;

            if (bookedTripsCount > 0){
                setOpenRestrictModal(true);
                window.location.hash = "modal"
            }else if (bookedTripsCount === 0){
                setOpenDeleteAccountModal(true);
                window.location.hash = "modal"
            }
        };

        asyncRequest();
    };


    return (
        <>
        <nav className='guest-nav d-flex'>
            <ul className='guest-menu guest-menu__mobile no-list-style mb-0 d-flex justify-content-center justify-content-xl-end'>
                {navigationTypes[type].map((nav, i) => {
                    const Icon = nav.icon;
                    return (
                        <li key={i} className='nav-holder position-relative'>
                            <NavLink
                                to={nav.route}
                                className='menu-link d-flex align-items-center justify-content-center px-3 px-md-4 py-4 py-xl-5'
                                activeClassName='active'
                            >
                                <Icon className='mr-xl-1' />
                                <span className='d-none d-xl-inline-block'>{nav.name}</span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
            <ul className='guest-menu no-list-style mb-0 d-flex'>

                <li ref={dropdownContainer} className='position-relative'>
                    <span
                        to='/profile'
                        className='header-dropdown pointer bg-white d-flex align-items-center px-md-4 py-5'
                        onClick={() => setOpenDropdown(!openDropdown)}
                        role='presentation'
                    >
                    {profile_photo ? <img
                        width='24'
                        height='24'
                        className='object-pos-center object-fit-cover rounded__50 mr-2'
                        src={process.env.NODE_ENV === "development" ? HOST_URL + profile_photo : profile_photo}
                        alt='avatar'
                    /> : <IconUser className='mr-md-1' /> }
                    <span className='d-none d-md-inline-block'>{name}</span>
                  </span>
                    <div
                        className={`profile-dropdown dropdown dropdown-default dropdown-intermediate dropdown__left rounded-bottom__4 border-style border__default mnw-320px ${
                            openDropdown ? ' active' : ''
                        }`}
                    >
                        <ul className='dropdown-list no-list-style mb-0'>
                            <li>
                                <NavLink
                                    to={Number(userType) === 1 ? "/individuals/user" : "/individuals/driver"}
                                    onClick={() => setOpenDropdown(false)}
                                    className='list-item d-block list-item__hover text__grey-dark weight-500 px-5 text-ellipsis'
                                    activeClassName='active'
                                >
                                    <span className='d-block py-4 border__bottom border__default'>{t("home_page.top_menu.profile")}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/account'
                                    onClick={() => setOpenDropdown(false)}
                                    className='list-item d-block list-item__hover text__grey-dark weight-500 px-5 text-ellipsis'
                                    activeClassName='active'
                                >
                                    <span className='d-block py-4 border__bottom border__default'>{t("home_page.top_menu.account")}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/help'
                                    onClick={() => setOpenDropdown(false)}
                                    className='list-item d-block list-item__hover text__grey-dark weight-500 px-5 text-ellipsis'
                                    activeClassName='active'
                                >
                                    <span className='d-block py-4 border__bottom border__default'>{t("home_page.top_menu.help")}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/deleteAccount'
                                    className='list-item d-block list-item__hover text__grey-dark weight-500 px-5 text-ellipsis'
                                    activeClassName='active'
                                >
                                    <span className='d-block py-4 border__bottom border__default'  onClick={() => deleteAccount()}>{t("home_page.top_menu.delete_account")}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/currency'
                                    className='list-item d-block list-item__hover text__grey-dark weight-500 px-5 text-ellipsis'
                                    activeClassName='active'
                                >
                                    <span className='d-block py-4' onClick={() => logOut()}>{t("home_page.top_menu.logout")}</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
            {openDeleteAccountModal && <DeleteAccountModal
                onClose={() => setOpenDeleteAccountModal(false)}
                userType ={localStorage.userType}
            />}
            {openRestrictModal && <RestrictDeleteModal
                count={bookedTripsCount} onClose={() => setOpenRestrictModal(false)}
            />}

        </>
    );
};

export default HeaderAuthorized;
