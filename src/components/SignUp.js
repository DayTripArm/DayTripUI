import React, {useState} from 'react';
import FormInputText from "./Form/FormInputText";
import FormButton from "./Form/FormButton";
import FacebookLogin from 'react-facebook-login';

import GoogleLogin from 'react-google-login';

import {makeStyles} from "@material-ui/core/styles";
import { indigo } from '@material-ui/core/colors';
import axios from "axios";
import base_urls from "../base_urls";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#FE4C30',
        borderRadius: "4px",
        marginTop: "30px",
        width: "328px",
        height: "48px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#FFFFFF",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        '&:hover': {
            backgroundColor: '#E24432'
        },
        '&:active': {
            boxShadow: 'none'
        }
    },
    facebook: {
        backgroundColor: indigo[500],
        borderRadius: "4px",
        width: "328px",
        height: "48px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#FFFFFF",
        letterSpacing: "0.05em",
        marginTop: "25px",
        textTransform: "uppercase",
        '&:hover': {
            backgroundColor: indigo[800]
        },
        '&:active': {
            boxShadow: 'none'
        }
    },

    google: {
        backgroundColor: "#FFFFFF",
        borderRadius: "4px",
        border: "1px solid #BDBDBD",
        width: "328px",
        height: "48px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#757575",
        marginTop: "15px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        '&:active': {
            boxShadow: 'none'
        },
        '&:hover': {
            backgroundColor: "#ECECEC"
        },
    },

}));

function SignUp(props) {
    const { showSignUp } = props;
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const classes = useStyles();

    const responseFacebook = (response) => {
        console.log(response);
    };

    const responseGoogle = (response) => {
        console.log(response);
    };

    function signUp() {
        const body = {
            name,
            phone,
            email,
            password
        };

        try {
            axios.post(base_urls.day_trip.sign_up, body)
                .then(response => {
                    showSignUp(false);
                }).catch(error => {
                    console.log(" err ", error.response);
                });
        } catch (e) {
            console.log(" err ", e.response);
        }
    }

    return (
        <div className="log-in-form" style={{minHeight: "710px"}}>
            <header>
                <span>Please Sign Up</span>
                <div className="close" onClick={() => showSignUp(false)}></div>
            </header>
            <form action="#" method="post">
                <React.Fragment>
                    <FormInputText
                        onChange={(e) => setName(e.target.value)}
                        label="Name*"
                        name="name"
                        placeholder="e.g Jogn Smith"
                        value={name}
                    />
                    <FormInputText
                        onChange={(e) => {setPhone(e.target.value)}}
                        label="Phone*"
                        name="phone"
                        placeholder="Type Your Number"
                        className={["marginTop25"]}
                        value={phone}
                    />
                    <FormInputText
                        onChange={(e) => {setEmail(e.target.value)}}
                        label="Email*"
                        email="email"
                        placeholder="Enter your Email"
                        className={["marginTop25"]}
                        value={email}
                    />
                    <FormInputText
                        onChange={(e) => {setPassword(e.target.value)}}
                        label="Password*"
                        name="password"
                        placeholder="Enter your Password"
                        className={["marginTop25"]}
                        password={true}
                        value={password}
                    />
                </React.Fragment>

                <FormButton label="sign up" customClass={classes.button} onClick={() => signUp()}/>

                <div className="or"></div>

                <FacebookLogin
                    appId={process.env.REACT_APP_FB_API_KEY}
                    fields="name,email,picture"
                    scope="public_profile,email"
                    callback={responseFacebook}
                    textButton="Login with facebook"
                    cssClass={classes.facebook}
                />

                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Login with google"
                    fields="select_account"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    className={classes.google}
                />
                <br/>
                <br/>

                <div className="no-account">
                    <span>Already have an account? <a href="http://google.com">Login</a></span>
                </div>
            </form>
        </div>
    );
}

export default SignUp;

