import React from 'react';
import StickyPanel from 'shared/components/StickyPanel';
import {useHistory} from 'react-router-dom';
import {MONTH_LIST} from "../../../../../../constants";


const BookPanel = ({checkout_info}) => {
    const history = useHistory();
    const {
        travelers_count,
        trip_day,
        price,
    } = checkout_info;

    const book = () => {
        history.push({
            pathname: '/checkout/review',
            state: {
                ...checkout_info
            }
        });
    };

    const date = new Date(trip_day);

    return (
        <StickyPanel className='shadow__4-up'>
            <div className='container'>
                <div className='d-flex align-items-center justify-content-between py-4'>
                    <div className='d-none d-md-block'>
                        <h4 className='mb-1 text__blue'>Garni Temple and Geghard Monastery</h4>
                        <p className='text-sm weight-500 mb-0'>
                            Day: <span className='text__grey-dark'>{MONTH_LIST[date.getMonth()] + " " + date.getDate()}</span> Travelers:{' '}
                            <span className='text__grey-dark'>{travelers_count}</span>
                        </p>
                    </div>
                    <button onClick={book} className='btn btn-primary text-uppercase btn-xs-block'>
                        Book For ${price}
                    </button>
                </div>
            </div>
        </StickyPanel>
    )
};

export default BookPanel;
