import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import Modal from 'shared/components/Modal';
import Input from 'shared/components/Input';
import actions from "../../../actions";
import { IconFbClean, IconGoogle } from 'shared/components/Icons';
import { Link } from 'react-router-dom';
import _ from "lodash";

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

const ModalRegister =  ({ onClose }) => {
    const dispatch = useDispatch();
    const [invalidFields, setInvalidFields] = useState({});
    const [form, setForm] = useState({name: "", phone: "", email: "", password: ""});
    const { t } = useTranslation();
    const {travelerData, driverData, config} = useSelector(state => state);
    const validations = {
        name: {
            required: true,
            errorMsg: t("commons.error_msgs.name_required")
        },
        phone: {
            required: true,
            reg: /^\+?[0-9]{3}-?[0-9]{6,12}$/i,
            errorMsg: t("commons.error_msgs.phone_invalid")
        },
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
    const {
        user_info
    } = travelerData;

    const {
        registeredUserType,
    } = config;


    const {user} = driverData.driver_info;
    const {is_prereg} = user || {};

    if (is_prereg) {
        setTimeout(() => {
            window.location.href = "/driverRegister";
            dispatch(actions.showHideSignUp(false));
        }, 300)

    }

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

    const responseFacebook = (response) => {
        console.log(response);
    };

    const responseGoogle = (response) => {
        console.log(response);
    };

    return (
        <Modal title={t("home_page.sign_up.title")} showDismissButton onClose={() => onClose(false)}>
            <div className='py-4 px-0 px-md-8'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    signUpRequest();
                }}>
                    {user_info.errors ?
                        <div style={{textAlign: "center", color: "#B80000"}}>
                            {
                                _.isObject(user_info.errors) && _.keys(user_info.errors).map((key, i) => {
                                    return <p className='input-message text-xs weight-500 px-1 mt-1'>{user_info.errors[key][0]}</p>
                                })
                            }
                        </div>
                        :
                        null
                    }
                    <Input
                        type='text'
                        name='name'
                        onChange={e => setForm({
                            ...form,
                            name: e.target.value
                        })}
                        label={t("home_page.sign_up.name")+' *'}
                        placeholder={t("home_page.sign_up.name_placeholder")}
                        isError={getStatusMessage("name") || false}
                        message={getStatusMessage("name")}
                        onBlur={validateOnBlur}
                    />
                    <Input
                        type='number'
                        name='phone'
                        phoneCodes={true}
                        hideApperance={true}
                        onChange={e => setForm({
                            ...form,
                            phone: e.target ? e.target.value : e
                        })}
                        label={t("home_page.sign_up.phone")+' *'}
                        placeholder={t("home_page.sign_up.phone_placeholder")}
                        isError={getStatusMessage("phone") || false}
                        message={getStatusMessage("phone")}
                        onBlur={validateOnBlur}
                    />
                    <Input
                        type='email'
                        name='email'
                        onChange={e => setForm({
                            ...form,
                            email: e.target.value
                        })}
                        label={t("home_page.sign_up.email")+' *'}
                        placeholder={t("home_page.sign_up.email_placeholder")}
                        isError={getStatusMessage("email") || false}
                        message={getStatusMessage("email")}
                        onBlur={validateOnBlur}
                    />
                    <Input
                        type='password'
                        name='password'
                        onChange={e => setForm({
                            ...form,
                            password: e.target.value
                        })}
                        label={t("home_page.sign_up.password")+' *'}
                        placeholder={t("home_page.sign_up.password_placeholder")}
                        showEye={true}
                        iconPosition='right'
                        isError={getStatusMessage("password") || false}
                        message={getStatusMessage("password")}
                        onBlur={validateOnBlur}
                    />
                    <button className='btn btn-primary btn-fixed'>{t("home_page.sign_up.sign_up_btn")}</button>
                    <div className='text-separator my-7'>
                        <span className='separator-content px-5'>{t("commons.or")}</span>
                    </div>

                    <FacebookLogin
                        appId={process.env.REACT_APP_FB_API_KEY}
                        fields="name,email,picture"
                        scope="public_profile,email"
                        callback={responseFacebook}
                        icon={<IconFbClean fill='#FFFFFF' className='mr-3'/>}
                        textButton={t("home_page.sign_up.sign_up_fb")}
                        cssClass={`btn btn-facebook btn-fixed mb-3`}
                    />

                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        render={renderProps => (
                            <button onClick={renderProps.onClick} className='btn btn-google btn-fixed text__grey-dark mb-5'>
                                <IconGoogle fill='#FFFFFF' className='mr-3'/>
                                {t("home_page.sign_up.sign_up_gg")}
                            </button>
                        )}
                        fields="select_account"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    />

                    <p className='pt-1 mb-0 weight-700 text-center'>
                        {t("home_page.sign_up.already_have_account")} <Link to='/login' onClick={(e) => {
                        e.preventDefault();
                        dispatch(actions.switchSignInUp());
                    }}>{t("home_page.login.title")}</Link>
                    </p>
                </form>
            </div>
        </Modal>
    );
};

export default ModalRegister;
