import React, {useEffect} from 'react';
import FormDropZone from 'shared/components/FormDropZone';
import {useSelector} from "react-redux";

const ProfilePicture = () => {

    const {driverData} = useSelector(state => state);
    const {preregistered_info} = driverData;
    const {
        profile_photos=[],
    } = preregistered_info;


    useEffect(() => {
        document.documentElement.scrollTop = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h4 className='text__blue mt-6 mb-4'>Uplaod your Profile Picture</h4>
            <p className='text__grey-dark'>Photos help travelers imagine their future ride. You can start with one and add more after you publish.</p>
            <FormDropZone
                type="profile_photos"
                label="Upload Photos"
                photos={profile_photos}
            />
        </>
    );
};

export default ProfilePicture;
