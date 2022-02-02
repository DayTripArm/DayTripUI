import React, {useEffect} from 'react';
import HomeIllustration from './components/HomeIllustration';
import TopChoises from './components/TopChoises';
import SearchDriver from './components/SearchDriver';
import ExploreTrips from './components/ExploreTrips';
import { useLocation } from 'react-router-dom';
import {useDispatch} from "react-redux";
import actions from "../../../actions";

import _ from "lodash";
import i18n from '../../../i18n';

const Home = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const lang = i18n.language || localStorage.getItem('lang') || 'en'
    const {search = ""} = location;

    useEffect(() => {

        // get confirmation token and send to back end
        if (!_.isEmpty(search) && search.match(/confirmation_token/)) {
            let token = search.split("=")[1];

            dispatch(actions.signInRequest({
                confirmation_token: token
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const body = {
            offset: 0,
            limit: 12,
            lang
        }
        dispatch(actions.heroesRequest(lang));
        dispatch(actions.tripsRequest(body));
        dispatch(actions.hitTheRoadRequest(lang));
        dispatch(actions.tipsRequest(3, lang));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang]);

    return (
        <section className='home-page'>
            <HomeIllustration/>
            <div className='mt-10 mt-md-13 mt-lg-15 pl-4'>
                <div className='slider-container'>
                    <TopChoises/>
                </div>
            </div>
            <div className='container'>
                <div className='mt-10 mt-md-13 mt-lg-15'>
                    <SearchDriver/>
                </div>
                <div className='mt-10 mt-md-13 mt-lg-15'>
                    <ExploreTrips/>
                </div>
            </div>
        </section>
    );
};

export default Home;
