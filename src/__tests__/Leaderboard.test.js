import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Leaderboard from '../components/Leaderboard';

const mockStore = configureStore([]);

describe('Leaderboard Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          questions: ['q1', 'q2'],
          answers: {
            'q3': 'optionOne',
            'q4': 'optionTwo',
            'q5': 'optionTwo'
          }
        },
        tylermcginnis: {
          id: 'tylermcginnis',
          name: 'Tyler McGinnis',
          questions: ['q3'],
          answers: {
            'q1': 'optionOne',
            'q2': 'optionTwo'
          }
        }
      }
    });
  });

  test('displays correct user statistics', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Leaderboard />
        </MemoryRouter>
      </Provider>
    );

    // Check Sarah's stats
    const sarahSection = screen.getByText('Sarah Edo').closest('li');
    expect(sarahSection).toHaveTextContent('2'); // Questions asked
    expect(sarahSection).toHaveTextContent('3'); // Questions answered
    expect(sarahSection).toHaveTextContent('5'); // Total score

    // Check Tyler's stats
    const tylerSection = screen.getByText('Tyler McGinnis').closest('li');
    expect(tylerSection).toHaveTextContent('1'); // Questions asked
    expect(tylerSection).toHaveTextContent('2'); // Questions answered
    expect(tylerSection).toHaveTextContent('3'); // Total score
  });
}); 