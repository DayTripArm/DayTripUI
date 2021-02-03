import React, { useState, useEffect, useRef } from 'react';
import { IconArrowDown, IconArrowUp, IconZoom } from 'shared/components/Icons';
import SelectCustomSearch from "../../shared/components/SelectCustomSearch";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import useOutsideClick from 'shared/hooks/useOutsideClick';
import HeaderUnauthorized from './fragments/HeaderUnauthorized';
import HeaderAuthorized from './fragments/HeaderAuthorized';
import actions from "../../actions";
import {DRIVER_TYPE} from "../../constants";

const headerTypes = {
    unauthorized: HeaderUnauthorized,
    authorized: HeaderAuthorized,
};

const Header = ({ type = 'unauthorized', navigationType = 'user' }) => {
    const themeLight = window.location.pathname.includes('home');
    const hide = window.location.pathname.includes('driverRegister');

    const dispatch = useDispatch();
    const {travelerData} = useSelector(state => state);

    const {
        showSignIn,
    } = travelerData;

    const headerClasses = {
        unauthorized: themeLight ? 'py-4' : 'py-3',
        user: 'pt-3',
        driver: 'pt-3',
    };

    const searchContainer = useRef();
    const history = useHistory();

    const HeaderSection = headerTypes[type];
    const authorized = (type === 'unauthorized')? false : true;

    const [mobileSearchActive, setMobileSearchActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [openSearchDropdown, setOpenSearchDropdown] = useState(false);

    useOutsideClick(searchContainer, () => setMobileSearchActive(false));

    useEffect(() => {
        document.body.style.overflow = mobileMenuActive ? 'hidden' : 'unset';
    }, [mobileMenuActive]);

    if (hide) return null;

    return (
        <header className={`header header-default ${headerClasses[type]}${!themeLight ? ' border__bottom border__default' : ' theme-light'} ${window.location.pathname.includes('tour') ? 'static-header': ''}`}>
            <div className='container'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        {/* Desktop Logo */}
                        <h3 className={`d-none d-md-inline-block mb-0 weight-400${themeLight ? ' text-white' : ' text__blue'}`}>DAYTRIP</h3>

                        {/* Mobile Logo and Menu Toggle */}
                        <button className={`d-md-none btn btn-circle btn-static btn-sm border-0${themeLight ? ' bg-transparent' : ''}`} onClick={() => !authorized ? setMobileMenuActive(!mobileMenuActive) : () => false}>
                            <h3 className={`text-nowrap mb-0 weight-400 ${themeLight ? ' text-white' : ' text__blue'}`}>
                                D
                                {!authorized ? (mobileMenuActive ? (
                                    <IconArrowUp fill={themeLight ? '#FFFFFF' : '#100F72'} className='mobile-icon' />
                                ) : (
                                    <IconArrowDown fill={themeLight ? '#FFFFFF' : '#100F72'} className='mobile-icon'/>
                                )): null}
                            </h3>
                        </button>

                        {/* Mobile Search Toggle */}
                        <button className={`d-lg-none btn btn-circle btn-sm border-0${themeLight ? ' bg-transparent' : ''}`} onClick={() => setMobileSearchActive(!mobileSearchActive)}>
                            <IconZoom fill={themeLight ? '#FFFFFF' : '#757575'} className='mobile-icon' />
                        </button>

                        {/* Search Container */}
                        <SelectCustomSearch
                            mobileSearchActive={mobileSearchActive}
                            setOpenSearchDropdown={setOpenSearchDropdown}
                            openSearchDropdown={openSearchDropdown}
                            searchContainer={searchContainer}
                        />
                        {/* Mobile Menu */}
                        <nav className={`mobile-menu d-md-none${mobileMenuActive ? '' : ' d-none'}`}>
                            <ul className='no-list-style mb-0 px-4'>
                                <li className='py-5 border__bottom border__default'onClick={(e) => {
                                    e.preventDefault();
                                    setMobileMenuActive(false);
                                    history.push("/home");
                                }}>Home</li>
                                <li className='py-5 border__bottom border__default' onClick={(e) => {
                                    e.preventDefault();
                                    !showSignIn && dispatch(actions.showHideSignUp(true));
                                    setMobileMenuActive(false);
                                    dispatch(actions.setRegisteredUserType(DRIVER_TYPE));
                                }}>Become a Driver</li>
                            </ul>
                        </nav>
                    </div>
                    <HeaderSection type={navigationType} />
                </div>
            </div>
        </header>
    );
};

export default Header;
