import actions from "../actions";

export const INITIAL_STATE = {
    showWelcome: false,
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
    booked_trips: {}
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
