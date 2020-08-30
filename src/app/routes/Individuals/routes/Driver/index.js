import React, {useEffect} from 'react';
import { IconArrowLeft, IconStar, IconCheckMarkOutlined } from 'shared/components/Icons';
import Benefits from './components/Benefits';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import BookPanel from './components/BookPanel';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {MONTH_LIST, DRIVER_TYPE} from "../../../../../constants";
import actions from "../../../../../actions";

const Driver = ({ history }) => {
    const dispatch = useDispatch();
    const {config} = useSelector(state => state);
    const {individual_user, userType} = config;

    const {
        created_at,
        user_name,
        about,
        location,
        languages,
        car_specs,
        car_seats,
        car_mark,
        car_model,
        car_full_name,
        car_photos=[],
    } = individual_user;

    const created_date = new Date(created_at || "");
    const member_since = MONTH_LIST[created_date.getMonth()] + " " + created_date.getFullYear();

    const benefits = {location, languages, car_specs, car_seats, car_mark, car_model, car_full_name};


    useEffect(() => {
        // TODO need also to get individual user by passing id in routes for non registered users
        dispatch(actions.individualUserRequest(Number(localStorage.id), Number(localStorage.userType)));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className='container overflow-hidden'>
                <div className='mt-4 mb-5'>
                    <button className='btn btn-circle border-0' onClick={() => history.goBack()}><IconArrowLeft /></button>
                </div>

                <div className='row'>
                    <div className='col-xl-3 pr-xl-0 pr-xxxl-8'>
                        <div className='rounded__8 border-style border__default'>
                            <div className='p-4 p-md-5 p-xxl-6'>
                                <div className='d-flex'>
                                    <img
                                        width='80'
                                        height='80'
                                        src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png'
                                        alt='garni'
                                        className='rounded__50 object-pos-center object-fit-cover mr-3 mr-md-5'
                                    />
                                    <div>
                                        <p className='weight-500 pt-2 mb-0'>{user_name}</p>
                                        <p className='mb-0'>
                                            <span className='weight-700'>5.0</span>
                                            <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                                            <span className='text-sm text__grey-dark'>(125 reviews)</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr className='border__top border__default my-0' />
                            <div className='p-4 p-md-5 p-xxl-6'>
                                <div className='d-flex mb-4'><IconCheckMarkOutlined className='mr-2' /> ID</div>
                                <div className='d-flex mb-4'><IconCheckMarkOutlined className='mr-2' /> Phone</div>
                                <div className='d-flex'><IconCheckMarkOutlined className='mr-2' /> Email Address</div>
                            </div>
                        </div>
                    </div>

                    <div className='col-xl-9'>
                        <h1 className='text__blue mt-9 mt-md-10 mt-xl-0 mb-2 mb-xl-1'>Hi, I am {user_name} !</h1>
                        <p className='text-sm weight-500 text__grey-dark mb-5'>Member since {member_since}
                            {
                                userType === DRIVER_TYPE &&
                                <Link to='/car/view' className='btn btn-secondary btn-sm ml-5'>
                                    Edit profile
                                </Link>
                            }
                        </p>
                        <p className='mb-0'>{about}</p>
                        <hr className='border__top border__default my-4 my-md-5' />

                        <Benefits {...benefits} />
                        <hr className='border__top border__default my-4 mt-md-1 mb-md-5' />

                        <Gallery car_photos={car_photos}/>
                        <Reviews />
                    </div>
                </div>
            </div>
            <BookPanel />
        </>
    );
};

export default Driver;
