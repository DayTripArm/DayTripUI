import React, {useEffect} from 'react';
import { IconCheckMarkFilled } from 'shared/components/Icons';
import {useSelector} from "react-redux";

const CarRegComplete = (props) => {

    const {driverData} = useSelector(state => state);
    const {profile={}} = driverData;
    const {setStep} = props;

    const {name} = profile;

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
            <h4 className='text__blue mb-4'>Great Progress, {name}!</h4>
            <p className='text__grey-dark'>Now let’s get some details abou your car so you can publish your listing.</p>
            <div className='d-flex align-items-center text-xs'>
                <IconCheckMarkFilled className='mr-2'/>
                Model, Number of Seats, What’s included and more
            </div>
            <div className='text-right mt-3'>
                <button className='btn btn-sm btn-secondary btn-bold' onClick={() => setStep(1)}>Change</button>
            </div>
            <hr className='border__top border__default mt-4 mb-5'/>
            <p className='text__blue'>STEP: 4</p>
            <p className='weight-600 mb-2'>Let’s fill in some data about you.</p>
            <p>Profile Picture, languages you speak etc.</p>
        </>
    );
};

export default CarRegComplete;
