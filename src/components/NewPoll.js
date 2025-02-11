import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import { handleAddQuestion } from '../actions/questions';

const NewPoll = () => {
    const [optionOneText, setOptionOneText] = useState('');
    const [optionTwoText, setOptionTwoText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authedUser = useSelector((state) => state.authedUser);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!optionOneText || !optionTwoText || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await dispatch(handleAddQuestion(optionOneText, optionTwoText));
            navigate('/dashboard');
        } catch (error) {
            console.error('Error adding question:', error);
            alert('There was an error creating your question. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Header />
            <main className="px-4 py-6 mx-auto max-w-3xl sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-2xl font-bold mb-6">Create New Poll</h1>
                    <h2 className="text-xl mb-4">Would you rather...</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Option One
                            </label>
                            <input
                                type="text"
                                value={optionOneText}
                                onChange={(e) => setOptionOneText(e.target.value)}
                                placeholder="Enter first option"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="text-center text-gray-500">
                            OR
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Option Two
                            </label>
                            <input
                                type="text"
                                value={optionTwoText}
                                onChange={(e) => setOptionTwoText(e.target.value)}
                                placeholder="Enter second option"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!optionOneText || !optionTwoText || isSubmitting}
                            className={`w-full py-2 px-4 rounded ${!optionOneText || !optionTwoText || isSubmitting
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Poll'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default NewPoll; 