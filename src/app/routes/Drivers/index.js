import React, {useEffect, useState, useRef} from 'react';
import DriversIllustration from './components/DriversIllustration';
import Chips from 'shared/components/Chips';
import { IconClockOutlined, IconDestination } from 'shared/components/Icons';
import DatePicker from 'shared/components/DatePicker';
import DriversList from './components/DriversList';
import FormPlusMinus from 'shared/components/FormPlusMinus';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";
import _ from "lodash";
import moment from "moment";
import { Grid } from "@material-ui/core";
import RangeSlider from "./components/RangeSlider";
import NoResults from './components/NoResults';

const Drivers = ({ history }) => {
    const dispatch = useDispatch();
    const container1 = useRef();
    const container2 = useRef();
    //const container3 = useRef();  //for review popup
    const container4 = useRef();
    const day = history.location.state?.date || moment().format('YYYY-MM-DD');
    const travelers_count = history.location.state?.travelers || 0;
    const trip_id = history.location.state?.trip_id || null;

    useEffect(() => {
        const body = {
            date: day,
            travelers: travelers_count,
            price_range: price_range || [10, 100000],
            trip_id: trip_id,
            offset: 0,
            limit: 10
        };

        dispatch(actions.searchForDriversRequest(body))
        dispatch(actions.loadPricesListRequest(trip_id? true: false))
    },[]);

    const {travelerData} = useSelector(state => state);
    const {search_for_drivers, prices_list} = travelerData;
    const {drivers_list, trip_details} = search_for_drivers;
    const trip_duration = trip_details ? trip_details.trip_duration : 12;
    const start_location = trip_details ?  trip_details.start_location : 'Yerevan';

    const [openCalendar, setOpenCalendar] = useState(false);
    const [openCount, setOpenCount] = useState(false);
    const [isPricePopupOpened, setPricePopupOpened] = useState(false);
    const [form, setForm] = useState({date: day, travelers: travelers_count});
    const [count, setCount] = useState({adults: 0, children: 0});
    const [price_range, setPriceRange] = useState(null);

    useOutsideClick(container1, () => setOpenCalendar(false));
    useOutsideClick(container2, () => setOpenCount(false));
    //useOutsideClick(container3, () => setShowCountPopup(false));  //for review popup
    useOutsideClick(container4, () => setPricePopupOpened(false));

    const displayPrice = (() => {
        let price_text = "Prices";
        if (price_range) {
            if (price_range[0] && price_range[1]){
                price_text = "$"+price_range[0]+" - $"+price_range[1];
            } else {
                price_text = "Up to $"+(price_range[1] || "1000+");
            }

        }
        return price_text;
    })

    const onDaySelect = ((day) => {
        setForm({
            ...form,
            date: moment(day).format('YYYY-MM-DD')
        });
        setOpenCalendar(false);
        const body = {
            date: moment(day).format('YYYY-MM-DD'),
            travelers: form.travelers,
            price_range: price_range
        };
        updateDriversList(body);
    });

    const onSetCount = ((total_passangers) => {
        setForm({
            ...form,
            travelers: total_passangers.toString()
        });
        const body = {
            date: form.date,
            travelers: total_passangers,
            price_range: price_range
        };
        console.log(price_range)
        console.log(body)
        updateDriversList(body)
    });

    const onSetPrice = ((price_range) => {
        const body = {
            date: form.date,
            travelers: form.travelers,
            price_range: price_range || [10, 1100]
        };
        updateDriversList(body)
    });

    const updateDriversList = ((body) => {
        dispatch(actions.searchForDriversRequest({
            ...body,
            trip_id: trip_id,
            offset: 0,
            limit: 10
        }));
    });

    return (
        <>
            {trip_details && <DriversIllustration history={history} trip_details={trip_details} />}
            <div className='rounded-top__30 bg-white pull-t-9 position-relative'>
                <div className='container pt-6 pt-lg-8 pt-xl-11'>
                    <div className='col-xl-10 col-xxl-9 col-xxxl-8 m-auto p-0'>
                        {trip_details && (<h2 className='text__blue mb-4 mb-md-3'>{trip_details.title}</h2>)}
                        <div className='d-md-flex'>
                            <div className='d-flex mb-4 mr-md-4'>
                                <IconClockOutlined className='mr-2'/>
                                <p className='mb-0'>
                                    Trip duration: <span className='weight-500 text__grey-dark'>{trip_duration}</span>
                                </p>
                            </div>
                            <div className='d-flex mb-5'>
                                <IconDestination className='mr-2'/>
                                <p className='mb-0'>
                                    Starting destination: <span className='weight-500 text__grey-dark'>{start_location}</span>
                                </p>
                            </div>
                        </div>
                        <div className='mb-9 mb-md-10 mb-xl-11 chips_container'>
                            <div className="home_seach_items">
                                <Chips name={moment(form.date).format('MMM-DD')} className='mr-4 mb-md-5'
                                    onClick={() => {
                                        setOpenCalendar(!openCalendar);
                                        setOpenCount(false);
                                        setPricePopupOpened(false);
                                    }} />
                                {openCalendar && (<div className="calendar_popup" ref={container1}>
                                     <DatePicker date={!_.isEmpty(form.date)? moment(form.date) : moment()}
                                     onDateChange={(date) => onDaySelect(date)} />
                                </div>)}
                            </div>
                            <div className="home_seach_items">
                                <Chips name={form.travelers+" Travelers"} className='mr-4 mb-md-5'
                                    onClick={() => {
                                    setOpenCalendar(false);
                                    setOpenCount(!openCount);
                                    setPricePopupOpened(false);
                                }} />
                                {openCount && (
                                    <div className="travelers_count_popup" ref={container2}>
                                        <div className="trvlr_count_container">
                                            <FormPlusMinus
                                                label="Adults"
                                                name="adults"
                                                max={9}
                                                initialValue={count.adults}
                                                onChange={(obj) => {
                                                    setCount({...count, adults: obj.value })
                                                    onSetCount(count.children + obj.value);
                                                }}
                                            />
                                            <FormPlusMinus
                                                label="Children"
                                                name="children"
                                                max={9}
                                                initialValue={count.children}
                                                onChange={(obj) => {
                                                    setCount({...count,  children: obj.value })
                                                    onSetCount(count.adults + obj.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="home_seach_items">
                                <Chips name="Reviews" className='mr-4 mb-md-5'/>
                            </div>
                            <div className="home_seach_items">
                                <Chips name={displayPrice()}
                                    onClick={() => {
                                        setOpenCalendar(false);
                                        setOpenCount(false);
                                        setPricePopupOpened(!isPricePopupOpened);
                                    }
                                } />
                                {isPricePopupOpened && (<div className="price_popup" ref={container4}>
                                    <div className="price_container">
                                        <div className="price_slider">
                                            <Grid container justify="center">
                                              <Grid item xs={12} style={{ textAlign: "center" }}>
                                              </Grid>
                                              <Grid item xs={12} lg={8}>
                                                <RangeSlider prices_list={prices_list}
                                                    range={price_range || [10, 1100]}
                                                    onChange={(price_range) => {
                                                        setPriceRange(price_range);
                                                        onSetPrice(price_range);
                                                    }}
                                                 />
                                              </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                        </div>

                        { _.isEmpty(drivers_list)
                            ?
                            <NoResults/>
                            :
                            <>
                                <h2 className='text__blue mb-4 mb-md-5'>Available Drivers</h2>
                                <DriversList
                                drivers_list={drivers_list}
                                trip_details={trip_details}
                                req_body={{
                                    date: form.date,
                                    travelers: count.adults + count.children,
                                    trip_id: trip_id
                                }}
                         />
                         </>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Drivers;
