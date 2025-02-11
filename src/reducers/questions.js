import { RECEIVE_QUESTIONS } from '../actions/questions';

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            console.log('Questions reducer received:', action.questions);
            return {
                ...state,
                ...action.questions
            };
        default:
            return state;
    }
} 