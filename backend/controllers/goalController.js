import Goal from '../models/goalModel.js';
import asyncHandler from 'express-async-handler';


/**
 * @router  POST api/goals
 * @desc    create a new goal
 * @access  Public
 */

const postGoal = asyncHandler(async (req, res) => {

    res.send("New goal");
});


/**
 * @router  GET api/goals
 * @desc    Get the all goals
 * @access  Public
 */

const getGoals = asyncHandler(async (req, res) => {

    res.send("Get goals");
});



/**
 * @router  PUT api/goals/:id
 * @desc    Update a goal
 * @access  Public
 */
const updateGoal = asyncHandler(async (req, res) => {

    res.send("Update Goal");
});



/**
 * @router  DELETE api/goals/:id
 * @desc    Delete a goal
 * @access  Public
 */

const deleteGoal = asyncHandler(async (req, res) => {

    res.send("Delete Goal");
});



export {
    postGoal,
    getGoals,
    updateGoal,
    deleteGoal
}