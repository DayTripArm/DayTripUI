import React from 'react';

import FormSelect from "../../Form/FormSelect";
import FormButton from "../../Form/FormButton";
import {makeStyles} from "@material-ui/core/styles";

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
    const classes = useStyles();

    const {step, setStep} = props;

    return (
        <div className="driver-preregistration">
            <span className="title marginBottom30">What kind of car are you driving ?</span>
            <FormSelect
                label="What is Your Car Type?"
                options={[]}
                placeholder="Choose"
                value=""
            />
            <FormSelect
                label="What is Your Car Mark?"
                options={[]}
                placeholder="Choose"
                value=""
            />
            <FormSelect
                label="What is Your Car Model?"
                options={[]}
                placeholder="Choose"
                value=""
            />
            <FormSelect
                label="Year"
                options={[]}
                placeholder="Choose"
                value=""
            />
            <FormSelect
                label="Color"
                options={[]}
                placeholder="Choose"
                wrapperClassName={["marginBottom8"]}
                value=""
            />
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

export default Step_1;