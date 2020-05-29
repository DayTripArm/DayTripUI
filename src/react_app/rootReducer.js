import {combineReducers} from 'redux';
import actions from "./actions";

export const INITIAL_STATE = {
    showWelcome: false,
    showSignIn: false,
    showSignUp: false,
    isTraveler: false,
    isDriver: false,
    user_info: {},
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
                isTraveler: true
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
                isTraveler: true
            }
        }

        case actions.SHOW_HIDE_SIGN_IN: {
            const { show } = action;

            return {
                ...state,
                showSignIn: show
            }
        }

        case actions.SHOW_HIDE_SIGN_UP: {
            const { show } = action;

            return {
                ...state,
                showSignUp: show
            }
        }

        default:
            return state;
    }
};


export default combineReducers({
    dayTrip: rootReducer
});