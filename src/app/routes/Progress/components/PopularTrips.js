import React from 'react';
import { IconStar } from 'shared/components/Icons';

const PopularTrips = ({popular_trips}) => {
    return (
        <div>
            {
                popular_trips && popular_trips.map((trip, i) => {
                    return(
                        <div key={i}>
                          <div className='d-flex mb-4'>
                            <img
                              width='48'
                              height='48'
                              src={process.env.NODE_ENV === "development" ? "http://localhost:3000" + trip.image: trip.image}
                              alt='user'
                              className='rounded__50 object-pos-center object-fit-cover mr-3'
                            />
                            <div>
                              <div>
                                <p className='weight-500 text-sm pt-1 mb-0'>{trip.title}</p>
                                <span className='weight-700'>{trip.trip_review.rate || 'No reviews'}</span>
                                <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1'/>
                              </div>
                            </div>
                          </div>
                          <hr className='border__top border__default my-4' />
                       </div>
                    )
                })
            }
         </div>
     );
};

export default PopularTrips;
