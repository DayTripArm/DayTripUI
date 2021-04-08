import React, {useEffect} from 'react';
import Checkbox from 'shared/components/Checkbox';
import FormPlusMinus from 'shared/components/FormPlusMinus.js';
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import actions from "../../../../actions";

const CarRegistration = () => {
    const {driverData} = useSelector(state => state);
    const {preregistered_info} = driverData;
    const { t } = useTranslation();

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
            <h4 className='text__blue mb-4'>{t("driver_sigup.step2.title1")}</h4>
            <p className='text__grey-dark'>{t("driver_sigup.step2.text1")}</p>

            <FormPlusMinus
                label={t("commons.car_options.seats")}
                name="car_seats"
                max={9}
                min={2}
                initialValue={car_seats || 4}
                onChange={(e) => dispatch(actions.setPreregisteredDriverProperty(e.name, e.value))}
            />

            <h4 className='text__blue mb-4'>{t("driver_sigup.step2.title2")}</h4>
            <p className='text__grey-dark'>{t("driver_sigup.step2.text2")}</p>

            <Checkbox
                className='mb-4 w-100'
                name='car_seat'
                label={t("commons.car_options.car_seat")}
                onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions('car_seat', e.target.checked))}
                value={car_specs['car_seat']}
            />

            <Checkbox
                className='mb-4 w-100'
                name='air_condition'
                label={t("commons.car_options.air_cond")}
                onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions('air_condition', e.target.checked))}
                value={car_specs['air_condition']}
            />

            <Checkbox
                className='mb-4 w-100'
                name='smoke_allowed'
                label={t("commons.car_options.smocking")}
                onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions('smoke_allowed', e.target.checked))}
                value={car_specs['smoke_allowed']}
            />
            <Checkbox
                className='mb-4 w-100'
                name='pets_allowd'
                label={t("commons.car_options.pets")}
                onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions('pets_allowd', e.target.checked))}
                value={car_specs['pets_allowd']}
            />
            <Checkbox
                className='mb-4 w-100'
                name='water'
                label={t("commons.car_options.water")}
                onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions('water', e.target.checked))}
                value={car_specs['water']}
            />
            <Checkbox
                className='mb-4 w-100'
                name='snacks'
                label={t("commons.car_options.snacks")}
                onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions('snacks', e.target.checked))}
                value={car_specs['snacks']}
            />
            <Checkbox
                className='w-100'
                name='wifi'
                label={t("commons.car_options.wifi")}
                onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions('wifi', e.target.checked))}
                value={car_specs['wifi']}
            />
        </>
    );
};

export default CarRegistration;
