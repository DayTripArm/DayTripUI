import React, {useState} from 'react';
import Modal from 'shared/components/Modal';
import DatePicker from 'shared/components/DatePicker';
import FormPlusMinus from 'shared/components/FormPlusMinus';
import { Grid } from "@material-ui/core";
import RangeSlider from "./RangeSlider";
import {useDispatch} from "react-redux";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import _ from "lodash";
import actions from "../../../../actions";
import moment from "moment";

const FiltersModal = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {trip_id, prices_list, filters, passengers_count, onSetCalendarDate, onSetTravelersCount, onSetPriceRange, onCloseShowPopup} = props
    const [form, setForm] = useState(filters);
    const [count, setCount] = useState({adults: passengers_count.adults, children: passengers_count.children});
    const onDaySelect = ((day) => {
        setForm({
            ...form,
            date: moment(day).format('YYYY-MM-DD')
        });
    })

    const onSetCount = ((total_passangers) => {
        setForm({
            ...form,
            travelers: total_passangers.toString()
        });
    });

    const onSetPrice = ((price_range) => {
        setForm({
            ...form,
            price_range: form.price_range || [10, 1100]
        });
    });

    const updateDriversList = (() => {
        dispatch(actions.searchForDriversRequest({
            date: form.date,
            travelers: form.travelers,
            price_range: form.price_range,
            trip_id: trip_id,
            offset: 0,
            limit: 5
        }));
        onCloseShowPopup();
    });
    return (
        <Modal size='md' title="Search For Drivers" onClose={() => onCloseShowPopup()}>
            <div className='py-4 px-0 px-md-8 sfd_popup_form'>
                  <div className="sfd-items-aligned">
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <h4 className="mb-0 text__grey-dark">Date</h4>
                    </div>
                    <DatePicker daySize={50}
                        date={!_.isEmpty(form.date)? moment(form.date) : moment()}
                        onSetCalendarDate={(date) => onDaySelect(date)}
                        onDateChange={(date) => onDaySelect(date)} />
                  </div>
                  <div className="sfd-items-aligned">
                    <hr className="border__top border__default my-4"></hr>
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <h4 className="mb-0 text__grey-dark">Travelers</h4>
                    </div>
                    <div className="trvlr_count_container">
                        <FormPlusMinus
                            label="Adults"
                            name="adults"
                            max={9}
                            min={2}
                            initialValue={count.adults}
                            onChange={(obj) => {
                                setCount({...count, adults: obj.value });
                                onSetCount((count.children + obj.value).toString());
                                onSetTravelersCount((count.adults + obj.value).toString());
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
                                onSetCount((count.adults + obj.value).toString());
                                onSetTravelersCount((count.adults + obj.value).toString());
                            }}
                        />
                    </div>
                 </div>
                 <div className="sfd-items-aligned">
                    <hr className="border__top border__default my-4"></hr>
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <h4 className="mb-0 text__grey-dark">Price</h4>
                    </div>
                    <div className="price_container">
                        <div className="price_slider">
                            <Grid container justify="center">
                              <Grid item xs={12} style={{ textAlign: "center" }}>
                              </Grid>
                              <Grid item xs={12} lg={8}>
                                <RangeSlider prices_list={prices_list}
                                    range={form.price_range || [10, 1100]}
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
            <Link to='/drivers' className='btn btn-primary text-uppercase btn-xs-block btn-sfd' onClick={(e) => {
                e.preventDefault();
                updateDriversList();
            }}>
            SHOW RESULTS
            </Link>
        </Modal>
    )
};

export default FiltersModal;
