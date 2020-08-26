import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Input from "./Input";
import SelectCustom from "./SelectCustom";
import MultiSelect from "./MultiSelect";
import actions from "../../actions";
import dateFormat from "date-format";
import _ from "lodash";

import {GET_DATE_YEARS, DAYS, MONTH_LIST, LANGUAGES} from "../../constants";
import Api from "../../Api";

const FormInputBox = (props) => {

    const dispatch = useDispatch();
    const {travelerData, driverData} = useSelector(state => state);

    const languageList = LANGUAGES.map(item => {return {label: item, value: item}});

    const [edit, setEdit] = useState(false);

    const [month, setMonth] = useState(props.name === "date_of_birth" && !_.isEmpty(props.value) ? new Date(props.value).getMonth() : "");
    const [day, setDay] = useState(props.name === "date_of_birth" && !_.isEmpty(props.value) ? new Date(props.value).getDate() : "");
    const [year, setYear] = useState(props.name === "date_of_birth" && !_.isEmpty(props.value) ? new Date(props.value).getFullYear() : "");

    const [languageValue, setLanguageValue] = useState(props.name === "languages" && props.value && _.reduce(props.value.split(","), (memo, val) => {
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

    const [field, setField] = useState({
        name: name,
        value: value
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

                languageValue && languageValue.map(item => langString += item.value + ",");
                val = langString.slice(0, -1);
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
        const monthList = MONTH_LIST.map((month, i) => {return {label: month, value: i}});
        const days      = DAYS.map(i => {return {label: i, value: i}});
        const yearList  = GET_DATE_YEARS().map(i => {return {label: i, value: i}});

        return (
            <>
                <SelectCustom
                    type='text'
                    name='month'
                    placeholder='Month'
                    onChange={e => setMonth(e.value)}
                    value={_.find(monthList, i => i.value === month)}
                    containerClass='mb-4'
                    options={monthList}
                />
                <div className='d-flex mxw-md-328px w-100 ml-md-4'>
                    <div className='flex-fill d-flex mb-5'>
                        <SelectCustom
                            type='text'
                            name='day'
                            placeholder='Day'
                            onChange={e => setDay(e.value)}
                            value={_.find(days, i => i.value === day)}
                            containerClass='field-flexible flex-fill mb-0'
                            options={days}
                        />
                    </div>
                    <div className='pl-4 flex-fill d-flex'>
                        <SelectCustom
                            type='text'
                            name='year'
                            placeholder='Year'
                            onChange={e => setYear(e.value)}
                            value={_.find(yearList,i => i.value === year)}
                            containerClass='field-flexible flex-fill mb-0'
                            options={yearList}
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

    return(
        <li className='border__bottom border__default pt-3 pb-4'>
            <div className='d-flex align-items-center justify-content-between mb-2'>
                <p className='mb-0 weight-700'>{label}</p>
                <button className='btn btn-sm btn-secondary' disabled={disabled} onClick={() => setEdit(!edit)}>{!edit ? "Edit" : "Cancel"}</button>
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
                                        name: name,
                                        value: e.value
                                    })}
                                    value={_.find(options, i => i.value === field.value)}
                                    options={options}
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
                                    placeholder='Search your city'
                                    loadOptions={loadOptions}
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
                                    placeholder="Tell us what language(s) do you speak"
                                    onChange={event => selectOnChange(event, "languages")}
                                    value={languageValue}
                                    options={languageList}
                                />
                            }
                        </div>
                        <button className='btn btn-primary text-uppercase btn-xs-block' onClick={() => handleSave()}>Save</button>
                    </div>
                    :
                    <p className='text__grey-dark mb-0'>{_.isEmpty(value) ? empty_message : value}</p>
            }
        </li>
    );
};

export default FormInputBox;
