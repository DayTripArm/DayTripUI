import React from 'react';

const Checkbox = ({ className = '', name, label, onChange = () => {}, value }) => {

    const [checked, setChecked] = React.useState(value || false);

    const handleChange = (event) => {
        setChecked(event.target.checked);

        if (onChange) {
            onChange(event);
        }
    };

    return (
        <div className={`checkbox ${className}`}>
            <input type='checkbox' id={name} name={name} checked={checked} onChange={handleChange} value={value}/>
            <label htmlFor={name}>{label && label}</label>
        </div>
    );
};

export default Checkbox;
