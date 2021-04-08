import React, {useEffect} from 'react';
import FormDropZone from 'shared/components/FormDropZone';
import {useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import _ from "lodash";


const GovermentAndLicense = (props) => {

    const {invalidFields} = props;
    const { t } = useTranslation();
    const {driverData} = useSelector(state => state);
    const {preregistered_info} = driverData;
    const {
        gov_photos=[],
        license_photos=[],
        reg_card_photos=[]
    } = preregistered_info;
    const gov_title = t("driver_sigup.step4.title1");
    const license_title = t("driver_sigup.step4.title2");
    const reg_card_title = t("driver_sigup.step4.title3");

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
            <h4 className='text__blue mb-4'>
                <span className={_.includes(invalidFields, "gov_photos") ? "text-danger" : ""}>{_.includes(invalidFields, "gov_photos") ? gov_title + " *" : gov_title}</span>
            </h4>
            <p className='text__grey-dark'>{t("driver_sigup.step4.text1")}</p>

            <FormDropZone
                type="gov_photos"
                label={t("commons.upload_box_title")}
                photos={gov_photos}
            />

            <h4 className='text__blue mt-6 mb-4'>
                <span className={_.includes(invalidFields, "license_photos") ? "text-danger" : ""}>{_.includes(invalidFields, "license_photos") ? license_title + " *" : license_title}</span>
            </h4>
            <p className='text__grey-dark'>{t("driver_sigup.step4.text2")}</p>

            <FormDropZone
                type="license_photos"
                label={t("commons.upload_box_title")}
                photos={license_photos}
            />

            <h4 className='text__blue mt-6 mb-4'>
                <span className={_.includes(invalidFields, "reg_card_photos") ? "text-danger" : ""}>{_.includes(invalidFields, "reg_card_photos") ? reg_card_title + " *" : reg_card_title}</span>
            </h4>
            <p className='text__grey-dark'>{t("driver_sigup.step4.text3")}</p>

            <FormDropZone
                type="reg_card_photos"
                label={t("commons.upload_box_title")}
                photos={reg_card_photos}
            />
        </>
    );
};

export default GovermentAndLicense;
