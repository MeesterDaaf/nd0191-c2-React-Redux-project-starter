import { RECEIVE_QUESTIONS, SAVE_QUESTION_ANSWER, ADD_QUESTION } from '../actions/questions';

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            console.log('Questions reducer received:', action.questions);
            return {
                ...state,
                ...action.questions
            };
        case SAVE_QUESTION_ANSWER:
            const { authedUser, qid, answer } = action;
            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser])
                    }
                }
            };
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            };
        default:
            return state;
    }
} 