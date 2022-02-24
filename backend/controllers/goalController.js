import Goal from '../models/goalModel.js';
import Users from '../models/userModel.js';
import asyncHandler from 'express-async-handler';



/**
 * @router  POST api/goals
 * @desc    create a new goal
 * @access  Public
 */

const postGoal = asyncHandler(async (req, res) => {

    if (!req.body.goal) {
        res.status(400)
        throw new Error("Please add goal!");
    }

    const goal = new Goal({
        goal: req.body.goal,
        user: req.user.id
    });

    const savedGoal = await goal.save();

    res.status(201).json(savedGoal);

});




/**
 * @router  GET api/goals
 * @desc    Get the all goals
 * @access  Public
 */

const getGoals = asyncHandler(async (req, res) => {

    const goal = await Goal.find({user: req.user.id});

    res.status(200).json(goal);
});




/**
 * @router  PUT api/goals/:id
 * @desc    Update a goal
 * @access  Public
 */
const updateGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400) 
        throw new Error('Goal not found')
    }

    const user = await Users.findById(req.user.id)

    if (!user) {
        res.status(400) 
        throw new Error('User not found')
    }


    if (goal.user.toString() !== user.id) {
        res.status(401) 
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{ new: true, }) 

    res.status(200).json(updatedGoal)
});




/**
 * @router  DELETE api/goals/:id
 * @desc    Delete a goal
 * @access  Public
 */

const deleteGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400)
        throw new Error("Goal not found!")
    }

    const user = await Users.findById(req.user.id);
    if (!user) {
        res.status(400)
        throw new Error("User not found!")
    }


    if (goal.user.toString() !== user.id) {
        res.status(400)
        throw new Error("User not authorized")
    }

    await goal.remove();

    res.status(200).json({
        id: req.params.id
    })
});



export {
    postGoal,
    getGoals,
    updateGoal,
    deleteGoal
}