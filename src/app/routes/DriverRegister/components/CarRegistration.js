import React, {useEffect} from 'react';
import SelectCustom from 'shared/components/SelectCustom';
import {CAR_TYPE_LIST, CAR_YEAR_LIST, COLOR_LIST} from "../../../../constants";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import actions from "../../../../actions";

const CarRegistration = (props) => {
    const {invalidFields} = props;
    const { t } = useTranslation();
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

    const carTypeList = CAR_TYPE_LIST.map(item => {return {label: t(`commons.car_types.${item}`), value: t(`commons.car_types.${item}`)}});
    const yearList    = CAR_YEAR_LIST().map(item => {return {label: item, value: item}});
    const colorList   = COLOR_LIST.map(item => {return {label: t(`commons.colors.${item}`), value: t(`commons.colors.${item}`)}});
    const carBrands = car_mark_list.map(item => {return {label: item.brand_name, value: item.id}});
    const carModels = car_model_list.map(item => {return {label: item.car_model_name, value: item.id, brand_id: item.brand_id}});

    return(
        <>

            <h2 className='text__blue mb-6'>{t("driver_sigup.step1.title")}</h2>
            <p className='text__grey-dark'>{t("driver_sigup.step1.text")}</p>

            <h4 className='text__blue mb-6'>{t("driver_sigup.step1.page_title")}</h4>
            <SelectCustom
                type='text'
                name='car_type'
                onChange={(event, opt) => selectOnChange(event, opt.name)}
                label={t("driver_sigup.step1.car_type_label")}
                placeholder={t("commons.select_pholder")}
                value={_.find(carTypeList, i => i.value === car_type)}
                options={carTypeList}
                message={_.includes(invalidFields, "car_type") ? t("commons.error_msgs.required_field") : ""}
                isError={_.includes(invalidFields, "car_type")}
            />
            <SelectCustom
                type='text'
                name='car_mark'
                onChange={(event, opt) => selectOnChange(event, opt.name)}
                label={t("driver_sigup.step1.car_make_label")}
                placeholder={t("commons.select_pholder")}
                value={_.find(carBrands, i => i.value === car_mark)}
                options={carBrands}
                message={_.includes(invalidFields, "car_mark") ? t("commons.error_msgs.required_field") : ""}
                isError={_.includes(invalidFields, "car_mark")}
            />
            <SelectCustom
                type='text'
                name='car_model'
                onChange={(event, opt) => selectOnChange(event, opt.name)}
                label={t("driver_sigup.step1.car_model_label")}
                placeholder={t("commons.select_pholder")}
                value={_.find(carModels, i => i.value === car_model && i.brand_id === car_mark)}
                options={carModels}
                message={_.includes(invalidFields, "car_model") ? t("commons.error_msgs.required_field") : ""}
                isError={_.includes(invalidFields, "car_model")}
            />
            <SelectCustom
                type='text'
                options={yearList}
                onChange={(event, opt) => selectOnChange(event, opt.name)}
                name="car_year"
                value={_.find(yearList, i => i.value === car_year)}
                label={t("driver_sigup.step1.car_year_label")}
                placeholder={t("commons.select_pholder")}
                message={_.includes(invalidFields, "car_year") ? t("commons.error_msgs.required_field") : ""}
                isError={_.includes(invalidFields, "car_year")}
            />
            <SelectCustom
                type='text'
                options={colorList}
                onChange={(event, opt) => selectOnChange(event, opt.name)}
                name="car_color"
                value={_.find(colorList, i => i.value === car_color)}
                label={t("driver_sigup.step1.car_color_label")}
                placeholder={t("commons.select_pholder")}
                message={_.includes(invalidFields, "car_color") ? t("commons.error_msgs.required_field") : ""}
                isError={_.includes(invalidFields, "car_color")}
            />
        </>
    );
};

export default CarRegistration;
