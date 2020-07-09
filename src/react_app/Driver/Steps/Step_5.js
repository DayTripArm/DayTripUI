import React, {useEffect} from 'react';
import FormButton from "../../Form/FormButton";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    next: {
        backgroundColor: '#FE4C30',
        borderRadius: "4px",
        width: "132px",
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

function Step_5(props) {
    const classes = useStyles();
    const {step, setStep} = props;

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="driver-preregistration">
            <span className="title">Great Progress, Khachatur</span>
            <span className="text">Now tell us about yourself, so travelers get to know you.</span>

            <div className="change-container">
                <span className="check-icon"></span>
                <span className="model-number">Model, Number of Seats, What’s included and more</span>
                <span className="change-btn" onClick={() => setStep(1)}>Change</span>
            </div>

            <span className="step-4">Step 4</span>
            <span className="step-4-text">Let’s fill in some data about you.</span>
            <span className="step-4-sub-text">Profile Picture, languages you speak etc.</span>


            <div className="clear"> </div>
            <FormButton
                customClass={classes.next}
                label="CONTINUE"
                onClick={() => setStep(step + 1)}
            />
            <div className="clear"> </div>
        </div>
    );
}

export default Step_5;