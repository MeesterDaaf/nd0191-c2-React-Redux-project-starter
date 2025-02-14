import React, { useState } from 'react';
import { _getUsers } from '../utils/_DATA';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

const Login = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    React.useEffect(() => {
        _getUsers().then((users) => {
            // Store users in component state for the dropdown
            setUsers(Object.values(users));
            // Dispatch users to Redux store
            dispatch({ type: 'RECEIVE_USERS', users });
        });
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch action to set authenticated user
        dispatch(setAuthedUser(selectedUser));
        // Navigate to the redirect path from state, or home if none exists
        const redirectPath = location.state?.from || '/dashboard';
        navigate(redirectPath);
    };

    return (
        <div className="flex justify-center items-center px-4 py-12 min-h-screen bg-gray-50 sm:px-6 lg:px-8">
            <div className="space-y-8 w-full max-w-md">
                <div>
                    <h2 className="text-3xl font-bold text-center">
                        Employee Polls
                    </h2>
                    <p className="mt-2 text-sm text-center text-gray-600">
                        Please sign in to continue
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <select
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            className="block relative px-3 py-2 w-full placeholder-gray-500 text-gray-900 rounded-md border border-gray-300 appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            required
                        >
                            <option value="">Select a user</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 w-full text-sm font-medium text-white bg-indigo-600 rounded-md border border-transparent shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={!selectedUser}
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
