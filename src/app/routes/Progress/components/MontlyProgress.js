import React from 'react';

const MontlyProgress = ({section, details}) => {
    return (
        <div>
            {
                details && details.map((month_report, i) => {
                    return(
                        <div className='mb-4' key={i}>
                            <h4 className='mb-2'>{month_report.month}</h4>
                            <p className='text__grey-dark mb-0'>{section === 1 ? "$" :""}{month_report.mountly_result}</p>
                        </div>
                    )
                })
            }
         </div>
     );
};

export default MontlyProgress;
