import React, { useState } from 'react';
import { IconStar } from 'shared/components/Icons';

const rates = [5, 4, 3, 2, 1];

const Rating = (props) => {
  const [rating, setRate] = useState(props.initValue);

    const {
        name,
        onClick,
    } = props;
    const onChangeRate = (rate) => {
        setRate(rate);

        if (onClick) {
            onClick(rate);
        }
    };
  return (
    <div
      className={`rating d-flex flex-row-reverse justify-content-between w-100 mxw-328px`}
    >
      {rates.map((item, i) => (
        <button
          className={`btn btn-circle btn-static border-0${5 - rating === i ? ' active' : ''}`}
          key={item}
          onClick={() => onChangeRate(5 - i)}
        >
          <IconStar />
        </button>
      ))}
    </div>
  );
};

export default Rating;
