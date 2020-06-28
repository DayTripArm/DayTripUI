import React from 'react';
import Select from 'react-select';

const defaultStyles =  {
    control: (styles, state) => ({
        ...styles,
        height: "48px",
        paddingLeft: "10px",
        boxShadow: state.isFocused ? 0 : 0,
        borderColor: state.isFocused
            ? "#100F72"
            : styles.borderColor,
        '&:hover': {
            borderColor: state.isFocused
                ? "#100F72"
                : styles.borderColor,
        }
    }),
    option: (styles, {data, isSelected, isFocused}) => {

        return {
            ...styles,
            cursor: "pointer",
            fontSize: "14px",
            color: "#757575",
            backgroundColor:
                isSelected ? "#bdbdbd"
                    :
                    isFocused ? "#ededed" : "white",
            paddingLeft: "15px",
            ':hover': {
                backgroundColor: "#ededed"
            }
        }
    },
    placeholder: (styles) => ({
        ...styles,
        color: "#BDBDBD",
    })
};

function SingleSelect(props) {
    const {
        isClearable = false,
        isSearchable = true,
        isDisabled = false,
        isLoading = false,
        isRtl = false,
        isMulti = false,
        wrapperClassName="",
        label="",
        defaultValue="",
        placeholder="",
        name="",
        value=undefined,
        options=[]
    } = props;

    const handleChange = (e, { action, removedValue }) => {
        if (props.onChange) {
            props.onChange(e, name, { action, removedValue });
        }
    };

    return (
        <div className={`form-select ${wrapperClassName ? wrapperClassName.join("") : ""}`}>
            <label className="form-select-label">{label}</label>
            <Select
                className=""
                classNamePrefix="select"
                onChange={handleChange}
                defaultValue={defaultValue}
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isRtl={isRtl}
                placeholder={placeholder}
                isSearchable={isSearchable}
                name={name}
                value={value}
                styles={defaultStyles}
                isMulti={isMulti}
                options={options}
            />
        </div>
    );
}

export default SingleSelect;