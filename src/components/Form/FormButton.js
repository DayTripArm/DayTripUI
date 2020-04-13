import React from "react";
import {Button} from '@material-ui/core';

function FormButton(props) {
    const { label, disabled, customClass } = props;

    return (
        <Button variant="contained" className={customClass} disabled={disabled}>
            {label}
        </Button>
    );

}

export default FormButton;
