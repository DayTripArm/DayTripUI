import React from 'react';
import Select, {components} from 'react-select';
import _ from "lodash";

const defaultStyles =  {
    control: (styles, state) => ({
        ...styles,
        minHeight: "48px",
        paddingLeft: "5px",
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
                isSelected ? "#ededed"
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
    }),

    dropdownIndicator: base => ({
        ...base,
        color: "#757575"
    }),

    multiValue: base => ({
        ...base,
        background: "none",
        border: "1px solid #090925",
        borderRadius: "24px",
        padding: "4px 8px",
    }),

    multiValueLabel: base => ({
        ...base,
        color: "#090925",
        fontSize: "12px",
        fontFamily: "Roboto"
    }),
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

    const dropdownIndicator = base => {
        return(
            components.DropdownIndicator && (
                <components.DropdownIndicator {...base} >
                    {
                        name === "driver_destinations" ?
                            <span className="destination-icon"></span>
                            :
                            null
                    }
                </components.DropdownIndicator>
            )
        );
    };

    return (
        <div className={`${wrapperClassName ? wrapperClassName.join(" ") : ""}`}>
            {!_.isEmpty(label) && <label className="form-select-label">{label}</label>}
            <Select
                components={{IndicatorSeparator: null, DropdownIndicator: dropdownIndicator}}
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