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
    } = preregistered_info;

    const carTips = tips[2]; // type = 2


    useEffect(() => {
        document.documentElement.scrollTop = 0;

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

            <span className="title marginTop48">1 Km Tariff <i className="help-icon" onClick={() => setShow(!show)}> </i></span>
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
                onChange={(e) => console.log(e.target ? e.target.value : e)}
                label="Set your price for 1 km ride, including waiting time"
                placeholder="price"
                wrapperClassName={["marginTop30"]}
                inputClassName={[""]}
                isNumber={true}
                value=""
                name="tariff"
            />


            <div className="clear"> </div>
            <div className="back" onClick={() => {
                step > 1 && setStep(step - 1);
            }}>Back</div>
            <FormButton
                customClass={classes.next}
                label="FINISH"
                onClick={() => step < 7 && setStep(step + 1)}
            />
            <div className="clear"> </div>
        </div>
    );
}

export default Step_7;