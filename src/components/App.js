import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import Dashboard from './Dashboard';
import { handleInitialData } from '../actions/shared';

const App = () => {
    const dispatch = useDispatch();
    const authedUser = useSelector((state) => state.authedUser);

    useEffect(() => {
        dispatch(handleInitialData());
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/login" element={!authedUser ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={authedUser ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to={authedUser ? "/dashboard" : "/login"} replace />} />
        </Routes>
    );
}

export default App;