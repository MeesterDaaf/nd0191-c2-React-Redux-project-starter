import { _getQuestions, _saveQuestionAnswer } from '../utils/_DATA';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

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

export function saveQuestionAnswer(authedUser, qid, answer) {
    return {
        type: SAVE_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
    };
}

export function handleSaveAnswer(authedUser, qid, answer) {
    return async (dispatch) => {
        try {
            await _saveQuestionAnswer({
                authedUser,
                qid,
                answer
            });
            dispatch(saveQuestionAnswer(authedUser, qid, answer));
            // Also dispatch user answer update
            dispatch({
                type: 'SAVE_USER_ANSWER',
                authedUser,
                qid,
                answer
            });
        } catch (error) {
            console.error('Error saving answer:', error);
            alert('There was an error saving your answer. Please try again.');
        }
    };
} 