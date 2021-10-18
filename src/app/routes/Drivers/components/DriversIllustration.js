import React from 'react';
import { IconArrowLeft } from 'shared/components/Icons';
import {HOST_URL} from "../../../../constants";
const DriversIllustration = ({ history, trip_details}) => {
    const trip_img = trip_details.images ? trip_details.images[0].url : trip_details.image.url
    const src = process.env.NODE_ENV === "development" ? HOST_URL + trip_img : trip_img;
    return (
        <div className='drivers-illustration box-overlay'>
            <img
                src={src}
                alt={trip_details.title}
                className='w-100 h-100 object-pos-center object-fit-cover'
            />
            <div className='overlay'>
                <div className='container pt-4 pt-xl-5'>
                    <button className='back-btn btn btn-circle border-0' onClick={() => history.goBack()}>
                        <IconArrowLeft />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DriversIllustration;
