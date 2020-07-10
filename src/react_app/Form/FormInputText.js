import React from "react";
import PropTypes from "prop-types";

import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

class FormInputText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            password: props.password
        };
    }

    onBlur = (e) => {
        const {name} = this.props;

        if (this.props.onBlur) {
            this.props.onBlur(e, name);
        }
    };

    onChange = (e) => {
        this.setState({
            value: e.target ? e.target.value : e.value
        });

        if (this.props.onChange) {
            this.props.onChange(e, this.props.name);
        }
    };

    showHidePwd = () => {
        this.setState({
            password: !this.state.password
        });
    };

    add = () => {
        let value = Number(this.state.value) + 10;
        this.setState({
            value
        });

        if (this.props.onChange) {
            this.props.onChange({value}, this.props.name);
        }
    };

    subtract = () => {
        let value = 0;
        if (Number(this.state.value) >= 10) {
            value = Number(this.state.value) - 10
        }

        this.setState({value});
        if (this.props.onChange) {
            this.props.onChange({value}, this.props.name);
        }
    };


    render() {

        const {
            placeholder,
            label,
            errorMessage,
            wrapperClassName,
            inputClassName,
            name,
            showEye=false,
            isNumber=false,
            showErrorMsg=true,
            phoneCodes=false
        } = this.props;


        return (
            <React.Fragment>
                <div className={`${wrapperClassName ? wrapperClassName.join(" ") : ""}`}>
                    <p className="label">{label}</p>
                    <div className="form-input-container">
                        {phoneCodes ?
                        <PhoneInput
                            inputStyle={{width: '328px', height: '48px'}}
                            name={name}
                            masks={{am: '(..) ..-..-..'}}
                            country={'am'}
                            autoFormat="true"
                            value={this.state.phone}
                            onChange={this.onChange}
                            inputProps={{
                                name: 'phone',
                                required: true
                            }}
                        />
                            :
                         <input className={`input-text ${errorMessage && "error"} ${inputClassName ? inputClassName.join(" ") : ""}`}
                               type={this.state.password ? "password" : isNumber ? "number" : "text"}
                               name={name}
                               value={this.state.value}
                               placeholder={placeholder}
                               min="1"
                               max="1440"
                               onChange={this.onChange}
                               onBlur={this.onBlur}
                               step="1"
                               autoComplete="off"
                               autoCapitalize="off"
                               autoCorrect="off"
                               spellCheck="false"
                         />
                        }

                        {showEye && <span className="eye" onClick={() => this.showHidePwd()}>
                            {
                                this.state.password ?
                                    <VisibilityOffIcon/>
                                    :
                                    <RemoveRedEyeIcon />
                            }
                        </span>
                        }

                        {
                            isNumber &&
                            <div className="up-down-icons">
                                <ExpandLessIcon className="less-icon" onClick={() => this.add()} />
                                <ExpandMoreIcon className="more-icon" onClick={() => this.subtract()} />
                            </div>
                        }
                    </div>
                    {showErrorMsg && errorMessage && errorMessage.length !== 0 && <span className="text-error-message">{errorMessage}</span>}
                </div>
            </React.Fragment>

        );
    }
}

FormInputText.defaultProps = {
    placeholder: ""
};

FormInputText.propTypes = {
    className: PropTypes.array,
    /** Pass additional classes */
    label: PropTypes.any,
    /** Set the value */
    value: PropTypes.any,
    /** Pass a function to be called on FormInputText value change */
    onChange: PropTypes.func.isRequired,
    /** Set the placeholder text */
    placeholder: PropTypes.string,
    name: PropTypes.string
};

export default FormInputText;
