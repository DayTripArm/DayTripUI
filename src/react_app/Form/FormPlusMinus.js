import React from "react";

function FormPlusMinus(props) {

    const {
        label,
        value,
        setSeat,
        customLabelClassName="",
        wrapperClassName=""
    } = props;

    return(
        <div className={`plus-minus ${wrapperClassName}`}>
            <div className={`label ${customLabelClassName}`}>{label}</div>

            <div className="plus" onClick={() => value < 9 && setSeat(value + 1)}> </div>
            <div className="value">{value}</div>
            <div className="minus" onClick={() => value > 1 && setSeat(value - 1)}> </div>
        </div>
    );
}

export default FormPlusMinus;