import React, {useEffect} from 'react';
import TourIllustration from './components/TourIllustration';
import { IconStar, IconClockOutlined, IconDestination } from 'shared/components/Icons';
import Destinations from './components/Destinations';
import Reviews from '../Individuals/routes/Driver/components/Reviews';
import SearchPanel from './components/SearchPanel';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";

const Tour = ({ history }) => {
    const dispatch = useDispatch();

    const {id: trip_id} = useParams(); // trip_id

    const {travelerData} = useSelector(state => state);
    const {trip_detail={}} = travelerData;

    const {
        id,
        title,
        images=[],
        trip_duration,
        start_location,
        agenda,
        map_image=[],
    } = trip_detail.trip || {};

    const {is_saved, destinations=[]} = trip_detail;

    useEffect(() => {
        dispatch(actions.tripDetailRequest(trip_id));
        document.documentElement.scrollTop = 0;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trip_id]);

    return (
        <>
            <TourIllustration history={history} isSaved={is_saved} id={id} images={images} />
            <div className='rounded-top__30 bg-white pull-t-9 position-relative mb-10 mb-md-13 mb-xxl-15'>
                <div className='container pt-6 pt-md-8 pt-xl-11'>
                    <div className='row'>
                        <div className='col-xl-4'>
                            <h2 className='text__blue mb-1'>{title}</h2>
                            <p>
                                <span className='weight-700'>5.0</span>
                                <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                                <span className='text-sm text__grey-dark'>(125 reviews)</span>
                            </p>
                        </div>
                        <div className='col-xl-8 d-xl-flex align-items-end pb-xl-4'>
                            <div className='d-md-flex'>
                                <div className='d-flex mb-4 mb-md-0 mr-md-5'>
                                    <IconClockOutlined className='mr-2' />
                                    <p className='mb-0'>Trip duration: <span className='weight-500 text__grey-dark'>{trip_duration} hours</span></p>
                                </div>
                                <div className='d-flex mb-0'>
                                    <IconDestination className='mr-2' />
                                    <p className='mb-0'>Starting destination:{' '}<span className='weight-500 text__grey-dark'>{start_location}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-9 mt-md-11 mt-xl-13 mt-xxl-15'>
                        <div className='col-xl-4'>
                            <h2 className='mb-4 mb-md-5'>What You'll Do</h2>
                        </div>
                        <div className='col-xl-8' dangerouslySetInnerHTML={{__html: agenda}}></div>
                    </div>
                    <div className='row mt-9 mt-md-11 mt-xl-13 mt-xxl-15'>
                        <div className='col-xl-4'>
                            <h2 className='mb-4 mb-md-5'>What You'll See</h2>
                        </div>
                        <div className='col-xl-8'>
                            <Destinations destinations={destinations} modalImage={images[0]} />
                        </div>
                    </div>
                    <div className='row mt-9 mt-md-11 mt-xl-13 mt-xxl-15'>
                        <div className='col-xl-4'>
                            <h2 className='mb-4 mb-md-5'>Where You'll Be</h2>
                        </div>
                        <div className='col-xl-8'>
                            {
                                map_image.map((img, i) => {
                                    const src = process.env.NODE_ENV === "development"
                                        ? "http://localhost:3000" + img.url
                                        : img.url;
                                    return(
                                        <img key={i} src={src} alt='map' className='w-100 rounded__8' />
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xl-4' />
                        <div className='col-xl-8'>
                            <Reviews />
                        </div>
                    </div>
                </div>
            </div>
            <SearchPanel trip_detail={trip_detail.trip || {}} />
        </>
    );
};

export default Tour;
