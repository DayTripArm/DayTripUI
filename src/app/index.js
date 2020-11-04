import React, {useEffect} from 'react';

// Load Vendors
import { Route, Switch, Redirect } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {DRIVER_TYPE, TRAVELER_TYPE} from "../constants";
import actions from "../actions";

// Load Components
import Header from './components/Header';
import Footer from './components/Footer';

// Load Routes
import Home from './routes/Home';
import Help from './routes/Help';
import HelpView from './routes/HelpView';
import DriverRegister from './routes/DriverRegister';
import Car from './routes/Car';
import Checkout from './routes/Checkout';
import Individuals from './routes/Individuals';
import Drivers from './routes/Drivers';
import Messaging from './routes/Messaging';
import Calendar from './routes/Calendar';
import Tour from './routes/Tour';
import Progress from './routes/Progress';
import Favorites from './routes/Favorites';
import Refer from './routes/Refer';
import Account from './routes/Account';
import Trips from './routes/Trips';
import ModelOnboarding from "./components/modals/ModalOnboarding";

const App = () => {
    const dispatch = useDispatch();
    const {travelerData, config} = useSelector(state => state);

    useEffect(() => {
        if (localStorage.userType && localStorage.userType === TRAVELER_TYPE) {
            dispatch(actions.setUserType(TRAVELER_TYPE));
            dispatch(actions.setAuthentication(true));
        } else if (localStorage.userType && localStorage.userType === DRIVER_TYPE) {
            dispatch(actions.setUserType(DRIVER_TYPE));
            dispatch(actions.setAuthentication(true));
        }

        if (localStorage.is_prereg && localStorage.is_prereg === "true") {
            dispatch(actions.setPrereg(localStorage.is_prereg));
        }

        delete localStorage.proceed_once; // we don't need this attribute in first time
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (localStorage.userType) {
            dispatch(actions.profileInfoRequest(localStorage.id));
        }
        const body = {
            offset: 0,
            limit: 12
        };
        dispatch(actions.heroesRequest());
        dispatch(actions.tripsRequest(body));
        dispatch(actions.hitTheRoadRequest());
        dispatch(actions.tipsRequest(3));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const {
        showWelcome,
    } = travelerData;

    let navigationType = "user"; // traveler
    const {userType, is_prereg=""} = config;

    // Conditionally
    const isAuthenticated = userType === "2" && is_prereg.toString() === "true" ? false : userType === "1" || userType === "2";

    if (userType === "2") navigationType = "driver";

    return (
        <>
            { showWelcome &&
            <ModelOnboarding onClose={() => {
                dispatch(actions.showHideSignUp(false));
                dispatch(actions.showHideWelcome(false));
            }} />
            }
            <Header type={isAuthenticated ? 'authorized' : 'unauthorized'} navigationType={navigationType} />
            <main role='main'>
                <Switch>
                    <Route path='/home' component={Home} />
                    <Route path='/help/:id' component={HelpView} />
                    <Route path='/help' component={Help} />
                    <Route path='/driverRegister' component={DriverRegister} />
                    <Route path='/car' component={Car} />
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/individuals' component={Individuals} />
                    <Route path='/drivers' component={Drivers} />
                    <Route path='/messaging' component={Messaging} />
                    <Route path='/calendar' component={Calendar} />
                    <Route path='/tour/:id' component={Tour} />
                    <Route path='/progress' component={Progress} />
                    <Route path='/favorites' component={Favorites} />
                    <Route path='/refer' component={Refer} />
                    <Route path='/account' component={Account} />
                    <Route path='/trips' component={Trips} />
                    <Redirect from='*' to={localStorage.userType === "2" ? '/calendar' : '/home'} />
                </Switch>
            </main>
            <Footer />
        </>
    );
};

export default App;
