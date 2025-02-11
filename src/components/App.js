import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';

const App = () => {
    return (
        <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}

export default App;