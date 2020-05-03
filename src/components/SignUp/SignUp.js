import React, {useState} from 'react';
import FormInputText from "../Form/FormInputText";
import FormButton from "../Form/FormButton";
import FacebookLogin from 'react-facebook-login';
import _ from "lodash";

import GoogleLogin from 'react-google-login';
import Welcome from "./Welcome";

import {makeStyles} from "@material-ui/core/styles";
import { indigo } from '@material-ui/core/colors';
import axios from "axios";
import base_urls from "../../base_urls";

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

const validations = {
    phone: {
        required: true,
        reg: /^\+?[0-9]{3}-?[0-9]{6,12}$/i,
        errorMsg: "Phone is invalid"
    },
    email: {
        required: true,
        reg: /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/i,
        errorMsg: "Email is invalid"
    },
};

function SignUp(props) {
    const { showSignUp } = props;
    const [invalidFields, setInvalidFields] = useState({});
    const [welcome, showWelcome] = useState(false);
    const [form, setForm] = useState({name: "", phone: "", email: "", password: ""});
    const classes = useStyles();

    const responseFacebook = (response) => {
        console.log(response);
    };

    const responseGoogle = (response) => {
        console.log(response);
    };

    function validateForm() {

        return _.reduce(validations, (errors, rule, name) => {
            const result = validateField(name);

            if (result) { errors[name] = result; }

            return errors;
        }, {});
    }

    function getStatusMessage(name) {
        const field = invalidFields[name];
        return field && field.statusMessage ? field.statusMessage : undefined;
    }

    function validateField(name) {
        const rule = validations[name];

        if (rule) {
            if (rule.required && !form[name].trim()) {
                return { status: "error", statusMessage: "This field is required" };
            }

            if (!_.isEmpty(form[name]) && rule.reg && !rule.reg.test(form[name])) {
                return { status: "error", statusMessage: rule.errorMsg };
            }
        }
    }

    function validateOnBlur(e, name) {
        const result = validateField(name);
        let state = _.clone(invalidFields);

        if (result) state[name] = result;
        else delete state[name];

        setInvalidFields(state);
    }

    function signUp() {
        const body = {
            name: form.name,
            phone: form.phone,
            email: form.email,
            password: form.password
        };

        const invalidFields = validateForm();

        if (_.isEmpty(invalidFields)) {
            try {
                axios.post(base_urls.day_trip.sign_up, body)
                    .then(response => {
                        // showSignUp(false);
                        showWelcome(true);
                    }).catch(error => {
                    console.log(" err ", error.response);
                });
            } catch (e) {
                console.log(" err ", e.response);
            }
        }

        setInvalidFields(invalidFields);
    }

    return (
        <React.Fragment>
            {
                welcome ?
                    <Welcome showSignUp={showSignUp}/>
                    :
                    <div className="log-in-form" style={{minHeight: "710px"}}>
                        <header>
                            <span>Please Sign Up</span>
                            <div className="close" onClick={() => showSignUp(false)}></div>
                        </header>
                        <form action="#" method="post">
                            <React.Fragment>
                                <FormInputText
                                    onChange={(e) => setForm({
                                        ...form,
                                        name: e.target.value
                                    })}
                                    label="Name*"
                                    name="name"
                                    placeholder="e.g Jogn Smith"
                                    value={form.name}
                                />
                                <FormInputText
                                    onChange={(e) => setForm({
                                        ...form,
                                        phone: e.target.value
                                    })}
                                    label="Phone*"
                                    name="phone"
                                    placeholder="Type Your Number"
                                    wrapperClassName={["marginTop25"]}
                                    inputClassName={[]}
                                    errorMessage={getStatusMessage("phone")}
                                    onBlur={validateOnBlur}
                                    value={form.phone}
                                />
                                <FormInputText
                                    onChange={(e) => setForm({
                                        ...form,
                                        email: e.target.value
                                    })}
                                    label="Email*"
                                    name="email"
                                    placeholder="Enter your Email"
                                    wrapperClassName={["marginTop25"]}
                                    inputClassName={[""]}
                                    errorMessage={getStatusMessage("email")}
                                    onBlur={validateOnBlur}
                                    value={form.email}
                                />
                                <FormInputText
                                    onChange={(e) => setForm({
                                        ...form,
                                        password: e.target.value
                                    })}
                                    label="Password*"
                                    name="password"
                                    placeholder="Enter your Password"
                                    wrapperClassName={["marginTop25"]}
                                    inputClassName={[""]}
                                    password={true}
                                    value={form.password}
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
            }
        </React.Fragment>
    );
}

export default SignUp;

