const nameSpace = "DAYTRIP";

const actions  = {
    SIGN_UP_REQUEST: `${nameSpace}_SIGN_UP_REQUEST`,
    signUpRequest: (body) => ({
        type: actions.SIGN_UP_REQUEST,
        body
    }),

    SIGN_UP_TRAVELER_RECEIVE_SUCCESS: `${nameSpace}_SIGN_UP_TRAVELER_RECEIVE_SUCCESS`,
    signUpTravelerReceiveSuccess: (response) => ({
        type: actions.SIGN_UP_TRAVELER_RECEIVE_SUCCESS,
        response
    }),

    SIGN_UP_DRIVER_RECEIVE_SUCCESS: `${nameSpace}_SIGN_UP_DRIVER_RECEIVE_SUCCESS`,
    signUpDriverReceiveSuccess: (response) => ({
        type: actions.SIGN_UP_DRIVER_RECEIVE_SUCCESS,
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

    SHOW_HIDE_WELCOME: `${nameSpace}_SHOW_HIDE_WELCOME`,
    showHideWelcome: (show) => ({
        type: actions.SHOW_HIDE_WELCOME,
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

    UPDATE_PROFILE_INFO: `${nameSpace}_UPDATE_PROFILE_INFO`,
    updateProfileInfo: (id, data) => ({
        type: actions.UPDATE_PROFILE_INFO,
        id,
        data
    }),

    /*********************driver actions*************************/

    SET_PREREGISTERED_DRIVER_PROPERTY: `${nameSpace}_SET_PREREGISTERED_DRIVER_PROPERTY`,
    setPreregisteredDriverProperty: (field, value) => ({
        type: actions.SET_PREREGISTERED_DRIVER_PROPERTY,
        field,
        value
    }),

    SET_PREREGISTERED_DRIVER_CAR_OPTIONS: `${nameSpace}_SET_PREREGISTERED_DRIVER_CAR_OPTIONS`,
    setPreregisteredDriverCarOptions: (field, value) => ({
        type: actions.SET_PREREGISTERED_DRIVER_CAR_OPTIONS,
        field,
        value
    }),

    CAR_MARK_REQUEST: `${nameSpace}_CAR_MARK_REQUEST`,
    carMarkRequest: () => ({
        type: actions.CAR_MARK_REQUEST
    }),

    CAR_MARK_RECEIVE: `${nameSpace}_CAR_MARK_RECEIVE`,
    carMarkReceive: (data) => ({
        type: actions.CAR_MARK_RECEIVE,
        data
    }),

    CAR_MODEL_REQUEST: `${nameSpace}_CAR_MODEL_REQUEST`,
    carModelRequest: (mark_id) => ({
        type: actions.CAR_MODEL_REQUEST,
        mark_id
    }),

    CAR_MODEL_RECEIVE: `${nameSpace}_CAR_MODEL_RECEIVE`,
    carModelReceive: (data) => ({
        type: actions.CAR_MODEL_RECEIVE,
        data
    }),

    DRIVER_UPLOAD_PHOTOS: `${nameSpace}_DRIVER_UPLOAD_PHOTOS`,
    driverUploadPhotos: (field, data) => ({
        type: actions.DRIVER_UPLOAD_PHOTOS,
        field,
        data
    }),

    TIPS_REQUEST: `${nameSpace}_TIPS_REQUEST`,
    tipsRequest: (tip_type) => ({
        type: actions.TIPS_REQUEST,
        tip_type
    }),

    TIPS_RECEIVE: `${nameSpace}_TIPS_RECEIVE`,
    tipsReceive: (data, tip_type) => ({
        type: actions.TIPS_RECEIVE,
        data,
        tip_type
    }),

    DESTINATION_REQUEST: `${nameSpace}_DESTINATION_REQUEST`,
    destinationRequest: () => ({
        type: actions.DESTINATION_REQUEST
    }),

    DESTINATION_RECEIVE: `${nameSpace}_DESTINATION_RECEIVE`,
    destinationReceive: (data) => ({
        type: actions.DESTINATION_RECEIVE,
        data
    }),

    SAVE_DRIVER_PREREG_DATA: `${nameSpace}_SAVE_DRIVER_PREREG_DATA`,
    saveDriverPreregData: () => ({
        type: actions.SAVE_DRIVER_PREREG_DATA
    }),
};

export default actions;