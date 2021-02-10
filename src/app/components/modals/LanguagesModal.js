import React from 'react';
import Modal from 'shared/components/Modal'
import {useDispatch} from "react-redux";
import actions from "../../../actions";
import {LANGUAGES_BY_COUNTRY} from '../../../constants';

const LanguagesModal = ({onClose}) => {
    const dispatch = useDispatch();
    function setLanguage(e, lang){
        localStorage.setItem('lang', lang["lng"]);
        dispatch(actions.setLanguage(lang["lng"]));
        onClose();
    }
    return (
         <Modal title="Choose Language" onClose={() => onClose()} showDismissButton>
            <div className='row row-1'>
            {
                LANGUAGES_BY_COUNTRY.map((lng, i) => {
                    return (
                        <div className='col-12 col-md-6 col-xxl-4 mb-2 mb-md-4 px-2 language-item'  key={i} onClick={(e)=> { setLanguage(e, lng); }}>
                            <p className='text__grey-dark mb-0'>{lng["lng"]}</p>
                        </div>
                    )
                })
            }
            </div>
        </Modal>
    )
}

export default LanguagesModal;
