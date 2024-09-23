// src/redux/reducers/authReducer.js
import { AUTH_ACTIONS } from "@/constant/action";

const initialState = {
    loading: false,
    user: null,
    error: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN_REQUEST:
        case AUTH_ACTIONS.REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case AUTH_ACTIONS.LOGIN_SUCCESS:
        case AUTH_ACTIONS.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
            };
        case AUTH_ACTIONS.LOGIN_FAILURE:
        case AUTH_ACTIONS.REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
