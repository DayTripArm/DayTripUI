import React, {useState} from "react";
import { IconPlus, IconMinus } from 'shared/components/Icons';



const FormPlusMinus = (props) => {

    const [value, setValue] = useState(props.initialValue || 0);

    const {
        label,
        name,
        onChange,
        max,
        min
    } = props;
    const MAX_VALUE = max || 9;
    const MIN_VALUE = min || 1;
    const handleClick = (operation) => {
        // eslint-disable-next-line no-eval
        const steps = eval(`${value} ${operation} 1`);
        setValue(steps);

        if (onChange) {
            onChange({name, value: steps});
        }
    };

    return (
        <div className='d-flex align-items-center mb-7'>
            <span className='weight-500 mr-1'>{label}</span>
            <div className='d-flex align-items-center'>
                <button className='btn btn-circle border-0' onClick={() => value >= MIN_VALUE && handleClick("-")}>
                    <IconMinus/>
                </button>
                <span className='mx-1'>{value}</span>
                <button className='btn btn-circle border-0' onClick={() => value < MAX_VALUE && handleClick("+")}>
                    <IconPlus/>
                </button>
            </div>
        </div>
    );
};

export default FormPlusMinus;
