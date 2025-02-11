import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import App from '../components/App';
import authedUser from '../reducers/authedUser';
import users from '../reducers/users';
import questions from '../reducers/questions';

// Create a mock store
const store = configureStore({
    reducer: {
        authedUser,
        users,
        questions
    }
});

describe('App', () => {
    it('should match snapshot', () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
        
        expect(container).toMatchSnapshot();
    });
}); 