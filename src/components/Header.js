import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/authedUser';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authedUser = useSelector((state) => state.authedUser);
    const users = useSelector((state) => state.users);
    const user = authedUser ? users[authedUser] : null;

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <header className="bg-white shadow">
            <div className="flex justify-between items-center px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900">Employee Polls</h1>
                {user && (
                    <div className="flex gap-4 items-center">
                        <img
                            src={user.avatarURL}
                            alt={`Avatar of ${user.name}`}
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="text-gray-700">{user.name}</span>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1 text-sm text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header; 