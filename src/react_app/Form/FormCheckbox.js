import React from "react";
import {Checkbox} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    root: {
        color: indigo[800],
        width: "20px",
        height: "20px",
        float: "left",
        '&$checked': {
            color: indigo[800],
        },
    },
    checked: {},
    label: {
        color: "#090925",
        fontSize: "14px",
        marginTop: "11px",
        display: "inline-block"
    }
}));

function FormCheckbox(props) {
    const {
        value,
        name,
        label,
        wrapperClassName
    } = props;

    const [checked, setChecked] = React.useState(false);
    const classes = useStyles();


    const handleChange = (event) => {
        setChecked(event.target.checked);
    };


        return (
            <div style={wrapperClassName}>
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
                <span className={classes.label}>{label}</span>
                <div className="clear"></div>
            </div>
        );

}

FormCheckbox.defaultProps = {
};

export default FormCheckbox;
