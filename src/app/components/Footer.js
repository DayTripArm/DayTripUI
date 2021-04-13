/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { IconFbFilled, IconTwitter, IconInstagramOutlined, IconGlobe, IconCurrecy } from 'shared/components/Icons';
import LanguagesModal from './modals/LanguagesModal';
import CurrenciesModal from './modals/CurrenciesModal';
import {useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import {LANGUAGES_BY_COUNTRY} from "../../constants";

const Footer = () => {
  // Conditionally
  const {config} = useSelector(state => state);
  const { t } = useTranslation();
  const [showInFooter, setShowInFooter] = useState(localStorage.getItem('id') ? true: window.innerWidth >= 768 ? false: true);
  const [showSeparator, setShowSeparator] = useState(window.innerWidth < 768 ? false: true);
  const [openLanguagePopup, setOpenLanguagePopup] = useState(false);
  const [openCurrencyPopup, setOpenCurrencyPopup] = useState(false);
  window.addEventListener("resize", (e) => {
        if(window.innerWidth >= 768){
            setShowInFooter(localStorage.getItem('id') ? true: window.innerWidth >= 768 ? false: true);
            setShowSeparator(true);
        } else {
            setShowInFooter(localStorage.getItem('id') ? true: window.innerWidth >= 768 ? false: true);
            setShowSeparator(false);
        }
  });
  // For page or pages which contains sticky panel on the bottom (e.g. /individuals/driver or /tour)
  const pageContainsStickyPanel = /individuals|tour/.test(window.location.pathname);
    const {lang, currency} = config;
  return (
    <footer
      className={`footer border__top border__default py-5${
          showInFooter ? ' footer-spaced' : ''
      }${pageContainsStickyPanel ? '' : ' mt-15'}`}
    >
      <div className='container'>
        <div className='d-flex flex-column flex-md-row align-items-center justify-content-between'>
          <div className='d-flex align-items-center flex-column flex-md-row'>
              <p className='align-items-center mb-0 text__grey-dark mr-2 mr-md-3'>&copy; Daytrip. All rights reserved.</p>
              { showSeparator && <span className='text__grey-dark mr-2 mr-md-2'>-</span> }
              <div className='mb-3 mb-md-0'>
                  <Link to='/terms' className='text__grey-dark mr-2 mr-md-2'>
                  {t('footer.terms_conditions')}
                  </Link>
                  <span className='text__grey-dark mr-2 mr-md-2'> - </span>
                  <Link to='/help' className='text__grey-dark mr-md-6'>
                  {t('footer.help')}
                  </Link>
              </div>
          </div>
          <div className='d-flex align-items-center flex-column flex-md-row'>
            {
                showInFooter ?
                <div className='mb-3 mb-md-0'>
                  <a href='#modal' className='lang_curr_text_icon text__grey-dark mr-2' onClick={(e) => {e.preventDefault(); setOpenLanguagePopup(true); window.location.hash = "modal"}}>
                    <IconGlobe size="16" fill="#757575" />
                    <span className="pointer text-nowrap px-1">{lang ? LANGUAGES_BY_COUNTRY[lang]: LANGUAGES_BY_COUNTRY[localStorage.getItem('lang')] || 'ENG'} </span>
                  </a>
                  <a href='#modal' className='lang_curr_text_icon text__grey-dark mr-2' onClick={(e) => {e.preventDefault(); setOpenCurrencyPopup(true); window.location.hash = "modal"}}>
                    <IconCurrecy curr_code={currency ? currency: localStorage.getItem('currency') || null} fill="#757575" />
                    <span className="pointer text-nowrap px-1">{currency ? currency: localStorage.getItem('currency') || 'USD'}</span>
                  </a>
                </div> : <></>
            }
            <div className='mb-3 mb-md-0'>
              <a href='#' className='mr-2'>
                <IconFbFilled />
              </a>
              <a href='#' className='mr-2'>
                <IconInstagramOutlined />
              </a>
              <a href='#' className='mr-2'>
                <IconTwitter />
              </a>
            </div>
          </div>
        </div>
        { openLanguagePopup && <LanguagesModal onClose={()=> setOpenLanguagePopup(false)}/>}
        { openCurrencyPopup && <CurrenciesModal onClose={()=> setOpenCurrencyPopup(false)}/>}
      </div>
    </footer>
  );
};

export default Footer;
