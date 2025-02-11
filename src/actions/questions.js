import { _getQuestions } from '../utils/_DATA';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    };
}

export function handleInitialQuestions() {
    return (dispatch) => {
        return _getQuestions().then((questions) => {
            dispatch(receiveQuestions(questions));
        });
    };
} 