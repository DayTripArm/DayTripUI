import React, {useState} from 'react';
import Modal from 'shared/components/Modal';
import Input from 'shared/components/Input';
import Checkbox from 'shared/components/Checkbox';
import {useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import { IconFbClean, IconGoogle } from 'shared/components/Icons';
import actions from "../../../actions";
import _ from "lodash";

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

const ModalLogin = ({ onClose }) => {
  const dispatch = useDispatch();
  const [invalidFields, setInvalidFields] = useState({});

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
    <Modal title='Please Login' showDismissButton onClose={() => onClose(false)}>
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
            name='email'
            label='Email *'
            isError={getStatusMessage("email") || generalMsg || false}
            message={getStatusMessage("email")}
            onBlur={validateOnBlur}
            placeholder='Enter your Email'
          />
          <Input
            type='password'
            onChange={e => setForm({
              ...form,
              password: e.target.value
            })}
            name='password'
            label='Password *'
            containerClass='mb-0'
            placeholder='Enter your Password'
            isError={getStatusMessage("password") || passwordMsg || generalMsg || false}
            message={getStatusMessage("password") || passwordMsg}
            onBlur={validateOnBlur}
            showEye={true}
            iconPosition='right'
          />
          <div className='d-flex align-items-center justify-content-between px-1 mt-3 mb-3'>
            <Checkbox className='mr-5' name='modalCheck' label='Remember Me'/>
            <Link to='/forgot' className='text__grey-dark weight-700'>
              Forgot Password?
            </Link>
          </div>
          <button className='btn btn-primary btn-fixed'>Login</button>
          <div className='text-separator my-7'>
            <span className='separator-content px-5'>or</span>
          </div>
          <button className='btn btn-facebook btn-fixed mb-3'>
            <IconFbClean fill='#FFFFFF' className='mr-3'/>
            Login With Facebook
          </button>
          <button className='btn btn-google btn-fixed text__grey-dark mb-5'>
            <IconGoogle fill='#FFFFFF' className='mr-3'/>
            Login With Facebook
          </button>
          <p className='pt-1 mb-0 weight-700 text-center'>
            Don't have an account? <Link to='/register' onClick={(e) => {
            e.preventDefault();
            dispatch(actions.switchSignInUp());
          }}>Sign up</Link>
          </p>
        </form>
      </div>
    </Modal>
  );
};

export default ModalLogin;
