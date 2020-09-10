import React  from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { IconSetting } from 'shared/components/Icons';
import TripDetailsModal from '../Messaging/components/TripDetailsModal';
import SettingsModal from './components/SettingsModal';
import { DayPickerRangeController } from 'react-dates';
import isInclusivelyAfterDay from 'react-dates/src/utils/isInclusivelyAfterDay';

import _ from 'lodash';
import moment from "moment";


const START_DATE = 'startDate';
const END_DATE = 'endDate';
const HORIZONTAL_ORIENTATION = 'horizontal';

const defaultProps = {
    // example props for the demo
    autoFocusEndDate: false,
    initialStartDate: null,
    initialEndDate: null,
    startDateOffset: undefined,
    endDateOffset: undefined,
    showInputs: false,
    minDate: null,
    maxDate: null,

    // day presentation and interaction related props
    renderCalendarDay: undefined,
    renderDayContents: null,
    minimumNights: 1,
    isDayBlocked: () => false,
    isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
    isDayHighlighted: () => false,
    enableOutsideDays: false,
    daysViolatingMinNightsCanBeClicked: false,

    // calendar presentation and interaction related props
    orientation: HORIZONTAL_ORIENTATION,
    verticalHeight: undefined,
    withPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 2,
    onOutsideClick() {},
    keepOpenOnDateSelect: false,
    renderCalendarInfo: null,
    isRTL: false,
    renderMonthText: null,
    renderMonthElement: null,
    renderKeyboardShortcutsButton: undefined,
    renderKeyboardShortcutsPanel: undefined,

    // navigation related props
    navPrev: null,
    navNext: null,
    renderNavPrevButton: null,
    renderNavNextButton: null,
    onPrevMonthClick() {},
    onNextMonthClick() {},

    // internationalization
    monthFormat: 'MMMM YYYY',
};

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: null,
            focusedInput: props.autoFocusEndDate ? END_DATE : START_DATE,
            startDate: props.initialStartDate,
            endDate: props.initialEndDate,
            openSettingsModal: false,
            openDetailsModal: false
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    //const [openSettingsModal, setOpenSettingsModal] = useState(false);
    //const [openDetailsModal, setOpenDetailsModal] = useState(false);

    onDatesChange({ startDate, endDate }) {
        const { daysViolatingMinNightsCanBeClicked, minimumNights } = this.props;
        let doesNotMeetMinNights = false;
        if (daysViolatingMinNightsCanBeClicked && startDate && endDate) {
            const dayDiff = endDate.diff(startDate.clone().startOf('day').hour(12), 'days');
            doesNotMeetMinNights = dayDiff < minimumNights && dayDiff >= 0;
        }
        this.setState({
            startDate,
            endDate: doesNotMeetMinNights ? null : endDate,
            errorMessage: doesNotMeetMinNights
                ? 'That day does not meet the minimum nights requirement'
                : null,
        });
    }

    onFocusChange(focusedInput) {
        this.setState({
            // Force the focusedInput to always be truthy so that dates are always selectable
            focusedInput: !focusedInput ? START_DATE : focusedInput,
        });
    }

    render() {

        const { renderCalendarInfo: renderCalendarInfoProp } = defaultProps;
        const {
            errorMessage,
            focusedInput,
            startDate,
            endDate,
        } = this.state;

        const props = _.omit(defaultProps, [
            'autoFocus',
            'autoFocusEndDate',
            'initialStartDate',
            'initialEndDate',
            'showInputs',
        ]);

        // const startDateString = startDate && startDate.format('YYYY-MM-DD');
        // const endDateString = endDate && endDate.format('YYYY-MM-DD');
        const renderCalendarInfo = errorMessage ? () => <div>{errorMessage}</div> : renderCalendarInfoProp;



        return (
            <>
                <div className='container'>
                    <div className='col-xl-9 col-xxl-8 col-xxxl-7 m-auto p-0'>
                        <div
                            className='d-flex align-items-center justify-content-between mt-6 mb-5 mt-md-9 mb-md-9 mt-xl-11 mt-xxl-13 '>
                            <h2 className='text__blue mb-0'>Calendar</h2>
                            <button className='btn btn-circle border-0' onClick={() => this.setState({openSettingsModal: true})}>
                                <IconSetting/>
                            </button>
                        </div>

                        <DayPickerRangeController
                            {...props}
                            onDatesChange={this.onDatesChange}
                            onFocusChange={this.onFocusChange}
                            focusedInput={focusedInput}
                            startDate={startDate}
                            endDate={endDate}
                            renderCalendarInfo={renderCalendarInfo}
                        />

                        <h2 className='text__blue mt-9 mb-2 mt-md-13 mb-md-6 mt-xl-15'>Overview</h2>
                        <p>March 1, 2020</p>
                        <div
                            className='rounded__4 border-style border__default d-md-flex justify-content-between align-items-center'>
                            <div>
                                <div className='px-4 pt-4 pb-11 pt-md-5 pb-md-5 px-md-5 d-flex position-relative'>
                                    <img
                                        width='78'
                                        height='98'
                                        src='https://upload.wikimedia.org/wikipedia/commons/c/c5/Garni_Temple_02.JPG'
                                        alt='garni'
                                        className='rounded__4 object-pos-center object-fit-cover mr-3'
                                    />
                                    <div>
                                        <p className='weight-500 mb-1'>Garni Temple and Geghard Monastery</p>
                                        <p className='mb-1 text-xs'>
                                            <span className='weight-500'>Day:</span>{' '}
                                            <span className='weight-500 text__grey-dark'>September 1</span>
                                        </p>
                                        <p className='mb-0 text-xs'>
                                            <span className='weight-500'>Travelers:</span>{' '}
                                            <span className='weight-500 text__grey-dark'>3 Adults</span>
                                        </p>
                                        <div className='cancelation-container d-inline-block text-center py-2 py-md-0'>
                                            <button className='btn btn-secondary btn-sm'>Cancelation</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className='border__top border__default my-0'/>
                            <div className='py-3 d-flex flex-column flex-lg-row align-items-center pr-lg-5'>
                                <button
                                    className='btn btn-secondary btn-secondary__grey text-uppercase mb-1'
                                    onClick={() => this.setState({openDetailsModal: true})}
                                >
                                    Details
                                </button>
                                <button className='btn btn-secondary text-uppercase'>Contact Traveler</button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.openSettingsModal && <SettingsModal onClose={() => this.setState({openSettingsModal: false})}/>}
                {this.state.openDetailsModal && (
                    <TripDetailsModal title='March 18' onClose={() => this.setState({openDetailsModal: false})}/>
                )}
            </>
        );
    }
};

export default Calendar;
