import React from 'react';
import {useSelector} from "react-redux";

import Header from "./Header/Header";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

function Home(props) {

    const {
        isTraveler,
        showSignIn,
        showSignUp
    } = useSelector(state => state.dayTrip);

    return(
        <div id="page">
            <div className="explore">
                <h2>Be Flexible to Discover More</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vulputate augue purus</p>
                <div className="explore-button">
                    <span>Explore Daytrip</span>
                </div>
            </div>
            <div className="content">
                <Header />

                {showSignIn && <SignIn />}
                {showSignUp && <SignUp />}
            </div>
            <div className="main-content">
                {
                    isTraveler &&
                    <div className="menu-responsive">
                        <div className="home"></div>
                        <div className="saved"></div>
                        <div className="trips"></div>
                        <div className="messages"></div>
                    </div>
                }

                <div className="top-choices"></div>
                <div className="hit-the-road"></div>
                <div className="explore-all-day-trips"></div>
            </div>
            <footer>
                <span className="copyright">© Daytrip. All rights reserved.</span>
                <div className="wrapper">
                    <span className="terms-conditions"><a href={() => {}}>Terms & Conditions</a></span>
                    <span className="help"><a href={() => {}}>Help</a></span>
                    <div className="icons">
                        <span className="fb"> </span>
                        <span className="insta"> </span>
                        <span className="twitter"> </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;