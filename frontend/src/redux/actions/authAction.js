import { 

    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS
} from './types'
import axios from 'axios';
import { getError } from './errorAction';



// USER DATA
export const userLoaded = () => (dispatch, getstate)=> {

    axios.get(`http://localhost:5000/api/users/getMe`, tokenConfig(getstate))
    .then(res => {

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })

    }).catch(err => {
        dispatch(getError(err.response.data, err.response.status));

        dispatch({
            type: AUTH_ERROR
        });
    })
}



// USER LOGIN
export const login = (data) => dispatch => {

    const config = {
        headers: {
            "Content-type": "Application/json"
        }
    }


    axios.post('http://localhost:5000/api/users/login',data, config )
    .then(res => {

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

    }).catch(err => {

        dispatch(getError(err.response.data, err.response.status, "LOGIN_FAIL"));

        dispatch({
            type: LOGIN_FAIL
        });

    })

}


// USER REGISTER
export const register = (data) => dispatch => {

    const config = {
        headers: {
            'Content-type': 'Application/json'
        }
    }

    axios.post('http://localhost:5000/api/users', data, config)
    .then(res => {

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

    }).catch(err => {

        dispatch(getError(err.response.data, err.response.status, "REGISTER_FAIL"))

        dispatch({ type: REGISTER_FAIL })
    })

}



// USER LOGOUT
export const logoutUser = () => dispatch => {

    dispatch({
        type: LOGOUT_SUCCESS
    })
}


// token configuration
export const tokenConfig = getState => {

    // Get token from localstorage
    const token = getState().auth.token;

    // headers
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    return config;
}

