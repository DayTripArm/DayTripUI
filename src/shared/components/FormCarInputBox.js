import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import FormPlusMinus from "./FormPlusMinus";
import Checkbox from "./Checkbox";
import MultiSelect from "./MultiSelect";
import actions from "../../actions";
import { useTranslation } from 'react-i18next';
import _ from "lodash";

const FormCarInputBox = (props) => {

    const dispatch = useDispatch();
    const {travelerData, driverData} = useSelector(state => state);
    const [edit, setEdit] = useState(false);
    const { t } = useTranslation();
    const {
        type,
        label,
        value,
        carOptions,
        options,
        setCarOptions,
        disabled=false,
        name,
        empty_message,
    } = props;

    const [destinationValue, setDestinationValue] = useState(name === "driver_destinations" && value && _.reduce(value.split(","), (memo, val) => {
        memo.push(_.find(options, dest => dest.value === Number(val)));

        return memo;
    }, []));


    const [field, setField] = useState({
        name: name,
        value: value
    });


    const handleSave = (e) => {
        const {profile:profileData} = !_.isEmpty(travelerData.profile) ? travelerData : driverData;
        const {id} = profileData;
        let data = {};
        let value = field.value;

        if (type === "car_options") {
            value = JSON.stringify(carOptions);
        } else if (type === "destinations") {

            let destString = "";

            destinationValue && destinationValue.map(item => destString += item.value + ",");
            value = destString.slice(0, -1);
        }

        data = {
            login_id: id,
            car_info: {
                [field.name]: value
            }
        };

        dispatch(actions.updateDriverInfosRequest(data));
        setEdit(!edit);
    };

    const selectOnChange = (value) => {
        setDestinationValue(value);
    };


    const renderCarOptions = () => {
        return (
            <>
                <div className='w-100 mxw-328px'>
                    <Checkbox
                        className='mb-4 w-100'
                        name='car_seat'
                        label={t("commons.car_options.car_seat")}
                        onChange={(e) => setCarOptions({
                            ...carOptions,
                            car_seat: e.target.checked
                        })}
                        value={carOptions['car_seat']}
                    />
                    <Checkbox
                        className='mb-4 w-100'
                        name='air_conditioning'
                        label={t("commons.car_options.air_conditioning")}
                        onChange={(e) => setCarOptions({
                            ...carOptions,
                            air_conditioning: e.target.checked
                        })}
                        value={carOptions['air_conditioning']}
                    />

                    <Checkbox
                        className='mb-4 w-100'
                        name='smoking_allowed'
                        label={t("commons.car_options.smoking_allowed")}
                        onChange={(e) => setCarOptions({
                            ...carOptions,
                            smoking_allowed: e.target.checked
                        })}
                        value={carOptions['smoking_allowed']}
                    />
                    <Checkbox
                        className='mb-4 w-100'
                        name='pets_allowed'
                        label={t("commons.car_options.pets_allowed")}
                        onChange={(e) => setCarOptions({
                            ...carOptions,
                            pets_allowed: e.target.checked
                        })}
                        value={carOptions['pets_allowed']}
                    />
                    <Checkbox
                        className='mb-4 w-100'
                        name='water'
                        label={t("commons.car_options.water")}
                        onChange={(e) => setCarOptions({
                            ...carOptions,
                            water: e.target.checked
                        })}
                        value={carOptions['water']}
                    />
                    <Checkbox
                        className='mb-4 w-100'
                        name='snacks'
                        label={t("commons.car_options.snacks")}
                        onChange={(e) => setCarOptions({
                            ...carOptions,
                            snacks: e.target.checked
                        })}
                        value={carOptions['snacks']}
                    />
                    <Checkbox
                        className='mb-4 w-100'
                        name='wifi'
                        label={t("commons.car_options.wifi")}
                        onChange={(e) => setCarOptions({
                            ...carOptions,
                            wifi: e.target.checked
                        })}
                        value={carOptions['wifi']}
                    />
                </div>
            </>
        );
    };

    return(
        <li className='border__bottom border__default pt-3 pb-4'>
            <div className='d-flex align-items-center justify-content-between mb-2'>
                <p className='mb-0 weight-700'>{label}</p>
                <button className='btn btn-sm btn-secondary' disabled={disabled} onClick={() => setEdit(!edit)}>{!edit ? t("commons.buttons.edit_btn") : t("commons.buttons.cancel_btn")}</button>
            </div>
            {
                edit ?
                    <div className='mt-4 mt-md-5'>
                        <div className='d-md-flex'>
                            {
                                type === "plus_minus" &&

                                <FormPlusMinus
                                    name={name}
                                    initialValue={field.value}
                                    max={9}
                                    min={2}
                                    onChange={(obj) => setField({
                                        name: obj.name,
                                        value: obj.value
                                    })}
                                />
                            }
                            {
                                type === "car_options" && renderCarOptions()
                            }
                            {
                                type === "destinations" &&
                                <MultiSelect
                                    isMulti={true}
                                    name={name}
                                    placeholder={t("driver_signup.step8.dest_pholder")}
                                    onChange={event => selectOnChange(event)}
                                    value={destinationValue}
                                    options={options}
                                />
                            }
                        </div>
                        <button className='btn btn-primary text-uppercase btn-xs-block' onClick={() => handleSave()}>{t("commons.buttons.save_btn")}</button>
                    </div>
                    :
                    <p className='text__grey-dark mb-0'>{_.includes(["car_options", "destinations"], type) || _.isEmpty(value) ? empty_message : value}</p>
            }
        </li>
    );
};

export default FormCarInputBox;
