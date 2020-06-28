import actions from "../actions";

export const INITIAL_STATE = {
    registeredUserType: undefined,
    userType: undefined
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

        case actions.SET_USER_TYPE: {
            const { userType } = action;
            localStorage.setItem("userType", userType);

            return {
                ...state,
                userType: String(userType)
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