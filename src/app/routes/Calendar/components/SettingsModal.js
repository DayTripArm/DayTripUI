import React from 'react';
import ModalAside from 'shared/components/ModalAside';
import SelectCustom from 'shared/components/SelectCustom';
import {AVAILABILITY_WINDOW, DRIVER_NOTICE} from "../../../../constants";
import actions from "../../../../actions";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";

const SettingsModal = ({ onClose, title = 'Settings' }) => {
    const dispatch = useDispatch();
    const {driverData} = useSelector(state => state);

    const {profile, calendar_settings} = driverData;
    const {availability_window, advance_notice} = calendar_settings;

    let setSettingsOptions = (event, opt) => {
        const field_name = opt.name;
        let settings_obj = {driver_id: profile.id};
        settings_obj[field_name] = event.value;
        dispatch(actions.updateCalendarSettingsRequest(profile.id, settings_obj));

    };
    const available_days = AVAILABILITY_WINDOW.map((value, key) => {return {label: value, value: key}});
    const advance_notices = DRIVER_NOTICE.map((value, key) => {return {label: "At least " + value + " day’s notice", value: key}});


    return (
        <>
            <ModalAside title={title} onClose={onClose}>
                <h4 className='text__blue'>Availability Settings</h4>
                <p className='weight-700'>How far into the future can travelers book?</p>
                <SelectCustom
                    name='availability_window'
                    placeholder='Dates unavailable by default'
                    value={_.find(available_days, i => i.value === availability_window)}
                    options={available_days}
                    onChange={(event, opt) => setSettingsOptions(event, opt)}
                />
                <p className='weight-700'>How much notice do you need before a trip day?</p>
                <SelectCustom
                    name='advance_notice'
                    placeholder="At least 1 day’s notice"
                    value={_.find(advance_notices, i => i.value === advance_notice)}
                    options={advance_notices}
                    onChange={(event, opt) => setSettingsOptions(event, opt)}
                />
            </ModalAside>
        </>
    );
};

export default SettingsModal;
