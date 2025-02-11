import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import authedUserReducer from './reducers/authedUser';
import usersReducer from './reducers/users';
import questionsReducer from './reducers/questions';

const store = configureStore({
  reducer: {
    authedUser: authedUserReducer,
    users: usersReducer,
    questions: questionsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

// For debugging
store.subscribe(() => {
  console.log('Store state:', store.getState());
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
