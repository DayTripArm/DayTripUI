import React from 'react';
import { IconStar } from 'shared/components/Icons';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

const PopularTrips = ({popular_trips}) => {
    const { t } = useTranslation();
    return (
        <div>
            {
                !_.isEmpty(popular_trips) && popular_trips.map((popular_trip, i) => {
                    return(
                        <div key={i}>
                          <div className='text-separator my-5' >
                            <span className='separator-content text-xs text__grey-dark py-1 px-2'>{t("progress_page.booked_count_text", {count: popular_trip?.popularity_score})}</span>
                          </div>
                          <div className='d-flex mb-4'>
                            {popular_trip.trip_details?.image ?
                                <img
                                  width='48'
                                  height='48'
                                  alt={popular_trip?.trip_details?.title || 'Trip'}
                                  src={process.env.NODE_ENV === "development" ? "http://localhost:3000" + popular_trip.trip_details?.image: popular_trip.trip_details?.image}
                                  className='object-pos-center object-fit-cover mr-3'
                                /> :
                                <div className='img_overlay object-pos-center object-fit-cover mr-3'>
                                </div>
                            }
                            <div>
                              <div>
                                <p className='weight-500 text-sm pt-1 mb-0'>{popular_trip?.trip_details?.title}</p>
                                <span className='weight-700'>{popular_trip.trip_details?.trip_review?.rate || t("commons.no_reviews")}</span>
                                <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1'/>
                              </div>
                            </div>
                          </div>
                       </div>
                    )
                })
            }
         </div>
     );
};

export default PopularTrips;
