import React from 'react';
import {Link} from "react-router-dom";
import Progress from 'react-progressbar';

function DriverHeader(props) {

    const {
        step,
        stepText
    } = props;

    const progressLineUnit = 12.5;

    return (
        <header className="driver-header-border">
            <div className="header-left-side">
                <div className="daytrip"><span className="blue-color"><Link to="/">DAYTRIP</Link></span></div>
                <div className="step-area">{stepText}</div>
            </div>
            <div className="progress-line">
                <Progress completed={step * progressLineUnit} color="#FE4C30" height={3} animation={400} />
            </div>
        </header>
    );
}

export default DriverHeader;