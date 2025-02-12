import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import PollDetails from '../components/PollDetails';

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
        <MemoryRouter initialEntries={['/questions/q1']}>
          <Routes>
            <Route path="/questions/:id" element={<PollDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/66\.7%/)).toBeInTheDocument();
    expect(screen.getByText(/33\.3%/)).toBeInTheDocument();
  });
}); 