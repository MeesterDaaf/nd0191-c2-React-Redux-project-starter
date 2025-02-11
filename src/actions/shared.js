import { receiveQuestions } from './questions';
import { receiveUsers } from './users';
import { _getUsers, _getQuestions } from '../utils/_DATA';

export function handleInitialData() {
    return (dispatch) => {
        console.log('Starting to fetch initial data...');
        return Promise.all([
            _getUsers(),
            _getQuestions(),
        ]).then(([users, questions]) => {
            console.log('Received data:', {
                hasUsers: !!users,
                userCount: Object.keys(users).length,
                hasQuestions: !!questions,
                questionCount: Object.keys(questions).length
            });
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
        })
            .catch(error => {
                console.error('Error loading initial data:', error);
            });
    };
} 