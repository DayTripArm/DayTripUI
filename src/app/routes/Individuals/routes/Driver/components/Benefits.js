import React from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    const car_features = (car_specs && JSON.parse(car_specs)) || {};

    return (
        <div className='row'>
            <div className='col-md-6 d-flex mb-4'>
                <IconHome className='mr-2'/>
                <p className='mb-0'>{t("commons.car_options.live_in")}: <span className='weight-500 text__grey-dark'>{location}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconGlobe className='mr-2 fixed-svg'/>
                <p className='mb-0'>{t("commons.car_options.speaks")}: <span className='weight-500 text__grey-dark'>{languages}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconCar className='mr-2'/>
                <p className='mb-0'>{t("commons.car_options.car")}: <span className='weight-500 text__grey-dark'>{car_full_name}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconSeat className='mr-2'/>
                <p className='mb-0'>{t("commons.car_options.seats")}: <span className='weight-500 text__grey-dark'>{car_seats}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconCarSeat className='mr-2'/>
                <p className='mb-0'>{t("commons.car_options.car_seat")}: <span className='weight-500 text__grey-dark'>{car_features['car_seat'] ? t("commons.toogle_yes") : t("commons.toogle_no")}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconAC className='mr-2'/>
                <p className='mb-0'>{t("commons.car_options.air_conditioning")}: <span className='weight-500 text__grey-dark'>{car_features['air_condition'] ? t("commons.toogle_yes") : t("commons.toogle_no")}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconSmoking className='mr-2'/>
                <p className='mb-0'>{t("commons.car_options.smoking_allowed")}: <span className='weight-500 text__grey-dark'>{car_features['smoke_allowed'] ? t("commons.toogle_yes") : t("commons.toogle_no")}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconSnack className='mr-2'/>
                <p className='mb-0'>{t("commons.car_options.snacks")}: <span className='weight-500 text__grey-dark'>{car_features['snacks'] ? t("commons.toogle_yes") : t("commons.toogle_no")}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconWater className='mr-2'/>
                <p className='mb-0'>{t("commons.car_options.water")}: <span className='weight-500 text__grey-dark'>{car_features['water'] ? t("commons.toogle_yes") : t("commons.toogle_no")}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconPetStep className='mr-2'/>
                <p className='mb-0'>{t("commons.car_options.pets_allowed")}: <span className='weight-500 text__grey-dark'>{car_features['pets_allowed'] ? t("commons.toogle_yes") : t("commons.toogle_no")}</span></p>
            </div>
            <div className='col-md-6 d-flex mb-4'>
                <IconWifi className='mr-2'/>
                <p className='mb-0'>{t("commons.car_options.wifi")}: <span className='weight-500 text__grey-dark'>{car_features['wifi'] ? t("commons.toogle_yes") : t("commons.toogle_no")}</span></p>
            </div>
        </div>
    )
};

export default Benefits;
