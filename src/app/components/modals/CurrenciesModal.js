import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'shared/components/Modal'
import {useDispatch} from "react-redux";
import actions from "../../../actions";
import {CURRENCIES} from '../../../constants';
import { IconCurrecy } from 'shared/components/Icons';

const CurrenciesModal = ({onClose}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    function setCurrency(e,currency){
        localStorage.setItem('currency', currency["short_name"]);
        dispatch(actions.setCurrency(currency["short_name"]));
        onClose();
    }
    return (
         <Modal title={t("commons.choose_currency")} onClose={() => onClose(false)} showDismissButton>
            <div className='row row-1'>
            {
                CURRENCIES.map((currency, i) => {
                    return (
                        <div className='col-12 col-md-6 col-xxl-4 mb-2 mb-md-4 px-2 currency-item'  key={i} onClick={(e)=> { setCurrency(e, currency);}}>
                            <span className='text__grey-dark mb-0 px-1'>{currency["short_name"]}  -  </span>
                            <IconCurrecy curr_code={currency["short_name"]} fill="#757575" />
                        </div>
                    )
                })
            }
            </div>
        </Modal>
    )
}

export default CurrenciesModal;
