import React, { useState, useEffect, useRef } from 'react';
import { IconArrowDown, IconArrowUp, IconZoom } from 'shared/components/Icons';
import {useDispatch, useSelector} from "react-redux";
import useOutsideClick from 'shared/hooks/useOutsideClick';
import Input from 'shared/components/Input';
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

    const HeaderSection = headerTypes[type];

    const [mobileSearchActive, setMobileSearchActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [openSearchDropdown, setOpenSearchDropdown] = useState(false);

    useOutsideClick(searchContainer, () => setMobileSearchActive(false));

    useEffect(() => {
        document.body.style.overflow = mobileMenuActive ? 'hidden' : 'unset';
    }, [mobileMenuActive]);

    if (hide) return null;

    return (
        <header className={`header header-default ${headerClasses[type]}${!themeLight ? ' border__bottom border__default' : ' theme-light'}`}>
            <div className='container'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        {/* Desktop Logo */}
                        <h3 className={`d-none d-md-inline-block mb-0 weight-400${themeLight ? ' text-white' : ' text__blue'}`}>DAYTRIP</h3>

                        {/* Mobile Logo and Menu Toggle */}
                        <button className={`d-md-none btn btn-circle btn-static btn-sm border-0${themeLight ? ' bg-transparent' : ''}`} onClick={() => setMobileMenuActive(!mobileMenuActive)}>
                            <h3 className={`text-nowrap mb-0 weight-400 ${themeLight ? ' text-white' : ' text__blue'}`}>
                                D
                                {mobileMenuActive ? (
                                    <IconArrowUp fill={themeLight ? '#FFFFFF' : '#100F72'} className='mobile-icon' />
                                ) : (
                                    <IconArrowDown fill={themeLight ? '#FFFFFF' : '#100F72'} className='mobile-icon'/>
                                )}
                            </h3>
                        </button>

                        {/* Mobile Search Toggle */}
                        <button className={`d-lg-none btn btn-circle btn-sm border-0${themeLight ? ' bg-transparent' : ''}`} onClick={() => setMobileSearchActive(!mobileSearchActive)}>
                            <IconZoom fill={themeLight ? '#FFFFFF' : '#757575'} className='mobile-icon' />
                        </button>

                        {/* Search Container */}
                        <div ref={searchContainer} className={`header-search py-3 py-lg-0 px-4 px-lg-0 d-lg-inline-flex${mobileSearchActive ? '' : ' d-none'}`}>
                            <Input
                                type='search'
                                name='field'
                                value=''
                                className='border-0'
                                containerClass='mb-0'
                                placeholder='Search Destinations'
                                onFocus={() => setOpenSearchDropdown(true)}
                                onBlur={() => setOpenSearchDropdown(false)}
                                icon={IconZoom}
                                iconPosition='left'
                            />
                            <div className={`dropdown${openSearchDropdown ? ' active' : ''}`}>
                                <ul className='dropdown-list no-list-style py-2 mb-0'>
                                    <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>
                                        <img
                                            width='38'
                                            height='32'
                                            src='https://d31qtdfy11mjj9.cloudfront.net/places/1511524295874407964.jpg'
                                            className='object-pos-center object-fit-cover bg__grey rounded__4 mr-2'
                                            alt='garni'
                                        />
                                        Item 1 with very long text lorem ipsum dolor sit amet conseptetur adisti...
                                    </li>
                                    <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>
                                        <img
                                            width='38'
                                            height='32'
                                            src='https://d31qtdfy11mjj9.cloudfront.net/places/1511524295874407964.jpg'
                                            className='object-pos-center object-fit-cover bg__grey rounded__4 mr-2'
                                            alt='garni'
                                        />
                                        Item 2
                                    </li>
                                    <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>
                                        <img
                                            width='38'
                                            height='32'
                                            src='https://d31qtdfy11mjj9.cloudfront.net/places/1511524295874407964.jpg'
                                            className='object-pos-center object-fit-cover bg__grey rounded__4 mr-2'
                                            alt='garni'
                                        />
                                        Item 3
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Mobile Menu */}
                        <nav className={`mobile-menu d-md-none${mobileMenuActive ? '' : ' d-none'}`}>
                            <ul className='no-list-style mb-0 px-4'>
                                <li className='py-5 border__bottom border__default'>Home</li>
                                <li className='py-5 border__bottom border__default'>English</li>
                                <li className='py-5 border__bottom border__default'>$USD</li>
                                <li className='py-5 border__bottom border__default' onClick={(e) => {
                                    e.preventDefault();
                                    !showSignIn && dispatch(actions.showHideSignUp(true));
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
