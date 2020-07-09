import React, {useState} from 'react';
import DriverHeader from "../Header/DriverHeader";
import Footer from "../Footer";
import "./driver.scss";

import Step_1 from "./Steps/Step_1";
import Step_2 from "./Steps/Step_2";
import Step_3 from "./Steps/Step_3";
import Step_4 from "./Steps/Step_4";
import Step_5 from "./Steps/Step_5";
import Step_6 from "./Steps/Step_6";
import Step_7 from "./Steps/Step_7";
import Step_8 from "./Steps/Step_8";


const StepPageByNumber = {
    1: {page: Step_1, stepText: "Step 1: Driver Sign Up"},
    2: {page: Step_2, stepText: "Step 1: Driver Sign Up"},
    3: {page: Step_3, stepText: "Step 2: Driver Sign Up"},
    4: {page: Step_4, stepText: "Step 3: Driver Sign Up"},
    5: {page: Step_5, stepText: "Step 4: Driver Sign Up"},
    6: {page: Step_6, stepText: "Step 4: Driver Sign Up"},
    7: {page: Step_7, stepText: "Step 5: Driver Sign Up"},
    8: {page: Step_8, stepText: "Step 5: Driver Sign Up"},
};

function Driver(props) {
    document.body.onselectstart = () => false;

    const [step, setStep] = useState(1);

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