import actions from "../actions";

export const INITIAL_STATE = {
    showWelcome: false,
    showSignIn: false,
    showSignUp: false,
    user_info: {},
    profile: {}
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
                showSignUp: !state.showSignUp
            }
        }

        case actions.SHOW_HIDE_SIGN_UP: {
            const { show } = action;

            return {
                ...state,
                showSignUp: show
            }
        }

        case actions.TRAVELER_PROFILE_INFO_RECEIVE: {
            const { data } = action;

            return {
                ...state,
                profile: data || {}
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