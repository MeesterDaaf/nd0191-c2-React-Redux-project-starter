import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import { _saveQuestionAnswer } from '../utils/_DATA';
import { handleSaveAnswer } from '../actions/questions';
import NotFound from './NotFound';

const PollDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const authedUser = useSelector((state) => state.authedUser);
    const question = useSelector((state) => state.questions[id]);
    const users = useSelector((state) => state.users);

    if (!question) {
        return <NotFound />;
    }

    const author = users[question.author];
    const hasVoted = question.optionOne.votes.includes(authedUser) ||
        question.optionTwo.votes.includes(authedUser);

    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
    const optionOnePercentage = (question.optionOne.votes.length / totalVotes * 100).toFixed(1);
    const optionTwoPercentage = (question.optionTwo.votes.length / totalVotes * 100).toFixed(1);

    const handleVote = async (e) => {
        e.preventDefault();
        if (!selectedOption || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await dispatch(handleSaveAnswer(authedUser, id, selectedOption));
            navigate('/dashboard');
        } catch (error) {
            console.error('Error saving answer:', error);
            alert('There was an error saving your answer. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Header />
            <main className="px-4 py-6 mx-auto max-w-3xl sm:px-6 lg:px-8">
                <div className="p-6 bg-white rounded-lg shadow">
                    <div className="flex items-center mb-6 space-x-4">
                        <img
                            src={author.avatarURL || '/default-avatar.png'}
                            alt={`Avatar of ${author.name}`}
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <p className="text-gray-500">{author.name} asks:</p>
                            <h1 className="text-2xl font-bold">Would you rather...</h1>
                        </div>
                    </div>

                    {hasVoted ? (
                        // Results View
                        <div className="space-y-4">
                            <div className={`p-4 rounded border ${question.optionOne.votes.includes(authedUser)
                                ? 'border-blue-500 bg-blue-50'
                                : ''
                                }`}>
                                <p>{question.optionOne.text}</p>
                                <div className="mt-2">
                                    <div className="h-2.5 bg-gray-200 rounded-full">
                                        <div
                                            className="h-2.5 bg-blue-500 rounded-full"
                                            style={{ width: `${optionOnePercentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {question.optionOne.votes.length} votes ({optionOnePercentage}%)
                                        {question.optionOne.votes.includes(authedUser) &&
                                            " - Your vote"}
                                    </p>
                                </div>
                            </div>

                            <div className={`p-4 rounded border ${question.optionTwo.votes.includes(authedUser)
                                ? 'border-blue-500 bg-blue-50'
                                : ''
                                }`}>
                                <p>{question.optionTwo.text}</p>
                                <div className="mt-2">
                                    <div className="h-2.5 bg-gray-200 rounded-full">
                                        <div
                                            className="h-2.5 bg-blue-500 rounded-full"
                                            style={{ width: `${optionTwoPercentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {question.optionTwo.votes.length} votes ({optionTwoPercentage}%)
                                        {question.optionTwo.votes.includes(authedUser) &&
                                            " - Your vote"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Voting Form
                        <form onSubmit={handleVote} className="space-y-4">
                            <div>
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="poll-option"
                                        value="optionOne"
                                        checked={selectedOption === 'optionOne'}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span>{question.optionOne.text}</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="poll-option"
                                        value="optionTwo"
                                        checked={selectedOption === 'optionTwo'}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span>{question.optionTwo.text}</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={!selectedOption || isSubmitting}
                                className={`w-full py-2 px-4 rounded ${!selectedOption || isSubmitting
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    }`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Answer'}
                            </button>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
};

export default PollDetails;
