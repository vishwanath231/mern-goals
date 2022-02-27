
import {
    SUCCESS_MSG,
    SUCCESS_MSG_CLEAR
} from './types';


// SUCCESS MSG
export const successMsg = (msg, id = null) => {

    return {
        type: SUCCESS_MSG,
        payload: {msg, id}
    }
};



// CLEAR SUCCESS MSG
export const successMsgClear = () => {
    
    return {
        type: SUCCESS_MSG_CLEAR
    }
};
