import React, {useEffect} from 'react';

import FormButton from "../../Form/FormButton";
import {makeStyles} from "@material-ui/core/styles";
import FormPlusMinus from "../../Form/FormPlusMinus";
import FormCheckbox from "../../Form/FormCheckbox";
import actions from "../../actions";
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


function Step_2(props) {
    const classes = useStyles();

    const {driverData} = useSelector(state => state);
    const {preregistered_info} = driverData;

    const {
        seats,
        car_options={}
    } = preregistered_info;

    const dispatch = useDispatch();
    const {step, setStep} = props;

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    return (
        <div className="driver-preregistration">
            <span className="title">How many travelers can fit in your car?</span>
            <span className="text">Check that you have enough sits to fit all your guests comfortably.</span>

            <FormPlusMinus
                label="Seats"
                name="seats"
                initialValue={seats || 4}
                onChange={(e) => dispatch(actions.setPreregisteredDriverProperty(e.name, e.value))}
                customLabelClassName="marginRight16"
                wrapperClassName="marginBottom46"
            />

            <span className="title">Tell us what you have in the car</span>
            <span className="text">Tell the travelers more about your car and rules. You can add even more after you publish.</span>

            <div className="car-checkbox">
                <FormCheckbox
                    name="car_seat"
                    label="Car Seat"
                    value={car_options["car_seat"]}
                    onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions(e.name, e.value))}
                />
                <FormCheckbox
                    name="air_condition"
                    label="Air Conditioning"
                    value={car_options["air_condition"]}
                    onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions(e.name, e.value))}
                />
                <FormCheckbox
                    name="smoke_allowed"
                    label="Smoke Allowed"
                    value={car_options["smoke_allowed"]}
                    onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions(e.name, e.value))}
                />
                <FormCheckbox
                    name="pets_allowd"
                    label="Pets Allowed"
                    value={car_options["pets_allowd"]}
                    onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions(e.name, e.value))}
                />
                <FormCheckbox
                    name="water"
                    label="Water"
                    value={car_options["water"]}
                    onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions(e.name, e.value))}
                />
                <FormCheckbox
                    name="snacks"
                    label="Snacks"
                    value={car_options["snacks"]}
                    onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions(e.name, e.value))}
                />
                <FormCheckbox
                    name="wifi"
                    label="WIFI"
                    value={car_options["wifi"]}
                    onChange={(e) => dispatch(actions.setPreregisteredDriverCarOptions(e.name, e.value))}
                />
            </div>

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

export default Step_2;