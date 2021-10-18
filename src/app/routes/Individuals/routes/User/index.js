import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { IconHome, IconGlobe } from 'shared/components/Icons';
import actions from "../../../../../actions";
import {MONTH_LIST, TRAVELER_TYPE, HOST_URL} from "../../../../../constants";
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';

const User = ({history={}}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const {config, driverData={}} = useSelector(state => state);
    const {individual_user, userType} = config;

    const {booked_trip_details} = driverData;
    const {user_info={}} = booked_trip_details;

    const {location:history_location={}} = history;
    let {state:history_state={}} = history_location;

    if (!history_state) history_state={};

    const {
        booked_trip=false,
    } = history_state;

    const {
        created_at,
        user_name,
        profile_photo,
        about,
        location,
        languages
    } = booked_trip ? user_info : individual_user;

    const created_date = new Date(created_at || "");
    const member_since = t(`commons.months.${MONTH_LIST[created_date.getMonth()]}`) + " " + created_date.getFullYear();
    const src = profile_photo ? (process.env.NODE_ENV === "development"
        ? HOST_URL + profile_photo
        : profile_photo) : 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png';


    useEffect(() => {
        // TODO need also to get individual user by passing id in routes for non registered users
        dispatch(actions.individualUserRequest(Number(localStorage.id), Number(localStorage.userType)));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className='container overflow-hidden'>
                <div className='row mh-min-screen mt-6 mt-md-9 mt-xl-11 mt-xxl-13'>
                    <div className='col-xl-3 pr-xl-0 pr-xxxl-8'>

                        <div className='rounded__8 border-style border__default'>
                            <div className='p-4 p-md-5 p-xxl-6'>
                                <div className='d-flex'>
                                    <img
                                        width='80'
                                        height='80'
                                        src={src}
                                        alt='garni'
                                        className='rounded__50 object-pos-center object-fit-cover mr-3 mr-md-5'
                                    />
                                    <div>
                                        <p className='weight-500 pt-2 mb-0'>{user_name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='col-xl-9'>
                        <h1 className='text__blue mt-9 mt-md-10 mt-xl-0 mb-2 mb-xl-1'>{t("profiles_page.info_area.title", {name: user_name})} !</h1>
                        <p className='text-sm weight-500 text__grey-dark mb-5'>{t("profiles_page.info_area.member_since")} {member_since}
                            {
                                userType === TRAVELER_TYPE &&
                                <Link to='/account/personal' className='btn btn-secondary btn-sm ml-5'>
                                    {t("profiles_page.info_area.edit_btn")}
                                </Link>
                            }
                        </p>
                        <p className='mb-0'>{about}</p>
                        <hr className='border__top border__default my-4 my-md-5' />

                        <div className='row'>
                            <div className='col-md-6 d-flex mb-4'>
                                <IconHome className='mr-2' />
                                <p className='mb-0'>
                                    {t("profiles_page.details.lives_in")}: <span className='weight-500 text__grey-dark'>{location}</span>
                                </p>
                            </div>
                            <div className='col-md-6 d-flex mb-4'>
                                <IconGlobe className='mr-2 fixed-svg' />
                                <p className='mb-0'>
                                    {t("profiles_page.details.speaks")}: <span className='weight-500 text__grey-dark'>{languages}</span>
                                </p>
                            </div>
                        </div>

                        <hr className='border__top border__default my-4 mt-md-1 mb-md-5' />
                    </div>
                </div>
            </div>
        </>
    );
};

export default User;
