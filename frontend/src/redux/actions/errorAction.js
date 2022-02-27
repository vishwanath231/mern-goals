import { 
    GET_ERROR,
    CLEAR_ERRORS
} from './types';



// GET ERROR
export const getError = (msg, status, id = null) => {

    return {
        type: GET_ERROR,
        payload: {msg, status, id}
    }
}


// CLEAR ERRORS
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}