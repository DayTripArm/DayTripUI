import React, {useState} from 'react';
import Modal from 'shared/components/Modal';
import DatePicker from 'shared/components/DatePicker';
import FormPlusMinus from 'shared/components/FormPlusMinus';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import _ from "lodash";
import moment from "moment";

const SearchForDriverModal = (props) => {
    const history = useHistory();
    const [form, setForm] = useState({date: "", travelers: ""});
    const [count, setCount] = useState({adults: 1, children: 0});
    const {trip_id, onCloseShowPopup} = props
    const onDaySelect = ((day) => {
        setForm({
            ...form,
            date: moment(day).format('YYYY-MM-DD')
        });
    })

    const searchDriver = () => {
        try {
            onCloseShowPopup();
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
    };
    return (
        <Modal size='md' title="Search For Drivers" onClose={() => onCloseShowPopup()}>
            <div className='py-4 px-0 px-md-8 sfd_popup_form'>
                  <div className="sfd-items-aligned">
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <h4 className="mb-0 text__grey-dark">Date</h4>
                    </div>
                    <DatePicker daySize={50} date={!_.isEmpty(form.date)? moment(form.date) : moment()} onDateChange={(date) => onDaySelect(date)} />
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
            </div>
            <Link to='/drivers' className='btn btn-primary text-uppercase btn-xs-block btn-sfd' onClick={(e) => {
                e.preventDefault();
                searchDriver();
            }}>
            Search For Drivers
            </Link>
        </Modal>
    )
};

export default SearchForDriverModal;
