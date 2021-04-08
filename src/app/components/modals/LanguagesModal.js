import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'shared/components/Modal'
import {useDispatch} from "react-redux";
import actions from "../../../actions";
import {LANGUAGES_BY_COUNTRY} from '../../../constants';

const LanguagesModal = ({onClose}) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    function setLanguage(e, locale){
        localStorage.setItem('lang', locale);
        dispatch(actions.setLanguage(locale));
        i18n.changeLanguage(locale);
        onClose();
    }
    return (
         <Modal title={t("commons.choose_lang")} onClose={() => onClose()} showDismissButton>
            <div className='row row-1'>
            {
                Object.keys(LANGUAGES_BY_COUNTRY).map((lng, i) => {
                    return (
                        <div className='col-12 col-md-6 col-xxl-4 mb-2 mb-md-4 px-2 language-item'  key={i} onClick={(e)=> { setLanguage(e, lng); }}>
                            <p className='text__grey-dark mb-0'>{LANGUAGES_BY_COUNTRY[lng]}</p>
                        </div>
                    )
                })
            }
            </div>
        </Modal>
    )
}

export default LanguagesModal;
