import React from 'react';
import FormCarInputBoxTariff from "../../../../shared/components/FormCarInputBoxTariff";
import FormCarHitTheRoadTariff from "../components/FormCarHitTheRoadTariff";
import { useTranslation } from 'react-i18next';
import {useSelector} from "react-redux";

const CarPrices = () => {
    const {driverData} = useSelector(state => state);
    const {driver_details={}, preregistered_info={}} = driverData;
    const { t } = useTranslation();
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
                label={[t("my_car_page.tarrifs.short_trip_text"), t("my_car_page.tarrifs.long_trip_text")]}
                placeholder={t("commons.select_pholder")}
                value={[tariff1, tariff2]}
                empty_message={t("my_car_page.car_details.not_specified")}
            />
        </ul>
        <ul className='no-list-style mb-0'>
            <FormCarHitTheRoadTariff
                name={"hit_the_road_tariff"}
                label={t("my_car_page.tarrifs.full_day_title")}
                placeholder={t("commons.select_pholder")}
                value={hit_the_road_tariff && hit_the_road_tariff!=null? hit_the_road_tariff : ""}
                empty_message={t("my_car_page.car_details.not_specified")}
                carTips={carTips}
            />
        </ul>
    </>
    )
};

export default CarPrices;
