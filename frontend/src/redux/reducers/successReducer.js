
import {
    SUCCESS_MSG,
    SUCCESS_MSG_CLEAR
} from '../actions/types';

const initialState = {
    msg: {}
}

export const successReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case SUCCESS_MSG:
            return {
                msg: payload
            }
        case SUCCESS_MSG_CLEAR: 
            return {
                msg: {}
            }   
        default:
            return state;
    }

}