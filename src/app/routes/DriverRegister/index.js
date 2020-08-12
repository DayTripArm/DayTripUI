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
import actions from "../../../actions";
import {useDispatch, useSelector} from "react-redux";

const requiredFields = {
    1: ["car_type", "car_mark", "car_model", "car_year", "car_color"],
    2: [], // no validation
    3: ["car_photos"],
    4: ["gov_photos", "license_photos"],
    5: [], //no validation
    6: ["profile_photos"],
    7: ["gender", "birthMonth", "birthDay", "birthYear", "languages"],
    8: ["location", "driver_destinations", "tariff1", "tariff2"]
};


const StepPageByNumber = {
    1: {page: CarRegistration, stepText: "Driver Sign Up", stepNumber: "1"},
    2: {page: CarCommunications, stepText: "Driver Sign Up", stepNumber: "1"},
    3: {page: CarPhotoUpload, stepText: "Driver Sign Up", stepNumber: "2"},
    4: {page: GovermentAndLicence, stepText: "Driver Sign Up", stepNumber: "3"},
    5: {page: CarRegComplete, stepText: "Driver Sign Up", stepNumber: "4"},
    6: {page: ProfilePicture, stepText: "Driver Sign Up", stepNumber: "4"},
    7: {page: ProfileData, stepText: "Driver Sign Up", stepNumber: "5"},
    8: {page: LocationAndDestination, stepText: "Driver Sign Up", stepNumber: "5"},
};

const DriverRegister = () => {
    const limit = _.keys(StepPageByNumber).length;
    const [step, setStep] = useState(1);
    const [isSubmit, setSubmit] = useState(false);
    const [startValidate, setStartValidate] = useState(false);

    const invalidFields = [];

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
            <OnboardingPanel step={stepNumber} name={stepText} progress={(100 / limit) * step} />
            <div className='container mh-min-screen'>
                <div className='d-flex justify-content-center mt-3 pt-8 pt-md-10 pt-xl-12'>
                    <div className='w-100 mxw-328px'>

                        <StepPage step={step} setStep={setStep} invalidFields={invalidFields} />

                        <div className='mt-6'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <button className='btn btn-secondary btn-bold btn-secondary__black text-uppercase' onClick={() => setStep(step - 1)} disabled={step === 1}>
                                    Back
                                </button>
                                <button className='btn btn-primary text-uppercase' disabled={isSubmit} onClick={() => {
                                    if (!isValid()) return false;

                                    setSubmit(true);
                                    step !== limit && setStep(step + 1);
                                    step === limit && dispatch(actions.saveDriverPreregData());
                                    setStartValidate(false);
                                }}>
                                    {step !== limit ? "Next" : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DriverRegister;
