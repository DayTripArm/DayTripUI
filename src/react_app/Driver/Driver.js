import React, {useState} from 'react';
import DriverHeader from "../Header/DriverHeader";
import Footer from "../Footer";
import "./driver.scss";

import Step_1 from "./Steps/Step_1";
import Step_2 from "./Steps/Step_2";
import Step_3 from "./Steps/Step_3";


const StepPageByNumber = {
    1: {page: Step_1, stepText: "Step 1: Driver Sign Up"},
    2: {page: Step_2, stepText: "Step 1: Driver Sign Up"},
    3: {page: Step_3, stepText: "Step 2: Driver Sign Up"},
};

function Driver(props) {
    document.body.onselectstart = () => false;

    const [step, setStep] = useState(3);

    const StepPage = StepPageByNumber[step].page;
    const stepText = StepPageByNumber[step].stepText;

    return (
        <div id="page">
            <DriverHeader step={step} stepText={stepText}/>

            <div className="driver-content">
                <StepPage setStep={setStep} step={step} />
            </div>

            <Footer />
        </div>
    );
}

export default Driver;