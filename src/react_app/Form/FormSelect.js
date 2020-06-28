import React from "react";

import {makeStyles} from "@material-ui/core/styles";
import {FormControl, Select} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    save: {
        backgroundColor: '#FE4C30',
        borderRadius: "4px",
        marginBottom: "16px",
        marginTop: "20px",
        width: "93px",
        height: "48px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#FFFFFF",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        display: "block",
        '&:hover': {
            backgroundColor: '#E24432'
        },
        '&:active': {
            boxShadow: 'none'
        }
    },
    selectWrapper: {
        width: "328px",
        height: "48px",
    },
    select: {
        borderColor: "#BDBDBD",
        height: "48px",
        borderRadius: "4px",
        '&:active': {
            border: "1px solid #100F72",
        }
    }

}));

function FormSelect(props) {

    const {
        label,
        options,
        //placeholder,
        wrapperClassName,
        onChange,
        value
    } = props;
    const classes = useStyles();

    return(
        <div className={`form-select ${wrapperClassName ? wrapperClassName.join("") : ""}`}>
            <span className="form-select-label">{label}</span>
            <FormControl variant="outlined" className={classes.selectWrapper}>
                <Select className={classes.select} native value={value} onChange={(e) => onChange(e)}>
                    {options && options.map(item => <option key={item} value={item}>{item}</option>)}
                </Select>
            </FormControl>
        </div>
    );
}

export default FormSelect;