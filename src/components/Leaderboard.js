import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';

const Leaderboard = () => {
    const users = useSelector((state) => state.users);

    // Calculate scores and sort users
    const leaderboardData = Object.values(users)
        .map(user => ({
            id: user.id,
            name: user.name,
            avatarURL: user.avatarURL,
            answeredCount: Object.keys(user.answers).length,
            questionsCount: user.questions.length,
            totalScore: Object.keys(user.answers).length + user.questions.length
        }))
        .sort((a, b) => b.totalScore - a.totalScore);

    return (
        <div>
            <Header />
            <main className="px-4 py-6 mx-auto max-w-3xl sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow">
                    <div className="px-4 py-5 sm:px-6">
                        <h1 className="text-2xl font-bold">Leaderboard</h1>
                    </div>
                    <div className="border-t border-gray-200">
                        <ul className="divide-y divide-gray-200">
                            {leaderboardData.map((user, index) => (
                                <li key={user.id} className="px-4 py-5 sm:px-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            {index < 3 && (
                                                <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                    {index + 1}
                                                </div>
                                            )}
                                            <img
                                                src={user.avatarURL || '/default-avatar.png'}
                                                alt={`Avatar of ${user.name}`}
                                                className="w-12 h-12 rounded-full"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-lg font-semibold">{user.name}</h2>
                                            <div className="grid grid-cols-2 gap-4 mt-2">
                                                <div>
                                                    <p className="text-sm text-gray-500">Questions Asked</p>
                                                    <p className="text-lg font-medium">{user.questionsCount}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Questions Answered</p>
                                                    <p className="text-lg font-medium">{user.answeredCount}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm text-gray-500">Total Score</div>
                                            <div className="text-2xl font-bold text-blue-600">
                                                {user.totalScore}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Leaderboard;
