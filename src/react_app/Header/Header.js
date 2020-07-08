import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {DRIVER_TYPE, TRAVELER_TYPE} from "../constants";
import _ from "lodash";

import actions from "../actions";

function Header(props) {
    const dispatch = useDispatch();
    const {travelerData, config} = useSelector(state => state);
    const {page} = props;

    useEffect(() => {
        if (localStorage.userType && localStorage.userType === TRAVELER_TYPE) {
            dispatch(actions.setUserType(TRAVELER_TYPE));
        } else if (localStorage.userType && localStorage.userType === DRIVER_TYPE) {
            dispatch(actions.setUserType(DRIVER_TYPE));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (localStorage.userType) {
            dispatch(actions.profileInfoRequest(localStorage.id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logOut = () => {
        dispatch(actions.logOut());
        delete localStorage.userType;
        delete localStorage.id;
    };


    const {
        showSignIn,
        showSignUp,
        user_info={},
        profile={},
    } = travelerData;



    const {user={}} = user_info;
    const {name} = !_.isEmpty(profile) ? profile : user;

    const {userType} = config;

        return (
            <header className={`${page ? "header-border" : ""}`}>
                <div className="header-left-side">
                    <div className="daytrip"><span className={`${page ? "blue-color" : "white-color"}`}><Link to="/">DAYTRIP</Link></span></div>
                    <div className="search-place">
                        <div className={`${page ? "search-icon-black" : "search-icon-white"}`}></div>
                        <input type="text" className={`search-text ${page ? "search-text-grey" : "search-text-white"}`} placeholder="Search for place" />
                    </div>
                </div>
                <div className="header-right-side">
                    {
                        userType === TRAVELER_TYPE ?
                            <div className="traveler-menu">
                                <div className="home">
                                    <Link to="/">
                                        <span className={`icon ${page ? "icon-black" : "icon-white"}`}></span>
                                        <span className={`text ${page ? "text-black" : "text-white"}`}>Home</span>
                                    </Link>
                                </div>
                                <div className="saved">
                                    <span className={`icon ${page ? "icon-black" : "icon-white"}`}></span>
                                    <span className={`text ${page ? "text-black" : "text-white"}`}>Saved</span>
                                </div>
                                <div className="trips">
                                    <span className={`icon ${page ? "icon-black" : "icon-white"}`}></span>
                                    <span className={`text ${page ? "text-black" : "text-white"}`}>Trips</span>
                                </div>
                                <div className="messages">
                                    <span className={`icon ${page ? "icon-black" : "icon-white"}`}></span>
                                    <span className={`text ${page ? "text-black" : "text-white"}`}>Messages</span>

                                </div>
                                <div className="profile">
                                    <span className={`icon ${page ? "icon-black" : "icon-white"}`}></span>
                                    <span className={`text ${page ? "text-black" : "text-white"} fadeout-name`}>{name}</span>

                                    <div className="dropdown">
                                        <ul>
                                            <li><a href="http://google.com">Profile</a></li>
                                            <li><Link to="/account" onClick={() => window.location.pathname === "/account" && window.location.reload()}>Account</Link></li>
                                            <li><a href="http://google.com">Refer a Friends</a></li>
                                            <li><a href="http://google.com">Switch to Driver</a></li>
                                            <li><a href="http://google.com">$ USD</a></li>
                                            <li><a href="http://google.com">ENG</a></li>
                                            <li><a href="http://google.com">Help</a></li>
                                            <li><Link to="/" onClick={() => logOut()}>Log Out</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            :
                            <React.Fragment>
                                <div className="language">
                                    <select>
                                        <option value="en">ENG</option>
                                        <option value="ru">RUS</option>
                                        <option value="am">ARM</option>
                                    </select>
                                </div>
                                <div className="currency">
                                    <span className="currency-icon">$</span>
                                    <select>
                                        <option value="en">USD</option>
                                        <option value="ru">RUB</option>
                                        <option value="am">AMD</option>
                                    </select>
                                </div>
                                <div className="become-driver" onClick={() => {
                                    !showSignIn && dispatch(actions.showHideSignUp(true));
                                    dispatch(actions.setRegisteredUserType(DRIVER_TYPE));
                                }}>Become a Driver</div>
                                <div className="sign-up" onClick={() => {
                                    !showSignIn && dispatch(actions.showHideSignUp(true));
                                    dispatch(actions.setRegisteredUserType(TRAVELER_TYPE));
                                }}><span>Sign Up</span></div>
                                <div className="login" onClick={() => !showSignUp && dispatch(actions.showHideSignIn(true))}><span>Login</span></div>
                            </React.Fragment>
                    }
                </div>
            </header>
        );
}

export default Header;