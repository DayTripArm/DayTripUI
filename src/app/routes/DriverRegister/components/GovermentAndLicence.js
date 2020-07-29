import React, {useEffect} from 'react';
import FormDropZone from 'shared/components/FormDropZone';
import {useSelector} from "react-redux";

const GovermentAndLicense = () => {

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
            <h4 className='text__blue mb-4'>Add photos of Governmental ID</h4>
            <p className='text__grey-dark'>ID help travelers Take You Serious</p>

            <FormDropZone
                type="gov_photos"
                label="Upload Photos"
                photos={gov_photos}
            />

            <h4 className='text__blue mt-6 mb-4'>Add photos of Governmental ID</h4>
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
