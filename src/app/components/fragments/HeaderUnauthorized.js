import React, { useState, useRef } from 'react';
import {useDispatch, useSelector} from "react-redux";
import ModalLogin from 'app/components/modals/ModalLogin';
import ModalRegister from 'app/components/modals/ModalRegister';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import { IconArrowDown, IconArrowUp } from 'shared/components/Icons';
import { Link } from 'react-router-dom';
import actions from "../../../actions";
import {DRIVER_TYPE, TRAVELER_TYPE} from "../../../constants";

const HeaderUnauthorized = () => {
  const dispatch = useDispatch();
  const {travelerData} = useSelector(state => state);

  const themeLight = window.location.pathname.includes('home');

  const container1 = useRef();
  const container2 = useRef();

  const [openDropdown1, setOpenDropdown1] = useState(false);
  const [openDropdown2, setOpenDropdown2] = useState(false);

  useOutsideClick(container1, () => setOpenDropdown1(false));
  useOutsideClick(container2, () => setOpenDropdown2(false));

  const {
    showSignIn,
    showSignUp,
  } = travelerData;


  return (
    <>
      <div className='d-flex align-items-center'>
        {/* Desktop Menu */}
        <nav className='d-none d-md-block'>
          <ul className='no-list-style d-flex align-items-center mb-0'>
            <li className='mr-lg-2'>
              <div ref={container1} className='position-relative d-inline-flex'>
                <span
                  className={`pointer text-nowrap px-3${themeLight ? ' text-white' : ''}`}
                  onClick={() => setOpenDropdown1(!openDropdown1)}
                  role='presentation'
                >
                  ENG
                  {openDropdown1 ? (
                    <IconArrowUp fill={themeLight ? '#FFFFFF' : '#090925'} />
                  ) : (
                    <IconArrowDown fill={themeLight ? '#FFFFFF' : '#090925'} />
                  )}
                </span>
                <div className={`dropdown${openDropdown1 ? ' active' : ''}`}>
                  <ul className='dropdown-list no-list-style py-2 mb-0 text-center'>
                    <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>ENG</li>
                    <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>RUS</li>
                    <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>ARM</li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <div ref={container2} className='position-relative d-inline-flex'>
                <span
                  className={`pointer text-nowrap px-3${themeLight ? ' text-white' : ''}`}
                  onClick={() => setOpenDropdown2(!openDropdown2)}
                  role='presentation'
                >
                  $ USD
                  {openDropdown2 ? (
                    <IconArrowUp fill={themeLight ? '#FFFFFF' : '#090925'} />
                  ) : (
                    <IconArrowDown fill={themeLight ? '#FFFFFF' : '#090925'} />
                  )}
                </span>
                <div className={`dropdown${openDropdown2 ? ' active' : ''}`}>
                  <ul className='dropdown-list no-list-style py-2 mb-0 text-center'>
                    <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>ENG</li>
                    <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>RUS</li>
                    <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>ARM</li>
                  </ul>
                </div>
              </div>
            </li>
            <li className='mr-4 mr-lg-4'>
              <Link to='/driverRegister' className={`btn weight-400 btn-md${themeLight ? ' btn-text-white' : ''}`} onClick={(e) => {
                e.preventDefault();
                !showSignIn && dispatch(actions.showHideSignUp(true));
                dispatch(actions.setRegisteredUserType(DRIVER_TYPE));
              }}>Become a Driver</Link>
            </li>
          </ul>
        </nav>
        <div className='text-nowrap'>
          <button className={`btn btn-md btn-normal mr-2 mr-lg-4 btn-${themeLight ? 'white' : 'primary'}`}
                  onClick={() => {
                    !showSignIn && dispatch(actions.showHideSignUp(true));
                    dispatch(actions.setRegisteredUserType(TRAVELER_TYPE));
          }}>Sign Up</button>
          <button className={`btn btn-md btn-normal btn-outline-${themeLight ? 'white' : 'black'}`} onClick={() => !showSignUp && dispatch(actions.showHideSignIn(true))}>Login</button>
        </div>
      </div>
      {showSignIn && <ModalLogin onClose={() => dispatch(actions.showHideSignIn(false))} />}
      {showSignUp && <ModalRegister onClose={() => dispatch(actions.showHideSignUp(false))} />}
    </>
  );
};

export default HeaderUnauthorized;
