import React from 'react';
import FormCarInputBoxTariff from "../../../../shared/components/FormCarInputBoxTariff";
import {useSelector} from "react-redux";

const CarPrices = () => {
    const {driverData} = useSelector(state => state);
    const {driver_details={}} = driverData;

    const {prices={}} = driver_details;
    const {tariff1, tariff2} = prices;

    return (

        <ul className='no-list-style mb-0'>
            <FormCarInputBoxTariff
                type="tariff"
                name={["tariff1", "tariff2"]}
                label={["Price per 1 km for round-trips with up to 110 km", "Price per 1 km for round-trips with over 110 km"]}
                placeholder="Choose"
                value={[tariff1, tariff2]}
                empty_message={"Not Specified"}
            />
        </ul>
    )
};

export default CarPrices;
