import React, {useState} from 'react';
import StickyPanel from 'shared/components/StickyPanel';
import { IconStar } from 'shared/components/Icons';
import Input from 'shared/components/Input';
import DatePicker from 'shared/components/DatePicker';
import FormPlusMinus from 'shared/components/FormPlusMinus';
import SearchForDriverModal from './SearchForDriverModal';
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

const SearchPanel = ({trip_detail}) => {
    const history = useHistory();
    const [invalidFields, setInvalidFields] = useState({});
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCountPopup, setShowCountPopup] = useState(false);
    const [showSearchPopup, setShowSearchPopup] = useState(false);
    const [form, setForm] = useState({date: "", travelers: ""});
    const [count, setCount] = useState({adults: 1, children: 0});
    const onDaySelect = ((day) => {
        setForm({
            ...form,
            date: moment(day).format('YYYY-MM-DD')
        });
        setShowDatePicker(false);
    });

    window.addEventListener("resize", (e) => {
        if(window.innerWidth >= 768){
            setShowSearchPopup(false)
        }
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
        if(window.innerWidth <= 768){
            setShowSearchPopup(true)
        } else {
            const invalidFields = validateForm();
            if (_.isEmpty(invalidFields)) {
                try {
                    history.push({
                        pathname: '/drivers',
                        state: {
                            date: form.date,
                            travelers: form.travelers,
                            trip_id: trip_detail.id
                        },
                    })
                } catch (e) {
                    console.log(" err ", e.response);
                }
            }
            setInvalidFields(invalidFields);
        }

    };

    return(<>
      <StickyPanel className='border__top border__default'>
        <div className='container'>
          <div className='d-flex align-items-center justify-content-between py-4'>
            <div className='d-none d-lg-block'>
              <div className='d-flex align-items-center'>
                <h4 className='mb-1 text__blue mr-2'>{trip_detail.title}</h4>
                <p className='mb-0 d-none d-xl-block'>
                  <span className='weight-700'>5.0</span>
                  <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                  <span className='text-sm text__grey-dark'>(125 reviews)</span>
                </p>
              </div>
              <p className='text-sm weight-500 mb-0 d-none d-xl-block'>
                Trip Duration: <span className='text__grey-dark'>{trip_detail.trip_duration } hours</span>
              </p>
            </div>
            <div className='d-flex justify-content-end flex-fill'>
              <div className='d-none d-md-flex flex-fill justify-content-lg-end'>
                  <div className="tour_search_items">
                    <div className="tour_calendar_popup">
                        {showDatePicker && (
                            <DatePicker date={!_.isEmpty(form.date)? moment(form.date) : moment()}
                                onDateChange={(date) => onDaySelect(date)}
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
                        onFocus={() => {setShowDatePicker(!showDatePicker); setShowCountPopup(false);}}
                        containerClass='mb-0 mr-3 mnw-0 w-156px'
                    />
                  </div>
                  <div className="tour_search_items">
                        {showCountPopup && (
                        <div className="tour_travelers_count_popup">
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
                        value={!_.isEmpty(form.travelers)? form.travelers + " Travelers" : ""}
                        isError={getStatusMessage("travelers") || false}
                        containerClass='mb-0 mr-3 mnw-0 w-156px'
                        autoComplete='off'
                        onFocus={() =>{ setShowCountPopup(!showCountPopup); setShowDatePicker(false);}}
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
          </div>
        </div>
      </StickyPanel>
        {
            showSearchPopup && <SearchForDriverModal trip_id={trip_detail.id} onCloseShowPopup={() => setShowSearchPopup(false)} />
        }
        </>
    );
}

export default SearchPanel;
