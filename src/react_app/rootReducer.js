import {combineReducers} from 'redux';
import actions from "./actions";
import {
    TRAVELER_TYPE
} from "./contants";

export const INITIAL_STATE = {
    showWelcome: false,
    showSignIn: false,
    showSignUp: false,
    userType: 0,
    user_info: {},
    profile: {}
};

const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.SIGN_UP_RECEIVE_SUCCESS: {
            const { response } = action;
            const { data } = response;

            return {
                ...state,
                user_info: data,
                showWelcome: true,
                userType: TRAVELER_TYPE
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
                user_info: data,
                userType: TRAVELER_TYPE
            }
        }

        case actions.SHOW_HIDE_SIGN_IN: {
            const { show } = action;

            return {
                ...state,
                showSignIn: show,
                user_info: {}
            }
        }

        case actions.SWITCH_SIGN_IN_UP: {
            return {
                ...state,
                showSignIn: !state.showSignIn,
                showSignUp: !state.showSignUp,
                user_info: {}
            }
        }

        case actions.SHOW_HIDE_SIGN_UP: {
            const { show } = action;

            return {
                ...state,
                showSignUp: show,
                user_info: {}
            }
        }

        case actions.PROFILE_INFO_RECEIVE: {
            const { data } = action;

            return {
                ...state,
                profile: data
            }
        }

        case actions.SET_USER_TYPE: {
            const { userType } = action;

            return {
                ...state,
                userType
            }
        }

        case actions.SET_REGISTERED_USER_TYPE: {
            const { userType } = action;

            return {
                ...state,
                registeredUserType: userType
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


export default combineReducers({
    dayTrip: rootReducer
});