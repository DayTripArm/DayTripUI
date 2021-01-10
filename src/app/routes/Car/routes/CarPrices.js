import React from 'react';
import FormCarInputBoxTariff from "../../../../shared/components/FormCarInputBoxTariff";
import FormCarHitTheRoadTariff from "../components/FormCarHitTheRoadTariff";
import {useSelector} from "react-redux";

const CarPrices = () => {
    const {driverData} = useSelector(state => state);
    const {driver_details={}, preregistered_info={}} = driverData;

    const {prices={}} = driver_details;
    const {tariff1, tariff2, hit_the_road_tariff} = prices;
    const {tips={}} = preregistered_info;
    const carTips = tips[3];

    return (
    <>
        <ul className='no-list-style mb-0'>
            <FormCarInputBoxTariff
                type="tariff"
                name={["tariff1", "tariff2"]}
                label={["Round-trips with up to 110 km", "Round-trips with over 110 km"]}
                placeholder="Choose"
                value={[tariff1, tariff2]}
                empty_message={"Not Specified"}
            />
        </ul>
        <ul className='no-list-style mb-0'>
            <FormCarHitTheRoadTariff
                name={"hit_the_road_tariff"}
                label={"Price for Hit The Road"}
                placeholder="Choose"
                value={hit_the_road_tariff && hit_the_road_tariff!=null? hit_the_road_tariff : ""}
                empty_message={"Not Specified"}
                carTips={carTips}
            />
        </ul>
    </>
    )
};

export default CarPrices;
