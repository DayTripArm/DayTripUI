import React, {useEffect} from 'react';
import SelectCustom from 'shared/components/SelectCustom';
import {CAR_TYPE_LIST, CAR_YEAR_LIST, COLOR_LIST} from "../../../../constants";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../../actions";

const CarRegistration = (props) => {
    const {invalidFields} = props;

    const dispatch = useDispatch();
    const {driverData} = useSelector(state => state);
    const {preregistered_info} = driverData;

    const {
        car_type,
        car_mark,
        car_mark_list,
        car_model_list,
        car_model,
        car_year,
        car_color
    } = preregistered_info || {};

    // after component render get once car marks
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        dispatch(actions.carMarkRequest());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectOnChange = (event, name) => {
        dispatch(actions.setPreregisteredDriverProperty(name, event.value));

        if (name === "car_mark") {
            dispatch(actions.carModelRequest(event.value));
        }
    };

    const carTypeList = CAR_TYPE_LIST.map(item => {return {label: item, value: item}});
    const yearList    = CAR_YEAR_LIST().map(item => {return {label: item, value: item}});
    const colorList   = COLOR_LIST.map(item => {return {label: item, value: item}});
    const carBrands = car_mark_list.map(item => {return {label: item.brand_name, value: item.id}});
    const carModels = car_model_list.map(item => {return {label: item.car_model_name, value: item.id, brand_id: item.brand_id}});

    return(
        <>
            <h4 className='text__blue mb-6'>What kind of car are you driving</h4>
            <SelectCustom
                type='text'
                name='car_type'
                onChange={(event, opt) => selectOnChange(event, opt.name)}
                label='What is Your Car type?'
                placeholder='Choose'
                value={_.find(carTypeList, i => i.value === car_type)}
                options={carTypeList}
                message={_.includes(invalidFields, "car_type") ? "This field is mandatory" : ""}
                isError={_.includes(invalidFields, "car_type")}
            />
            <SelectCustom
                type='text'
                name='car_mark'
                onChange={(event, opt) => selectOnChange(event, opt.name)}
                label='What is Your Car Mark?'
                placeholder='Choose'
                value={_.find(carBrands, i => i.value === car_mark)}
                options={carBrands}
                message={_.includes(invalidFields, "car_mark") ? "This field is mandatory" : ""}
                isError={_.includes(invalidFields, "car_mark")}
            />
            <SelectCustom
                type='text'
                name='car_model'
                onChange={(event, opt) => selectOnChange(event, opt.name)}
                label='What is Your Car model?'
                placeholder='Choose'
                value={_.find(carModels, i => i.value === car_model && i.brand_id === car_mark)}
                options={carModels}
                message={_.includes(invalidFields, "car_model") ? "This field is mandatory" : ""}
                isError={_.includes(invalidFields, "car_model")}
            />
            <SelectCustom
                type='text'
                options={yearList}
                onChange={(event, opt) => selectOnChange(event, opt.name)}
                name="car_year"
                value={_.find(yearList, i => i.value === car_year)}
                placeholder="Choose"
                label="Year"
                message={_.includes(invalidFields, "car_year") ? "This field is mandatory" : ""}
                isError={_.includes(invalidFields, "car_year")}
            />
            <SelectCustom
                type='text'
                options={colorList}
                onChange={(event, opt) => selectOnChange(event, opt.name)}
                name="car_color"
                value={_.find(colorList, i => i.value === car_color)}
                placeholder="Choose"
                label="Color"
                message={_.includes(invalidFields, "car_color") ? "This field is mandatory" : ""}
                isError={_.includes(invalidFields, "car_color")}
            />
        </>
    );
};

export default CarRegistration;
