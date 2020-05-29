import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import actions from "../actions";

class Header extends React.Component {
    render() {
        const {
            dayTrip,
            showHideSignIn,
            showHideSignUp
        } = this.props;

        const {
            isTraveler,
            showSignIn,
            showSignUp
        } = dayTrip;

        return (
            <header>
                <div className="header-left-side">
                    <div className="daytrip"><span>DAYTRIP</span></div>
                    <div className="search-place">
                        <div className="search-icon"></div>
                        <input type="text" className="search-text" placeholder="Search for place" />
                    </div>
                </div>
                <div className="header-right-side">
                    {
                        isTraveler ?
                            <div className="traveler-menu">
                                <div className="home">
                                    <span className="icon"></span>
                                    <span className="text">Home</span>
                                </div>
                                <div className="saved">
                                    <span className="icon"></span>
                                    <span className="text">Saved</span>
                                </div>
                                <div className="trips">
                                    <span className="icon"></span>
                                    <span className="text">Trips</span>
                                </div>
                                <div className="messages">
                                    <span className="icon"></span>
                                    <span className="text">Messages</span>

                                </div>
                                <div className="profile">
                                    <span className="icon"></span>
                                    <span className="text"><a href={() => {}} aria-haspopup="true">John</a></span>

                                    <div className="dropdown">
                                        <ul>
                                            <li><a href={() => {}}>Profile</a></li>
                                            <li><a href={() => {}}>Account</a></li>
                                            <li><a href={() => {}}>Refer a Friends</a></li>
                                            <li><a href={() => {}}>Switch to Driver</a></li>
                                            <li><a href={() => {}}>$ USD</a></li>
                                            <li><a href={() => {}}>ENG</a></li>
                                            <li><a href={() => {}}>Help</a></li>
                                            <li><a href={() => {}}>Log Out</a></li>
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