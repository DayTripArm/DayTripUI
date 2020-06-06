import React, {useState} from "react";

import FormButton from "./FormButton";
import {makeStyles} from "@material-ui/core/styles";
import _ from "lodash";


import LuxonUtils from '@date-io/luxon';
import {
    DatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';

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
    gender: {width: "156px"}

}));

function FormDatePicker(props) {

    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date, i) => {
        console.log(" date ", date);
        setSelectedDate(date);
    };

    const [edit, setEdit] = useState(false);
    const {label, value, disabled, empty_message} = props;
    const classes = useStyles();

    return(
        <div className="form-input-box">
            <div className="header">
                <span className="label">{label}</span>
                <span className={`field-edit ${disabled && "disabled"}`} onClick={() => !disabled && setEdit(!edit)}>{!edit ? "Edit" : "Cancel"}</span>
            </div>
            <div className="container">
                {edit ?
                    <>
                        <MuiPickersUtilsProvider utils={LuxonUtils}>
                            <DatePicker
                                value={selectedDate}
                                onChange={handleDateChange}
                                format="MM/dd/yyyy"
                            />
                        </MuiPickersUtilsProvider>


                        <FormButton
                            label="Save"
                            onClick={() => {}}
                            customClass={classes.save}
                        />
                    </>
                    :
                    <span className="value">{_.isEmpty(value) ? empty_message : value}</span>
                }
            </div>
        </div>
    );
}

export default FormDatePicker;