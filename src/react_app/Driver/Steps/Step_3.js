import React, {useEffect, useState} from 'react';
import FormButton from "../../Form/FormButton";
import {makeStyles} from "@material-ui/core/styles";
import Fade from '@material-ui/core/Fade';
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../actions";
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

function Step_3(props) {
    const classes = useStyles();
    const {step, setStep} = props;

    const {driverData} = useSelector(state => state);
    const {preregistered_info} = driverData;
    const {
        car_photos=[],
        tips={},
    } = preregistered_info;

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const carTips = tips[1]; // type = 1

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        dispatch(actions.tipsRequest(1, lang));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="driver-preregistration">
            <span className="title">Add photos of your car <i className="help-icon" onClick={() => setShow(!show)}> </i></span>
            <span className="text">Photos help travelers imagine their future ride. Upload photos that clearly show your car, and you can add more after you publish.</span>
            <Fade in={show} timeout={500}>
                <div className="tips-container">
                    <div className="tips-overlay"> </div>
                    <div className="tips">
                        <header>
                            <span className="text">Trips</span>
                            <span className="icon" onClick={() => setShow(!show)}> </span>
                        </header>
                        <div className="tips-content">
                            <h4 className="title">{!_.isEmpty(carTips) && carTips.title}</h4>
                            {
                                !_.isEmpty(carTips) && carTips.tips.map(tip => {
                                    return(
                                        <div className="ul-content">
                                            <span className="ul-header">{tip.title}</span>
                                            <span className="ul-text" dangerouslySetInnerHTML={{__html: tip.description}}></span>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </Fade>

            <FormDropZone
                type="car_photos"
                photos={car_photos}
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

export default Step_3;
