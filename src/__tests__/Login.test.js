import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from '../components/Login';
import userEvent from '@testing-library/user-event';

const mockStore = configureStore([]);

describe('Login Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      authedUser: null,
      users: {
        sarahedo: {
          id: 'sarahedo',
          password: 'password123',
          name: 'Sarah Edo',
        },
      },
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

    // Check for username field
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();

    // Check for password field
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('shows error message for incorrect credentials', async () => {
    const user = userEvent.setup();
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    // Fill in incorrect credentials
    await user.type(screen.getByLabelText(/username/i), 'wronguser');
    await user.type(screen.getByLabelText(/password/i), 'wrongpass');
    
    // Click submit
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    // Verify error message appears
    expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
  });
}); 