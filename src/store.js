import { configureStore } from '@reduxjs/toolkit';
import authedUserReducer from './reducers/authedUser';
import usersReducer from './reducers/users';

const store = configureStore({
    reducer: {
        authedUser: authedUserReducer,
        users: usersReducer,
    }
});

export default store; 