import React, { useState, useRef } from 'react';
import {useDispatch, useSelector} from "react-redux";
import ModalLogin from 'app/components/modals/ModalLogin';
import ModalRegister from 'app/components/modals/ModalRegister';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import LanguagesModal from './../modals/LanguagesModal';
import CurrenciesModal from './../modals/CurrenciesModal';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import actions from "../../../actions";
import {DRIVER_TYPE, TRAVELER_TYPE, LANGUAGES_BY_COUNTRY} from "../../../constants";
import { IconGlobe, IconCurrecy } from 'shared/components/Icons';

const HeaderUnauthorized = () => {
  const dispatch = useDispatch();
  const {travelerData, config} = useSelector(state => state);
  const { t } = useTranslation();
  const themeLight = window.location.pathname.includes('home');

  const container1 = useRef();
  const container2 = useRef();

  const [showInHeader, setShowInHeader] = useState(window.innerWidth >= 768 ? true: false);
  const [openLanguagePopup, setOpenLanguagePopup] = useState(false);
  const [openCurrencyPopup, setOpenCurrencyPopup] = useState(false);

  useOutsideClick(container1, () => setOpenLanguagePopup(false));
  useOutsideClick(container2, () => setOpenCurrencyPopup(false));

  window.addEventListener("resize", (e) => {
    if(window.innerWidth >= 768){
        setShowInHeader(true);
    } else {
        setShowInHeader(false);
    }
  });

  const {
    showSignIn,
    showSignUp,
  } = travelerData;
  const {lang, currency} = config;

  return (
    <>
      <div className='d-flex align-items-center'>
        {/* Desktop Menu */}
        <nav className='d-none d-md-block'>
          <ul className='no-list-style d-flex align-items-center mb-0'>
            {showInHeader && <li className='mr-lg-2'>
              <div className='lang_curr_text_icon position-relative d-inline-flex'>
                <IconGlobe fill={themeLight ? '#fff' : '#000'} />
                <span
                  className={`pointer text-nowrap px-1${themeLight ? ' text-white' : ''}`}
                  onClick={() => setOpenLanguagePopup(true)}
                  role='presentation'
                >{lang ? LANGUAGES_BY_COUNTRY[lang]: LANGUAGES_BY_COUNTRY[localStorage.getItem('lang')] || 'English'}</span>
              </div>
            </li>}
            {showInHeader && <li>
              <div className='lang_curr_text_icon position-relative d-inline-flex'>
                <IconCurrecy curr_code={currency ? currency: localStorage.getItem('currency') || null} fill={themeLight ? '#fff' : '#000'} />
                <span
                  className={`pointer text-nowrap px-1${themeLight ? ' text-white' : ''}`}
                  onClick={() => setOpenCurrencyPopup(true)}
                  role='presentation'
                >{currency? currency : localStorage.getItem('currency') || 'USD'}</span>
              </div>
            </li>}
            <li className='mr-4 mr-lg-4'>
              <Link to='/driverRegister' className={`btn weight-400 btn-md${themeLight ? ' btn-text-white' : ''}`} onClick={(e) => {
                e.preventDefault();
                !showSignIn && dispatch(actions.showHideSignUp(true));
                dispatch(actions.setRegisteredUserType(DRIVER_TYPE));
                window.location.hash = 'modal'
              }}>{t('home_page.top_menu.become_driver')}</Link>
            </li>
          </ul>
        </nav>
        <div className='text-nowrap'>
          <button className={`btn btn-md btn-normal mr-2 mr-lg-4 btn-${themeLight ? 'white' : 'primary'}`}
                  onClick={() => {
                    !showSignIn && dispatch(actions.showHideSignUp(true));
                    dispatch(actions.setRegisteredUserType(TRAVELER_TYPE));
                    window.location.hash = 'modal'
          }}>{t('home_page.top_menu.sign_up')}</button>
          <button className={`btn btn-md btn-normal btn-outline-${themeLight ? 'white' : 'black'}`} onClick={() => {!showSignUp && dispatch(actions.showHideSignIn(true)); window.location.hash = 'modal'}}>{t('home_page.top_menu.login')}</button>
        </div>
      </div>
      {showSignIn && <ModalLogin onClose={() => dispatch(actions.showHideSignIn(false))} />}
      {showSignUp && <ModalRegister onClose={() => dispatch(actions.showHideSignUp(false))} />}
      { openLanguagePopup && <LanguagesModal onClose={()=> setOpenLanguagePopup(false)} />}
      { openCurrencyPopup && <CurrenciesModal onClose={()=> setOpenCurrencyPopup(false)} />}
    </>
  );
};

export default HeaderUnauthorized;
