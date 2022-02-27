import {
    GOAL_LOADING,
    ADD_GOAL,
    GET_GOALS,
    GOAL_CHECK,
    DELETE_GOAL,
} from './types';
import axios from 'axios';
import { getError } from './errorAction';
import { tokenConfig } from './authAction';
import { successMsg } from './successAction';



// GET ALL GOALS
export const getGoals = () => (dispatch, getState) => {

    dispatch(setGoalLoading());

    axios.get('/api/goals', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_GOALS,
            payload: res.data
        })

    }).catch(err => {

        dispatch(getError(err.response.data, err.response.status))
    })
}




// ADD NEW GOAL
export const addGoal = (data) => (dispatch,getState) => {

    axios.post('/api/goals', data, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: ADD_GOAL,
            payload: res.data
        })
    }).catch(err => {
        dispatch(getError(err.response.data, err.response.status, "GOAL_FAIL"))
    })
}




// DELETE GOAL
export const deleteGoal = (id) => (dispatch,getState) => {

    axios.delete(`/api/goals/${id}`, tokenConfig(getState))
    .then(res => {

        dispatch({
            type: DELETE_GOAL,
            payload: id
        });
        
        dispatch(successMsg(res.data.msg, "SUCCESS_MSG"))

    }).catch(err => {

        dispatch(getError(err.response.data, err.response.status, "GOAL_DELETE_FAIL"))

    })
};




// UPDATE GOAL
export const updatedGoal = (id, data) => (dispatch, getState) => {

    axios.put(`/api/goals/${id}`, data, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GOAL_CHECK,
            id: id,
            payload: res.data.updatedGoal 
        })

        dispatch(successMsg(res.data.msg, "SUCCESS_MSG"))
    }).catch(err => {
        dispatch(getError(err.response.data, err.response.status, "GOAL_UPDATE_FAIL"))
    })

}



// SET LOADING TRUE
export const setGoalLoading = () =>{

    return {
        type: GOAL_LOADING
    }
}