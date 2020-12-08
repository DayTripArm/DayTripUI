import React from "react";
import { DayPickerSingleDateController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";

const DatePicker = ({ date, onDateChange, daySize }) => {
    const isOutsideRange = (date) => {
        return date.isBefore(moment(), 'day')
    };
    const props = {
        renderCalendarDay: undefined,
        renderDayContents: null,
        enableOutsideDays: false,
        orientation: 'horizontal',
        initialVisibleMonth: null,
        daySize: null,
        numberOfMonths: 1,
        onOutsideClick() {},
        keepOpenOnDateSelect: false,
        renderCalendarInfo: null,
        focused: true,
        hideKeyboardShortcutsPanel: true,
        monthFormat: 'MMMM YYYY',
    };
    return (
        <DayPickerSingleDateController
            {...props}
            date={date}
            daySize={daySize}
            isOutsideRange={date => isOutsideRange(date)}
            onDateChange={(date) => {
                onDateChange(date)
            }}
        />
    );
};

export default DatePicker;
