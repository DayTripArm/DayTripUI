/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { IconFbFilled, IconTwitter, IconInstagramOutlined, IconGlobe, IconCurrecy } from 'shared/components/Icons';
import LanguagesModal from './modals/LanguagesModal';
import CurrenciesModal from './modals/CurrenciesModal';
import {useSelector} from "react-redux";

const Footer = () => {
  // Conditionally
  const {config} = useSelector(state => state);
  const [showInFooter, setShowInFooter] = useState(localStorage.getItem('id') ? true: window.innerWidth >= 768 ? false: true);
  const [openLanguagePopup, setOpenLanguagePopup] = useState(false);
  const [openCurrencyPopup, setOpenCurrencyPopup] = useState(false);
  window.addEventListener("resize", (e) => {
        if(window.innerWidth >= 768){
            setShowInFooter(localStorage.getItem('id') ? true: window.innerWidth >= 768 ? false: true);
        } else {
            setShowInFooter(localStorage.getItem('id') ? true: window.innerWidth >= 768 ? false: true);
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
          {
            showInFooter ?
            <div className='mb-5 mb-md-0'>
              <a href='#modal' className='text__grey-dark mr-3' onClick={(e) => {e.preventDefault(); setOpenLanguagePopup(true); window.location.hash = "modal"}}>
                <IconGlobe />
                <span className="">{lang ? lang: localStorage.getItem('lang') || 'ENG'} </span>
              </a>
              <a href='#modal' className='text__grey-dark mr-3' onClick={(e) => {e.preventDefault(); setOpenCurrencyPopup(true); window.location.hash = "modal"}}>
                <IconCurrecy curr_code={currency ? currency: localStorage.getItem('currency') || null} />
                <span className="">{currency ? currency: localStorage.getItem('currency') || 'USD'}</span>
              </a>
            </div> : <></>
          }
          <p className='mb-0 order-2 order-md-0'>&copy; Daytrip. All rights reserved.</p>
          <div className='d-flex align-items-center flex-column flex-md-row'>
            <div className='mb-5 mb-md-0'>
              <Link to='/terms' className='text__grey-dark mr-4 mr-md-6'>
                Terms & Conditions
              </Link>
              <Link to='/help' className='text__grey-dark mr-md-6'>
                Help
              </Link>
            </div>
            <div className='mb-5 mb-md-0'>
              <a href='#' className='mr-3'>
                <IconFbFilled />
              </a>
              <a href='#' className='mr-3'>
                <IconInstagramOutlined />
              </a>
              <a href='#' className='mr-3'>
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
