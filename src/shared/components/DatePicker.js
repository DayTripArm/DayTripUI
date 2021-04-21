import React from "react";
import { DayPickerSingleDateController } from "react-dates";
import "react-dates/initialize";
import 'moment/locale/ru'
import 'moment/locale/hy-am'
import { useTranslation } from 'react-i18next';
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import _ from "lodash";

const DatePicker = ({ date, onDateChange, daySize }) => {
    const { t } = useTranslation();
    const isOutsideRange = (date) => {
        return date.isBefore(moment(), 'day')
    };
    const locale = localStorage.getItem('lang') || 'en';
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
        weekDayFormat: 'd'
    };
    return (
        <DayPickerSingleDateController
            {...props}
            date={date}
            daySize={daySize}
            firstDayOfWeek={1}
            isOutsideRange={date => isOutsideRange(date)}
            renderMonthElement={({ month }) => {
                const date = moment(month).locale(locale === "am" ? "hy-am" : locale)
                return _.startCase(date.format('MMMM YYYY'))
            }}
            renderWeekHeaderElement={(day) => {
                return t(`commons.weeks.${day}`)
            }}
            onDateChange={(date) => {
                onDateChange(date);
            }}
        />
    );
};

export default DatePicker;
