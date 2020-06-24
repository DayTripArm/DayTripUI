import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import { indigo } from '@material-ui/core/colors';
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";

import FormInputText from "../Form/FormInputText";
import FormCheckbox from "../Form/FormCheckbox";
import FormButton from "../Form/FormButton";
import actions from "../actions";

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
        marginTop: "20px",
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

    const classes = useStyles();
    const dispatch = useDispatch();
    const {
        user_info
    } = useSelector(state => state.dayTrip);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function signInRequest() {
        const body = {
            email,
            password
        };

        try {
            dispatch(actions.signInRequest(body));
            document.documentElement.scrollTop = 0;
        } catch (e) {
            console.log(" err ", e.response);
        }
    }

    return (
        <div className="log-in-form">
            <header>
                <span>Please Login</span>
                <div className="close" onClick={() => dispatch(actions.showHideSignIn(false))}> </div>
            </header>
            <form onSubmit={(e) => {
                e.preventDefault();
                signInRequest();
            }}>
                <React.Fragment>
                    {
                        user_info.errors ?
                        <div className="form-error">
                            <span className="text-error-message">{!_.isArray(user_info.errors) && user_info.errors}</span>
                        </div>
                        :
                        null
                    }
                    <FormInputText
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email*"
                        placeholder="Enter your Email"
                        value=""
                    />

                    <FormInputText
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password*"
                        placeholder="Enter your Password"
                        wrapperClassName={["marginTop30"]}
                        inputClassName={[""]}
                        password={true}
                        value=""
                    />
                </React.Fragment>

                <div className="remember-forgot">
                    <FormCheckbox name="rememberMe" value="" label="Remember me" wrapperClassName={{float: "left", marginLeft: "-5px"}}/>

                    <span className="forgot"><a href="http://google.com">Forgot Password?</a></span>
                </div>

                <FormButton label="login" type="submit" name="form_submit" customClass={classes.button}/>
                <div className="form-error">
                    <span className="text-error-message">{!_.isArray(user_info.errors) && user_info.errors}</span>
                </div>

                <div className="or"></div>
                <FormButton label="Login with facebook" customClass={classes.facebook}/>

                <FormButton label="Login with google" customClass={classes.google}/>

                <div className="no-account">
                    <span className="text">Don't have an account? <span className="sign-in-up" onClick={() => dispatch(actions.switchSignInUp())}>Sign Up</span></span>
                </div>
            </form>
        </div>
    );
}

export default SignIn;

