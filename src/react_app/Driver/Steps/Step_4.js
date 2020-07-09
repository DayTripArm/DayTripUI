import React, {useEffect} from 'react';
import FormButton from "../../Form/FormButton";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import FormDropZone from "../../Form/FormDropZone";

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

function Step_4(props) {
    const classes = useStyles();
    const {step, setStep} = props;

    const {driverData} = useSelector(state => state);
    const {preregistered_info} = driverData;
    const {
        gov_photos=[],
        license_photos=[],
    } = preregistered_info;


    useEffect(() => {
        document.documentElement.scrollTop = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="driver-preregistration">
            <span className="title">Add Photos of Your Government ID</span>
            <span className="text">Upload your government ID. Make sure the picture clearly shows your face and details on it.</span>

            <FormDropZone
                type="gov_photos"
                photos={gov_photos}
            />

            <span className="title marginTop48">Add Photos of Your Driving License</span>
            <span className="text">Upload images of your driving license’s both sides. Make sure the pictures clearly show text and numbers on it.</span>

            <FormDropZone
                type="license_photos"
                photos={license_photos}
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

export default Step_4;