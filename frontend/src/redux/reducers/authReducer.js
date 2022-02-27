import {
    USER_LOADING,
    USER_LOADED,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    AUTH_ERROR
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}


export const authReducer = (state = initialState, { type, payload }) => {
    
    switch (type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED: 
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isLoading: false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT_SUCCESS: 
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null
            }
        default:
            return state;
    }

}