import React from "react";
import {Button} from '@material-ui/core';

function FormButton(props) {
    const { label, disabled, customClass} = props;

    function onClick() {
        if (props.onClick) {
            props.onClick();
        }
    }

    return (
        <Button variant="contained" className={customClass} disabled={disabled} onClick={() => onClick()}>
            {label}
        </Button>
    );

}

export default FormButton;
