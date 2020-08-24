import React, {useState} from 'react';
import {useSelector} from "react-redux";
import _ from "lodash";
import FormCarInputBox from "../../../../shared/components/FormCarInputBox";

const CarDetails = () => {
    const {driverData} = useSelector(state => state);
    const {driver_details={}} = driverData;

    const {more_details={}} = driver_details;
    const {car_seats, car_specs=""} = more_details;

    const [carOptions, setCarOptions] = useState(typeof car_specs === "string" && !_.isEmpty(car_specs) ? JSON.parse(car_specs) : {});

    const key_options = _.reduce(carOptions, (memo, val, key) => {
        if (memo.length === 0) memo = [];
        if (val) memo.push(key);
        return memo;
    },[]);

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
            </ul>

            <div className='d-flex align-items-start justify-content-between mb-2'>
                <p className='weight-700 mb-0'>Selected Destinations</p>
                <button className='btn btn-secondary btn-sm'>Edit</button>
            </div>
            <p className='text__grey-dark'>Garni, Dilijan, Alaverdi</p>
            <hr className='border__top border__default mt-4 mb-0'/>
        </>
    )
};

export default CarDetails;
