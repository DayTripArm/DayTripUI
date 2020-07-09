import actions from "../actions";

export const INITIAL_STATE = {
    driver_info: {},
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
        car_seats: 4
    }
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

        default:
            return state;
    }
};


export default driverData;