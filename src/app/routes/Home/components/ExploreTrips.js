import React from 'react';
import Card from 'shared/components/Card';
import {useSelector} from "react-redux";

const ExploreTrips = () => {
    const {travelerData={}} = useSelector(state => state);
    const {trips=[]} = travelerData;

    return (
        <>
            <h2 className='text__blue'> Explore All Day Trips </h2>
            <div className='row row-1'>
                {
                    trips.map(trip => {
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
            <div className='text-center'>
                <button className='btn btn-primary'>Load More</button>
            </div>
        </>
    )
};

export default ExploreTrips;
