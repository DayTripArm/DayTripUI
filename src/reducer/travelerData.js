import actions from "../actions";

export const INITIAL_STATE = {
    showWelcome: false,
    showConfirmation: false,
    showSignIn: false,
    showSignUp: false,
    user_info: {},
    profile: {},
    heroes: {},
    trips: [],
    search_for_drivers: {},
    trip_detail: {},
    saved_trips: [],
    hit_the_road: {},
    booked_trips: {},
    booked_trip_details: {},
    traveler_info: {},
    prices_list: {},
};

const travelerData = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.SIGN_UP_TRAVELER_RECEIVE_SUCCESS: {
            const { response } = action;
            const { data } = response;

            return {
                ...state,
                user_info: data
            }
        }

        case actions.SIGN_UP_RECEIVE_ERROR:
        case actions.SIGN_IN_RECEIVE_ERROR: {
            const { response } = action;
            const { data } = response;

            return {
                ...state,
                user_info: data
            }
        }

        case actions.SIGN_IN_RECEIVE_SUCCESS: {
            const { response } = action;
            const { data } = response;

            return {
                ...state,
                user_info: data
            }
        }

        case actions.SHOW_HIDE_SIGN_IN: {
            const { show } = action;

            return {
                ...state,
                showSignIn: show,
                user_info: {
                    ...state.user_info,
                    errors: {}    // reset error
                }
            }
        }

        case actions.SHOW_HIDE_WELCOME: {
            const { show } = action;

            return {
                ...state,
                showWelcome: show,
            }
        }

        case actions.SHOW_HIDE_CONFIRMATION: {
            const { show } = action;

            return {
                ...state,
                showConfirmation: show
            }
        }

        case actions.SWITCH_SIGN_IN_UP: {
            return {
                ...state,
                showSignIn: !state.showSignIn,
                showSignUp: !state.showSignUp,
                user_info: {
                    ...state.user_info,
                    errors: {}    // reset error
                }
            }
        }

        case actions.SHOW_HIDE_SIGN_UP: {
            const { show } = action;

            return {
                ...state,
                showSignUp: show,
                user_info: {
                    ...state.user_info,
                    errors: {}    // reset error
                }
            }
        }

        case actions.TRAVELER_PROFILE_INFO_RECEIVE: {
            const { data } = action;

            return {
                ...state,
                profile: data || {}
            }
        }

        case actions.HEROES_RECEIVE: {
            const { data } = action;

            return {
                ...state,
                heroes: data || {}
            }
        }

        case actions.TRIPS_RECEIVE: {
            const { data } = action;

            return {
                ...state,
                trips: data || []
            }
        }

        case actions.HIT_THE_ROAD_RECEIVE: {
            const { data } = action;

            return {
                ...state,
                hit_the_road: data || {}
            }
        }

        case actions.TIPS_RECEIVE: {
            const { data } = action;

            return {
                ...state,
                htrTips: data || {}
            }
        }

        case actions.DRIVERS_LIST_RECEIVE: {
            const { data } = action;
            return {
                ...state,
                search_for_drivers: data || {}
            }
        }

        case actions.SAVED_TRIPS_RECEIVE: {
            const { data } = action;

            return {
                ...state,
                saved_trips: data || []
            }
        }

        case actions.TRIP_DETAIL_REQUEST: {
            return {
                ...state,
                trip_detail: {}
            }
        }

        case actions.TRIP_DETAIL_RECEIVE: {
            const { data } = action;

            return {
                ...state,
                trip_detail: data || {}
            }
        }

        case actions.BOOKED_TRIPS_RECEIVE:{
            const {data} = action;
            return {
                ...state,
                booked_trips: data
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

        case actions.TRIP_BOOKING_CHECKOUT_RECEIVE_ERROR: {
            const {response} = action;
            const {data} = response;

            return {
                ...state,
                booked_trip_errors: data
            }
        }

        case actions.PRICES_LIST_RECEIVE:{
            const {data={}} = action;

            return {
                ...state,
                prices_list: data
            }
        }


        case actions.LOG_OUT: {

            return {
                ...INITIAL_STATE
            }
        }

        default:
            return state;
    }
};


export default travelerData;
