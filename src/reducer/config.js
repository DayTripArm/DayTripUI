import actions from "../actions";

export const INITIAL_STATE = {
    isAuthenticated: false,
    registeredUserType: undefined,
    userType: undefined,
    is_prereg: undefined,
    confirmed_at: undefined,
    individual_user: {}
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

        case actions.LOG_OUT: {

            return {
                ...INITIAL_STATE
            }
        }

        default:
            return state;
    }
};


export default config;
