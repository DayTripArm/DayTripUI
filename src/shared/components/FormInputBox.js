import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Input from "./Input";
import InfoModal from "./InfoModal";
import SelectCustom from "./SelectCustom";
import MultiSelect from "./MultiSelect";
import actions from "../../actions";
import dateFormat from "date-format";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import _ from "lodash";

import {GET_DATE_YEARS, DAYS, MONTH_LIST, LANGUAGES} from "../../constants";
import Api from "../../Api";

const FormInputBox = (props) => {

    let history = useHistory();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const {travelerData, driverData} = useSelector(state => state);

    const {validationList} = driverData; // for pop up and validation, car details page

    const languageList = LANGUAGES.map(item => {return {label: item, value: item}});

    const [edit, setEdit] = useState(false);

    const [month, setMonth] = useState(props.name === "date_of_birth" && !_.isEmpty(props.value) ? new Date(props.value).getMonth() : "");
    const [day, setDay] = useState(props.name === "date_of_birth" && !_.isEmpty(props.value) ? new Date(props.value).getDate() : "");
    const [year, setYear] = useState(props.name === "date_of_birth" && !_.isEmpty(props.value) ? new Date(props.value).getFullYear() : "");

    const [languageValue, setLanguageValue] = useState(props.name === "languages" && props.value && _.reduce(props.value.split(", "), (memo, val) => {
        memo.push(_.find(languageList, lang => lang.value === val.trim()));

        return memo;
    }, []));

    const {
        profile="personal",
        type,
        label,
        value,
        disabled=false,
        name,
        placeholder,
        options,
        empty_message,
    } = props;

    const [proceed, setProceed] = useState(false); // for pop up
    const [openInfoModal, setOpenInfoModal] = useState(false);

    const [field, setField] = useState({
        name: name,
        value: value,
        initialValue: value
    });

    const [location, setLocation] = useState(name === "location" && value && value.length ? {label: value.split("-")[0].trim()} : undefined);

    const handleSave = (e) => {
        const {profile:profileData} = !_.isEmpty(travelerData.profile) ? travelerData : driverData;
        const {id} = profileData;
        let data = {};

        if (type === "date") {
            let date_of_birth = new Date(year, month, day);
            let stringDate = dateFormat("MM/dd/yyyy", date_of_birth);
            data = {
                profile: profile,
                profile_info: {
                    [name]: stringDate
                }
            }
        } else if (_.includes(['car_type', 'car_mark', 'car_model', 'car_year', 'car_color'], name)) {

            if (name === "car_mark") {
                dispatch(actions.carModelRequest(field.value));
            }

            data = {
                login_id: id,
                car_info: {
                    [field.name]: field.value
                }
            };
        } else {
            let val = field.value;

            if (name === "languages") {
                let langString = "";

                languageValue && languageValue.map(item => langString += item.value + ", ");
                val = langString.slice(0, -2);
            }

            data = {
                profile: profile,
                profile_info: {
                    [field.name]: val
                }
            };
        }

        if (_.includes(['car_type', 'car_mark', 'car_model', 'car_year', 'car_color'], name)) {
            dispatch(actions.updateDriverInfosRequest(data));
        } else {
            dispatch(actions.updateProfileInfo(id, data));
        }

        setEdit(!edit);
    };

    const renderDateForm = () => {
        const monthList = MONTH_LIST.map((month, i) => {return {label: t(`commons.months.${month}`), value: i}});
        const days      = DAYS.map(i => {return {label: i, value: i}});
        const yearList  = GET_DATE_YEARS().map(i => {return {label: i, value: i}});

        return (
            <>
                <SelectCustom
                    type='text'
                    name='month'
                    placeholder={t("commons.month")}
                    onChange={e => setMonth(e.value)}
                    value={_.find(monthList, i => i.value === month)}
                    containerClass='mb-4'
                    options={monthList}
                    noOptionsMessage={t("commons.no_options")}
                />
                <div className='d-flex mxw-md-328px w-100 ml-md-4'>
                    <div className='flex-fill d-flex mb-5'>
                        <SelectCustom
                            type='text'
                            name='day'
                            placeholder={t("commons.day")}
                            onChange={e => setDay(e.value)}
                            value={_.find(days, i => i.value === day)}
                            containerClass='field-flexible flex-fill mb-0'
                            options={days}
                            noOptionsMessage={t("commons.no_options")}
                        />
                    </div>
                    <div className='pl-4 flex-fill d-flex'>
                        <SelectCustom
                            type='text'
                            name='year'
                            placeholder={t("commons.year")}
                            onChange={e => setYear(e.value)}
                            value={_.find(yearList,i => i.value === year)}
                            containerClass='field-flexible flex-fill mb-0'
                            options={yearList}
                            noOptionsMessage={t("commons.no_options")}
                        />
                    </div>
                </div>
            </>
        )
    };

    const selectOnChange = (value, name) => {
        if (name === "languages") {

            setLanguageValue(value);
        }
    };

    const loadOptions = (inputText, callback) => {
        setTimeout(async () => {
            const response = await Api.getCountryCities(inputText);

            callback(response.response.data.cities.slice(0, 100).map(item => { // limit data to 100
                return {
                    label: item.city,
                    value: item.id,
                    country: item.country
                }
            }));

        }, 500);
    };

    // this block only for car details pop up
    useEffect(() => {
        let once = localStorage.proceed_once;

        if (proceed && once === undefined) {
            handleSave();
            localStorage.setItem("proceed_once", "true");
            dispatch(actions.updateValidationList(name));
        }
    }, [proceed]);

    const box_label = localStorage.proceed_once === "true" && _.includes(validationList, name)
        ?
        <p className='mb-0 weight-700 text-danger'>{label}</p>
        :
        <p className='mb-0 weight-700'>{label}</p>;

    return (
        <>
        <li className='border__bottom border__default pt-3 pb-4'>
            <div className='d-flex align-items-center justify-content-between mb-2'>
                {box_label}
                <button className='btn btn-sm btn-secondary' disabled={disabled} onClick={() => {
                    setEdit(!edit);
                    if (!edit) {
                        setField({
                            ...field,
                            value: field.initialValue
                        });
                    }
                }}>{!edit ? t("commons.buttons.edit_btn") : t("commons.buttons.cancel_btn")}</button>
            </div>
            {
                edit ?
                    <div className='mt-4 mt-md-5'>
                        <div className='d-md-flex'>
                            {
                                type === "input" &&
                                <Input
                                    type='text'
                                    onChange={(e) => setField({
                                        initialValue: field.initialValue,
                                        name,
                                        value: e.target.value
                                    })}
                                    name={name}
                                    value={field.value}
                                    placeholder={placeholder}
                                />
                            }

                            {
                                type === "select" &&
                                <SelectCustom
                                    name={name}
                                    placeholder={placeholder}
                                    onChange={e => setField({
                                        initialValue: field.initialValue,
                                        name: name,
                                        value: e.value
                                    })}
                                    value={_.find(options, i => i.value === field.value)}
                                    options={options}
                                    noOptionsMessage={t("commons.no_options")}
                                />
                            }
                            {
                                type === "async" &&
                                <SelectCustom
                                    async={true}
                                    type='text'
                                    name={name}
                                    onChange={e => {
                                        setLocation({label: e.label});
                                        setField({
                                            name,
                                            value: e.label + " - " + e.country
                                        })
                                    }}
                                    value={location}
                                    placeholder={t("driver_signup.step8.residence_pholder")}
                                    loadOptions={loadOptions}
                                    noOptionsMessage={t("commons.no_options")}
                                />
                            }
                            {
                                type === "date" && renderDateForm()
                            }
                            {
                                type === "multiSelect" &&
                                <MultiSelect
                                    isMulti={true}
                                    name='languages'
                                    placeholder={t("driver_signup.step7.langs_pholder")}
                                    onChange={event => selectOnChange(event, "languages")}
                                    value={languageValue}
                                    options={languageList}
                                />
                            }
                        </div>
                        <button className='btn btn-primary text-uppercase btn-xs-block' onClick={() => {
                            if (history.location.pathname === "/car/view") { // only for car details pop up
                                let once = localStorage.proceed_once;

                                if (once === undefined && name !== "car_year") {
                                    setOpenInfoModal(true);
                                    window.location.hash = "modal"
                                } else {
                                    handleSave();
                                    dispatch(actions.updateValidationList(name));
                                }
                            } else {
                                handleSave();
                            }


                        }}>{t("commons.buttons.save_btn")}</button>
                    </div>
                    :
                    <p className='text__grey-dark mb-0'>{_.isEmpty(value) ? empty_message : _.includes(['car_type', 'car_color'], name)? t(`commons.${name}.${value}`) : value}</p>
            }
        </li>
        { openInfoModal && <InfoModal title={t("my_car_page.car_details.change_profile_title")} onProceed={() => setProceed(true)} onClose={() => {
            setOpenInfoModal(false);
            setEdit(false);
            if (type === "select") { // set initial value after click cancel button in pop up
                setField({
                    ...field,
                    value: field.initialValue
                });
            }
        }} /> }
    </>
    );
};

export default FormInputBox;
