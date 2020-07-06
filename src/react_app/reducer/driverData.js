import actions from "../actions";

export const INITIAL_STATE = {
    driver_info: {},
    preregistered_info: {
        car_mark_list: [],
        car_model_list: [],
        car_options: {},
        car_photos: [],
        seats: 4
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
                    car_options: {
                        ...state.preregistered_info.car_options,
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

            console.log(" data ", data);

            return {
                ...state,
                preregistered_info: {
                    ...state.preregistered_info,
                    car_model_list: data.car_models
                }
            }
        }

        default:
            return state;
    }
};


export default driverData;