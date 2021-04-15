import React, { useState } from 'react';
import _ from "lodash";

// Load Components
import OnboardingPanel from 'shared/components/OnboardingPanel';
import CarRegistration from './components/CarRegistration';
import CarCommunications from './components/CarCommunications';
import CarPhotoUpload from './components/CarPhotoUpload';
import GovermentAndLicence from './components/GovermentAndLicence';
import CarRegComplete from './components/CarRegComplete';
import ProfilePicture from './components/ProfilePicture';
import ProfileData from './components/ProfileData';
import LocationAndDestination from './components/LocationAndDestination';
import HitTheRoad from './components/HitTheRoad';
import Loader from "shared/components/Loader";

import actions from "../../../actions";
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';

const requiredFields = {
    1: ["car_type", "car_mark", "car_model", "car_year", "car_color"],
    2: [], // no validation
    3: ["car_photos"],
    4: ["gov_photos", "license_photos", "reg_card_photos"],
    5: [], //no validation
    6: ["profile_photos"],
    7: ["gender", "birthMonth", "birthDay", "birthYear", "languages"],
    8: ["location", "driver_destinations"],
};

const DriverRegister = () => {
    const { t } = useTranslation();
    const StepPageByNumber = {
        1: {page: CarRegistration, stepText: t("driver_signup.header"), stepNumber: "1"},
        2: {page: CarCommunications, stepText: t("driver_signup.header"), stepNumber: "1"},
        3: {page: CarPhotoUpload, stepText: t("driver_signup.header"), stepNumber: "2"},
        4: {page: GovermentAndLicence, stepText: t("driver_signup.header"), stepNumber: "3"},
        5: {page: CarRegComplete, stepText: t("driver_signup.header"), stepNumber: "4"},
        6: {page: ProfilePicture, stepText: t("driver_signup.header"), stepNumber: "4"},
        7: {page: ProfileData, stepText: t("driver_signup.header"), stepNumber: "5"},
        8: {page: LocationAndDestination, stepText: t("driver_signup.header"), stepNumber: "5"},
        9: {page: HitTheRoad, stepText: t("driver_signup.header"), stepNumber: "6"},
    };
    const limit = _.keys(StepPageByNumber).length;
    const [step, setStep] = useState(1);
    const [isSubmit, setSubmit] = useState(false);
    const [startValidate, setStartValidate] = useState(false);
    const [tariffChecked, setTariffChecked] = useState(false); // for all days trip, page 6

    const [loading, setLoading] = useState(false);

    let invalidFields = [];

    const loaderText = t("commons.loading_save_driver");

    const dispatch = useDispatch();

    const StepPage = StepPageByNumber[step].page;
    const stepText = StepPageByNumber[step].stepText;
    const stepNumber = StepPageByNumber[step].stepNumber;

    const {driverData} = useSelector(state => state);
    const {preregistered_info={}} = driverData;

    const validate = () => {
        _.each(requiredFields[step], field => {
            if ((!preregistered_info[field] && preregistered_info[field] !== 0) || (typeof preregistered_info[field] === "object" && _.isEmpty(preregistered_info[field]))) {
                invalidFields.push(field)
            }

            if (step === 9 && !tariffChecked) { // for step 6
                invalidFields = [];
            }
        });
    };

    const isValid = () => {
        validate();

        setStartValidate(true);

        return _.isEmpty(invalidFields);
    };

    if (startValidate) {
        validate();
    }

    return (
        <>
            <OnboardingPanel step={step===9 ? t("driver_signup.final_step_header") : t("driver_signup.step_header") + stepNumber} name={stepText} progress={(100 / limit) * step} />
            <div className='container mh-min-screen'>
                <div className='d-flex justify-content-center mt-3 pt-8 pt-md-10 pt-xl-12'>
                    <div className='w-100 mxw-328px'>

                        < StepPage step={step} setStep={setStep} invalidFields={invalidFields} tariffChecked={tariffChecked} setTariffChecked={setTariffChecked}  />

                        <div className='mt-6'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <button className='btn btn-secondary btn-bold btn-secondary__black text-uppercase' onClick={() => setStep(step - 1)} disabled={step === 1}>
                                    {t("commons.buttons.back_btn")}
                                </button>
                                <button className='btn btn-primary text-uppercase' disabled={isSubmit} onClick={() => {
                                    if (!isValid()) return false;

                                    step !== limit && setStep(step + 1);
                                    if (step === limit) {
                                        setSubmit(true);
                                        setLoading(true);
                                        dispatch(actions.saveDriverPreregData());
                                    }
                                    setStartValidate(false);
                                }}>
                                    {step !== limit ? t("commons.buttons.next_btn") : t("commons.buttons.save_btn")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loader text={loaderText} />}
        </>
    );
};

export default DriverRegister;
