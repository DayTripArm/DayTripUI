import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";

import SingleSelect from "./Select";
import FormInputText from "./FormInputText";
import FormButton from "./FormButton";

import actions from "../actions";
import {GET_DATE_YEARS, DAYS, MONTH_LIST} from "../constants";
import _ from "lodash";
import dateFormat from "date-format";

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
    const dispatch = useDispatch();
    const {travelerData} = useSelector(state => state);

    const [month, setMonth] = useState(props.name === "date_of_birth" && !_.isEmpty(props.value) ? new Date(props.value).getMonth() : "");
    const [day, setDay] = useState(props.name === "date_of_birth" && !_.isEmpty(props.value) ? new Date(props.value).getDate() : "");
    const [year, setYear] = useState(props.name === "date_of_birth" && !_.isEmpty(props.value) ? new Date(props.value).getFullYear() : "");

    const [edit, setEdit] = useState(false);
    const [field, setField] = useState({
        name: props.name,
        value: props.value
    });

    const {
        type,
        profile="personal",
        editButtonText="Edit",
        password,
        showEye,
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

    const handleSave = (e) => {
        const {profile: profileData} = travelerData;
        const {id} = profileData;
        let data = {};

        if (type === "date") {
            let date_of_birth = new Date(year, month, day);
            let stringDate = dateFormat("MM/dd/yyyy", date_of_birth);
            data = {
                profile: profile,
                personal: {
                    [name]: stringDate
                }
            }
        } else {
            if (profile === "login") {
                data = {
                    profile: profile,
                    [field.name]: field.value
                }
            } else {
                data = {
                    profile: profile,
                    personal: {
                        [field.name]: field.value
                    }
                }
            }
        }

        console.log(data);

        dispatch(actions.updateProfileInfo(id, data));
        setEdit(!edit);
    };

    const renderDateForm = () => {
        const monthList = MONTH_LIST.map((month, i) => {return {label: month, value: i}});
        const days      = DAYS.map(i => {return {label: i, value: i}});
        const yearList  = GET_DATE_YEARS().map(i => {return {label: i, value: i}});

        return (
            <div className="date-of-birth">
                <SingleSelect
                    options={monthList}
                    onChange={(e, name) => setMonth(e.value)}
                    name="month"
                    value={_.find(monthList, i => i.value === month)}
                    placeholder="Month"
                    wrapperClassName={["bigInputField", "marginRight16"]}
                />
                <SingleSelect
                    options={days}
                    onChange={(e, name) => setDay(e.value)}
                    name="day"
                    value={_.find(days, i => i.value === day)}
                    placeholder="Day"
                    wrapperClassName={["smallInputField", "marginRight16"]}
                />
                <SingleSelect
                    options={yearList}
                    onChange={(e, name) => setYear(e.value)}
                    name="year"
                    value={_.find(yearList,i => i.value === year)}
                    placeholder="Year"
                    wrapperClassName={["smallInputField"]}
                />
            </div>
        )
    };

    return(
        <div className={`form-input-box ${customClass}`}>
            <div className="header">
                <span className="label">{label}</span>
                <span className={`field-edit ${disabled && "disabled"}`} onClick={() => !disabled && setEdit(!edit)}>{!edit ? editButtonText : "Cancel"}</span>
            </div>
            <div className="container">
                {edit ?
                    <>
                        {
                            type === "input" &&
                            <FormInputText
                                onChange={(e) => setField({
                                    name: name,
                                    value: e.target.value
                                })}
                                name={name}
                                password={password}
                                showEye={showEye}
                                placeholder={placeholder}
                                value={field.value}
                                wrapperClassName={["marginTop15 bigInputField"]}
                            />
                        }
                        {
                            type === "select" &&

                            <SingleSelect
                                options={options}
                                onChange={(event, name) => setField({
                                    name: name,
                                    value: event.value
                                })}
                                name="gender"
                                value={_.find(options, i => i.value === field.value)}
                                placeholder="Choose"
                                wrapperClassName={["smallInputField"]}
                            />
                        }
                        {
                            type === "date" && renderDateForm()
                        }
                        <FormButton
                            label="Save"
                            onClick={(e) => handleSave(e)}
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