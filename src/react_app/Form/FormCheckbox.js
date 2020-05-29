import React from "react";
import {Checkbox} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    root: {
        color: indigo[800],
        '&$checked': {
            color: indigo[800],
        },
    },
    checked: {},
}));

function FormCheckbox(props) {
    const { value, name} = props;

    const [checked, setChecked] = React.useState(false);
    const classes = useStyles();


    const handleChange = (event) => {
        setChecked(event.target.checked);
    };


        return (
            <Checkbox
                checked={checked}
                onChange={handleChange}
                classes={{
                    root: classes.root,
                    checked: classes.checked
                }}
                value={value}
                name={name}
            />
        );

}

FormCheckbox.defaultProps = {
};

export default FormCheckbox;
