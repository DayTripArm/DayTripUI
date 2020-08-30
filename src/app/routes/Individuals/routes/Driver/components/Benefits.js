import React from 'react';
import {
    IconHome,
    IconGlobe,
    IconCar,
    IconSeat,
    IconSnack,
    IconSmoking,
    IconPetStep,
    IconCarSeat,
    IconWifi,
    IconWater,
    IconAC
} from 'shared/components/Icons';

const Benefits = (props) => {

    const {location, languages, car_specs, car_seats, car_full_name} = props;

    const car_features = (car_specs && JSON.parse(car_specs)) || {};

    return (
        <div className='row'>
            <div className='col-md-6 d-flex mb-4'>
                <IconHome className='mr-2'/>
                <p className='mb-0'>Lives: <span className='weight-500 text__grey-dark'>{location}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconGlobe className='mr-2'/>
                <p className='mb-0'>Languages: <span className='weight-500 text__grey-dark'>{languages}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconCar className='mr-2'/>
                <p className='mb-0'>Car: <span className='weight-500 text__grey-dark'>{car_full_name}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconSeat className='mr-2'/>
                <p className='mb-0'>Seats: <span className='weight-500 text__grey-dark'>{car_seats}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconCarSeat className='mr-2'/>
                <p className='mb-0'>Car Seat: <span className='weight-500 text__grey-dark'>{car_features['car_seat'] ? "Yes" : "No"}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconAC className='mr-2'/>
                <p className='mb-0'>A/C: <span className='weight-500 text__grey-dark'>{car_features['air_condition'] ? "Yes" : "No"}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconSmoking className='mr-2'/>
                <p className='mb-0'>Smoking: <span className='weight-500 text__grey-dark'>{car_features['smoke_allowed'] ? "Yes" : "No"}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconSnack className='mr-2'/>
                <p className='mb-0'>Snacks: <span className='weight-500 text__grey-dark'>{car_features['snacks'] ? "Yes" : "No"}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconWater className='mr-2'/>
                <p className='mb-0'>Water: <span className='weight-500 text__grey-dark'>{car_features['water'] ? "Yes" : "No"}</span></p>
            </div>
            <div className='col-md-6 d-flex'>
                <IconPetStep className='mr-2'/>
                <p className='mb-0'>Pets Allowed: <span className='weight-500 text__grey-dark'>{car_features['pets_allowd'] ? "Yes" : "No"}</span></p>
            </div>
            <div className='col-md-6 d-flex'>
                <IconWifi className='mr-2'/>
                <p className='mb-0'>Wifi: <span className='weight-500 text__grey-dark'>{car_features['wifi'] ? "Yes" : "No"}</span></p>
            </div>
        </div>
    )
};

export default Benefits;
