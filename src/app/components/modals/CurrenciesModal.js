import React from 'react';
import Modal from 'shared/components/Modal'
import {useDispatch} from "react-redux";
import actions from "../../../actions";
import {CURRENCIES} from '../../../constants';

const CurrenciesModal = ({onClose}) => {
    const dispatch = useDispatch();
    function setCurrency(e,currency){
        localStorage.setItem('currency', currency["short_name"]);
        dispatch(actions.setCurrency(currency["short_name"]));
        onClose();
    }
    return (
         <Modal title="Choose Currency" onClose={() => onClose(false)} showDismissButton>
            <div className='row row-1'>
            {
                CURRENCIES.map((currency, i) => {
                    return (
                        <div className='col-12 col-md-6 col-xxl-4 mb-2 mb-md-4 px-2 currency-item'  key={i} onClick={(e)=> { setCurrency(e, currency);}}>
                            <h4 className='mb-2'>{currency["name"]}</h4>
                            <p className='text__grey-dark mb-0'>{currency["short_name"]}</p>
                        </div>
                    )
                })
            }
            </div>
        </Modal>
    )
}

export default CurrenciesModal;
