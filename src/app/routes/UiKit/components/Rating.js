import React, { useState } from 'react';
import { IconStar } from 'shared/components/Icons';

const rates = [5, 4, 3, 2, 1];

const Rating = () => {
  const [rate, setRate] = useState(null);

  return (
    <div
      className={`rating d-flex flex-row-reverse justify-content-between w-100 mxw-328px${
        rate ? ' rating__done' : ''
      }`}
    >
      {rates.map((item, i) => (
        <button
          className={`btn btn-circle btn-static border-0${5 - rate === i ? ' active' : ''}`}
          key={item}
          onClick={() => setRate(5 - i)}
        >
          <IconStar />
        </button>
      ))}
    </div>
  );
};

export default Rating;
