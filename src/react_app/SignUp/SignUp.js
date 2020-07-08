import React, {useState} from 'react';
import FormInputText from "../Form/FormInputText";
import FormButton from "../Form/FormButton";
import FacebookLogin from 'react-facebook-login';
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";

import GoogleLogin from 'react-google-login';
import Welcome from "./Welcome";

import {makeStyles} from "@material-ui/core/styles";
import { indigo } from '@material-ui/core/colors';
import actions from "../actions";
import {TRAVELER_TYPE} from "../constants";


const useStyles = makeStyles((theme) => ({
    sign_up: {
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
        cursor: "pointer",
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
        cursor: "pointer",
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
    name: {
        required: true,
        errorMsg: "Name is invalid"
    },
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
    password: {
        required: true,
        errorMsg: "Password is invalid"
    },
};

function SignUp(props) {
    const [invalidFields, setInvalidFields] = useState({});

    const dispatch = useDispatch();
    const {travelerData, driverData, config} = useSelector(state => state);

    const {
        showWelcome,
        user_info
    } = travelerData;

    const {
        registeredUserType,
        userType,
    } = config;


    const {user} = driverData.driver_info;
    const {is_prereg} = user || {};

    if (is_prereg) {
        window.location.href = "/driver";
        dispatch(actions.showHideSignUp(false));
    }

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

    function signUpRequest() {
        const body = {
            name: form.name,
            phone: form.phone,
            email: form.email,
            password: form.password,
            user_type: Number(registeredUserType)
        };

        const invalidFields = validateForm();

        if (_.isEmpty(invalidFields)) {
            try {
                dispatch(actions.signUpRequest(body));
                document.documentElement.scrollTop = 0;
            } catch (e) {
                console.log(" err ", e.response);
            }
        }

        setInvalidFields(invalidFields);
    }

    return (
        <React.Fragment>
            {
                userType === TRAVELER_TYPE && showWelcome ?
                    <Welcome />
                    :
                    <div className="log-in-form" style={{minHeight: "710px"}}>
                        <header>
                            <span>Please Sign Up</span>
                            <div className="close" onClick={() => dispatch(actions.showHideSignUp(false))}> </div>
                        </header>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            signUpRequest()
                        }}>
                            <React.Fragment>
                                {user_info.errors ?
                                    <div className="form-error">
                                        {
                                            _.isArray(user_info.errors) && user_info.errors.map(err => {
                                                return <span className="text-error-message">{err}</span>
                                            })
                                        }
                                    </div>
                                    :
                                    null
                                }

                                <FormInputText
                                    onChange={(e) => setForm({
                                        ...form,
                                        name: e.target.value
                                    })}
                                    label="Name*"
                                    name="name"
                                    placeholder="e.g Jogn Smith"
                                    errorMessage={getStatusMessage("name")}
                                    onBlur={validateOnBlur}
                                    value={form.name}
                                />
                                <FormInputText
                                    onChange={(e) => setForm({
                                        ...form,
                                        phone: e.target ? e.target.value: e
                                    })}
                                    label="Phone*"
                                    name="phone"
                                    placeholder="Type Your Number"
                                    wrapperClassName={["marginTop25"]}
                                    inputClassName={[]}
                                    errorMessage={getStatusMessage("phone")}
                                    onBlur={validateOnBlur}
                                    value={form.phone}
                                    phoneCodes={true}
                                />
                                <FormInputText
                                    onChange={(e) => setForm({
                                        ...form,
                                        email: e.target.value
                                    })}
                                    label="Email*"
                                    name="email"
                                    placeholder="e.g johnsmith@gmail.com"
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
                                    placeholder="Insert Your Password"
                                    wrapperClassName={["marginTop25"]}
                                    inputClassName={[""]}
                                    password={true}
                                    showEye={true}
                                    errorMessage={getStatusMessage("password")}
                                    onBlur={validateOnBlur}
                                    value={form.password}
                                />
                            </React.Fragment>

                            <FormButton label="sign up" type="submit" customClass={classes.sign_up}/>

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
                                <span className="text">Already have an account? <span className="sign-in-up" onClick={() => dispatch(actions.switchSignInUp())}>Login</span></span>
                            </div>
                        </form>
                    </div>
            }
        </React.Fragment>
    );
}

export default SignUp;

