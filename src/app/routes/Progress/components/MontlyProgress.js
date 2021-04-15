import React from 'react';
import moment from "moment";
import _ from "lodash";

const MontlyProgress = ({section, details}) => {
    const locale_code = localStorage.getItem('lang') || 'en'
    return (
        <div>
            {
                details && details.map((month_report, i) => {
                    return(
                        <div className='mb-4' key={i}>
                            <h4 className='mb-2'>{_.startCase(moment(month_report.month).locale(locale_code === "am" ? "hy-am" : locale_code).format("MMMM YYYY"))}</h4>
                            <p className='text__grey-dark mb-0'>{section === 1 ? "$" :""}{month_report.mountly_result}</p>
                        </div>
                    )
                })
            }
         </div>
     );
};

export default MontlyProgress;
