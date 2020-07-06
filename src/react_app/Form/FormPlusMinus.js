import React, {useState} from "react";

const MAX_VALUE = 9;
const MIN_VALUE = 1;

function FormPlusMinus(props) {

    const [value, setValue] = useState(props.initialValue || 0);

    const {
        label,
        name,
        customLabelClassName="",
        wrapperClassName="",
        onChange,
    } = props;

    const handleClick = (operation) => {
        // eslint-disable-next-line no-eval
        const steps = eval(`${value} ${operation} 1`);
        setValue(steps);

        if (onChange) {
            onChange({name, value: steps});
        }
    };

    return(
        <div className={`plus-minus ${wrapperClassName}`}>
            <div className={`label ${customLabelClassName}`}>{label}</div>

            <div className="plus" onClick={() => value < MAX_VALUE && handleClick("+")}> </div>
            <div className="value">{value}</div>
            <div className="minus" onClick={() => value > MIN_VALUE && handleClick("-")}> </div>
        </div>
    );
}

export default FormPlusMinus;