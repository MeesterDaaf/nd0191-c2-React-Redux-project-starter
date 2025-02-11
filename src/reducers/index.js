import { combineReducers } from 'redux';
import authedUser from './authedUser';
import users from './users'; // You'll need to create this
import questions from './questions'; // You'll need to create this

export default combineReducers({
    authedUser,
    users,
    questions,
}); 