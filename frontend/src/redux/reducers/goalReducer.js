
import {
    GOAL_LOADING,
    ADD_GOAL,
    GET_GOALS,
    GOAL_CHECK,
    DELETE_GOAL
} from '../actions/types';

const initialState = {
    goals: [],
    isLoading:false
}

export const goalReducer = (state = initialState, { type, payload, id }) => {

    switch (type) {
        case GOAL_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ADD_GOAL: 
            return {
                ...state,
                goals: [payload, ...state.goals]
            }
        case GET_GOALS: 
            return {
                ...state,
                goals: payload,
                isLoading: false
            }
        case GOAL_CHECK:
            return {
                ...state,
                goals: state.goals.map(val => val._id === id ? payload : val)

            }
        case DELETE_GOAL:
            return {
                ...state,
                goals: state.goals.filter(val => val._id !== payload)
            }
        default:
            return state;
    }

    
}