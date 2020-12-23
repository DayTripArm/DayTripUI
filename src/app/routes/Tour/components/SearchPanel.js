import React, {useState, useRef, useEffect} from 'react';
import StickyPanel from 'shared/components/StickyPanel';
import { IconStar } from 'shared/components/Icons';
import Input from 'shared/components/Input';
import DatePicker from 'shared/components/DatePicker';
import FormPlusMinus from 'shared/components/FormPlusMinus';
import SearchForDriverModal from './SearchForDriverModal';
import useOutsideClick from 'shared/hooks/useOutsideClick';
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

const SearchPanel = ({trip_detail, review_stats}) => {
    const history = useHistory();
    const container1 = useRef();
    const container2 = useRef();
    const [invalidFields, setInvalidFields] = useState({});
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCountPopup, setShowCountPopup] = useState(false);
    const [showSearchPopup, setShowSearchPopup] = useState(false);
    const [form, setForm] = useState({date: "", travelers: "0"});
    const [count, setCount] = useState({adults: 0, children: 0});

    let [tripTitle, setTitle] = useState("");

    useEffect(() => {
            calculateTitleWidth();
    }, [trip_detail.title]);

    useOutsideClick(container1, () => setShowDatePicker(false));
    useOutsideClick(container2, () => setShowCountPopup(false));
    const onDaySelect = ((day) => {
        setForm({
            ...form,
            date: moment(day).format('YYYY-MM-DD')
        });
        setShowDatePicker(false);
    });

    window.addEventListener("resize", (e) => {
        if(window.innerWidth >= 768){
            setShowSearchPopup(false);
        }

        // calculate title length in different screen
        calculateTitleWidth();
    });

    const calculateTitleWidth = () => {
        if (trip_detail.title) {
            if (window.innerWidth < 1280) {
                setTitle(trip_detail.title.length >= 35 ? trip_detail.title.slice(0,35) + "..." : trip_detail.title)
            } else if (window.innerWidth >= 1280 && window.innerWidth < 1560) {
                setTitle(trip_detail.title.length >= 70 ? trip_detail.title.slice(0,70) + "..." : trip_detail.title);
            } else if (window.innerWidth >= 1560) {
                setTitle(trip_detail.title.length >= 105 ? trip_detail.title.slice(0,105) + "..." : trip_detail.title);
            }
        }
    };

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
                return { status: "error", statusMessage: "This field is required" };
            }

        }
    }

    function getStatusMessage(name) {
        const field = invalidFields[name];
        return field && field.statusMessage ? field.statusMessage : undefined;
    }

    const searchDriver = () => {
        if(window.innerWidth <= 768){
            setShowSearchPopup(true);
            window.location.hash = "modal"
        } else {
            const invalidFields = validateForm();
            if (_.isEmpty(invalidFields)) {
                try {
                    localStorage.setItem('sfd_filters', JSON.stringify({
                        date: form.date,
                        reviews: {"wonderfull": false, "excelent": false, "good": false},
                        travelers: form.travelers,
                        passengers_count: count,
                        price_range: [10, 1000],
                    }));
                    history.push({
                        pathname: '/drivers',
                        state: {
                            date: form.date,
                            travelers: form.travelers,
                            trip_id: trip_detail.id,
                            passenger_count: count
                        },
                    })
                } catch (e) {
                    console.log(" err ", e.response);
                }
            }
            setInvalidFields(invalidFields);
        }

    };
    const daySize = window.matchMedia("(max-width: 350px)")
        .matches ? 35 : window.matchMedia("(max-width: 767px)")
        .matches ? 40 : 40;

    return(<>
      <StickyPanel className='border__top border__default trip_sfd_panel'>
        <div className='container'>
          <div className='d-flex justify-content-between py-4'>
            <div className='d-none d-lg-block'>
              <div className='d-flex align-items-center'>
                <h6 className='mb-1 text__blue mr-2'>{tripTitle}</h6>
                  <p className='mb-0 d-xl-block'>
                    <span className='weight-700 mb-0'>{review_stats?.rate || 'No reviews'}</span>
                    <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                    {review_stats?.rate && <span className='text-sm text__grey-dark'>({review_stats.count} reviews)</span>}
                  </p>
              </div>
              <p className='text-sm weight-500 mb-0 d-xl-block'>
                Trip Duration: <span className='text__grey-dark'>{trip_detail.trip_duration } hours</span>
              </p>
            </div>
            <div className='d-flex justify-content-end flex-fill'>
              <div className='d-none d-md-flex flex-fill justify-content-lg-end'>
                  <div className="tour_search_items" ref={container1}>
                    <div className="tour_calendar_popup">
                        {showDatePicker && (
                            <DatePicker date={!_.isEmpty(form.date)? moment(form.date) : moment()}
                                onDateChange={(date) => onDaySelect(date)}
                                daySize={daySize}
                            />
                        )}
                    </div>
                    <Input
                        type='text'
                        name='date'
                        value={form.date}
                        placeholder='Select the Date'
                        autoComplete='off'
                        isError={getStatusMessage("date")  || false}
                        readonly={true}
                        onMouseDown={() => {setShowDatePicker(!showDatePicker); setShowCountPopup(false);}}
                        onTouchEnd={() => {setShowDatePicker(!showDatePicker); setShowCountPopup(false);}}
                        containerClass='mb-0 mr-3 mnw-0 w-156px'
                    />
                  </div>
                  <div className="tour_search_items" ref={container2}>
                        {showCountPopup && (
                        <div className="tour_travelers_count_popup">
                            <div className="trvlr_count_container">
                                <FormPlusMinus
                                    label="Adults"
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
                                    }}
                                />
                            </div>
                     </div>
                     )}
                     <Input
                        type='text'
                        name='travelers'
                        placeholder='Add Travelers'
                        value={Number(form.travelers) > 0 ?  form.travelers + " Travelers": "" }
                        isError={getStatusMessage("travelers") || false}
                        containerClass='mb-0 mr-3 mnw-0 w-156px'
                        autoComplete='off'
                        readonly={true}
                        onMouseDown={() =>{ setShowCountPopup(!showCountPopup); setShowDatePicker(false);}}
                        onTouchEnd={() =>{ setShowCountPopup(!showCountPopup); setShowDatePicker(false);}}
                        hideApperance
                     />
                 </div>
              </div>
              <Link to='/drivers' className='btn btn-primary text-uppercase btn-xs-block' onClick={(e) => {
                e.preventDefault();
                searchDriver();
              }}>
              Search For Drivers
             </Link>
            </div>
            {
                showSearchPopup && <SearchForDriverModal trip_id={trip_detail.id} onCloseShowPopup={() => setShowSearchPopup(false)} />
            }
          </div>
        </div>
      </StickyPanel>
        </>
    );
}

export default SearchPanel;
