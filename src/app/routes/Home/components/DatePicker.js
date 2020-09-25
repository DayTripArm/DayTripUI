import React, { useState } from "react";
import { DayPickerSingleDateController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment/moment";

const DatePicker = ({ date, onDateChange }) => {
    const [focused, setFocused] = useState(false);
    const props = {
        renderCalendarDay: undefined,
        renderDayContents: null,
        enableOutsideDays: false,
        orientation: 'horizontal',
        initialVisibleMonth: null,
        numberOfMonths: 1,
        onOutsideClick() {},
        keepOpenOnDateSelect: false,
        renderCalendarInfo: null,
        hideKeyboardShortcutsPanel: true,
        monthFormat: 'MMMM YYYY',
    };
    return (
        <DayPickerSingleDateController
            {...props}
            date={date}
            onDateChange={(date) => {
                onDateChange({ target: { value: date } })
            }}
            withFullScreenPortal={window.innerWidth < 400}
        />
    );
}
export default DatePicker
