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

const validations = {
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

function SignIn(props) {
    const [invalidFields, setInvalidFields] = useState({});

    const classes = useStyles();
    const dispatch = useDispatch();
    const {travelerData} = useSelector(state => state);
    const {
        user_info
    } = travelerData;

    const {general: generalMsg="", password: passwordMsg=""} = user_info.errors || ""; // errors: {general: "...", or password: "..."}

    const [form, setForm] = useState({email: "", password: ""});


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

    function signInRequest() {
        const body = {
            email: form.email,
            password: form.password
        };

        const invalidFields = validateForm();

        if (_.isEmpty(invalidFields)) {
            try {
                dispatch(actions.signInRequest(body));
                document.documentElement.scrollTop = 0;
            } catch (e) {
                console.log(" err ", e.response);
            }
        }

        setInvalidFields(invalidFields);
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
                        generalMsg ?
                        <div className="form-error">
                            <span className="text-error-message">{generalMsg}</span>
                        </div>
                        :
                        null
                    }
                    <FormInputText
                        onChange={(e) => setForm({
                            ...form,
                            email: e.target.value
                        })}
                        label="Email*"
                        placeholder="Enter your Email"
                        value={form.email}
                        name="email"
                        showErrorMsg={!generalMsg}
                        errorMessage={getStatusMessage("email") || generalMsg}
                        onBlur={validateOnBlur}
                    />

                    <FormInputText
                        onChange={(e) => setForm({
                            ...form,
                            password: e.target.value
                        })}
                        label="Password*"
                        placeholder="Enter your Password"
                        wrapperClassName={["marginTop30"]}
                        inputClassName={[""]}
                        password={true}
                        value={form.password}
                        showEye={true}
                        name="password"
                        showErrorMsg={!generalMsg}
                        errorMessage={getStatusMessage("password") || generalMsg || passwordMsg}
                        onBlur={validateOnBlur}
                    />
                </React.Fragment>

                <div className="remember-forgot">
                    <FormCheckbox name="rememberMe" value="" label="Remember me" wrapperClassName={{float: "left", marginLeft: "-5px"}}/>

                    <span className="forgot"><a href="http://google.com">Forgot Password?</a></span>
                </div>

                <FormButton label="login" type="submit" name="form_submit" customClass={classes.button}/>

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

