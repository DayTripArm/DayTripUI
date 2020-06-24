import React from "react";
import {Button} from '@material-ui/core';

function FormButton(props) {
    const { label, name=undefined, disabled, customClass, type="button"} = props;

    function onClick() {
        if (props.onClick) {
            props.onClick();
        }
    }

    return (
        <Button variant="contained" type={type} name={name} className={customClass} disabled={disabled} onClick={() => onClick()}>
            {label}
        </Button>
    );

}

export default FormButton;
