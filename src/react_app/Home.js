import React from 'react';
import {useSelector} from "react-redux";

import Header from "./Header/Header";
import Footer from "./Footer";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import {TRAVELER_TYPE} from "./constants";

function Home(props) {

    const {travelerData, config} = useSelector(state => state);
    const {
        showSignIn,
        showSignUp
    } = travelerData;

    const {userType} = config;

    return(
        <React.Fragment>
            <div className={`overlay ${(showSignIn || showSignUp) ? "display-block" : ""}`}></div>
            <div id="page">
                <div className="explore">
                    <h1>Be Flexible to Discover More</h1>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vulputate augue purus</h4>
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
                        userType ===  TRAVELER_TYPE &&
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

                <Footer />
            </div>
        </React.Fragment>
    );
}

export default Home;