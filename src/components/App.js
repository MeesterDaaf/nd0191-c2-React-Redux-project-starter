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
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    const dispatch = useDispatch();
    const authedUser = useSelector((state) => state.authedUser);

    useEffect(() => {
        dispatch(handleInitialData());
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/login" element={!authedUser ? <Login /> : <Navigate to="/" />} />

            {/* Protected Routes */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/add"
                element={
                    <ProtectedRoute>
                        <NewPoll />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/leaderboard"
                element={
                    <ProtectedRoute>
                        <Leaderboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/questions/:id"
                element={
                    <ProtectedRoute>
                        <PollDetails />
                    </ProtectedRoute>
                }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;