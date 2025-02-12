import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from '../components/Login';
import userEvent from '@testing-library/user-event';

// Add mock for _DATA.js
jest.mock('../utils/_DATA', () => ({
  _getUsers: () => Promise.resolve({
    sarahedo: {
      id: 'sarahedo',
      name: 'Sarah Edo',
      avatarURL: null
    },
    tylermcginnis: {
      id: 'tylermcginnis',
      name: 'Tyler McGinnis',
      avatarURL: null
    }
  })
}));

const mockStore = configureStore();

describe('Login Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      authedUser: null,
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: null
        },
        tylermcginnis: {
          id: 'tylermcginnis',
          name: 'Tyler McGinnis',
          avatarURL: null
        }
      }
    });
  });

  test('renders login form elements', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    // Check for user selection dropdown
    expect(screen.getByText(/Select a user/i)).toBeInTheDocument();

    // Check for sign in button
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('sign in button is disabled when no user is selected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    expect(signInButton).toBeDisabled();
  });

  test('enables sign in button when user is selected', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    // Wait for options to be loaded
    await waitFor(() => {
      expect(screen.getByText('Sarah Edo')).toBeInTheDocument();
    });

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'sarahedo');

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    expect(signInButton).not.toBeDisabled();
  });
}); 