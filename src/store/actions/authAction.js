// src/redux/actions/authActions.js
import { API } from "@/api/apiUrl";
import { AUTH_ACTIONS } from "@/constant/action";
import axiosInstance from "@/utils/axiosInstance";

// Action for logging in user
export const loginUser = (email, password) => async (dispatch) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_REQUEST });

    try {
        const res = await axiosInstance.post(`${API.LOGIN}`, { email, password });
        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: res });
    } catch (error) {
        dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: error.response.data });
    }
};

// Action for registering user
export const registerUser = (email, name, password) => async (dispatch) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_REQUEST });

    try {
        const res = await axiosInstance.post(`${API.REGISTER}`, {
            email,
            name,
            password,
        });
        dispatch({ type: AUTH_ACTIONS.REGISTER_SUCCESS, payload: res });
    } catch (error) {
        dispatch({ type: AUTH_ACTIONS.REGISTER_FAILURE, payload: error.response.data });
    }
};
