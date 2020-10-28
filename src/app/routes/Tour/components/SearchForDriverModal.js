import React, {useState} from 'react';
import Modal from 'shared/components/Modal';
import Input from 'shared/components/Input';
import DatePicker from 'shared/components/DatePicker';
import FormPlusMinus from 'shared/components/FormPlusMinus';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import _ from "lodash";
import moment from "moment";

const validations = {
    date: {
        required: true
    },
    travelers: {
        required: true
    },
};

const SearchForDriverModal = (props) => {
    const history = useHistory();
    const [invalidFields, setInvalidFields] = useState({});
    const [showPopupDatePicker, setShowPopupDatePicker] = useState(false);
    const [showPopupCount, setShowPopupCount] = useState(false);
    const [form, setForm] = useState({date: "", travelers: ""});
    const [count, setCount] = useState({adults: 1, children: 0});
    const {trip_id, onCloseShowPopup} = props
    const onDaySelect = ((day) => {
        setForm({
            ...form,
            date: moment(day).format('YYYY-MM-DD')
        });
        setShowPopupDatePicker(false);
    })

    function validateForm() {

        return _.reduce(validations, (errors, rule, name) => {
            const result = validateField(name);
        if (result) { errors[name] = result; }

        return errors;
    }, {});
    }
    function validateField(name) {
        const rule = validations[name];
        if (rule) {
            if (rule.required && !form[name].trim()) {
                return { status: "error", statusMessage: "This field is required" };
            }
        }
    }

    function getStatusMessage(name) {
        const field = invalidFields[name];
        return field && field.statusMessage ? field.statusMessage : undefined;
    }

    const searchDriver = () => {
        const invalidFields = validateForm();
        if (_.isEmpty(invalidFields)) {
            try {
                history.push({
                    pathname: '/drivers',
                    state: {
                        date: form.date,
                        travelers: form.travelers,
                        trip_id: trip_id
                    },
                })
            } catch (e) {
                console.log(" err ", e.response);
            }
        }
        setInvalidFields(invalidFields);
    };
    return (
        <Modal size='md' title="Search For Driver" onClose={() => onCloseShowPopup()}>
            <div className='py-4 px-0 px-md-8 sfd_popup_form'>
                <div className="tour_seach_items">
                    <div className="tour_calendar_popup">
                        {showPopupDatePicker && ( <DatePicker daySize="15%" onDateChange={(date) => onDaySelect(date)} />)}
                    </div>
                    <Input
                        type='text'
                        name='date'
                        value={form.date}
                        placeholder='Select the Date'
                        autoComplete='off'
                        isError={getStatusMessage("date")  || false}
                        onFocus={() => setShowPopupDatePicker(!showPopupDatePicker)}
                        containerClass='mb-0 mr-3 mnw-0'
                    />
                  </div>
                  <div className="tour_seach_items">
                     <div className="sfd_travelers_count_popup">
                        {showPopupCount && (
                            <div className="trvlr_count_container">
                                <FormPlusMinus
                                    label="Adults"
                                    name="adults"
                                    max={9}
                                    min={2}
                                    initialValue={count.adults}
                                    onChange={(obj) => setCount({...count, adults: obj.value })}
                                />
                                <FormPlusMinus
                                    label="Children"
                                    name="children"
                                    max={9}
                                    min={1}
                                    initialValue={count.children}
                                    onChange={(obj) => setCount({...count,  children: obj.value })}
                                />
                                <div className="trvl_cnt_footer">
                                    <span className="btn btn-secondary btn-sm btn-clear" onClick={() => {
                                        setShowPopupCount(!showPopupCount);
                                    }}>Close</span>
                                    <span className="btn btn-secondary btn-sm btn-done" onClick={() => {
                                        setForm({
                                            ...form,
                                            travelers: (count.adults + count.children).toString()
                                        });
                                        setShowPopupCount(false);
                                    }}>Done</span>
                                </div>
                            </div>
                        )}
                     </div>
                     <Input
                        type='text'
                        name='travelers'
                        placeholder='Add Travelers'
                        value={!_.isEmpty(form.travelers)? form.travelers + " Travelers" : ""}
                        isError={getStatusMessage("travelers") || false}
                        containerClass='mb-0 mr-3 mnw-0'
                        autoComplete='off'
                        onFocus={() => setShowPopupCount(!showPopupCount)}
                        hideApperance
                     />
                 </div>
                 <Link to='/drivers' className='btn btn-primary text-uppercase btn-xs-block btn-sfd' onClick={(e) => {
                    e.preventDefault();
                    searchDriver();
                  }}>
                  Search For Drivers
                 </Link>
            </div>
        </Modal>
    )
};

export default SearchForDriverModal;
