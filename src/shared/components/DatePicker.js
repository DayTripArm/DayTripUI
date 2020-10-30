import React from "react";
import { DayPickerSingleDateController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";

const DatePicker = ({ date, onDateChange }) => {
    const isOutsideRange = (date) => {
        return date.isBefore(moment(), 'day')
    };
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
            isOutsideRange={date => isOutsideRange(date)}
            onDateChange={(date) => {
                onDateChange(date)
            }}
        />
    );
};

export default DatePicker;
