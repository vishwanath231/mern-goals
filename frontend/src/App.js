import React,{ useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import { userLoaded } from './redux/actions/authAction';
import store from './redux/store';

const App = () => {


    useEffect(() => {
        
        store.dispatch(userLoaded());
        
    }, []);

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<HomeScreen />} />
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/register' element={<RegisterScreen />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;