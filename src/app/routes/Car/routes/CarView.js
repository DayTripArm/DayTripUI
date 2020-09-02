import React from 'react';
import FormDropZoneInlineText from "../../../../shared/components/FormDropZoneInlineText";
import FormInputBox from "../../../../shared/components/FormInputBox";
import FormCarInputBoxPicture from "../../../../shared/components/FormCarInputBoxPicture";
import {useSelector} from "react-redux";
import {CAR_TYPE_LIST, CAR_YEAR_LIST, COLOR_LIST} from "../../../../constants";
import _ from "lodash";

const CarView = () => {
    const {driverData} = useSelector(state => state);
    const {driver_details={}, preregistered_info={}} = driverData;

    const {car_details={}} = driver_details;
    const {car_photos=[], reg_card_photos=[], license_photos=[], car_info={}} = car_details;

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
            ? "http://localhost:3000/" + photo.full_path
            : photo.full_path;

        return (
            {
                ...photo,
                preview: src
            }
        );
    });

    const carTypeList = CAR_TYPE_LIST.map(item => {return {label: item, value: item}});
    const yearList    = CAR_YEAR_LIST().map(item => {return {label: item, value: item}});
    const colorList   = COLOR_LIST.map(item => {return {label: item, value: item}});
    const carBrands = car_mark_list.map(item => {return {label: item.brand_name, value: item.id}});
    const carModels = car_model_list.map(item => {return {label: item.car_model_name, value: item.id, brand_id: item.brand_id}});


    return (
        <>
            <FormDropZoneInlineText
                type="car_photos"
                label="Upload Photos"
                photos={carPhotos}
            />


            <hr className='border__top border__default mt-0 mb-4' />
            <ul className='no-list-style mb-0'>
                <FormInputBox
                    type="select"
                    name="car_type"
                    label="What is Your Car Type?"
                    placeholder="Choose"
                    value={car_type}
                    options={carTypeList}
                    empty_message="Not Specified"
                />

                <FormInputBox
                    type="select"
                    name="car_mark"
                    label="What is Your Car Mark?"
                    placeholder="Choose"
                    value={Number(car_mark)}
                    options={carBrands}
                    empty_message={!_.isEmpty(carBrands) && car_mark && (_.find(carBrands, item => item.value === Number(car_mark)).label || "Not Specified")}
                />

                <FormInputBox
                    type="select"
                    name="car_model"
                    label="What is Your Car Model?"
                    placeholder="Choose"
                    value={Number(car_model)}
                    options={carModels}
                    empty_message={!_.isEmpty(carModels) && ((_.find(carModels, item => item.value === Number(car_model)) && _.find(carModels, item => item.value === Number(car_model)).label) || "Not Specified")}
                />

                <FormInputBox
                    type="select"
                    name="car_year"
                    label="Year"
                    placeholder="Choose"
                    value={Number(car_year)}
                    options={yearList}
                    empty_message={!_.isEmpty(yearList) && car_year && (_.find(yearList, item => item.value === Number(car_year)).label || "Not Specified")}
                />

                <FormInputBox
                    type="select"
                    name="car_color"
                    label="Color"
                    placeholder="Choose"
                    value={car_color}
                    options={colorList}
                    empty_message={!_.isEmpty(colorList) && car_color && (_.find(colorList, item => item.value === car_color).label || "Not Specified")}
                />

                <FormCarInputBoxPicture
                    type="photos"
                    name="license_photos"
                    label="Driving License"
                    options={license_photos}
                    empty_message={license_photos.length > 0 ? "Provided" : "Not Specified"}
                />

                <FormCarInputBoxPicture
                    type="photos"
                    name="reg_card_photos"
                    label="Technical ID"
                    options={reg_card_photos}
                    empty_message={reg_card_photos.length > 0 ? "Provided" : "Not Specified"}
                />

            </ul>
        </>
    );
};

export default CarView;
