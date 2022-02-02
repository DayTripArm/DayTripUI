import actions from "../actions";

export const INITIAL_STATE = {
    isAuthenticated: false,
    registeredUserType: undefined,
    userType: undefined,
    is_prereg: undefined,
    confirmed_at: undefined,
    email: undefined,
    individual_user: {},
    lang: undefined,
    currency: undefined,
    conversations: {},
    conversation: {},
    messages: [],
    booking_price: undefined,
    message: undefined,
    helpContentList: undefined,
    individualContent: undefined
};

const config = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case actions.SET_REGISTERED_USER_TYPE: {
            const { userType } = action;

            return {
                ...state,
                registeredUserType: userType
            }
        }

        case actions.SET_AUTHENTICATION: {
            const { isAuthenticated } = action;

            return {
                ...state,
                isAuthenticated
            }
        }

        case actions.SET_USER_TYPE: {
            const { userType } = action;
            localStorage.setItem("userType", userType);

            return {
                ...state,
                userType: String(userType)
            }
        }

        case actions.SET_CONFIRMATION: {
            const { confirmed_at } = action;

            return {
                ...state,
                confirmed_at
            }
        }
        case actions.SET_EMAIL: {
            const { email } = action;

            return {
                ...state,
                email
            }
        }

        case actions.INDIVIDUAL_USER_RECEIVE: {
            const { data } = action;

            return {
                ...state,
                individual_user: data.profile || {}
            }
        }

        case actions.SET_PREREG: {
            const { bool } = action;
            localStorage.setItem("is_prereg", bool);

            return {
                ...state,
                is_prereg: bool
            }
        }

        case actions.CONVERT_TRIP_PRICE_RECEIVE: {
            const { data } = action;

            return {
                ...state,
                booking_price: data
            }
        }

        case actions.LOG_OUT: {

            return {
                ...INITIAL_STATE
            }
        }
        case actions.SWITCH_LANGUAGE: {
            const { lang } = action;
            return {
                ...state,
                lang: lang
            }
        }

        case actions.SWITCH_CURRENCY: {
            const { currency } = action;
            return {
                ...state,
                currency: currency
            }
        }

        case actions.GET_CONVERSATION_RECEIVE: {
            const { data } = action;
            return {
                ...state,
                conversation: data
            }
        }

        case actions.CONVERSATIONS_LIST_RECEIVE: {
            const { data } = action;
            return {
                ...state,
                conversations: data
            }
        }

        case actions.VIEW_CONVERSATION_DETAILS_RECEIVE: {
            const { data } = action;
            return {
                ...state,
                conversation: data
            }
        }

        case actions.SEND_MESSAGE_RECEIVE: {
            const { data } = action;
            return {
                ...state,
                message: data
            }
        }

        case actions.GET_CONVERSATION_MESSAGES_RECEIVE: {
            const { data } = action;
            return {
                ...state,
                messages: data
            }
        }

        case actions.HELP_CONTENT_LIST_RECEIVE: {
            const { data } = action;

            return {
                ...state,
                helpContentList: data || {}
            }
        }

        case actions.HELP_INDIVIDUAL_CONTENT_RECEIVE: {
            const { data } = action;
            return {
                ...state,
                individualContent: data || {}
            }
        }

        default:
            return state;
    }
};


export default config;
