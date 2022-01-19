import React, {useState} from 'react';
import Modal from 'shared/components/Modal';
import DatePicker from 'shared/components/DatePicker';
import Checkbox from 'shared/components/Checkbox';
import FormPlusMinus from 'shared/components/FormPlusMinus';
import { Grid } from "@material-ui/core";
import RangeSlider from "./RangeSlider";
import {useDispatch} from "react-redux";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import _ from "lodash";
import actions from "../../../../actions";
import {CURRENCY_LIMIT_RANGES} from "../../../../constants";
import moment from "moment";

const FiltersModal = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const {trip_id, prices_list, filters, onSetCalendarDate, onSetTravelersCount,onSetAdultsCount, onSetChildrenCount, onSetReviewScore, onSetPriceRange, onCloseShowPopup} = props;
    const [form, setForm] = useState(JSON.parse(localStorage.getItem('sfd_filters')) || filters);
    const currency = localStorage.getItem('currency') || 'amd'
    const onDaySelect = ((day) => {
        setForm({...form, date: moment(day).format('YYYY-MM-DD')});
    });

    const setAdultsCount = ((adult) => {
        setForm({...form, passengers_count: {adults: adult, children: form.passengers_count.children}});
    });

    const setChildrenCount = ((children) => {
        setForm({...form, passengers_count: {adults: form.passengers_count.adults, children: children}});
    });

    const onSetPrice = ((price_range) => {
        setForm({
            ...form,
            price_range: price_range || trip_id ? CURRENCY_LIMIT_RANGES[currency.toLowerCase()]: [25000, 50000]
        });
    });
    const locale_code = localStorage.getItem('lang') || 'en'
    const updateDriversList = (() => {
        dispatch(actions.searchForDriversRequest({
            date: form.date,
            travelers: form.passengers_count.adults + form.passengers_count.children,
            price_range: form.price_range,
            trip_id: trip_id,
            offset: 0,
            limit: 5
        }));
        localStorage.setItem('sfd_filters', JSON.stringify({
            date: form.date,
            reviews: form.reviews,
            travelers: form.travelers,
            passengers_count: form.passengers_count,
            price_range: form.price_range
        }));
        onCloseShowPopup();
    });

    const daySize = window.matchMedia("(max-width: 350px)")
        .matches ? 35 : window.matchMedia("(max-width: 400px)")
        .matches ? 40 : window.matchMedia("(max-width: 450px)")
        .matches ? 45 : window.matchMedia("(max-width: 500px)")
        .matches ? 50 : window.matchMedia("(max-width: 550px)")
        .matches ? 60 : window.matchMedia("(max-width: 600px)")
        .matches ? 70 : window.matchMedia("(max-width: 700px)")
        .matches ? 75 : window.matchMedia("(max-width: 767px)")
        .matches ? 95 : 40;

    return (
        <Modal size='md' containerClass="sfd_modal" title="Filters" onClose={() => onCloseShowPopup()}>
            <div className='py-4 px-0 px-md-8 sfd_popup_form'>
                  <div className="sfd-items-aligned">
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <h4 className="mb-0 text__grey-dark">{t("select_drivers_page.chips.date_filter_title")}</h4>
                    </div>
                    <DatePicker daySize={daySize}
                        date={!_.isEmpty(form.date)? moment(form.date).locale(locale_code === "am" ? "hy-am" : locale_code) : moment().locale(locale_code === "am" ? "hy-am" : locale_code).format()}
                        onDateChange={(date) => {onDaySelect(date); onSetCalendarDate(date)}}/>
                  </div>
                  <div className="sfd-items-aligned">
                    <hr className="border__top border__default my-4"></hr>
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <h4 className="mb-0 text__grey-dark">{t("select_drivers_page.chips.travelers_filter_title")}</h4>
                    </div>
                    <div className="trvlr_count_container">
                        <FormPlusMinus
                            label={t("commons.adults")}
                            name="adults"
                            max={9}
                            min={2}
                            initialValue={form.passengers_count?.adults || 1}
                            onChange={(obj) => {
                                setAdultsCount(obj.value);
                                onSetAdultsCount(obj.value);
                                onSetTravelersCount((form.passengers_count.adults + obj.value).toString());
                            }}
                        />
                        <FormPlusMinus
                            label={t("commons.children")}
                            name="children"
                            max={9}
                            min={1}
                            initialValue={form.passengers_count?.children  || 0}
                            onChange={(obj) => {
                                setChildrenCount(obj.value);
                                onSetChildrenCount(obj.value)
                                onSetTravelersCount((form.passengers_count.adults + obj.value).toString());
                            }}
                        />
                    </div>
                 </div>
                 <div className="sfd-items-aligned">
                    <hr className="border__top border__default my-4"></hr>
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <h4 className="mb-0 text__grey-dark">{t("select_drivers_page.chips.rating")}</h4>
                    </div>
                    <div className="review_container">
                        <Checkbox
                            className='mb-4 w-100'
                            name='wonderful'
                            label={t("select_drivers_page.chips.wonderfull")}
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    reviews: {"wonderful": e.target.checked, "excelent": form.reviews.excelent || false, "good": form.reviews.good || false}
                                });
                                onSetReviewScore({"wonderful": e.target.checked, "excelent": form.reviews.excelent || false, "good": form.reviews.good || false});
                            }}
                            value={form.reviews.wonderful || false}
                        />
                        <Checkbox
                            className='mb-4 w-100'
                            name='review_score'
                            label={t("select_drivers_page.chips.very_good")}
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    reviews: {"wonderful": form.reviews.wonderful, "excelent": e.target.checked, "good": form.reviews.good},
                                });
                                onSetReviewScore({"wonderful": form.reviews.wonderful || false, "excelent": e.target.checked, "good": form.reviews.good || false});
                            }}
                            value={form.reviews.excelent || false}
                        />
                        <Checkbox
                            className='mb-4 w-100'
                            name='good'
                            label={t("select_drivers_page.chips.good")}
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    reviews: {"wonderful": form.reviews.wonderful || false, "excelent": form.reviews.excelent || false, "good": e.target.checked},
                                });
                                onSetReviewScore({"wonderful": form.reviews.wonderful || false, "excelent": form.reviews.excelent || false, "good": e.target.checked});
                            }}
                            value={form.reviews.good || false}
                        />
                    </div>
                 </div>
                 <div className="sfd-items-aligned">
                    <hr className="border__top border__default my-4"></hr>
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <h4 className="mb-0 text__grey-dark">{t("select_drivers_page.chips.price")}</h4>
                    </div>
                    <div className="price_container">
                        <div className="price_slider">
                            <Grid container justify="center">
                              <Grid item xs={12} style={{ textAlign: "center" }}>
                              </Grid>
                              <Grid item xs={12} lg={12}>
                                <RangeSlider prices_list={prices_list}
                                    range={trip_id ? form.price_range || CURRENCY_LIMIT_RANGES[currency.toLowerCase()]: form.price_range || [25000, 50000]}
                                    min_max={trip_id ? CURRENCY_LIMIT_RANGES[currency.toLowerCase()]: [25000, 50000]}
                                    isTrip={trip_id ? true: false}
                                    price_label={{min_price_text: t("commons.min_price_text"), max_price_text: t("commons.max_price_text")}}
                                    onChange={(price_range) => {
                                        onSetPrice(price_range);
                                        onSetPriceRange(price_range);
                                    }}
                                 />
                              </Grid>
                            </Grid>
                        </div>
                    </div>
                 </div>
            </div>
            <div className="pinned_btn">
                <Link to='/drivers' className='btn btn-primary text-uppercase btn-xs-block btn-sfd' onClick={(e) => {
                    e.preventDefault();
                    updateDriversList();
                }}>
                {t("select_drivers_page.chips.show_results")}
                </Link>
            </div>
        </Modal>
    )
};

export default FiltersModal;
