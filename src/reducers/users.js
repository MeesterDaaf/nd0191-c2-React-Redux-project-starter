import { RECEIVE_USERS } from '../actions/users';
import { SAVE_USER_ANSWER } from '../actions/users';

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            };
        case SAVE_USER_ANSWER:
            const { authedUser, qid, answer } = action;
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
            };
        case 'ADD_USER_QUESTION':
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    questions: state[action.authedUser].questions.concat([action.qid])
                }
            };
        default:
            return state;
    }
} 