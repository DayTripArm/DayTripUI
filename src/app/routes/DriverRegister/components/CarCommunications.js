import React, {useEffect} from 'react';
import Checkbox from 'shared/components/Checkbox';
import FormPlusMinus from 'shared/components/FormPlusMinus.js';
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../../actions";

const CarRegistration = () => {
    const {driverData} = useSelector(state => state);
    const {preregistered_info} = driverData;

    const {
        car_seats,
        car_specs={}
    } = preregistered_info;

    const dispatch = useDispatch();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);


    return (
        <>
            <h4 className='text__blue mb-4'>How many passengers can travel in your car?</h4>
            <p className='text__grey-dark'>Make sure you have enough seats for all travelers.</p>

            <FormPlusMinus
                label="Seats"
                name="car_seats"
                max={9}
                min={2}
                initialValue={car_seats || 4}
                onChange={(e) => dispatch(actions.setPreregisteredDriverProperty(e.name, e.value))}
            />

            <h4 className='text__blue mb-4'>Tell us what you have in the car</h4>
            <p className='text__grey-dark'>Tell travelers more about your car and rules. You can add even more after you publish.</p>

            <Checkbox
                className='mb-4 w-100'
                name='car_seat'
                label='Car Seat'
                onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions('car_seat', e.target.checked))}
                value={car_specs['car_seat']}
            />

            <Checkbox
                className='mb-4 w-100'
                name='air_condition'
                label='Air Conditioning'
                onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions('air_condition', e.target.checked))}
                value={car_specs['air_condition']}
            />

            <Checkbox
                className='mb-4 w-100'
                name='smoke_allowed'
                label='Smoking Allowed'
                onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions('smoke_allowed', e.target.checked))}
                value={car_specs['smoke_allowed']}
            />
            <Checkbox
                className='mb-4 w-100'
                name='pets_allowd'
                label='Pets Allowed'
                onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions('pets_allowd', e.target.checked))}
                value={car_specs['pets_allowd']}
            />
            <Checkbox
                className='mb-4 w-100'
                name='water'
                label='Water'
                onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions('water', e.target.checked))}
                value={car_specs['water']}
            />
            <Checkbox
                className='mb-4 w-100'
                name='snacks'
                label='Snacks'
                onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions('snacks', e.target.checked))}
                value={car_specs['snacks']}
            />
            <Checkbox
                className='w-100'
                name='wifi'
                label='WIFI'
                onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions('wifi', e.target.checked))}
                value={car_specs['wifi']}
            />
        </>
    );
};

export default CarRegistration;
