import React, {useEffect} from 'react';
import FormDropZone from 'shared/components/FormDropZone';
import {useSelector} from "react-redux";
import _ from "lodash";


const gov_title = "Add photos of Governmental ID";
const license_title = "Add your Driving License";

const GovermentAndLicense = (props) => {

    const {invalidFields} = props;

    console.log(" filed ", invalidFields);

    const {driverData} = useSelector(state => state);
    const {preregistered_info} = driverData;
    const {
        gov_photos=[],
        license_photos=[],
    } = preregistered_info;


    useEffect(() => {
        document.documentElement.scrollTop = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
            <h4 className='text__blue mb-4'>
                <span className={_.includes(invalidFields, "gov_photos") ? "text-danger" : ""}>{_.includes(invalidFields, "gov_photos") ? gov_title + " *" : gov_title}</span>
            </h4>
            <p className='text__grey-dark'>ID help travelers Take You Serious</p>

            <FormDropZone
                type="gov_photos"
                label="Upload Photos"
                photos={gov_photos}
            />

            <h4 className='text__blue mt-6 mb-4'>
                <span className={_.includes(invalidFields, "license_photos") ? "text-danger" : ""}>{_.includes(invalidFields, "license_photos") ? license_title + " *" : license_title}</span>
            </h4>
            <p className='text__grey-dark'>Photos help travelers imagine their future ride. You can start with one and add more after you publish.</p>

            <FormDropZone
                type="license_photos"
                label="Upload Photos"
                photos={license_photos}
            />
        </>
    );
};

export default GovermentAndLicense;
