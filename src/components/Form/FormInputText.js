import React from "react";
import PropTypes from "prop-types";

class FormInputText extends React.Component {
    constructor() {
        super();

        this.state = {
            value: ""
        };
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    render() {
        const { placeholder, label, className} = this.props;

        return (
            <React.Fragment>
                <div className={`section ${className ? className.join(" ") : ""}`}>
                    <p>{label}</p>
                    <input type="text" name="email" value={this.state.value} placeholder={placeholder} min="1"
                           max="1440" onChange={this.onChange} step="1" autoComplete="off"
                           autoCapitalize="off" autoCorrect="off" spellCheck="false" />
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
    placeholder: PropTypes.string
};

export default FormInputText;
