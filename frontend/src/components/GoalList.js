import React,{ useEffect } from 'react';
import './GoalList.css';
import { GoCheck } from 'react-icons/go';
import { FaRegTrashAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { getGoals, deleteGoal } from '../redux/actions/GoalAction';
import Loader from './loader/Loader';
import { updatedGoal } from '../redux/actions/GoalAction';


const GoalList = ({goal, getGoals, isAuthenticated, deleteGoal, updatedGoal }) => {


    useEffect(() => {
        getGoals()
        
    }, [getGoals]);
    

    // DELETE GOAL
    const handelDeleteGoal = (id) => deleteGoal(id);

    // UNCHECK GOAL
    const unCheckGoal = (id) => updatedGoal(id, {isCheck: false})

    // CHECK GOAL
    const checkGoal = (id) => updatedGoal(id, {isCheck: true})

    
    const { isLoading, goals } = goal;

    return (
        <>
            { isAuthenticated ? 
                <div className='goalList__container'>
                    {
                    isLoading ? <Loader /> : 
                        <div className={goals.length ? "goallist__box" : null}>
                            { goals.length ?

                                <>
                                    {goals.map(val => (
                                        <div className='goalList' key={val._id}>
                                            <div className='goal' style={{textDecoration : val.isCheck ? 'line-through': null}} >{val.goal}</div>
                                            <div className="goal__info">
                                                    <div><strong>Status :</strong><span className={val.isCheck ? "completed" : "uncompleted"}> {val.isCheck ? "Completed" : "Uncompleted"}</span></div>
                                                    <div className='goal__time'><strong>Date :</strong> {new Date(val.createdAt).toLocaleString('en-US')}</div>
                                            </div>
                                            <div className='goal__btns'>
                                                    <button className='check__icon' onClick={val.isCheck ? () => unCheckGoal(val._id) : () => checkGoal(val._id)}>
                                                    <GoCheck  className='goal__check' />
                                                    </button>
                                                <button className='delete__icon' onClick={() => handelDeleteGoal(val._id)}><FaRegTrashAlt className='goal__delete'/></button>
                                            </div>
                                        </div>
                                    ))}
                                </> : <h3 className='checking__goals'>you have not set any goals</h3>
                            }
                    </div>
                    }
                </div> : null
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    goal: state.goal,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps ,{ getGoals, deleteGoal,updatedGoal } )(GoalList);