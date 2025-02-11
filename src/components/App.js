import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import Dashboard from './Dashboard';
import PollDetails from './PollDetails';
import NewPoll from './NewPoll';
import Leaderboard from './Leaderboard';
import { handleInitialData } from '../actions/shared';
import NotFound from './NotFound';

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
            <Route path="/questions/:id" element={authedUser ? <PollDetails /> : <Navigate to="/login" />} />
            <Route path="/add" element={authedUser ? <NewPoll /> : <Navigate to="/login" />} />
            <Route path="/leaderboard" element={authedUser ? <Leaderboard /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to={authedUser ? "/dashboard" : "/login"} replace />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;