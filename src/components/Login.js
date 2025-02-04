import React, { useState } from 'react';
import { _getUsers } from '../utils/_DATA';

const Login = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    React.useEffect(() => {
        _getUsers().then((users) => {
            setUsers(Object.values(users));
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Handle login
        console.log('Selected user:', selectedUser);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-bold">
                        Employee Polls
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Please sign in to continue
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <select
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
