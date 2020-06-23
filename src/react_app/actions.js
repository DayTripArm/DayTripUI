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

    LOG_OUT: `${nameSpace}_LOG_OUT`,
    logOut: () => ({
        type: actions.LOG_OUT
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

    SWITCH_SIGN_IN_UP: `${nameSpace}_SWITCH_SIGN_IN_UP`,
    switchSignInUp: () => ({
        type: actions.SWITCH_SIGN_IN_UP
    }),

    PROFILE_INFO_REQUEST: `${nameSpace}_PROFILE_INFO_REQUEST`,
    profileInfoRequest: (id) => ({
        type: actions.PROFILE_INFO_REQUEST,
        id
    }),

    PROFILE_INFO_RECEIVE: `${nameSpace}_PROFILE_INFO_RECEIVE`,
    profileInfoReceive: (data) => ({
        type: actions.PROFILE_INFO_RECEIVE,
        data
    }),

    SET_USER_TYPE: `${nameSpace}_SET_USER_TYPE`,
    setUserType: (userType) => ({
        type: actions.SET_USER_TYPE,
        userType
    }),

    SET_REGISTERED_USER_TYPE: `${nameSpace}_SET_REGISTERED_USER_TYPE`,
    setRegisteredUserType: (userType) => ({
        type: actions.SET_REGISTERED_USER_TYPE,
        userType
    }),
};

export default actions;