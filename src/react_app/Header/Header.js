import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {DRIVER_TYPE, TRAVELER_TYPE} from "../constants";

import actions from "../actions";

class Header extends React.Component {

    componentDidMount() {
        if (localStorage.userType && localStorage.userType === TRAVELER_TYPE) {
            this.props.setUserType(TRAVELER_TYPE);
        } else if (localStorage.userType && localStorage.userType === DRIVER_TYPE) {
            this.props.setUserType(DRIVER_TYPE);
        }
    }

    logOut() {
        this.props.logOut();
        delete localStorage.userType;
    }

    render() {
        const {
            travelerData,
            showHideSignIn,
            showHideSignUp,
            page,
            config
        } = this.props;

        const {
            showSignIn,
            showSignUp
        } = travelerData;

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
                                    <span className={`text ${page ? "text-black" : "text-white"}`}>John</span>

                                    <div className="dropdown">
                                        <ul>
                                            <li><a href="http://google.com">Profile</a></li>
                                            <li><Link to="/account" onClick={() => window.location.pathname === "/account" && window.location.reload()}>Account</Link></li>
                                            <li><a href="http://google.com">Refer a Friends</a></li>
                                            <li><a href="http://google.com">Switch to Driver</a></li>
                                            <li><a href="http://google.com">$ USD</a></li>
                                            <li><a href="http://google.com">ENG</a></li>
                                            <li><a href="http://google.com">Help</a></li>
                                            <li><Link to="/" onClick={() => this.logOut()}>Log Out</Link></li>
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
                                    !showSignIn && showHideSignUp(true);
                                    this.props.setRegisteredUserType(DRIVER_TYPE);
                                }}>Become a Driver</div>
                                <div className="sign-up" onClick={() => {
                                    !showSignIn && showHideSignUp(true);
                                    this.props.setRegisteredUserType(TRAVELER_TYPE);
                                }}><span>Sign Up</span></div>
                                <div className="login" onClick={() => !showSignUp && showHideSignIn(true)}><span>Login</span></div>
                            </React.Fragment>
                    }
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    state: PropTypes.object,
    page: PropTypes.string,
    showHideSignIn: PropTypes.func,
    showHideSignUp: PropTypes.func,
    setUserType: PropTypes.func,
};

const mapStateToProps = state => ({
    travelerData: state.travelerData,
    config: state.config,
});

const mapDispatchToProps = dispatch => ({
    showHideSignIn: (show) => dispatch(actions.showHideSignIn(show)),
    showHideSignUp: (show) => dispatch(actions.showHideSignUp(show)),
    setUserType: (userType) => dispatch(actions.setUserType(userType)),
    setRegisteredUserType: (userType) => dispatch(actions.setRegisteredUserType(userType)),
    logOut: (userType) => dispatch(actions.logOut()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);