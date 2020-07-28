import {combineReducers} from 'redux';

import travelerData from "./travelerData";
import driverData from "./driverData";
import config from "./config";

export default combineReducers({
    config,
    travelerData,
    driverData
});