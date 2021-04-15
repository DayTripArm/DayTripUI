import React, {useState} from 'react';
import {useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import _ from "lodash";
import FormCarInputBox from "../../../../shared/components/FormCarInputBox";

const CarDetails = () => {
    const {driverData} = useSelector(state => state);
    const {driver_details={}, preregistered_info={}} = driverData;
    const { t } = useTranslation();
    const {more_details={}} = driver_details;
    const {car_seats, car_specs="", driver_destinations=""} = more_details;

    const {destination_list=[]} = preregistered_info;

    const [carOptions, setCarOptions] = useState(typeof car_specs === "string" && !_.isEmpty(car_specs) ? JSON.parse(car_specs) : {});

    const destinationList = destination_list.map(item => {return {label: item.title, value: item.id}});

    const key_options = _.reduce(carOptions, (memo, val, key) => {
        if (memo.length === 0) memo = [];
        if (val) memo.push(t(`commons.car_options.${key}`));
        return memo;
    },[]);

    let destinationValue = [];
    let destinationMsg = "";
    driver_destinations.split(",").map(id => _.find(destinationList, dest => dest.value === Number(id)) && destinationValue.push(_.find(destinationList, dest => dest.value === Number(id))));

    destinationMsg = destinationValue && _.reduce(destinationValue, (memo, obj) => {
        memo += obj.label + ", ";
        return memo;
    }, "").slice(0, -2);


    return (
        <>
            <ul className='no-list-style mb-0'>
                <FormCarInputBox
                    type="plus_minus"
                    name="car_seats"
                    label={t("my_car_page.more_details.section1_title")}
                    placeholder={t("commons.select_pholder")}
                    value={car_seats}
                    empty_message={car_seats ? car_seats : t("my_car_page.car_details.not_specified")}
                />

                <FormCarInputBox
                    type="car_options"
                    name="car_specs"
                    label={t("my_car_page.more_details.section2_title")}
                    placeholder={t("commons.select_pholder")}
                    value={car_specs}
                    carOptions={carOptions}
                    setCarOptions={setCarOptions}
                    empty_message={(!_.isEmpty(key_options) && key_options.join(", ")) || t("my_car_page.car_details.not_specified")}
                />

                <FormCarInputBox
                    type="destinations"
                    name="driver_destinations"
                    label={t("my_car_page.more_details.section3_title")}
                    placeholder={t("commons.select_pholder")}
                    value={driver_destinations}
                    options={destinationList}
                    empty_message={destinationMsg || t("my_car_page.car_details.not_specified")}
                />
            </ul>
        </>
    )
};

export default CarDetails;
