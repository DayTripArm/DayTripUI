import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {CAR_TYPE_LIST, CAR_YEAR_LIST, COLOR_LIST} from "../../constants";
import actions from "../../actions";
import _ from "lodash";

import FormButton from "../../Form/FormButton";
import SingleSelect from "../../Form/Select";
import {useDispatch, useSelector} from "react-redux";

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


function Step_1(props) {
    document.documentElement.scrollTop = 0;
    const {step, setStep} = props;
    const classes = useStyles();

    const dispatch = useDispatch();
    const {driverData} = useSelector(state => state);

    const {preregistered_info} = driverData;

    const {
        car_type,
        car_mark,
        car_mark_list,
        car_model_list,
        car_model,
        year,
        color
    } = preregistered_info || {};


    // after component get once car marks
    useEffect(() => {
        dispatch(actions.carMarkRequest());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectOnChange = (event, name) => {
        dispatch(actions.setPreregisteredDriverProperty(name, event.value));

        if (name === "car_mark") {
            dispatch(actions.carModelRequest(event.value));
        }
    };

    const carTypeList = CAR_TYPE_LIST.map(item => {return {label: item, value: item}});
    const yearList    = CAR_YEAR_LIST().map(item => {return {label: item, value: item}});
    const colorList   = COLOR_LIST.map(item => {return {label: item, value: item}});
    const carBrands = car_mark_list.map(item => {return {label: item.brand_name, value: item.id}});
    const carModels = car_model_list.map(item => {return {label: item.car_model_name, value: item.id, brand_id: item.brand_id}});

    return (
        <div className="driver-preregistration">
            <span className="title marginBottom30">What kind of car are you driving ?</span>
            <SingleSelect
                options={carTypeList}
                onChange={(event, name) => selectOnChange(event, name)}
                name="car_type"
                value={_.find(carTypeList, i => i.value === car_type)}
                placeholder="Choose"
                wrapperClassName={["form-select"]}
                label="What is Your Car Type?"
            />
            <SingleSelect
                options={carBrands}
                onChange={(event, name) => selectOnChange(event, name)}
                name="car_mark"
                value={_.find(carBrands, i => i.value === car_mark)}
                placeholder="Choose"
                wrapperClassName={["form-select"]}
                label="What is Your Car Mark?"
            />
            <SingleSelect
                options={carModels}
                onChange={(event, name) => selectOnChange(event, name)}
                name="car_model"
                value={_.find(carModels, i => i.value === car_model && i.brand_id === car_mark)}
                placeholder="Choose"
                wrapperClassName={["form-select"]}
                label="What is Your Car Model?"
            />
            <SingleSelect
                options={yearList}
                onChange={(event, name) => selectOnChange(event, name)}
                name="year"
                value={_.find(yearList, i => i.value === year)}
                placeholder="Choose"
                wrapperClassName={["form-select"]}
                label="Year"
            />
            <SingleSelect
                options={colorList}
                onChange={(event, name) => selectOnChange(event, name)}
                name="color"
                value={_.find(colorList, i => i.value === color)}
                placeholder="Choose"
                label="Color"
                wrapperClassName={["form-select", "marginBottom8"]}
            />
            <FormButton
                customClass={classes.next}
                label="NEXT"
                onClick={() => setStep(step + 1)}
            />
            <div className="clear"> </div>

        </div>
    );
}

export default Step_1;