import React, {useState} from 'react'
import { IconQuestionOutlined } from 'shared/components/Icons';
import ModalAside from 'shared/components/ModalAside';
import Input from 'shared/components/Input';
import DatePicker from 'shared/components/DatePicker';
import FormPlusMinus from 'shared/components/FormPlusMinus';
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
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

const SearchDriver = () => {
    const history = useHistory();
    const {travelerData={}} = useSelector(state => state);

    const {hit_the_road={},htrTips={}} = travelerData;

    const [invalidFields, setInvalidFields] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCountPopup, setShowCountPopup] = useState(false);

    const {
        title,
        description,
        image={}
    } = hit_the_road;

    const [form, setForm] = useState({date: "", travelers: ""});
    const [count, setCount] = useState({adults: 1, children: 0});
    const src = process.env.NODE_ENV === "development" ? "http://localhost:3000" + image.url : image.url;

    const onDaySelect = ((day) => {
        setForm({
            ...form,
            date: moment(day).format('YYYY-MM-DD')
        });
        setShowDatePicker(false);
    });

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
                        trip_id: null
                    },
                })
            } catch (e) {
                console.log(" err ", e.response);
            }
        }
        setInvalidFields(invalidFields);
    };

    return(
        <>
            <h2 className='text__blue'> Hit The Road </h2>
            <div className='home-search-driver box-overlay rounded__10'>
                <img src={src} alt='home' className='w-100 object-pos-center object-fit-cover'/>
                <div className='overlay d-flex align-items-center justify-content-center'>
                    <div className='d-flex flex-column align-items-center'>
                        <div className='text-white text-center px-4 px-lg-5'>
                            <h2 className='h1 mb-4'>{title}
                                <button className='btn btn-sm border-0 pull-t-5 hit_ther_road_tip' onClick={() => setOpenModal(true)}>
                                    <IconQuestionOutlined fill='#fff' />
                                </button>
                            </h2>
                            <h4 className='mb-5 weight-300' dangerouslySetInnerHTML={{__html: description}}></h4>
                        </div>
                        {openModal && (
                            <ModalAside title='Hit the Road' onClose={() => setOpenModal(false)} className="htr_slider">
                                <h4 className='text__blue'>{!_.isEmpty(htrTips) && htrTips.title}</h4>

                                {
                                    !_.isEmpty(htrTips) && htrTips.tips.map((tip, i) => {
                                        return(
                                            <div key={i}>
                                                <p className='weight-500 mb-3'>
                                                    <span className='bullet bg__black mr-2 mb-01' />
                                                    {tip.title}
                                                </p>
                                                <p className='mb-5' dangerouslySetInnerHTML={{__html: tip.description}}></p>
                                            </div>
                                        );
                                    })
                                }
                            </ModalAside>
                        )}
                        <div
                            className='bg-white rounded__10 px-4 px-lg-5 pb-5 pt-4 d-flex flex-column flex-lg-row align-items-end hit_the_road_search'>
                            <div className="home_seach_items">
                                <Input
                                    type='text'
                                    name='date'
                                    label='Date *'
                                    value={form.date}
                                    placeholder='Select your Date'
                                    autoComplete='off'
                                    isError={getStatusMessage("date")  || false}
                                    onFocus={() => setShowDatePicker(!showDatePicker)}
                                    containerClass='mr-lg-4 mb-lg-0'
                                />
                               <div className="calendar_popup">
                                   {showDatePicker && (
                                        <DatePicker date={!_.isEmpty(form.date)? moment(form.date) : moment()} onDateChange={(date) => onDaySelect(date)} />
                                    )}
                                </div>
                            </div>
                            <div className="home_seach_items">
                                <Input
                                    type='text'
                                    name='travelers'
                                    label='Travelers *'
                                    placeholder='Count'
                                    autoComplete='off'
                                    value={!_.isEmpty(form.travelers)? form.travelers + " Travelers" : ""}
                                    isError={getStatusMessage("travelers") || false}
                                    containerClass='mr-lg-4 mb-lg-0'
                                    onFocus={() => setShowCountPopup(!showCountPopup)}
                                    hideApperance
                                />
                                <div className="travelers_count_popup">
                                    {showCountPopup && (
                                    <div className="trvlr_count_container">
                                        <FormPlusMinus
                                            label="Adults"
                                            name="adults"
                                            max={9}
                                            min={2}
                                            initialValue={count.adults}
                                            onChange={(obj) => {
                                                setCount({...count, adults: obj.value });
                                                setForm({
                                                    ...form,
                                                    travelers: (count.children + obj.value).toString()
                                                });
                                                setShowCountPopup(false);
                                            }}
                                        />
                                        <FormPlusMinus
                                            label="Children"
                                            name="children"
                                            max={9}
                                            min={1}
                                            initialValue={count.children}
                                            onChange={(obj) => {
                                                setCount({...count,  children: obj.value });
                                                setForm({
                                                    ...form,
                                                    travelers: (count.adults + obj.value).toString()
                                                });
                                                setShowCountPopup(false);
                                            }}
                                        />
                                    </div>
                                    )}
                                </div>
                            </div>


                            <div className="form-field-sfd mr-lg-4 mb-lg-0">
                                <label className="mb-1 px-1">&nbsp;</label>
                                <div className="position-relative">
                                    <Link to="/drivers" className='btn btn-primary btn-block__md htr_search' onClick={(e) => {
                                        e.preventDefault();
                                        searchDriver();
                                    }}>
                                        Search for Driver
                                    </Link>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default SearchDriver;
