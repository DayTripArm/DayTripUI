import React from 'react';
import { IconStar,
    IconGlobe,
    IconSnack,
    IconSmoking,
    IconPetStep,
    IconCarSeat,
    IconWifi,
    IconWater,
    IconAC,
    IconCar,
    IconSeat } from 'shared/components/Icons';
import { Link, useLocation } from 'react-router-dom';
import {CAR_SPECS} from "../../../../constants";


const DriversList = (props) => {
    const drivers_list = props.driversList || [];
    const location = useLocation();
    return (<>
            <ul className='no-list-style mb-0'>
              {
                drivers_list.map((driver, i) => {
                const src = process.env.NODE_ENV === "development" ? "http://localhost:3000" + driver.profile_photos.full_path : driver.profile_photos.full_path;
                return (
                  <li className='mb-2 mb-md-4 mb-xl-5' key={i}>
                    <div className='rounded__4 border-style border__default'>
                        <div className='pt-4 px-4 pb-5 rounded__4 border__bottom border__default d-md-flex align-items-center justify-content-between'>
                            <div className='d-flex mb-5 mb-md-0'>
                                <img
                                    width='56'
                                    height='56'
                                    src={src}
                                    alt='user'
                                    className='rounded__50 object-pos-center object-fit-cover mr-3'
                                />
                                <div>
                                    <p className='weight-500 pt-1 mb-0'>{driver.driver_name}</p>
                                    <p className='mb-0'>
                                        <span className='weight-700'>5.0</span>
                                        <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                                        <span className='text-sm text__grey-dark'>(125 reviews)</span>
                                    </p>
                                </div>
                            </div>
                            <Link to={{
                                pathname: '/checkout/review',
                                state: {
                                    driver_id: driver.id,
                                    traveler_id: Number(localStorage.id),
                                    trip_id: null,
                                    driver_img: src,
                                    trip_img: null,
                                    driver_name: driver.driver_name,
                                    car_full_name: driver.car_full_name,
                                    car_specs: driver.car_specs,
                                    price: driver.hit_the_road_tariff,
                                    languages: driver.languages,
                                    trip_day: location.state.date,
                                    trip_duration: 12,
                                    travelers_count: location.state.travelers
                                }
                            }} className='btn btn-primary text-uppercase btn-xs-block'>
                                Book for ${driver.hit_the_road_tariff}
                            </Link>
                        </div>
                        <div className='pt-5 px-4 pb-4 pb-md-5'>
                            <div className='d-md-flex flex-wrap'>
                                <div className='col-md-6 px-0 d-flex mb-4'>
                                    <IconGlobe className='mr-2' />
                                    <p className='mb-0'>
                                        Languages:{' '}
                                        <span className='weight-500 text__grey-dark'>{driver.languages}</span>
                                    </p>
                                </div>
                                {
                                    Object.keys(driver.car_specs).map((opt, i) => {
                                    return (
                                        <div className='col-md-6 px-0 d-flex mb-4' key={i}>
                                            {opt === "car_seat" && (<IconCarSeat className='mr-2' />) }
                                            {opt === "smoke_allowed" && (<IconSmoking className='mr-2' />) }
                                            {opt === "pets_allowd"  && (<IconPetStep className='mr-2' />) }
                                            {opt === "wifi"  && (<IconWifi className='mr-2' />) }
                                            {opt === "snacks"  && (<IconSnack className='mr-2' />) }
                                            {opt === "air_condition"  && (<IconAC className='mr-2' />) }
                                            {opt === "water"  && (<IconWater className='mr-2' />) }
                                            <p className='mb-0'>
                                                {CAR_SPECS[opt]}: <span className='weight-500 text__grey-dark'>{driver.car_specs[opt]? "Yes" : "No"}</span>
                                            </p>
                                        </div>
                                    )
                                  })
                                }
                                <div className='col-md-6 px-0 d-flex mb-4'>
                                    <IconCar className='mr-2' />
                                    <p className='mb-0'>
                                        Car: <span className='weight-500 text__grey-dark'>{driver.car_full_name}</span>
                                    </p>
                                </div>
                                <div className='col-md-6 px-0 d-flex mb-4'>
                                    <IconSeat className='mr-2' />
                                    <p className='mb-0'>
                                        Seats: <span className='weight-500 text__grey-dark'>{driver.car_seats}</span>
                                    </p>
                                </div>
                            </div>
                            <div className='text-right'>
                                <Link to={{
                                    pathname: '/individuals/driver',
                                        state: {
                                            driver_id: driver.id,
                                            user_type: driver.user_type
                                        }
                                }} className='btn weight-700 btn-sm btn-text'>
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                </li>);
                })
              }
            </ul>
            <div className='text-center mt-5 mt-xl-6'>
                <button className='btn btn-primary text-uppercase'>Load More</button>
            </div>
        </>
    );
}


export default DriversList;
