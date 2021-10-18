import React, {useState, useRef} from 'react'
import { IconQuestionOutlined } from 'shared/components/Icons';
import ModalAside from 'shared/components/ModalAside';
import Input from 'shared/components/Input';
import DatePicker from 'shared/components/DatePicker';
import FormPlusMinus from 'shared/components/FormPlusMinus';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
import { useHistory } from "react-router";
import { useTranslation } from 'react-i18next';
import _ from "lodash";
import moment from "moment";
import {HOST_URL} from "../../../../constants";

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
    const container1 = useRef();
    const container2 = useRef();
    const { t } = useTranslation();
    const {travelerData={}} = useSelector(state => state);
    const {hit_the_road={},htrTips={}} = travelerData;
    const [invalidFields, setInvalidFields] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCountPopup, setShowCountPopup] = useState(false);

    useOutsideClick(container1, () => setShowDatePicker(false));
    useOutsideClick(container2, () => setShowCountPopup(false));
    const {
        title,
        description,
        image=null
    } = hit_the_road;

    const [form, setForm] = useState({date: "", travelers: "0"});
    const [count, setCount] = useState({adults: 0, children: 0});
    const src = process.env.NODE_ENV === "development" ? HOST_URL + image?.url : image?.url;

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
            if (rule.required && (_.isEmpty(form[name]) || _.isEqual(form[name], "0"))) {
                return { status: "error", statusMessage: t("commons.error_msgs.required_field") };
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
                localStorage.setItem('sfd_filters', JSON.stringify({
                    date: form.date,
                    reviews: {"wonderfull": false, "excelent": false, "good": false},
                    travelers: form.travelers,
                    passengers_count: count,
                    price_range: [25000, 50000],
                }));
                history.push({
                    pathname: '/drivers',
                    state: {
                        date: form.date,
                        travelers: form.travelers,
                        trip_id: null,
                        passenger_count: count
                    },
                })
            } catch (e) {
                console.log(" err ", e.response);
            }
        }
        setInvalidFields(invalidFields);
    };
    const daySize = window.matchMedia("(max-width: 350px)")
        .matches ? 30 : window.matchMedia("(max-width: 767px)")
        .matches ? 35 : 40
    return(
        <>
            <h2 className='text__blue'>{t("home_page.hit_the_road.section_title")}</h2>
            <div className='home-search-driver box-overlay rounded__10'>
                {image ?
                    <img src={src} className='w-100 object-pos-center object-fit-cover rounded__10' alt={t("home_page.hit_the_road.section_title")} /> :
                    <div className='img_overlay_htr w-100 object-pos-center object-fit-cover rounded__10'>
                    </div>
                }
                <div className='overlay d-flex align-items-center justify-content-center rounded__10'>
                    <div className='d-flex flex-column align-items-center'>
                        <div className='text-white text-center px-4 px-lg-5'>
                            <h2 className='h1 mb-4'>{title}
                                <button className='btn btn-sm border-0 pull-t-5 hit_ther_road_tip' onClick={() => {setOpenModal(true); window.location.hash = "modal"}}>
                                    <IconQuestionOutlined fill='#fff' />
                                </button>
                            </h2>
                            <h4 className='mb-5 weight-300' dangerouslySetInnerHTML={{__html: description}}></h4>
                        </div>
                        {openModal && (
                            <ModalAside title={t("home_page.hit_the_road.section_title")} onClose={() => setOpenModal(false)} containerClass="htr_modal" className="htr_slider">
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
                            <div className="home_seach_items" ref={container1}>
                                <Input
                                    type='text'
                                    name='date'
                                    label={t("home_page.hit_the_road.date_picker_label")+' *'}
                                    value={form.date}
                                    placeholder={t("home_page.hit_the_road.date_picker_placeholder")}
                                    autoComplete='off'
                                    readonly={true}
                                    isError={getStatusMessage("date")  || false}
                                    onMouseDown={() => {
                                        setShowDatePicker(!showDatePicker);
                                        setShowCountPopup(false);
                                    }}
                                    containerClass='mr-lg-4 mb-lg-0'
                                />
                               {showDatePicker && (
                               <div className="calendar_popup">
                                    <DatePicker date={!_.isEmpty(form.date)? moment(form.date) : moment()}
                                    onDateChange={(date) => onDaySelect(date)}

                                    daySize={daySize}
                                    />
                                </div>
                                )}
                            </div>
                            <div className="home_seach_items" ref={container2}>
                                <Input
                                    type='text'
                                    name='travelers'
                                    label={t("home_page.hit_the_road.travelers_label")+' *'}
                                    placeholder={t("home_page.hit_the_road.travelers_placeholder")}
                                    autoComplete='off'
                                    readonly={true}
                                    value={Number(form.travelers) > 0 ?  t("commons.travelers_pholder",{count: form.travelers}): "" }
                                    isError={getStatusMessage ("travelers") || false}
                                    containerClass='mr-lg-4 mb-lg-0'
                                    onMouseDown={() => {
                                        setShowCountPopup(!showCountPopup);
                                        setShowDatePicker(false);
                                    }}
                                    onChange={(e) => e.preventDefault()}
                                    hideApperance
                                />
                                {showCountPopup && (
                                <div className="travelers_count_popup">
                                    <div className="trvlr_count_container">
                                        <FormPlusMinus
                                            label={t("commons.adults")}
                                            name="adults"
                                            max={9}
                                            min={1}
                                            initialValue={count.adults}
                                            onChange={(obj) => {
                                                setCount({...count, adults: obj.value });
                                                setForm({
                                                    ...form,
                                                    travelers: (count.children + obj.value).toString()
                                                });
                                            }}
                                        />
                                        <FormPlusMinus
                                            label={t("commons.children")}
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
                                            }}
                                        />
                                    </div>
                                </div>
                                )}
                            </div>


                            <div className="form-field-sfd mr-lg-4 mb-lg-0">
                                <label className="mb-1 px-1">&nbsp;</label>
                                <div className="position-relative">
                                    <Link to="/drivers" className='btn btn-primary btn-block__md htr_search text-uppercase' onClick={(e) => {
                                        e.preventDefault();
                                        searchDriver();
                                    }}>
                                        {t("home_page.hit_the_road.btn_sfd")}
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
