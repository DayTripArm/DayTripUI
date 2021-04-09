import React, {useEffect} from 'react';
import FormDropZone from 'shared/components/FormDropZone';
import {useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import _ from "lodash";

const ProfilePicture = (props) => {

    const {invalidFields} = props;
    const { t } = useTranslation();
    const {driverData} = useSelector(state => state);
    const {preregistered_info} = driverData;
    const profile_title = t("driver_sigup.step6.page_title");
    const {
        profile_photos=[],
    } = preregistered_info;


    useEffect(() => {
        document.documentElement.scrollTop = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h4 className='text__blue mt-6 mb-4'>
                <span className={_.includes(invalidFields, "profile_photos") ? "text-danger" : ""}>{_.includes(invalidFields, "profile_photos") ? profile_title + " *" : profile_title}</span>
            </h4>
            <p className='text__grey-dark'>{t("driver_sigup.step6.text1")}</p>
            <FormDropZone
                type="profile_photos"
                label={t("commons.upload_box_title")}
                photos={profile_photos}
            />
        </>
    );
};

export default ProfilePicture;
