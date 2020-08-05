import React, {useEffect} from 'react';
import Card from 'shared/components/Card';
import NoResults from './components/NoResults';
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";
import _ from "lodash";

const Favorites = () => {
    const dispatch = useDispatch();
    const {travelerData} = useSelector(state => state);
    const {saved_trips=[]} = travelerData;

    useEffect(() => {
        dispatch(actions.savedTripsRequest());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {
                _.isEmpty(saved_trips)
                    ?
                    <NoResults/>
                    :
                    <div className='container pt-6 pt-md-8 pt-xl-11 xxl-13'>
                        <h2 className='text__blue'>Saved Trips</h2>
                        <div className='row row-1'>
                                {
                                    saved_trips.map(trip => {
                                        const src = process.env.NODE_ENV === "development"
                                            ? "http://localhost:3000" + trip.images[0].url
                                            : trip.images[0].url;
                                        return (
                                            <div className='col-6 col-md-4 col-lg-3 col-xxl-2__4 col-xxxl-2 px-2 mb-7' key={trip.id}>
                                                <Card
                                                    id={trip.id}
                                                    size='sm'
                                                    title={trip.title}
                                                    trip_duration={trip.trip_duration}
                                                    favorite={true}
                                                    imageUrl={src}
                                                />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                    </div>
            }
        </>
    );
};

export default Favorites;
