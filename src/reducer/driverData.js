import actions from "../actions";
import _ from 'lodash';

export const INITIAL_STATE = {
    driver_info: {},
    profile: {},
    traveler_info: {},
    driver_details: {},
    calendar_settings: {},
    booked_trip_details: {},
    preregistered_info: {
        car_mark_list: [],
        car_model_list: [],
        car_specs: {},
        destination_list: [],
        tips: {},
        car_photos: [],
        gov_photos: [],
        license_photos: [],
        profile_photos: [],
        reg_card_photos: [],
        driver_calendar: {},
        car_seats: 4
    },
    validationList: ["car_type", "car_mark", "car_model", "car_color"]
};

const driverData = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case actions.SIGN_UP_DRIVER_RECEIVE_SUCCESS: {
            const { response } = action;
            const { data } = response;

            return {
                ...state,
                driver_info: data
            }
        }

        case actions.SET_PREREGISTERED_DRIVER_PROPERTY: {
            const {field, value} = action;

            return {
                ...state,
                preregistered_info: {
                    ...state.preregistered_info,
                    [field]: value
                }
            }
        }

        case actions.DRIVER_PROFILE_INFO_RECEIVE: {
            const { data } = action;

            return {
                ...state,
                profile: data || {}
            }
        }

        case actions.SET_PREREGISTERED_DRIVER_CAR_OPTIONS: {
            const {field, value} = action;
            let checked = value;

            if (!checked) {
                checked = undefined;
            }

            return {
                ...state,
                preregistered_info: {
                    ...state.preregistered_info,
                    car_specs: {
                        ...state.preregistered_info.car_specs,
                        [field]: checked
                    }
                }
            }
        }

        case actions.CAR_MARK_RECEIVE: {
            const {data} = action;

            return {
                ...state,
                preregistered_info: {
                    ...state.preregistered_info,
                    car_mark_list: data.brands
                }
            }
        }

        case actions.CAR_MODEL_RECEIVE: {
            const {data} = action;

            return {
                ...state,
                preregistered_info: {
                    ...state.preregistered_info,
                    car_model_list: data.car_models
                }
            }
        }

        case actions.DRIVER_UPLOAD_PHOTOS: {
            const {field, data} = action;

            return {
                ...state,
                preregistered_info: {
                    ...state.preregistered_info,
                    [field]: data
                }
            }
        }

        case actions.TIPS_RECEIVE: {
            const {data, tip_type} = action;

            return {
                ...state,
                preregistered_info: {
                    ...state.preregistered_info,
                    tips: {
                        ...state.preregistered_info.tips,
                        [tip_type]: data
                    }
                }
            }
        }

        case actions.DESTINATION_RECEIVE: {
            const {data} = action;
            const {destinations} = data;

            return {
                ...state,
                preregistered_info: {
                    ...state.preregistered_info,
                    destination_list: destinations
                }
            }
        }

        case actions.DRIVER_INFOS_RECEIVE: {
            const {data} = action;

            return {
                ...state,
                driver_details: data
            }
        }

        case actions.CALENDAR_SETTINGS_RECEIVE: {
            const {data} = action;
            return {
                ...state,
                calendar_settings: data
            }
        }

        case actions.UPDATE_VALIDATION_LIST: {
            const {name} = action;

            return {
                ...state,
                validationList: _.filter(state.validationList, i => i !== name)
            }
        }

        case actions.BOOKED_TRIPS_RECEIVE:{
            const {data} = action;
            return {
                ...state,
                driver_calendar: data
            }
        }

        case actions.BOOKED_TRIP_RECEIVE:{
            const {data} = action;
            return {
                ...state,
                booked_trip_details: data
            }
        }

        case actions.BOOKED_PROFILE_INFO_RECEIVE:{
            const {data={}} = action;

            return {
                ...state,
                traveler_info: data.profile
            }
        }

        default:
            return state;
    }
};


export default driverData;
