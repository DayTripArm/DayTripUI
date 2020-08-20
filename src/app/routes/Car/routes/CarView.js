import React from 'react';
import FormDropZoneInlineText from "../../../../shared/components/FormDropZoneInlineText";
import FormInputBox from "../../../../shared/components/FormInputBox";
import {useSelector} from "react-redux";
import {CAR_TYPE_LIST} from "../../../../constants";
import _ from "lodash";
// import actions from "../../../../actions";

const CarView = () => {
    // const dispatch = useDispatch();
    const {driverData} = useSelector(state => state);
    const {driver_details={}, preregistered_info={}} = driverData;

    const {car_details={}} = driver_details;
    const {car_photos=[], car_info={}} = car_details;

    const {
        car_type,
        car_mark,
        // car_model,
        // car_year,
        // car_color
    } = car_info;

    const {
        car_mark_list=[],
        // car_model_list=[],
    } = preregistered_info;

    // const selectOnChange = (event, name) => {
    //     dispatch(actions.setPreregisteredDriverProperty(name, event.value));
    //
    //     if (name === "car_mark") {
    //         dispatch(actions.carModelRequest(event.value));
    //     }
    // };

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
    // const yearList    = CAR_YEAR_LIST().map(item => {return {label: item, value: item}});
    // const colorList   = COLOR_LIST.map(item => {return {label: item, value: item}});
    const carBrands = car_mark_list.map(item => {return {label: item.brand_name, value: item.id}});
    // const carModels = car_model_list.map(item => {return {label: item.car_model_name, value: item.id, brand_id: item.brand_id}});


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
            </ul>


            <div className='mb-2 d-flex justify-content-between'>
                <p className='weight-700 mb-0'>What is Your Car Model?</p>
                <button className='btn btn-secondary btn-sm'>Edit</button>
            </div>
            <p className='mb-0 text__grey-dark'>Corvette</p>
            <hr className='border__top border__default my-4' />
            <div className='mb-2 d-flex justify-content-between'>
                <p className='weight-700 mb-0'>Year</p>
                <button className='btn btn-secondary btn-sm'>Edit</button>
            </div>
            <p className='mb-0 text__grey-dark'>2020</p>
            <hr className='border__top border__default my-4' />
            <div className='mb-2 d-flex justify-content-between'>
                <p className='weight-700 mb-0'>Color</p>
                <button className='btn btn-secondary btn-sm'>Edit</button>
            </div>
            <p className='mb-0 text__grey-dark'>Red</p>
            <hr className='border__top border__default mt-4 mb-0' />
        </>
    );
};

export default CarView;
