import React from 'react';
import Select, {components} from 'react-select';
import { IconDestination, IconTimes } from 'shared/components/Icons';

const restStyles = {
    placeholder: base => ({
        ...base,
        color: '#BDBDBD',
        marginRight: 0
    }),
    indicatorSeparator: base => ({
        ...base,
        display: 'none',
    }),
    dropdownIndicator: base => ({
        ...base,
        // '& svg path': {
        //     fill: '#757575',
        // },
        // '&:hover svg path': {
        //     fill: '#090925',
        // },
    }),
    menu: base => ({
        ...base,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    }),
};


const MultiSelect = (props) => {
    const {
        isClearable = false,
        isSearchable = true,
        isDisabled = false,
        isLoading = false,
        isRtl = false,
        isMulti = false,
        label="",
        defaultValue="",
        placeholder="",
        name="",
        value=undefined,
        containerClass='',
        options=[],
        isError,
        isSuccess,
        message,
    } = props;

    const borderColor = isError ? '#B80000' : isSuccess ? '#88B800' : null;
    const ctrlDefaultborder = borderColor || '#BDBDBD';
    const ctrlFocusedBorder = borderColor || '#100F72';

    const selectComponents = {
        Placeholder: props => <components.Placeholder {...props} />,
        DropdownIndicator: props => (
            <components.DropdownIndicator {...props} >
                {
                    name === "driver_destinations" ?
                        <button className='btn btn-circle btn-sm border-0'>
                            <IconDestination />
                        </button>
                        :
                        null
                }
            </components.DropdownIndicator>
        ),
        MultiValueRemove: props => (
            <components.MultiValueRemove {...props}>
                <button className='btn btn-circle btn-sm border-0'>
                    <IconTimes />
                </button>
            </components.MultiValueRemove>
        )
    };

    const handleChange = (e, { action, removedValue }) => {
        if (props.onChange) {
            props.onChange(e, name, { action, removedValue });
        }
    };

    const defaultStyles =  {
        control: (base, state) => {
            return {
                ...base,
                minHeight: 48,
                boxShadow: 'none',
                paddingLeft: 8,
                borderWidth: 1,
                paddingTop: state.hasValue ? "8px" : "inherit",
                paddingBottom: state.hasValue ? "8px" : "inherit",
                borderColor: state.isFocused ? ctrlFocusedBorder : ctrlDefaultborder,
                '&:hover': {
                    borderColor: state.isFocused ? ctrlFocusedBorder : ctrlDefaultborder,
                },
            }
        },
        option: (base, state) => ({
            ...base,
            paddingLeft: '16px',
            paddingRight: '16px',
            cursor: "pointer",
            backgroundColor: state.isSelected ? '#F0F0F0' : '#FFFFFF',
            color: '#090925',

            '&:hover': {
                backgroundColor: state.isSelected ? '#F0F0F0' : '#F8F8F8',
            },
        }),
        ...restStyles,

        multiValue: base => ({
            ...base,
            minHeight: '34px',
            border: '1px solid #090925',
            borderRadius: '20px',
            fontSize: '14px',
            lineHeight: '26px',
            padding: "0 0 0 16px",
            backgroundColor: "#FFFFFF",
        }),
        multiValueLabel: base => ({
            ...base,
            backgroundColor: "#FFFFFF",
        }),
        multiValueRemove: base => ({ }),
    };

    const restProps = {
        styles: defaultStyles,
        components: selectComponents,
    };

    return (
        <div className={`select-container ${containerClass}`}>
            {label && (
                <label htmlFor={name} className='form-label mb-1 px-1'>
                    {label}
                </label>
            )}
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
                isMulti={isMulti}
                options={options}
                {...restProps}
            />
            {message && (
                <p
                    title={message}
                    className={`input-message text-xs text-ellipsis weight-500 px-1 mt-1 mb-0${
                        isSuccess ? ' text-success' : isError ? ' text-danger' : ''
                    }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default MultiSelect;
