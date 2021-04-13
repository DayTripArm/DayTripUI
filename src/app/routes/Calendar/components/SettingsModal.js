import React from 'react';
import ModalAside from 'shared/components/ModalAside';
import SelectCustom from 'shared/components/SelectCustom';
import {AVAILABILITY_WINDOW, DRIVER_NOTICE} from "../../../../constants";
import actions from "../../../../actions";
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import _ from "lodash";
import moment from "moment";

const SettingsModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const {driverData} = useSelector(state => state);

    const {profile, calendar_settings} = driverData;
    const {availability_window, advance_notice} = calendar_settings;
    const { t } = useTranslation();
    let setSettingsOptions = (event, opt) => {
        const field_name = opt.name;
        let settings_obj = {driver_id: profile.id};
        const availability_window =  event.value;
        settings_obj[field_name] = availability_window;
        let included_days = [];
        let dateuse  = moment();
        let endDate = moment().add(availability_window, 'months');

        if (availability_window !== 0) {
            while (dateuse.isSameOrBefore(endDate)) {
                included_days.push(dateuse.format('YYYY-MM-DD'));
                dateuse.add(1, 'days');
            }
        }

        settings_obj["available_days"] = {
            "included_days": included_days
        };

        dispatch(actions.updateCalendarSettingsRequest(profile.id, settings_obj));

    };
    const available_days = _.keys(AVAILABILITY_WINDOW).map(key => {return {label: t(`calendar_page.settings_slider.availability_opts.${key}`), value: AVAILABILITY_WINDOW[key]}});
    const advance_notices = DRIVER_NOTICE.map((value, key) => {return {label: t("calendar_page.settings_slider.notice_opts", {day: value}), value: key}});


    return (
        <>
            <ModalAside title={t("calendar_page.settings_slider.slider_title")} onClose={onClose}>
                <h4 className='text__blue'>{t("calendar_page.settings_slider.title")}</h4>
                <p className='weight-700'>{t("calendar_page.settings_slider.available_title")}</p>
                <SelectCustom
                    name='availability_window'
                    placeholder={t("calendar_page.settings_slider.availability_opts.all_unavialable")}
                    value={_.find(available_days, i => i.value === availability_window)}
                    options={available_days}
                    isSearchable={false}
                    onChange={(event, opt) => setSettingsOptions(event, opt)}
                />
                <p className='weight-700'>{t("calendar_page.settings_slider.notice_title")}</p>
                <SelectCustom
                    name='advance_notice'
                    placeholder={t("calendar_page.settings_slider.notice_opts.1_day")}
                    value={_.find(advance_notices, i => i.value === advance_notice)}
                    options={advance_notices}
                    isSearchable={false}
                    onChange={(event, opt) => setSettingsOptions(event, opt)}
                />
            </ModalAside>
        </>
    );
};

export default SettingsModal;
