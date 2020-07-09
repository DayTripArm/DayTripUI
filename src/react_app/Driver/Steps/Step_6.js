import React, {useEffect} from 'react';
import FormButton from "../../Form/FormButton";
import FormDropZone from "../../Form/FormDropZone";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";

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

function Step_6(props) {
    const classes = useStyles();
    const {step, setStep} = props;

    const {driverData} = useSelector(state => state);
    const {preregistered_info} = driverData;
    const {
        profile_photos=[],
    } = preregistered_info;


    useEffect(() => {
        document.documentElement.scrollTop = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="driver-preregistration">
            <span className="title">Upload Your Profile Picture</span>
            <span className="text">Let travelers know who they will take their ride with. Make sure the picture clearly shows your face.</span>

            <FormDropZone
                type="profile_photos"
                photos={profile_photos}
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

export default Step_6;