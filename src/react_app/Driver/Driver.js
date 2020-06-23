import React, {useState} from 'react';
// import {useSelector} from "react-redux";/
import DriverHeader from "../Header/DriverHeader";
import Footer from "../Footer";
import "./driver.scss";

import Step_1 from "./Steps/Step_1";
import Step_2 from "./Steps/Step_2";


const StepPageByNumber = {
    1: Step_1,
    2: Step_2,
};

function Driver(props) {
    document.body.onselectstart = () => false;

    // const {
    //     userType
    // } = useSelector(state => state.dayTrip);
    //
    const [step, setStep] = useState(1);

    const StepPage = StepPageByNumber[step];

    return (
        <div id="page">
            <DriverHeader step={step}/>

            <div className="driver-content">
                <StepPage setStep={setStep} step={step} />
            </div>

            <Footer />
        </div>
    );
}

export default Driver;