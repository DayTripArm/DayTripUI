import React from "react";
import { DayPickerSingleDateController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const DatePicker = ({ date, onDateChange }) => {

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
                onDateChange(date)
            }}
        />
    );
};

export default DatePicker;
