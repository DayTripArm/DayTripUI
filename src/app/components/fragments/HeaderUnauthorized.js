import React, { useState, useRef } from 'react';
import {useDispatch, useSelector} from "react-redux";
import ModalLogin from 'app/components/modals/ModalLogin';
import ModalRegister from 'app/components/modals/ModalRegister';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import LanguagesModal from './../modals/LanguagesModal';
import CurrenciesModal from './../modals/CurrenciesModal';
import { Link } from 'react-router-dom';
import actions from "../../../actions";
import {DRIVER_TYPE, TRAVELER_TYPE} from "../../../constants";

const HeaderUnauthorized = () => {
  const dispatch = useDispatch();
  const {travelerData, config} = useSelector(state => state);

  const themeLight = window.location.pathname.includes('home');

  const container1 = useRef();
  const container2 = useRef();

  const [openLanguagePopup, setOpenLanguagePopup] = useState(false);
  const [openCurrencyPopup, setOpenCurrencyPopup] = useState(false);

  useOutsideClick(container1, () => setOpenLanguagePopup(false));
  useOutsideClick(container2, () => setOpenCurrencyPopup(false));

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
            {window.innerWidth >= 768 && <li className='mr-lg-2'>
              <div className='position-relative d-inline-flex'>
                <span
                  className={`pointer text-nowrap px-3${themeLight ? ' text-white' : ''}`}
                  onClick={() => setOpenLanguagePopup(true)}
                  role='presentation'
                >{lang ? lang: localStorage.getItem('lang') || 'Language'}</span>
              </div>
            </li>}
            {window.innerWidth >= 768 && <li>
              <div className='position-relative d-inline-flex'>
                <span
                  className={`pointer text-nowrap px-3${themeLight ? ' text-white' : ''}`}
                  onClick={() => setOpenCurrencyPopup(true)}
                  role='presentation'
                >{currency? currency : localStorage.getItem('currency') || 'Currency'}</span>
              </div>
            </li>}
            <li className='mr-4 mr-lg-4'>
              <Link to='/driverRegister' className={`btn weight-400 btn-md${themeLight ? ' btn-text-white' : ''}`} onClick={(e) => {
                e.preventDefault();
                !showSignIn && dispatch(actions.showHideSignUp(true));
                dispatch(actions.setRegisteredUserType(DRIVER_TYPE));
                window.location.hash = 'modal'
              }}>Become a Driver</Link>
            </li>
          </ul>
        </nav>
        <div className='text-nowrap'>
          <button className={`btn btn-md btn-normal mr-2 mr-lg-4 btn-${themeLight ? 'white' : 'primary'}`}
                  onClick={() => {
                    !showSignIn && dispatch(actions.showHideSignUp(true));
                    dispatch(actions.setRegisteredUserType(TRAVELER_TYPE));
                    window.location.hash = 'modal'
          }}>Sign Up</button>
          <button className={`btn btn-md btn-normal btn-outline-${themeLight ? 'white' : 'black'}`} onClick={() => {!showSignUp && dispatch(actions.showHideSignIn(true)); window.location.hash = 'modal'}}>Login</button>
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
