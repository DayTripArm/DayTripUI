import React from 'react';
import FormInputText from "./Form/FormInputText";
import FormCheckbox from "./Form/FormCheckbox";
import FormButton from "./Form/FormButton";

import {makeStyles} from "@material-ui/core/styles";
import { indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#FE4C30',
        borderRadius: "4px",
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

function SignIn(props) {
    const { showSignIn } = props;
    const classes = useStyles();

    return (
        <div className="log-in-form">
            <header>
                <span>Please Login</span>
                <div className="close" onClick={() => showSignIn(false)}></div>
            </header>
            <form action="#" method="post">
                <React.Fragment>
                    <FormInputText
                        onChange={() => {}}
                        label="Email*"
                        placeholder="Enter your Email"
                        value=""
                    />

                    <FormInputText
                        onChange={() => {}}
                        label="Password*"
                        placeholder="Enter your Password"
                        className={["marginTop30"]}
                        value=""
                    />
                </React.Fragment>

                <div className="remember-forgot">
                    <FormCheckbox name="rememberMe" value=""/>

                    <span className="remember">Remember me</span>
                    <span className="forgot"><a href="http://google.com">Forgot Password?</a></span>
                </div>

                <FormButton label="login" customClass={classes.button}/>

                <div className="or"></div>
                <FormButton label="Login with facebook" customClass={classes.facebook}/>

                <FormButton label="Login with google" customClass={classes.google}/>

                <div className="no-account">
                    <span>Don't have an account? <a href="http://google.com">Sign Up</a></span>
                </div>
            </form>
        </div>
    );
}

export default SignIn;

