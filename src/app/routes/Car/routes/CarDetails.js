import React, {useState} from 'react';
import {useSelector} from "react-redux";
import _ from "lodash";
import FormCarInputBox from "../../../../shared/components/FormCarInputBox";
import {CAR_SPECS} from "../../../../constants";

const CarDetails = () => {
    const {driverData} = useSelector(state => state);
    const {driver_details={}, preregistered_info={}} = driverData;

    const {more_details={}} = driver_details;
    const {car_seats, car_specs="", driver_destinations=""} = more_details;

    const {destination_list=[]} = preregistered_info;

    const [carOptions, setCarOptions] = useState(typeof car_specs === "string" && !_.isEmpty(car_specs) ? JSON.parse(car_specs) : {});

    const destinationList = destination_list.map(item => {return {label: item.title, value: item.id}});

    const key_options = _.reduce(carOptions, (memo, val, key) => {
        if (memo.length === 0) memo = [];
        if (val) memo.push(CAR_SPECS[key]);
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
                    label="How Many Travelers can fit in Your car?"
                    placeholder="Choose"
                    value={car_seats}
                    empty_message={car_seats ? car_seats : "Not Specified"}
                />

                <FormCarInputBox
                    type="car_options"
                    name="car_specs"
                    label="Tell us what you have in the car"
                    placeholder="Choose"
                    value={car_specs}
                    carOptions={carOptions}
                    setCarOptions={setCarOptions}
                    empty_message={(!_.isEmpty(key_options) && key_options.join(", ")) || "Not Specified"}
                />

                <FormCarInputBox
                    type="destinations"
                    name="driver_destinations"
                    label="Selected Destinations"
                    placeholder="Choose"
                    value={driver_destinations}
                    options={destinationList}
                    empty_message={destinationMsg || "Not Specified"}
                />
            </ul>
        </>
    )
};

export default CarDetails;
