import React, { useState } from 'react';

import SignIn from "./SignIn";
import SignUp from "./SignUp/SignUp";

function Home(props) {

    const [signIn, showSignIn] = useState(false);
    const [signUp, showSignUp] = useState(false);

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
                    <header>
                        <div className="header-left-side">
                            <div className="daytrip"><span>DAYTRIP</span></div>
                            <div className="search-place">
                                <div className="search-icon"></div>
                                <input type="text" className="search-text" placeholder="Search for place" />
                            </div>
                        </div>
                        <div className="header-right-side">
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
                            <div className="sign-up" onClick={() => !signIn && showSignUp(true)}><span>Sign Up</span></div>
                            <div className="login" onClick={() => !signUp && showSignIn(true)}><span>Login</span></div>
                        </div>
                    </header>
                    {
                        signIn && <SignIn showSignIn={showSignIn} />
                    }
                    {
                        signUp && <SignUp showSignUp={showSignUp} />
                    }

                </div>
                <footer>
                    <h2 className="top-choices">Top Choices</h2>
                </footer>
            </div>
        );
}

export default Home;