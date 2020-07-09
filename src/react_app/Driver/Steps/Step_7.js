import React, {useEffect, useState} from 'react';
import FormButton from "../../Form/FormButton";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../actions";
import {DAYS, GENDER_LIST, GET_DATE_YEARS, MONTH_LIST, LANGUAGES} from "../../constants";
import _ from "lodash";
import SingleSelect from "../../Form/Select";
import FormTextArea from "../../Form/FormTextArea";

const useStyles = makeStyles((theme) => ({
    next: {
        backgroundColor: '#FE4C30',
        borderRadius: "4px",
        width: "91px",
        height: "48px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#FFFFFF",
        float: "right",
        marginBottom: "100px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        marginTop: "32px",
        '&:hover': {
            backgroundColor: '#E24432'
        },
        '&:active': {
            boxShadow: 'none'
        }
    }

}));

function Step_7(props) {
    const classes = useStyles();
    const {step, setStep} = props;
    const dispatch = useDispatch();

    const {driverData} = useSelector(state => state);
    const {preregistered_info} = driverData;
    const {
        gender,
        birthMonth,
        birthDay,
        birthYear,
        about,
        work,
        languages=""
    } = preregistered_info;

    const [birth, setBirth] = useState({
        month: birthMonth || "",
        day: birthDay || "",
        year: birthYear || ""
    });


    useEffect(() => {
        document.documentElement.scrollTop = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectOnChange = (event, name) => {
        let value = event ? event.target ? event.target.value : event.value : "";

        if (name === "languages") {
            let langString = "";

            event && event.map(item => langString += item.value + ",");
            value = langString.slice(0, -1);
        }

        if (["month", "day", "year"].indexOf(name) > -1) {
            setBirth({
                ...birth,
                [name]: value
            });
        }


        dispatch(actions.setPreregisteredDriverProperty(name, value));
    };

    const languageList = LANGUAGES.map(item => {return {label: item, value: item}});
    const genderList   = GENDER_LIST.map(item => {return {label: item, value: item}});
    const monthList    = MONTH_LIST.map((month, i) => {return {label: month, value: i}});
    const days         = DAYS.map(i => {return {label: i, value: i}});
    const yearList     = GET_DATE_YEARS().map(i => {return {label: i, value: i}});

    let languageValue = [];
    languages.split(",").map(i => languageValue.push(_.find(languageList, lang => lang.value === i)));

    return (
        <div className="driver-preregistration">
            <span className="title marginBottom30">Lets Make Your Profile Look Cool</span>

            <SingleSelect
                options={genderList}
                onChange={(event, name) => selectOnChange(event, name)}
                name="gender"
                value={_.find(genderList, i => i.value === gender)}
                placeholder="Choose"
                wrapperClassName={["form-select"]}
                label="Choose Your Gender"
            />

            <SingleSelect
                options={monthList}
                onChange={(event, name) => selectOnChange(event, name)}
                name="birthMonth"
                value={_.find(monthList, i => i.value === birth.month)}
                placeholder="Month"
                wrapperClassName={["bigInputField", "marginBottom16"]}
                label="Date of Birth"
            />
            <SingleSelect
                options={days}
                onChange={(event, name) => selectOnChange(event, name)}
                name="birthDay"
                value={_.find(days, i => i.value === birth.day)}
                placeholder="Day"
                wrapperClassName={["smallInputField", "inlineBlock", "marginRight16"]}
            />
            <SingleSelect
                options={yearList}
                onChange={(event, name) => selectOnChange(event, name)}
                name="birthYear"
                value={_.find(yearList,i => i.value === birth.year)}
                placeholder="Year"
                wrapperClassName={["smallInputField","inlineBlock"]}
            />

            <SingleSelect
                options={languageList}
                onChange={(event, name) => selectOnChange(event, name)}
                name="languages"
                value={languageValue}
                isMulti={true}
                label="Spoken Language/s"
                placeholder="Tell us what language(s) do you speak"
                wrapperClassName={["bigInputField","inlineBlock", "marginTop25"]}
            />

            <FormTextArea
                name="about"
                label="About You"
                value={about}
                onChange={(name, e) => selectOnChange(e, name)}
                placeholder="Tell travelers about yourself, your interest and hobbies."
                wrapperClassName={["marginTop25"]}
            />

            <FormTextArea
                name="work"
                label="Work/Specialty"
                value={work}
                onChange={(name, e) => selectOnChange(e, name)}
                placeholder="What is your specialty?"
                wrapperClassName={["marginTop25"]}
                customStyle={{height: "76px"}}
            />


            <div className="clear"> </div>
            <div className="back" onClick={() => {
                step > 1 && setStep(step - 1);
            }}>Back</div>
            <FormButton
                customClass={classes.next}
                label="NEXT"
                onClick={() => setStep(step + 1)}
            />
            <div className="clear"> </div>
        </div>
    );
}

export default Step_7;