import React from 'react';
import ModalAside from 'shared/components/ModalAside';
import SelectCustom from 'shared/components/SelectCustom';
import {AVAILABILITY_WINDOW, DRIVER_NOTICE} from "../../../../constants";
import actions from "../../../../actions";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import moment from "moment";

const SettingsModal = ({ onClose, title = 'Settings' }) => {
    const dispatch = useDispatch();
    const {driverData} = useSelector(state => state);

    const {profile, calendar_settings} = driverData;
    const {availability_window, advance_notice} = calendar_settings;

    let setSettingsOptions = (event, opt) => {
        const field_name = opt.name;
        let settings_obj = {driver_id: profile.id};
        const availability_window =  event.value;
        settings_obj[field_name] = availability_window;
        let excluded_days = [];
        let dateuse  = moment();
        let endDate = moment().add(availability_window, 'months');

        if (availability_window !== 0) {
            while (dateuse.isSameOrBefore(endDate)) {
                excluded_days.push(dateuse.format('YYYY-MM-DD'));
                dateuse.add(1, 'days');
            }
        }

        settings_obj["unavailable_days"] = {
            "excluded_days": excluded_days
        };

        dispatch(actions.updateCalendarSettingsRequest(profile.id, settings_obj));

    };
    const available_days = _.keys(AVAILABILITY_WINDOW).map(key => {return {label: key, value: AVAILABILITY_WINDOW[key]}});
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
