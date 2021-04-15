import React from 'react';
import Breadcrumbs from 'shared/components/Breadcrumbs';
import FormInputBox from 'shared/components/FormInputBox';
import {useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import {GENDER_LIST} from "../../../../constants";
import _ from "lodash";
import FormDropZoneImageCrop from "shared/components/FormDropZoneImageCrop";

const Personal = () => {

    const {travelerData={}, driverData={}} = useSelector(state => state);
    const {profile={}} = !_.isEmpty(travelerData.profile) ? travelerData : driverData;
    const { t } = useTranslation();

    const routes = [
        {
            route: '/account',
            name: t("account_page.page_title"),
            isActive : false
        },
        {
            route: '/account/personal',
            name: t("account_page.personal_info_page.page_title"),
            isActive : true
        },
    ];
    const {
        name,
        gender,
        date_of_birth,
        email,
        phone,
        about,
        location,
        languages="",
        work,
        profile_photo
    } = profile;

    const genderList = GENDER_LIST.map(item => {return {label: t(`commons.gender.${item}`), value: item}});

    return (
        <div className='container'>
            <div className='col-xl-10 col-xxl-9 col-xxxl-8 m-auto p-0'>
                <Breadcrumbs routes={routes} className='mt-4 mb-5 mt-xl-5 mb-xl-6' />

                <h2 className='text__blue mb-6 mb-md-7'>{t("account_page.personal_info_page.page_title")}</h2>

                {/*picture upload*/}
                <FormDropZoneImageCrop
                    type="profile_photo"
                    label={t("commons.upload_box_title")}
                    profile_photo_src={profile_photo}
                />

                <hr className='border__top border__default my-0' />
                <ul className='no-list-style mb-0'>

                    <FormInputBox
                        type="input"
                        name="name"
                        label={t("account_page.personal_info_page.name")}
                        value={name}
                        placeholder={t("account_page.personal_info_page.name_pholder")}
                    />

                    <FormInputBox
                        type="select"
                        name="gender"
                        label={t("account_page.personal_info_page.gender")}
                        value={gender?.toLowerCase()}
                        options={genderList}
                        placeholder={t("commons.select_pholder")}
                        empty_message={t("account_page.personal_info_page.not_specified")}
                    />

                    <FormInputBox
                        type="date"
                        name="date_of_birth"
                        label={t("account_page.personal_info_page.birthday")}
                        value={date_of_birth}
                        empty_message={t("account_page.personal_info_page.not_specified")}
                    />

                    <FormInputBox
                        disabled={true}
                        type="input"
                        name="email"
                        label={t("account_page.personal_info_page.email")}
                        value={email}
                    />

                    <FormInputBox
                        type="input"
                        name="phone"
                        label={t("account_page.personal_info_page.phone")}
                        value={phone}
                        empty_message={t("account_page.personal_info_page.not_specified")}
                    />

                    <FormInputBox
                        type="input"
                        name="about"
                        label={t("account_page.personal_info_page.about_text")}
                        placeholder={t("account_page.personal_info_page.about_pholder")}
                        value={about}
                        empty_message={t("account_page.personal_info_page.not_specified")}
                    />

                    <FormInputBox
                        type="async"
                        name="location"
                        label={t("account_page.personal_info_page.residence_city_text")}
                        placeholder={t("account_page.personal_info_page.residence_city_pholder")}
                        value={location}
                        empty_message={t("account_page.personal_info_page.not_specified")}
                    />

                    <FormInputBox
                        type="multiSelect"
                        name="languages"
                        label={t("account_page.personal_info_page.lang_text")}
                        placeholder={t("account_page.personal_info_page.langs_pholder")}
                        value={languages}
                        empty_message={t("account_page.personal_info_page.not_specified")}
                    />

                    <FormInputBox
                        type="input"
                        name="work"
                        label={t("account_page.personal_info_page.occupation")}
                        placeholder=""
                        value={work}
                        empty_message={t("account_page.personal_info_page.not_specified")}
                    />
                </ul>
            </div>
        </div>
    );
};

export default Personal;
