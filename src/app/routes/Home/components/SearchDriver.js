import React, {useState} from 'react'
import { IconQuestionOutlined } from 'shared/components/Icons';
import ModalAside from 'shared/components/ModalAside';
import Input from 'shared/components/Input';
import DatePicker from './DatePicker';
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

    const {
        title,
        description,
        image={}
    } = hit_the_road;

    const [form, setForm] = useState({date: "", travelers: ""});
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
                        hit_the_road_img: image.url
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
                                <button className='btn btn-circle btn-sm border-0 pull-t-5 hit_ther_road_tip' onClick={() => setOpenModal(true)}>
                                    <IconQuestionOutlined fill='#757575' />
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
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            searchDriver();
                        }}>
                        <div
                            className='bg-white rounded__10 px-4 px-lg-5 pb-5 pt-4 d-flex flex-column flex-lg-row align-items-end hit_the_road_search'>
                            <Input
                                type='text'
                                name='date'
                                label='Date *'
                                value={form.date}
                                placeholder='Select your Date'
                                isError={getStatusMessage("date")  || false}
                                onFocus={() => setShowDatePicker(!showDatePicker)}
                                containerClass='mr-lg-4 mb-lg-0'
                            />
                            <Input
                                type='number'
                                name='travelers'
                                label='Travelers *'
                                placeholder='Count'
                                isError={getStatusMessage("travelers") || false}
                                containerClass='mr-lg-4 mb-lg-0'
                                itemClass="htr_item"
                                onChange={e => setForm({
                                    ...form,
                                    travelers: e.target.value
                                })}
                                hideApperance
                            />
                            <div className="form-field-flexible mr-lg-4 mb-lg-0">
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
                            <div className="calendar_wrapper">
                                {showDatePicker && (
                                    <DatePicker onDateChange={(date) => onDaySelect(date)} />
                                )}
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default SearchDriver;
