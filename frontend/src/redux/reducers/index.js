import { combineReducers } from 'redux';
import { authReducer } from "./authReducer";
import { goalReducer } from "./goalReducer";
import { errorReducer } from "./errorReducer";
import { successReducer } from './successReducer';

export const reducers =  combineReducers({
    auth: authReducer,
    goal: goalReducer,
    error: errorReducer,
    success: successReducer
})