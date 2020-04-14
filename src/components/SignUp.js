import React from 'react';
import FormInputText from "./Form/FormInputText";
import FormButton from "./Form/FormButton";
import FacebookLogin from 'react-facebook-login';

import GoogleLogin from 'react-google-login';

import {makeStyles} from "@material-ui/core/styles";
import { indigo } from '@material-ui/core/colors';

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
    const classes = useStyles();

    const responseFacebook = (response) => {
        console.log(response);
    }

    const responseGoogle = (response) => {
        console.log(response);
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
                        onChange={() => {}}
                        label="Name*"
                        placeholder="e.g Jogn Smith"
                        value=""
                    />
                    <FormInputText
                        onChange={() => {}}
                        label="Phone*"
                        placeholder="Type Your Number"
                        className={["marginTop30"]}
                        value=""
                    />
                    <FormInputText
                        onChange={() => {}}
                        label="Email*"
                        placeholder="Enter your Email"
                        className={["marginTop30"]}
                        value=""
                    />
                </React.Fragment>

                <FormButton label="sign up" customClass={classes.button}/>

                <div className="or"></div>

                <FacebookLogin
                    appId={process.env.REACT_APP_FB_API_KEY}
                    fields="name,email"
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

