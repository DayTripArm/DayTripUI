import React, {useEffect} from 'react';
import TourIllustration from './components/TourIllustration';
import { IconStar, IconClockOutlined, IconDestination } from 'shared/components/Icons';
import Destinations from './components/Destinations';
import Reviews from '../Individuals/routes/Driver/components/Reviews';
import SearchPanel from './components/SearchPanel';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import i18n from './../../../i18n';
import actions from "../../../actions";
import {secondsToHourMinutes} from "../../../helper";
import _ from "lodash";

const Tour = ({ history }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const {id: trip_id} = useParams(); // trip_id

    const {travelerData} = useSelector(state => state);
    const {trip_detail={}} = travelerData;
    const lang = i18n.language || localStorage.getItem('lang') || 'en'
    const {location:history_location={}} = history;
    let {state:history_state={}} = history_location;

    if (!history_state) history_state={};

    const {
        booked_trip=false,
    } = history_state;

    const {
        id,
        title,
        images=[],
        trip_duration,
        start_location,
        agenda,
    } = trip_detail.trip || {};

    const {is_saved, destinations=[], review_stats={}, reviews=[]} = trip_detail;

    useEffect(() => {
        dispatch(actions.tripDetailRequest(trip_id, lang));
        document.documentElement.scrollTop = 0;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang, trip_id]);

    return (
        <>
            <TourIllustration booked_trip={booked_trip} history={history} isSaved={is_saved} id={id} images={images} />
            <div className='rounded-top__30 bg-white pull-t-9 position-relative mb-10 mb-md-13 mb-xxl-15'>
                <div className='container pt-6 pt-md-8 pt-xl-11'>
                    <div className='row'>
                        <div className='col-xl-4'>
                            <h2 className='text__blue mb-1'>{title}</h2>
                            <span className='weight-700'>{review_stats?.rate || t("commons.no_reviews")}</span>
                            <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                            {reviews.trip_review?.rate && <span className='text-sm text__grey-dark'>({review_stats.count} {t("commons.reviews")})</span>}
                        </div>
                        <div className='col-xl-8 d-xl-flex align-items-end pb-xl-4'>
                            <div className='d-md-flex'>
                                <div className='d-flex mb-4 mb-md-0 mr-md-5'>
                                    <IconClockOutlined className='mr-2' />
                                    <p className='mb-0'>{t("trip_details_page.duration")}: <span className='weight-500 text__grey-dark'>{secondsToHourMinutes(trip_duration, t("commons.short_duration.hours"), t("commons.short_duration.min"))}</span></p>
                                </div>
                                <div className='d-flex mb-0'>
                                    <IconDestination className='mr-2' />
                                    <p className='mb-0'>{t("trip_details_page.start")}:{' '}<span className='weight-500 text__grey-dark'>{start_location}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-9 mt-md-11 mt-xl-13 mt-xxl-15'>
                        <div className='col-xl-4'>
                            <h2 className='mb-4 mb-md-5'>{t("trip_details_page.title1")}</h2>
                        </div>
                        <div className='col-xl-8' dangerouslySetInnerHTML={{__html: agenda}}></div>
                    </div>
                    <div className='row mt-9 mt-md-11 mt-xl-13 mt-xxl-15'>
                        <div className='col-xl-4'>
                            <h2 className='mb-4 mb-md-5'>{t("trip_details_page.title2")}</h2>
                        </div>
                        <div className='col-xl-8'>
                            <Destinations destinations={destinations} />
                        </div>
                    </div>
                    <div className='row mt-9 mt-md-11 mt-xl-13 mt-xxl-15'>
                        <div className='col-xl-4'>
                            <h2 className='mb-4 mb-md-5'>{t("trip_details_page.title3")}</h2>
                        </div>
                        <div className='col-xl-8'>
                            <div className="map_container">
                            {destinations && destinations.length > 0 &&
                            <iframe
                                width="100%"
                                height="400px"
                                frameBorder="0"
                                id="tour_map"
                                title="Trip Map"
                                src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&mode=driving&origin=${start_location}
                                                      &destination=${_.last(destinations).dest_title || start_location}&waypoints=${_.join(destinations.map(dest => (dest.dest_title || start_location)), '|')}`}>
                             </iframe>
                            }
                            </div>
                        </div>
                    </div>


                    <div className='row'>
                        <div className='col-xl-4' />
                        <div className='col-xl-8'>
                            <Reviews reviews={reviews} review_stats={review_stats} />
                        </div>
                    </div>
                </div>
            </div>
            {!booked_trip && <SearchPanel trip_detail={trip_detail.trip || {}} review_stats={review_stats}  />}
        </>
    );
};

export default Tour;
