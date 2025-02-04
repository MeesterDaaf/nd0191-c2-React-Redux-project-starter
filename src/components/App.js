import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}

export default App;