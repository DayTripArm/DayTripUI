import React from "react";
import PropTypes from "prop-types";

import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';

class FormInputText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
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
            value: e.target.value
        });

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };

    showHidePwd = () => {
        this.setState({
            password: !this.state.password
        });
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
            showErrorMsg=true
        } = this.props;


        return (
            <React.Fragment>
                <div className={`form-input-text ${wrapperClassName ? wrapperClassName.join(" ") : ""}`}>
                    <p className="label">{label}</p>
                    <input className={`input-text ${errorMessage && "error"} ${inputClassName ? inputClassName.join(" ") : ""}`}
                           type={this.state.password ? "password" : "text"}
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
                    {showEye && <span className="eye" onClick={() => this.showHidePwd()}>
                        {
                            this.state.password ?
                                <VisibilityOffIcon/>
                                :
                                <RemoveRedEyeIcon />
                        }
                    </span>}
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
