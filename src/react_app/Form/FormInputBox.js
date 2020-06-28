import React, {useState} from "react";
import FormInputText from "./FormInputText";
import FormButton from "./FormButton";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, Select} from '@material-ui/core';
import _ from "lodash";

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

function FormInputBox(props) {

    const [edit, setEdit] = useState(false);
    const {
        type,
        label,
        value,
        disabled,
        name,
        placeholder,
        options,
        empty_message,
        customClass=""
    } = props;
    const classes = useStyles();

    return(
        <div className={`form-input-box ${customClass}`}>
            <div className="header">
                <span className="label">{label}</span>
                <span className={`field-edit ${disabled && "disabled"}`} onClick={() => !disabled && setEdit(!edit)}>{!edit ? "Edit" : "Cancel"}</span>
            </div>
            <div className="container">
                {edit ?
                    <>
                        {
                            type === "input" &&
                            <FormInputText
                                onChange={() => {}}
                                name={name}
                                placeholder={placeholder}
                                value={value}
                                wrapperClassName={["marginTop30"]}
                            />
                        }
                        {
                            type === "select" &&
                            <FormControl variant="outlined" className={classes.gender}>
                                <Select native value={value} onChange={() => {}}>
                                    <option aria-label="None" value="" />
                                    {options && options.map(item => <option key={item} value={item}>{item}</option>)}
                                </Select>
                            </FormControl>
                        }
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

export default FormInputBox;