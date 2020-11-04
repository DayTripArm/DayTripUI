import React from 'react';
import Card from 'shared/components/Card';
import {useDispatch, useSelector} from "react-redux";
import actions from "actions";

let limit = 12;
const ExploreTrips = () => {
    const {travelerData={}} = useSelector(state => state);
    const {trips} = travelerData;
    const {tripsList=[], tripsTotalCount} = trips;
    const dispatch = useDispatch();

    const loadTripsList = (lmt) => {
        limit = lmt +12;
        const body = {
            is_top_choice: false,
            offset: 0,
            limit: limit
        };
        dispatch(actions.tripsRequest(body))
    };
    return (
        <>
            <h2 className='text__blue'> Explore All Day Trips </h2>
            <div className='row row-1'>
                {
                    tripsList.map(trip => {
                        const src = process.env.NODE_ENV === "development"
                            ? "http://localhost:3000" + trip.trip.images[0].url
                            : trip.trip.images[0].url;

                        return(
                            <div key={trip.trip.id} className='col-6 col-md-4 col-lg-3 col-xxl-2__4 col-xxxl-2 px-2 mb-7'>
                                <Card
                                    size='sm'
                                    favorite={trip.is_saved}
                                    imageUrl={src}
                                    title={trip.trip.title}
                                    trip_duration={trip.trip.trip_duration}
                                    id={trip.trip.id}
                                />
                            </div>
                        );
                    })
                }
            </div>
            {(limit < tripsTotalCount) &&
            <div className='text-center'>
                <button onClick={e => loadTripsList(limit)} className='btn btn-primary text-uppercase'>Load More
                </button>
            </div>
            }
        </>
    )
};

export default ExploreTrips;
