import { configureStore } from '@reduxjs/toolkit';
// or if using legacy Redux: import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

// If using legacy Redux:
// const store = createStore(rootReducer, applyMiddleware(thunk));

// For debugging
store.subscribe(() => {
    console.log('Store state:', store.getState());
});

export default store; 