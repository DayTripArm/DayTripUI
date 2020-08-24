import React, {useEffect} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import CarView from './routes/CarView';
import CarDetails from './routes/CarDetails';
import CarPrices from './routes/CarPrices';
import {useDispatch} from "react-redux";
import actions from "../../../actions";
import Api from "../../../Api";

const Car = ({ match }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const asyncRequest = async () => {
            const driverInfo = await Api.driverInfosRequest(Number(localStorage.id));  // driverInfosRequest
            const {car_mark} = driverInfo.response.data.car_details.car_info;
            dispatch(actions.driverInfosReceive(driverInfo.response.data));   //driverInfosReceive

            const carMarks = await Api.getCarMarks();  // get car marks
            dispatch(actions.carMarkReceive(carMarks.response.data)); // set car marks

            const carModels = await Api.getCarModels(Number(car_mark)); // get car models
            dispatch(actions.carModelReceive(carModels.response.data));

            dispatch(actions.destinationRequest()); // get destination list

        };

        asyncRequest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='container'>
            <div className='d-flex justify-content-end'>
                <div className='col-xxl-10 col-xl-11 p-0'>
                    <h2 className='text__blue mt-6 mb-md-8 mt-md-9 mt-xl-11 mb-xl-9 mb-xxl-11 mt-xxl-13'>My Car</h2>
                    <div className='row'>
                        <div className='col-lg-3 col-lg-2'>
                            <div className={`menu-vertical menu-vertical__tabs bg-white px-lg-1 px-md-0`}>
                                <ul className='no-list-style mb-3 mb-lg-0 clearfix'>
                                    <li>
                                        <NavLink to={`${match.path}/view`} className='pl-3 py-2 pr-3 pr-lg-0'>Car Details</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={`${match.path}/details`} className='pl-3 py-2 pr-3 pr-lg-0'>More Details</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={`${match.path}/prices`} className='pl-3 py-2 pr-3 pr-lg-0'>Car Prices</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-12 col-lg-8 col-lg-9'>
                            <Switch>
                                <Route path={`${match.path}/view`} component={() => <CarView />}/>
                                <Route path={`${match.path}/details`} component={() => <CarDetails />}/>
                                <Route path={`${match.path}/prices`} component={CarPrices}/>
                                <Redirect from={match.path} to={`${match.path}/view`}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Car;
