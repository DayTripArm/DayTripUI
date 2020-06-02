import React from 'react';
import {useSelector} from "react-redux";
import Header from "./Header/Header";
import Footer from "./Footer";

function Account(props) {
    const {
        isTraveler,
    } = useSelector(state => state.dayTrip);

    return (
        <div id="page">
            <Header page="account" />

            <div className="account-content">
                <div className="account-title">
                    <span className="title">Account</span>
                    <div className="account-user">
                        <span className="user-name">John Smith</span>
                        <span className="go-to-profile">Go To Profile</span>
                    </div>
                </div>

                <div className="account-segments">
                    <div className="personal-info">
                        <div className="icon"></div>
                        <div className="title">Personal Info</div>
                        <div className="description">Provide personal details and how we can reach you</div>
                    </div>

                    <div className="login-security">
                        <div className="icon"></div>
                        <div className="title">Login & Security</div>
                        <div className="description">Update your password and secure your account</div>
                    </div>
                    <div className="payments-payouts">
                        <div className="icon"></div>
                        <div className="title">Payments & Payouts</div>
                        <div className="description">Review payments, payouts</div>
                    </div>
                </div>
            </div>

            <Footer />
            {
                isTraveler &&
                <div className="menu-responsive">
                    <div className="home"></div>
                    <div className="saved"></div>
                    <div className="trips"></div>
                    <div className="messages"></div>
                </div>
            }
        </div>
    );
}

export default Account;