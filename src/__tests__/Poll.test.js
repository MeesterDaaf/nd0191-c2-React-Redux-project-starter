import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Poll from '../components/Poll';

const mockStore = configureStore([]);

describe('Poll Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      questions: {
        'q1': {
          id: 'q1',
          author: 'sarahedo',
          timestamp: 1467166872634,
          optionOne: {
            votes: ['sarahedo', 'tylermcginnis'],
            text: 'Build our new application with Javascript'
          },
          optionTwo: {
            votes: ['mtsamis'],
            text: 'Build our new application with Typescript'
          }
        }
      },
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo'
        }
      },
      authedUser: 'sarahedo'
    });
  });

  test('displays correct vote percentages', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Poll id="q1" />
        </BrowserRouter>
      </Provider>
    );

    // Total votes: 3
    // Option One: 2 votes (66.67%)
    // Option Two: 1 vote (33.33%)
    expect(screen.getByText(/66\.67%/i)).toBeInTheDocument();
    expect(screen.getByText(/33\.33%/i)).toBeInTheDocument();
  });
}); 