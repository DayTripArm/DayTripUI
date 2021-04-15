import React, {useEffect} from 'react';
import { IconCheckMarkFilled } from 'shared/components/Icons';
import {useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';

const CarRegComplete = (props) => {
    const { t } = useTranslation();
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
            <h4 className='text__blue mb-4'>{t("driver_signup.step5.title1", {name: name})}!</h4>
            <p className='text__grey-dark'>{t("driver_signup.step5.title2")}</p>
            <div className='d-flex align-items-center text-xs'>
                <IconCheckMarkFilled className='mr-2'/>
                {t("driver_signup.step5.car_details")}
            </div>
            <div className='text-right mt-3'>
                <button className='btn btn-sm btn-secondary btn-bold' onClick={() => setStep(1)}>Change</button>
            </div>
            <hr className='border__top border__default mt-4 mb-5'/>
            <p className='text__blue'>{t("driver_signup.step_header")}: 4</p>
            <p className='weight-600 mb-2'>{t("driver_signup.step5.text1")}</p>
            <p>{t("driver_signup.step5.text2")}</p>
        </>
    );
};

export default CarRegComplete;
