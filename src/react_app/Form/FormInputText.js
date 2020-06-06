import React from "react";
import PropTypes from "prop-types";

class FormInputText extends React.Component {
    constructor() {
        super();

        this.state = {
            value: ""
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

    render() {
        const { placeholder, label, errorMessage, wrapperClassName, inputClassName, password, name} = this.props;

        return (
            <React.Fragment>
                <div className={`section ${wrapperClassName ? wrapperClassName.join(" ") : ""}`}>
                    <p>{label}</p>
                    <input className={`input-text ${errorMessage && "error"} ${inputClassName ? inputClassName.join(" ") : ""}`}
                           type={password ? "password" : "text"}
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
                    {errorMessage && errorMessage.length !== 0 && <span className="text-error-message">{errorMessage}</span>}
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
