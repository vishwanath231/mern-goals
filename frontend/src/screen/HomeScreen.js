import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import GoalList from '../components/GoalList';
import './css/HomeScreen.css';
import { addGoal } from '../redux/actions/GoalAction';
import { clearErrors } from '../redux/actions/errorAction';
import { successMsgClear } from '../redux/actions/successAction';


const HomeScreen = ({ isAuthenticated, addGoal, error, clearErrors, successMsgClear, success, singleGoal }) => {

    const [data, setData] = useState({
        goal: ''
    });
    const [err, setErr] = useState(null);
    const [suc, setSuc] = useState(null);

    const handleChange = e => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        })
    }

    
    const handleSubmit = e => {
        e.preventDefault();

        addGoal(data);

        setData({
            goal: ''
        })
    }

    
  
    
    useEffect(() => {
        
        // SET SUCCESS MSG
        if (success.msg.id === "SUCCESS_MSG") {
            setSuc(success.msg.msg)

            setTimeout(() => {
                successMsgClear()
            }, 3000);
            
        }else{
            setSuc('')
        }

        // SET ERROR MSG
        if (error.id === "GOAL_FAIL") {
            setErr(error.msg.msg)

            setTimeout(() => {
                clearErrors()
            }, 3000);
        }else{
            setErr('')
        }

    }, [error, setErr, clearErrors, success, setSuc, successMsgClear]);


    return (
        <>
            <div className='dashboard__container'>
                <div className='dashboard__box'>
                    {/* <div className='dashboard__title'>Goal Dashboard</div> */}
                    { isAuthenticated ? <div className='dashboard__title__two'>Today Goals</div> : null}
                    {err && <div className='errorBox'>{err}</div>}
                    {suc && <div className='successBox'>{suc}</div>}
                    {isAuthenticated ? 
                        <form className='dashboard__form' onSubmit={handleSubmit} >
                            {/* <label htmlFor='goal'>Goal</label> */}
                            <input
                                type='text'
                                id='goal' 
                                placeholder='Enter goals...' 
                                name='goal'
                                onChange={handleChange}
                                value={data.goal}
                            />
                            <button type='submit'>Add Goal</button>
                        </form>  : 
                        <div className='default__home'>
                            <h1>🎯</h1>
                            <div>Login and start setting goals</div>
                            <h1>Plan your work, Work your plan</h1>
                        </div>
                    }
                </div>
            </div>
            <GoalList />
        </>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    success: state.success
})

export default connect(mapStateToProps, { addGoal, clearErrors, successMsgClear })(HomeScreen);