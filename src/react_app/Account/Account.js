import React, {useState} from 'react';
import {useSelector} from "react-redux";
import Header from "../Header/Header";
import Footer from "../Footer";
import PersonalInfo from "./PersonalInfo";
import LoginSecurity from "./LoginSecurity";
import "./account.scss";
// import actions from "../actions";


const PERSONAL = "PERSONAL";
const LOGIN = "LOGIN";
const PAYMENTS = "PAYMENTS";

function Account(props) {
    // const dispatch = useDispatch();
    const {
        isTraveler,
        // user_info,
        // profile={}
    } = useSelector(state => state.dayTrip);

    // const {id} = user_info.user;
    // const {name} = profile;

    const [type, setType] = useState("");

    function renderSegment() {
        switch (type) {
            case PERSONAL:
                return <PersonalInfo />;
            case LOGIN:
                return <LoginSecurity />;
            case PAYMENTS:
                return <h1>Coming soon...</h1>;
            default:
                return null;
        }
    }

    // TODO Khachatur
    // useEffect(() => {
    //     console.log("use effect");
    //     dispatch(actions.profileInfoRequest(id));
    // }, []);

    return (
        <div id="page">
            <Header page="account" />

            <div className="account-content">
                { !type ?
                    <React.Fragment>
                        <div className="account-title">
                            <span className="title">Account</span>
                            <div className="account-user">
                                <span className="user-name">John Smith</span>
                                <span className="go-to-profile">Go To Profile</span>
                            </div>
                        </div>

                        <div className="account-segments">
                            <div className="personal-info" onClick={() => setType(PERSONAL)}>
                                <div className="icon"></div>
                                <div className="title">Personal Info</div>
                                <div className="description">Provide personal details and how we can reach you</div>
                            </div>

                            <div className="login-security" onClick={() => setType(LOGIN)}>
                                <div className="icon"></div>
                                <div className="title">Login & Security</div>
                                <div className="description">Update your password and secure your account</div>
                            </div>
                            <div className="payments-payouts" onClick={() => setType(PAYMENTS)}>
                                <div className="icon"></div>
                                <div className="title">Payments & Payouts</div>
                                <div className="description">Review payments, payouts</div>
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        {
                            renderSegment()
                        }
                    </React.Fragment>
                }
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