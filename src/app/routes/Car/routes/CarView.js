import React from 'react';
import FormDropZoneInlineText from "../../../../shared/components/FormDropZoneInlineText";
import FormInputBox from "../../../../shared/components/FormInputBox";
import FormCarInputBoxPicture from "../../../../shared/components/FormCarInputBoxPicture";
import {useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import {CAR_TYPE_LIST, CAR_YEAR_LIST, COLOR_LIST, HOST_URL} from "../../../../constants";
import _ from "lodash";

const CarView = () => {
    const {driverData} = useSelector(state => state);
    const {driver_details={}, preregistered_info={}} = driverData;
    const { t } = useTranslation();
    const {car_details={}} = driver_details;
    const {car_photos=[], reg_card_photos=[], license_photos=[], car_info={}, gov_photos=[]} = car_details;

    const {
        car_type,
        car_mark,
        car_model,
        car_year,
        car_color
    } = car_info;

    const {
        car_mark_list=[],
        car_model_list=[],
    } = preregistered_info;

    const carPhotos = car_photos.map(photo => {
        const src = process.env.NODE_ENV === "development"
            ? HOST_URL + photo.full_path
            : photo.full_path;

        return (
            {
                ...photo,
                preview: src
            }
        );
    });

    const carTypeList = CAR_TYPE_LIST.map(item => {return {label: t(`commons.car_type.${item}`), value: item}});
    const yearList    = CAR_YEAR_LIST().map(item => {return {label: item, value: item}});
    const colorList   = COLOR_LIST.map(item => {return {label: t(`commons.car_color.${item}`), value: item}});
    const carBrands = car_mark_list.map(item => {return {label: item.brand_name, value: item.id}});
    const carModels = car_model_list.map(item => {return {label: item.car_model_name, value: item.id, brand_id: item.brand_id}});


    return (
        <>
            <FormDropZoneInlineText
                type="car_photos"
                label={t("commons.upload_box_title")}
                photos={carPhotos}
            />


            <hr className='border__top border__default mt-0 mb-4' />
            <ul className='no-list-style mb-0'>
                <FormInputBox
                    type="select"
                    name="car_type"
                    label={t("my_car_page.car_details.car_type")}
                    placeholder={t("my_car_page.car_details.not_specified")}
                    value={car_type?.toLowerCase()}
                    options={carTypeList}
                    empty_message="Not Specified"
                />

                <FormInputBox
                    type="select"
                    name="car_mark"
                    label={t("my_car_page.car_details.car_make")}
                    placeholder={t("commons.select_pholder")}
                    value={Number(car_mark)}
                    options={carBrands}
                    empty_message={!_.isEmpty(carBrands) && car_mark && (_.find(carBrands, item => item.value === Number(car_mark)).label || t("my_car_page.car_details.not_specified"))}
                />

                <FormInputBox
                    type="select"
                    name="car_model"
                    label={t("my_car_page.car_details.car_model")}
                    placeholder={t("commons.select_pholder")}
                    value={Number(car_model)}
                    options={carModels}
                    empty_message={!_.isEmpty(carModels) && ((_.find(carModels, item => item.value === Number(car_model)) && _.find(carModels, item => item.value === Number(car_model)).label) || t("my_car_page.car_details.not_specified"))}
                />

                <FormInputBox
                    type="select"
                    name="car_year"
                    label={t("my_car_page.car_details.year")}
                    placeholder={t("commons.select_pholder")}
                    value={Number(car_year)}
                    options={yearList}
                    empty_message={!_.isEmpty(yearList) && car_year && (_.find(yearList, item => item.value === Number(car_year)).label || t("my_car_page.car_details.not_specified"))}
                />

                <FormInputBox
                    type="select"
                    name="car_color"
                    label={t("my_car_page.car_details.color")}
                    placeholder={t("commons.select_pholder")}
                    value={car_color?.toLowerCase()}
                    options={colorList}
                    empty_message={!_.isEmpty(colorList) && car_color && (_.find(colorList, item => item.value === car_color)?.label || "Not Specified")}
                />

                <FormCarInputBoxPicture
                    type="photos"
                    name="license_photos"
                    label={t("my_car_page.car_details.driving_license")}
                    options={license_photos}
                    empty_message={license_photos.length > 0 ? t("my_car_page.car_details.input_text") : t("my_car_page.car_details.not_specified")}
                />

                <FormCarInputBoxPicture
                    type="photos"
                    name="reg_card_photos"
                    label={t("my_car_page.car_details.registration_card")}
                    options={reg_card_photos}
                    empty_message={reg_card_photos.length > 0 ? t("my_car_page.car_details.input_text") : t("my_car_page.car_details.not_specified")}
                />

                <FormCarInputBoxPicture
                    type="photos"
                    name="gov_photos"
                    label={t("my_car_page.car_details.gov_id")}
                    options={gov_photos}
                    empty_message={gov_photos.length > 0 ? t("my_car_page.car_details.input_text") : t("my_car_page.car_details.not_specified")}
                />

            </ul>
        </>
    );
};

export default CarView;
