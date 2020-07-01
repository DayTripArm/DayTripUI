import React, {useState} from 'react';

import FormButton from "../../Form/FormButton";
import {makeStyles} from "@material-ui/core/styles";
import FormPlusMinus from "../../Form/FormPlusMinus";
import FormCheckbox from "../../Form/FormCheckbox";

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
    document.documentElement.scrollTop = 0;
    const classes = useStyles();

    const {step, setStep} = props;

    const [seatValue, setSeat] = useState(4);

    return (
        <div className="driver-preregistration">
            <span className="title">How many travelers can fit in your car?</span>
            <span className="text">Check that you have enough sits to fit all your guests comfortably.</span>

            <FormPlusMinus
                label="Seats"
                value={seatValue}
                setSeat={setSeat}
                customLabelClassName="marginRight16"
                wrapperClassName="marginBottom46"
            />

            <span className="title">Tell us what you have in the car</span>
            <span className="text">Tell the travelers more about your car and rules. You can add even more after you publish.</span>

            <div className="car-checkbox">
                <FormCheckbox
                    name="car_seat"
                    label="Car Seat"
                    value=""
                />
                <FormCheckbox
                    name="air_condition"
                    label="Air Conditioning"
                    value=""
                />
                <FormCheckbox
                    name="smoke_allowed"
                    label="Smoke Allowed"
                    value=""
                />
                <FormCheckbox
                    name="pets_allowd"
                    label="Pets Allowed"
                    value=""
                />
                <FormCheckbox
                    name="water"
                    label="Water"
                    value=""
                />
                <FormCheckbox
                    name="snacks"
                    label="Snacks"
                    value=""
                />
                <FormCheckbox
                    name="wifi"
                    label="WIFI"
                    value=""
                />
            </div>

            <div className="clear"> </div>
            <div className="back" onClick={() => {
                step > 1 && setStep(step - 1);
            }}>Back</div>
            <FormButton
                customClass={classes.next}
                label="NEXT"
                onClick={() => step < 2 && setStep(step + 1)}
            />
            <div className="clear"> </div>
        </div>
    );
}

export default Step_2;