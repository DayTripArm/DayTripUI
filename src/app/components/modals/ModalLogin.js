import React, {useState} from 'react';
import Modal from 'shared/components/Modal';
import Input from 'shared/components/Input';
import Checkbox from 'shared/components/Checkbox';
import {useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconFbClean, IconGoogle } from 'shared/components/Icons';
import actions from "../../../actions";
import _ from "lodash";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

const ModalLogin = ({ onClose }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [invalidFields, setInvalidFields] = useState({});
    const validations = {
        email: {
            required: true,
            reg: /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/i,
            errorMsg: t("commons.error_msgs.email_invalid")
        },
        password: {
            required: true,
            errorMsg: t("commons.error_msgs.password_required")
        },
    };
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
                return { status: "error", statusMessage: rule.errorMsg };
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
    const responseFacebook = (response) => {
        console.log(response);
    };

    const responseGoogle = (response) => {
        console.log(response);
    };

    return (
        <Modal title={t("home_page.login.title")} showDismissButton onClose={() => onClose(false)}>
            <div className='py-4 px-0 px-md-8'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    signInRequest();
                }}>
                    {
                        generalMsg ?
                            <div style={{textAlign: "center", color: "#B80000"}}>
                                <p className='input-message text-xs weight-500 px-1 mt-1'>
                                    {generalMsg}
                                </p>
                            </div>
                            :
                            null
                    }
                    <Input
                        type='email'
                        onChange={e => setForm({
                            ...form,
                            email: e.target.value
                        })}
                        label={t("home_page.login.email")+' *'}
                        placeholder={t("home_page.login.email_placeholder")}
                        isError={getStatusMessage("email") || generalMsg || false}
                        message={getStatusMessage("email")}
                        onBlur={validateOnBlur}
                    />
                    <Input
                        type='password'
                        onChange={e => setForm({
                            ...form,
                            password: e.target.value
                        })}
                        name='password'
                        label={t("home_page.login.password")+' *'}
                        placeholder={t("home_page.login.password_placeholder")}
                        containerClass='mb-0'
                        isError={getStatusMessage("password") || passwordMsg || generalMsg || false}
                        message={getStatusMessage("password") || passwordMsg}
                        onBlur={validateOnBlur}
                        showEye={true}
                        iconPosition='right'
                    />
                    <div className='d-flex align-items-center justify-content-between px-1 mt-3 mb-3'>
                        <Checkbox className='mr-5' name='modalCheck' label={t("home_page.login.remember_me")}/>
                        <Link to='/forgot' className='text__grey-dark weight-700'>
                            {t("home_page.login.forgot_pass")}
                        </Link>
                    </div>
                    <button className='btn btn-primary btn-fixed'>{t("home_page.login.login_btn")}</button>
                    <div className='text-separator my-7'>
                        <span className='separator-content px-5'>{t("commons.or")}</span>
                    </div>
                    <FacebookLogin
                        appId={process.env.REACT_APP_FB_API_KEY}
                        fields="name,email,picture"
                        scope="public_profile,email"
                        callback={responseFacebook}
                        icon={<IconFbClean fill='#FFFFFF' className='mr-3'/>}
                        textButton={t("home_page.login.login_fb")}
                        cssClass={`btn btn-facebook btn-fixed mb-3`}
                    />

                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        render={renderProps => (
                            <button onClick={renderProps.onClick} className='btn btn-google btn-fixed text__grey-dark mb-5'>
                                <IconGoogle fill='#FFFFFF' className='mr-3'/>
                                {t("home_page.login.login_gg")}
                            </button>
                        )}
                        fields="select_account"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    />
                    <p className='pt-1 mb-0 weight-700 text-center'>
                        {t("home_page.login.dont_have_account")} <Link to='/register' onClick={(e) => {
                        e.preventDefault();
                        dispatch(actions.switchSignInUp());
                    }}>{t("home_page.sign_up.title")}</Link>
                    </p>
                </form>
            </div>
        </Modal>
    );
};

export default ModalLogin;
