import React from 'react';
import Breadcrumbs from 'shared/components/Breadcrumbs';
import FormInputBox from 'shared/components/FormInputBox';
import { IconUser } from 'shared/components/Icons';
import {useSelector} from "react-redux";
import {GENDER_LIST} from "../../../../constants";
import _ from "lodash";

const routes = [
    {
        route: '/account',
        name: 'Account',
    },
    {
        route: '/account/personal',
        name: 'Personal',
    },
];

const Personal = () => {

    const {travelerData={}, driverData={}} = useSelector(state => state);
    const {profile={}} = !_.isEmpty(travelerData.profile) ? travelerData : driverData;

    const {
        name,
        gender,
        date_of_birth,
        email,
        phone,
        about,
        location,
        languages="",
        work
    } = profile;

    const genderList = GENDER_LIST.map(item => {return {label: item, value: item}});

    return (
        <div className='container'>
            <div className='col-xl-10 col-xxl-9 col-xxxl-8 m-auto p-0'>
                <Breadcrumbs routes={routes} className='mt-4 mb-5 mt-xl-5 mb-xl-6' />

                <h2 className='text__blue mb-6 mb-md-7'>Personal Info</h2>

                {/*picture upload*/}
                <div className='d-flex flex-column align-items-center mb-5'>
                    <IconUser width='72' height='72' fill='#757575' className='mb-4 op-5' />
                    <label htmlFor='file' className='btn btn-sm text__grey-dark mb-0'>Upload</label>
                    <input id='file' type='file' className='d-none' />
                </div>

                <hr className='border__top border__default my-0' />
                <ul className='no-list-style mb-0'>

                    <FormInputBox
                        type="input"
                        name="name"
                        label="User Name"
                        value={name}
                        placeholder="John Doe"
                    />

                    <FormInputBox
                        type="select"
                        name="gender"
                        label="Gender"
                        value={gender}
                        options={genderList}
                        placeholder="Choose"
                        empty_message="Not Specified"
                    />

                    <FormInputBox
                        type="date"
                        name="date_of_birth"
                        label="Date of Birth"
                        value={date_of_birth}
                        empty_message="Not Specified"
                    />

                    <FormInputBox
                        disabled={true}
                        type="input"
                        name="email"
                        label="Email Address"
                        value={email}
                    />

                    <FormInputBox
                        type="input"
                        name="phone"
                        label="Phone Number"
                        value={phone}
                        empty_message="Not Specified"
                    />

                    <FormInputBox
                        type="input"
                        name="about"
                        label="About"
                        value={about}
                        empty_message="Not Written"
                    />

                    <FormInputBox
                        type="async"
                        name="location"
                        label="Location"
                        placeholder="Yerevan, Armenia"
                        value={location}
                        empty_message="Not Written"
                    />

                    <FormInputBox
                        type="multiSelect"
                        name="languages"
                        label="Languages/Speaks"
                        placeholder="English, Russian, French"
                        value={languages}
                        empty_message="Not Written"
                    />

                    <FormInputBox
                        type="input"
                        name="work"
                        label="Work"
                        placeholder=""
                        value={work}
                        empty_message="Not Written"
                    />
                </ul>
            </div>
        </div>
    );
};

export default Personal;
