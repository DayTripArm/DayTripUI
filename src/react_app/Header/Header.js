import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import actions from "../actions";

class Header extends React.Component {
    render() {
        const {
            dayTrip,
            showHideSignIn,
            showHideSignUp,
            page
        } = this.props;

        const {
            isTraveler,
            showSignIn,
            showSignUp
        } = dayTrip;

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
                        isTraveler ?
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
                                            <li><a href="http://google.com">Log Out</a></li>
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
                                <div className="become-driver"><a href="http://google.com">Become a Driver</a></div>
                                <div className="sign-up" onClick={() => !showSignIn && showHideSignUp(true)}><span>Sign Up</span></div>
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
};

const mapStateToProps = state => ({
    dayTrip: state.dayTrip
});

const mapDispatchToProps = dispatch => ({
    showHideSignIn: (show) => dispatch(actions.showHideSignIn(show)),
    showHideSignUp: (show) => dispatch(actions.showHideSignUp(show)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);