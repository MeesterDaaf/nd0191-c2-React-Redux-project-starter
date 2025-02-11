import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Dashboard = () => {
    const [showAnswered, setShowAnswered] = useState(false);
    const navigate = useNavigate();

    const authedUser = useSelector((state) => state.authedUser);
    const questions = useSelector((state) => state.questions);
    const users = useSelector((state) => state.users);

    // Debug what's missing
    console.log({
        authedUser,
        hasQuestions: !!questions,
        hasUsers: !!users,
        questionCount: questions ? Object.keys(questions).length : 0,
        userCount: users ? Object.keys(users).length : 0
    });

    // If data isn't loaded yet, show which piece is missing
    if (!questions || !users || !authedUser) {
        return (
            <div className="p-4 text-center">
                Loading...
                <div className="text-sm text-gray-500">
                    {!authedUser && <div>Waiting for auth...</div>}
                    {!questions && <div>Waiting for questions...</div>}
                    {!users && <div>Waiting for users...</div>}
                </div>
            </div>
        );
    }

    // Get user's answered questions
    const userAnswers = users[authedUser]?.answers || {};

    // Sort and filter questions
    const sortedQuestions = Object.values(questions)
        .sort((a, b) => b.timestamp - a.timestamp)
        .filter((question) => {
            // Check if this question's ID exists in user's answers
            const isAnswered = Object.keys(userAnswers).includes(question.id);
            return showAnswered ? isAnswered : !isAnswered;
        });

    const handlePollClick = (questionId) => {
        navigate(`/questions/${questionId}`);
    };

    return (
        <div>
            <Header />
            <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Toggle Buttons */}
                <div className="flex justify-center mb-6 space-x-4">
                    <button
                        className={`px-4 py-2 rounded-lg ${!showAnswered
                            ? 'text-white bg-blue-500'
                            : 'bg-gray-200'
                            }`}
                        onClick={() => setShowAnswered(false)}
                    >
                        Unanswered Questions ({Object.values(questions).filter(q => !Object.keys(userAnswers).includes(q.id)).length})
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg ${showAnswered
                            ? 'text-white bg-blue-500'
                            : 'bg-gray-200'
                            }`}
                        onClick={() => setShowAnswered(true)}
                    >
                        Answered Questions ({Object.keys(userAnswers).length})
                    </button>
                </div>

                {/* Questions List */}
                <div className="grid gap-6">
                    {sortedQuestions.length === 0 ? (
                        <p className="text-center text-gray-500">
                            {showAnswered
                                ? "You haven't answered any questions yet!"
                                : "No new questions to answer!"}
                        </p>
                    ) : (
                        sortedQuestions.map((question) => (
                            <div
                                key={question.id}
                                className="p-6 bg-white rounded-lg shadow transition-shadow cursor-pointer hover:shadow-lg"
                                onClick={() => handlePollClick(question.id)}
                            >
                                <div className="flex items-start space-x-4">
                                    <img
                                        src={users[question.author]?.avatarURL || '/default-avatar.png'}
                                        alt={`Avatar of ${question.author}`}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">
                                            {users[question.author]?.name} asks:
                                        </p>
                                        <h2 className="mt-1 text-xl font-bold">
                                            Would you rather...
                                        </h2>
                                        <p className="mt-2 text-gray-600">
                                            {question.optionOne.text} or...
                                        </p>
                                        <p className="mt-1 text-blue-500 hover:underline">
                                            Click to see full question
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
