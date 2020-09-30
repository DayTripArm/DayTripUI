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

    TRAVELER_PROFILE_INFO_RECEIVE: `${nameSpace}_TRAVELER_PROFILE_INFO_RECEIVE`,
    travelerProfileInfoReceive: (data) => ({
        type: actions.TRAVELER_PROFILE_INFO_RECEIVE,
        data
    }),

    DRIVER_PROFILE_INFO_RECEIVE: `${nameSpace}_DRIVER_PROFILE_INFO_RECEIVE`,
    driverProfileInfoReceive: (data) => ({
        type: actions.DRIVER_PROFILE_INFO_RECEIVE,
        data
    }),

    SET_USER_TYPE: `${nameSpace}_SET_USER_TYPE`,
    setUserType: (userType) => ({
        type: actions.SET_USER_TYPE,
        userType
    }),

    SET_PREREG: `${nameSpace}_SET_PREREG`,
    setPrereg: (bool) => ({
        type: actions.SET_PREREG,
        bool
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

    HEROES_REQUEST: `${nameSpace}_HEROES_REQUEST`,
    heroesRequest: () => ({
        type: actions.HEROES_REQUEST,
    }),

    HEROES_RECEIVE: `${nameSpace}_HEROES_RECEIVE`,
    heroesReceive: (data) => ({
        type: actions.HEROES_RECEIVE,
        data
    }),

    TRIPS_REQUEST: `${nameSpace}_TRIPS_REQUEST`,
    tripsRequest: (is_top_choice) => ({
        type: actions.TRIPS_REQUEST,
        is_top_choice
    }),

    TRIPS_RECEIVE: `${nameSpace}_TRIPS_RECEIVE`,
    tripsReceive: (data) => ({
        type: actions.TRIPS_RECEIVE,
        data
    }),

    TRIP_DETAIL_REQUEST: `${nameSpace}_TRIP_DETAIL_REQUEST`,
    tripDetailRequest: (trip_id) => ({
        type: actions.TRIP_DETAIL_REQUEST,
        trip_id
    }),

    TRIP_DETAIL_RECEIVE: `${nameSpace}_TRIP_DETAIL_RECEIVE`,
    tripDetailReceive: (data) => ({
        type: actions.TRIP_DETAIL_RECEIVE,
        data
    }),

    HIT_THE_ROAD_REQUEST: `${nameSpace}_HIT_THE_ROAD_REQUEST`,
    hitTheRoadRequest: () => ({
        type: actions.HIT_THE_ROAD_REQUEST
    }),

    HIT_THE_ROAD_RECEIVE: `${nameSpace}_HIT_THE_ROAD_RECEIVE`,
    hitTheRoadReceive: (data) => ({
        type: actions.HIT_THE_ROAD_RECEIVE,
        data
    }),

    SAVE_TRIP: `${nameSpace}_SAVE_TRIP`,
    saveTrip: (is_save, trip_id) => ({
        type: actions.SAVE_TRIP,
        is_save,
        trip_id
    }),

    SAVED_TRIPS_REQUEST: `${nameSpace}_SAVED_TRIPS_REQUEST`,
    savedTripsRequest: () => ({
        type: actions.SAVED_TRIPS_REQUEST
    }),

    SAVED_TRIPS_RECEIVE: `${nameSpace}_SAVED_TRIPS_RECEIVE`,
    savedTripsReceive: (data) => ({
        type: actions.SAVED_TRIPS_RECEIVE,
        data
    }),

    SET_AUTHENTICATION: `${nameSpace}_SET_AUTHENTICATION`,
    setAuthentication: (isAuthenticated) => ({
        type: actions.SET_AUTHENTICATION,
        isAuthenticated
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

    DRIVER_INFOS_REQUEST: `${nameSpace}_DRIVER_INFOS_REQUEST`,
    driverInfosRequest: () => ({
        type: actions.DRIVER_INFOS_REQUEST
    }),

    DRIVER_INFOS_RECEIVE: `${nameSpace}_DRIVER_INFOS_RECEIVE`,
    driverInfosReceive: (data) => ({
        type: actions.DRIVER_INFOS_RECEIVE,
        data
    }),

    DELETE_DRIVER_INFOS_REQUEST: `${nameSpace}_DELETE_DRIVER_INFOS_REQUEST`,
    deleteDriverInfosRequest: (body) => ({
        type: actions.DELETE_DRIVER_INFOS_REQUEST,
        body
    }),

    DELETE_DRIVER_INFOS_RECEIVE: `${nameSpace}_DELETE_DRIVER_INFOS_RECEIVE`,
    deleteDriverInfosReceive: (data) => ({
        type: actions.DELETE_DRIVER_INFOS_RECEIVE,
        data
    }),

    UPDATE_DRIVER_INFOS_REQUEST: `${nameSpace}_UPDATE_DRIVER_INFOS_REQUEST`,
    updateDriverInfosRequest: (body) => ({
        type: actions.UPDATE_DRIVER_INFOS_REQUEST,
        body
    }),

    UPDATE_DRIVER_INFOS_RECEIVE: `${nameSpace}_UPDATE_DRIVER_INFOS_RECEIVE`,
    updateDriverInfosReceive: (data) => ({
        type: actions.UPDATE_DRIVER_INFOS_RECEIVE,
        data
    }),

    INDIVIDUAL_USER_REQUEST: `${nameSpace}_INDIVIDUAL_USER_REQUEST`,
    individualUserRequest: (id, user_type) => ({
        type: actions.INDIVIDUAL_USER_REQUEST,
        id,
        user_type
    }),

    INDIVIDUAL_USER_RECEIVE: `${nameSpace}_INDIVIDUAL_USER_RECEIVE`,
    individualUserReceive: (data) => ({
        type: actions.INDIVIDUAL_USER_RECEIVE,
        data
    }),

    CALENDAR_SETTINGS_REQUEST: `${nameSpace}_CALENDAR_SETTINGS_REQUEST`,
    getCalendarSettingsRequest: (driver_id) => ({
        type: actions.CALENDAR_SETTINGS_REQUEST,
        driver_id
    }),

    CALENDAR_SETTINGS_RECEIVE: `${nameSpace}_CALENDAR_SETTINGS_RECEIVE`,
    getCalendarSettingsReceive: (data) => ({
        type: actions.CALENDAR_SETTINGS_RECEIVE,
        data
    }),

    UPDATE_CALENDAR_SETTINGS_REQUEST: `${nameSpace}_UPDATE_CALENDAR_SETTINGS_REQUEST`,
    updateCalendarSettingsRequest: (driver_id, data) => ({
        type: actions.UPDATE_CALENDAR_SETTINGS_REQUEST,
        driver_id,
        data
    }),

    UPDATE_CALENDAR_SETTINGS_RECEIVE: `${nameSpace}_UPDATE_CALENDAR_SETTINGS_RECEIVE`,
    updateCalendarSettingsReceive: (data) => ({
        type: actions.UPDATE_CALENDAR_SETTINGS_RECEIVE,
        data
    }),

    DRIVERS_LIST_REQUEST: `${nameSpace}_DRIVERS_LIST_REQUEST`,
    searchForDriversRequest: (body) => ({
        type: actions.DRIVERS_LIST_REQUEST,
        body
    }),

    DRIVERS_LIST_RECEIVE: `${nameSpace}_DRIVERS_LIST_RECEIVE`,
    searchForDriverReceive: (data) => ({
        type: actions.DRIVERS_LIST_RECEIVE,
        data
    }),

    UPDATE_VALIDATION_LIST: `${nameSpace}_UPDATE_VALIDATION_LIST`,
    updateValidationList: (name) => ({
        type: actions.UPDATE_VALIDATION_LIST,
        name
    }),

    CONFIRM_CHECKOUT_RECEIVE: `${nameSpace}_UPDATE_VALIDATION_LIST`,
    confirmTripBookingCheckout: (body) => ({
        type: actions.CONFIRM_CHECKOUT_RECEIVE,
        body
    }),

    BOOKED_TRIPS_REQUEST: `${nameSpace}_BOOKED_TRIPS_REQUEST`,
    getBookedTripsRequest: (driver_id) => ({
        type: actions.BOOKED_TRIPS_REQUEST,
        driver_id
    }),

    BOOKED_TRIPS_RECEIVE: `${nameSpace}_BOOKED_TRIPS_RECEIVE`,
    getBookedTripsReceive: (data) => ({
        type: actions.BOOKED_TRIPS_RECEIVE,
        data
    }),
};

export default actions;
