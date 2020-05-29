const nameSpace = "DAYTRIP";

const actions  = {
    SIGN_UP_REQUEST: `${nameSpace}_SIGN_UP_REQUEST`,
    signUpRequest: (body) => ({
        type: actions.SIGN_UP_REQUEST,
        body
    }),

    SIGN_UP_RECEIVE_SUCCESS: `${nameSpace}_SIGN_UP_RECEIVE_SUCCESS`,
    signUpReceiveSuccess: (response) => ({
        type: actions.SIGN_UP_RECEIVE_SUCCESS,
        response
    }),

    SIGN_UP_RECEIVE_ERROR: `${nameSpace}_SIGN_UP_RECEIVE_ERROR`,
    signUpReceiveError: (response) => ({
        type: actions.SIGN_UP_RECEIVE_ERROR,
        response
    }),

    SIGN_IN_REQUEST: `${nameSpace}_SIGN_IN_REQUEST`,
    signInRequest: (body) => ({
        type: actions.SIGN_IN_REQUEST,
        body
    }),

    SIGN_IN_RECEIVE_SUCCESS: `${nameSpace}_SIGN_IN_RECEIVE_SUCCESS`,
    signInReceiveSuccess: (response) => ({
        type: actions.SIGN_IN_RECEIVE_SUCCESS,
        response
    }),

    SIGN_IN_RECEIVE_ERROR: `${nameSpace}_SIGN_IN_RECEIVE_ERROR`,
    signInReceiveError: (response) => ({
        type: actions.SIGN_IN_RECEIVE_ERROR,
        response
    }),

    SHOW_HIDE_SIGN_IN: `${nameSpace}_SHOW_HIDE_SIGN_IN`,
    showHideSignIn: (show) => ({
        type: actions.SHOW_HIDE_SIGN_IN,
        show
    }),

    SHOW_HIDE_SIGN_UP: `${nameSpace}_SHOW_HIDE_SIGN_UP`,
    showHideSignUp: (show) => ({
        type: actions.SHOW_HIDE_SIGN_UP,
        show
    }),
};

export default actions;