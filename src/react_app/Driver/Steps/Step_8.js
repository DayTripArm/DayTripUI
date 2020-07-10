import React, {useEffect, useState} from 'react';
import FormButton from "../../Form/FormButton";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import SingleSelect from "../../Form/Select";
import Fade from "@material-ui/core/Fade";
import FormInputText from "../../Form/FormInputText";
import actions from "../../actions";
import {LOCATIONS} from "../../constants";
import _ from "lodash";

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

    const [show, setShow] = useState(false);

    const {driverData} = useSelector(state => state);
    const {preregistered_info} = driverData;
    const {
        location,
        destination_list=[],
        driver_destinations="",
        tips={},
        tariff1="",
        tariff2="",
    } = preregistered_info;

    const carTips = tips[2]; // type = 2


    useEffect(() => {
        document.documentElement.scrollTop = 0;

        dispatch(actions.destinationRequest());
        dispatch(actions.tipsRequest(2));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectOnChange = (event, name) => {
        let value = event ? event.target ? event.target.value : event.value : "";

        if (name === "driver_destinations") {
            let destString = "";

            event && event.map(item => destString += item.value + ",");
            value = destString.slice(0, -1);
        }

        dispatch(actions.setPreregisteredDriverProperty(name, value));
    };

    const locationList = LOCATIONS.map(item => {return {label: item, value: item}});
    const destinationList = destination_list.map(item => {return {label: item.title, value: item.id}});

    let destinationValue = [];
    driver_destinations.split(",").map(id => destinationValue.push(_.find(destinationList, dest => dest.value === Number(id))));

    return (
        <div className="driver-preregistration">
            <span className="title marginBottom30">We Are Almost Done !</span>

            <SingleSelect
                options={locationList}
                onChange={(event, name) => selectOnChange(event, name)}
                name="location"
                value={_.find(locationList, item => item.value === location)}
                placeholder="Choose"
                wrapperClassName={["form-select"]}
                label="City of Residence"
            />

            <SingleSelect
                options={destinationList}
                onChange={(event, name) => selectOnChange(event, name)}
                name="driver_destinations"
                value={destinationValue}
                isMulti={true}
                placeholder="I want to drive to"
                wrapperClassName={["bigInputField", "marginBottom16"]}
                label="Destinations"
            />

            <span className="title marginTop48">Price per 1 Km <i className="help-icon" onClick={() => setShow(!show)}> </i></span>
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

            <FormInputText
                onChange={(e, name) => selectOnChange(e, name)}
                label="Set your price per 1 km  for short distance trips (up to 110 km, including waiting time)"
                placeholder="price"
                wrapperClassName={["marginTop30"]}
                inputClassName={[""]}
                isNumber={true}
                value={tariff1}
                name="tariff1"
            />

            {Number(tariff1) > 0 &&
                <React.Fragment>
                    <span className="price-label marginTop25 marginBottom16">According to the 1km price, you will earn the following amounts for these example trips</span>
                    <div className="trip-info-section marginBottom8">
                        <div className="section-1">
                            <span className="text">Yerevan - Garni - Geghard - Yerevan</span>
                            <span className="price marginTop15 marginBottom10">{Number(tariff1) * 35}AMD</span>
                        </div>
                        <div className="section-2">
                            <span className="label float-left marginTop15 marginBottom10">Trip duration: <span
                                  className="hours">4 hours</span></span>
                            <span className="label float-left marginLeft36 marginTop15 marginBottom10">Distance: <span
                                  className="km">35km</span></span>
                        </div>
                    </div>
                    <div className="trip-info-section">
                        <div className="section-1">
                            <span className="text">Yerevan - Noravank - Tatev - Yerevan</span>
                            <span className="price marginTop15 marginBottom10">{Number(tariff1) * 250}AMD</span>
                        </div>
                        <div className="section-2">
                            <span className="label float-left marginTop15 marginBottom10">Trip duration: <span
                                  className="hours">8 hours</span></span>
                            <span className="label float-left marginLeft36 marginTop15 marginBottom10">Distance: <span
                                  className="km">250km</span></span>
                        </div>
                    </div>
                </React.Fragment>
            }

            <FormInputText
                onChange={(e, name) => selectOnChange(e, name)}
                label="Set your price per 1 km  for long distance trips (over 110 km, including waiting time)"
                placeholder="price"
                wrapperClassName={["marginTop30"]}
                inputClassName={[""]}
                isNumber={true}
                value={tariff2}
                name="tariff2"
            />

            {Number(tariff2) > 0 &&
            <React.Fragment>
                <span className="price-label marginTop25 marginBottom16">According to the 1km price, you will earn the following amounts for these example trips</span>
                <div className="trip-info-section marginBottom8">
                    <div className="section-1">
                        <span className="text">Yerevan - Garni - Geghard - Yerevan</span>
                        <span className="price marginTop15 marginBottom10">{Number(tariff2) * 35}AMD</span>
                    </div>
                    <div className="section-2">
                            <span className="label float-left marginTop15 marginBottom10">Trip duration: <span
                                className="hours">4 hours</span></span>
                        <span className="label float-left marginLeft36 marginTop15 marginBottom10">Distance: <span
                            className="km">35km</span></span>
                    </div>
                </div>
                <div className="trip-info-section">
                    <div className="section-1">
                        <span className="text">Yerevan - Noravank - Tatev - Yerevan</span>
                        <span className="price marginTop15 marginBottom10">{Number(tariff2) * 250}AMD</span>
                    </div>
                    <div className="section-2">
                            <span className="label float-left marginTop15 marginBottom10">Trip duration: <span
                                className="hours">8 hours</span></span>
                        <span className="label float-left marginLeft36 marginTop15 marginBottom10">Distance: <span
                            className="km">250km</span></span>
                    </div>
                </div>
            </React.Fragment>
            }


            <div className="clear"> </div>
            <div className="back" onClick={() => {
                step > 1 && setStep(step - 1);
            }}>Back</div>
            <FormButton
                customClass={classes.next}
                label="SAVE"
                onClick={() => dispatch(actions.saveDriverPreregData())}
            />
            <div className="clear"> </div>
        </div>
    );
}

export default Step_7;