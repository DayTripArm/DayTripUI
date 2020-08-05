import React, {useState} from 'react';
import { IconTimes, IconArrowUp, IconArrowDown, IconEye, IconEyeClose } from './Icons';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Input = ({
   value,
   label,
   name,
   type,
   placeholder,
   isError,
   isSuccess,
   message,
   icon,
   showEye=false,
   iconPosition,
   className = '',
   containerClass = '',
   showClearIcon,
   hideApperance,
   onChange,
   onFocus,
   onBlur,
   required,
   autoFocus,
   phoneCodes
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [showPwd, swtShowPwd] = useState(false);
    const Icon = icon;

    const setClasses = () => {
        let classes = [];
        if (className) classes.push(className);
        if (value) classes.push('is-active');
        if (isError) classes.push('is-error');
        if (isSuccess) classes.push('is-success');
        if (type === 'search') classes.push('is-search');
        if (icon || showEye) classes.push(iconPosition === 'left' ? 'icon-left' : 'icon-right');
        return classes.join(' ');
    };

    const onChangeHandle = (e, name) => {
        if (onChange) {
            onChange(e, name);
        }

        setInputValue(e.target ? e.target.value : e);
    };

    const onBlurHandle = (e, name) => {
        if (onBlur) {
            onBlur(e, name);
        }
    };

    const add = () => {
        let value = Number(inputValue) + 10;
        setInputValue(value);
        onChange(value, name);
    };

    const subtract = () => {
        let value = 0;

        if (Number(inputValue) >= 10) {
            value = Number(inputValue) - 10;
        }

        setInputValue(value);
        onChange(value, name);
    };

    const showHidePwd = () => {
        swtShowPwd(!showPwd);
    };

    return (
        <div className={`form-field ${containerClass}`}>
            {label && (
                <label htmlFor={name} className='mb-1 px-1'>
                    {label}
                </label>
            )}
            <div className='position-relative'>
                {phoneCodes ?
                    <PhoneInput
                        inputStyle={{width: '100%', height: '48px'}}
                        inputClass={setClasses()}
                        id={name}
                        name={name}
                        masks={{am: '(..) ..-..-..'}}
                        country={'am'}
                        autoFocus={autoFocus}
                        value={inputValue}
                        placeholder={placeholder}
                        onChange={(e) => onChangeHandle(e, name)}
                        onFocus={onFocus}
                        onBlur={(e) => onBlurHandle(e, name)}
                        required={required}
                        inputProps={{
                            name: name,
                            required: true
                        }}
                    />
                    :
                    <input
                        type={showPwd ? "text" : type}
                        id={name}
                        placeholder={placeholder}
                        name={name}
                        value={inputValue}
                        onChange={(e) => onChangeHandle(e, name)}
                        onFocus={onFocus}
                        onBlur={(e) => onBlurHandle(e, name)}
                        className={setClasses()}
                        required={required}
                        autoFocus={autoFocus}
                    />
                }
                {message && (
                    <p title={message} className='input-message text-xs weight-500 px-1 mt-1'>
                        {message}
                    </p>
                )}
                {showEye && (
                    <button type="button" className='btn btn-circle border-0 input-icon' onClick={() => showHidePwd()}>
                        {
                            showPwd ?
                                <IconEye />
                                :
                                <IconEyeClose />
                        }
                    </button>
                )}
                {icon && (
                    <button className='btn btn-circle border-0 input-icon'>
                        <Icon fill='#757575' />
                    </button>
                )}
                {type === 'search' && value && (
                    <button className='input-clear btn text__grey-dark btn-sm'>
                        Clean {showClearIcon && <IconTimes className='times-icon ml-1' />}
                    </button>
                )}
                {type === 'number' && !hideApperance && (
                    <div className='btn-container px-2 d-flex flex-column rounded__4'>
                        <button className='input-btn input-btn__up' onClick={() => add()}>
                            <IconArrowUp />
                        </button>
                        <button className='input-btn input-btn__down' onClick={() => subtract()}>
                            <IconArrowDown />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;
