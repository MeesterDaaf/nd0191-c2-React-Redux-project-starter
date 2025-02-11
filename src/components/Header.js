import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authedUser = useSelector((state) => state.authedUser);
    const users = useSelector((state) => state.users);
    const user = users[authedUser];

    const handleLogout = () => {
        dispatch(setAuthedUser(null));
        navigate('/login');
    };

    return (
        <header className="bg-white shadow">
            <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <nav className="flex space-x-4">
                        <Link
                            to="/dashboard"
                            className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                        >
                            Home
                        </Link>
                        <Link
                            to="/add"
                            className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                        >
                            New Poll
                        </Link>
                        <Link
                            to="/leaderboard"
                            className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                        >
                            Leaderboard
                        </Link>
                    </nav>

                    {user && (
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <img
                                    src={user.avatarURL || '/default-avatar.png'}
                                    alt={`Avatar of ${user.name}`}
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="text-sm font-medium">{user.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header; 