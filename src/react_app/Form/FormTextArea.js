import React from "react";

function FormTextArea(props) {
    const {
        label,
        value,
        name=undefined,
        wrapperClassName,
        customStyle,
        onChange,
        placeholder
    } = props;

    const handleChange = (e) => {
        if (onChange) {
            onChange(name, e);
        }
    };

    return (
        <div className={`${wrapperClassName ? wrapperClassName.join(" ") : ""}`}>
            <p className="form-select-label">{label}</p>
            <textarea
                onChange={(e) => handleChange(e)}
                className="form-textarea"
                style={customStyle}
                name={name}
                value={value}
                placeholder={placeholder}
            />
        </div>
    );

}

export default FormTextArea;
